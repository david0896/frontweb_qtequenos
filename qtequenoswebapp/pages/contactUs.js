import Layout from "@/components/layout";
import { useFetchUser } from '../lib/authContext';

export default function ContactUs() {
    const { user, loading } = useFetchUser();
    return (
        <Layout
            user={user}      
            title={'Contacto'}
            description={'Comunicate con nosotros de manera rapida y sencilla'} 
        >
            <h1>Contacto</h1>
        </Layout>
    )
}