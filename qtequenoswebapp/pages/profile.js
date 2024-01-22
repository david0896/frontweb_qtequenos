import Layout from "@/components/layout";
import { useFetchUser } from '../lib/authContext';
import Image from "next/image";

export default function ContactUs({shoppingCart}) {
    const { user, loading } = useFetchUser();
    return (
        <Layout
            user={user}      
            title={'Perfil de usuario'}
            description={'Visualiza tus pedidos realizados y modifica tu información'} 
        >

        </Layout>
    )
}