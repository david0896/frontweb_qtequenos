import Layout from "@/components/layout";
import {fetcher} from '../../lib/api';
import CardListProduct from "@/components/cardListProduct";
import { useFetchUser } from '../../lib/authContext';

export default function Index({frozenProducts, friedProducts, shoppingCart, addShoppingCart}) {
    const { user, loading } = useFetchUser();
    return (
        <Layout
            user={user}      
            title={'Productos congelados y fritos'}
            description={'Productos hechos con la mejor mezcla de harina de maìz precocido'}
            shoppingCart={shoppingCart}
        >
            <div className="px-5 lg:mt-10 mx-auto lg:w-9/12 overflow-hidden lg:overflow-visible pb-20">
                <h1 className="px-4 lg:px-0 text-[#f5884d] block text-5xl lg:text-6xl my-10 uppercase font-extrabold"> 
                    PRODUCTOS CONGELADOS
                </h1>
                <CardListProduct
                    products={frozenProducts}
                    addShoppingCart={addShoppingCart}
                />
                <h1 className="px-4 lg:px-0 text-[#f5884d] block text-5xl lg:text-6xl my-10 uppercase font-extrabold"> 
                    PRODUCTOS FRITOS
                </h1>
                <CardListProduct
                    products={friedProducts}
                    addShoppingCart={addShoppingCart}
                />
            </div>
        </Layout>
    )
}

export async function getServerSideProps(){
    const frozenProducts = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/products?filters[name][$notContains]=fritos&fields[0]=name&fields[1]=description&fields[3]=price&fields[4]=photo&populate[packages][fields][0]=title`);
    const friedProducts = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/products?filters[name][$containsi]=fritos&fields[0]=name&fields[1]=description&fields[3]=price&fields[4]=photo&populate[packages][fields][0]=title`);
    return{
        props:{
            frozenProducts:frozenProducts,
            friedProducts:friedProducts
        }
    }
}
