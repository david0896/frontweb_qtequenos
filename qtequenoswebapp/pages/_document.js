import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="favicon/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = {'true'}/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;800;900&display=swap" rel="stylesheet"/>       
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css" rel="stylesheet" />
      </Head>
      <body className="font-monse">
        <Main />
        <NextScript /> 
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js" strategy="lazyOnload" async></script>
      </body>
    </Html>
  )
}
