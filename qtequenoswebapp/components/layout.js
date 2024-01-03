import Head from "next/head"
import Header from "./header"
import Footer from "./footer"
import { UserProvider } from "@/lib/authContext"

export default function Layout({user, loading = false, children, title = '', description = ''}) {
  
  return (
    <UserProvider value={{ user, loading }}>
        <Head>
            <title>{`QTEQUEÑOS ${title}` }</title>
            <meta name="description" content={description}/>             
        </Head>
        <Header/>
        <div>
          {children}
        </div>
        <Footer/>        
    </UserProvider>
  )
}
