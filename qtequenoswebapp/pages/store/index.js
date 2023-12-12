import Layout from "@/components/layout";
import {fetcher} from '../../lib/api';
import CardListProductCongelados from "@/components/cardListProductCongelados";

export default function Index({products}) {

    return (
        <Layout
            title={'Quienes somos'}
            description={'Servicios que presta la empresa'}
        >
            <div className="px-5 mt-10 mx-auto lg:w-9/12 overflow-hidden lg:overflow-visible">
                <h1 className="px-4 lg:px-0 text-[#f5884d] block text-5xl lg:text-6xl my-10 uppercase font-extrabold"> 
                    PRODUCTOS CONGELADOS
                </h1>
                <CardListProductCongelados
                    products={products}
                />
            </div>
        </Layout>
    )
}

export async function getStaticProps(){
    const productsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/products?filters[name][$notContains]=fritos&fields[0]=name&fields[1]=description&fields[3]=price`);
    return{
        props:{
            products:productsResponse
        }
    }
}