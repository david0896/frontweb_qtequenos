import Head from "next/head"
import Header from "./header"
import Footer from "./footer"

export default function Layout({children, title = '', description = ''}) {
  return (
    <div>
        <Head>
            <title>{`QTEQUEÑOS ${title}` }</title>
            <meta name="description" content={description}/>             
        </Head>
        <Header/>
        <div>
          {children}
        </div>
        <Footer/>        
    </div>
  )
}
