import Layout from "@/components/layout";
import {fetcher} from '../../lib/api';
import ProductCardPrueba from "@/components/productCardPrueba";

export default function Index({products}) {

    console.log(products)

    return (
        <Layout
            title={'Quienes somos'}
            description={'Servicios que presta la empresa'}
        >
            <h1>Productos</h1>
            <ProductCardPrueba
                products={products}
            />
        </Layout>
    )
}

export async function getStaticProps(){
    const productsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/products`)
    console.log(productsResponse)
    return{
        props:{
            products:productsResponse
        }
    }
}