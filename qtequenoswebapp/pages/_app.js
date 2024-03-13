import { useState, useEffect } from 'react';
import '@/styles/globals.css';
import { ParallaxProvider } from 'react-scroll-parallax';
import Maintenance from './maintenance';

export default function App({ Component, pageProps }) {
  const shoppingCartLs = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('shoppingCart')) ?? []: [];
  const [shoppingCart, setShoppingCart] = useState(shoppingCartLs);
  const [readyPage, setReadyPage] = useState(false);
  const [alert, setAlert] = useState({});
  const [total, setTotal] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  //const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify( shoppingCart ));
  }, [shoppingCart])
  
  useEffect(() => {
    setReadyPage(true);
  }, [])
  
  const addShoppingCart = (product) => {
    // Comprobar si la product ya esta en el carrito...
    if(shoppingCart.some( productState =>  productState.id === product.id )) {
        // Iterar para actualizar quantity
        const updatedShoppingCart = shoppingCart.map( productState => {
            if( productState.id === product.id ) {
                productState.quantity = product.quantity;
            } 
            return productState;
        });
        // Se asigna al array
        setShoppingCart([...updatedShoppingCart]);
        localStorage.setItem('shoppingCart', JSON.stringify( shoppingCart ));
    } else {
        // En caso de que el articulo no exista, es nuevo y se agrega
        setShoppingCart([...shoppingCart, product]);
        localStorage.setItem('shoppingCart', JSON.stringify( shoppingCart ));
    }
  }

  const deleteProduct = id => {
      const updatedShoppingCart = shoppingCart.filter( producto => producto.id != id)
      setShoppingCart(updatedShoppingCart)
      window.localStorage.setItem('shoppingCart', JSON.stringify( shoppingCart ));
  }

  const updateQuantity = product => {
    const updatedShoppingCart = shoppingCart.map( productState => {
      if(productState.id === product.id ) {
        productState.quantity = parseInt( product.quantity )
      } 
      return productState
    })
    setShoppingCart(updatedShoppingCart)
    window.localStorage.setItem('shoppingCart', JSON.stringify( shoppingCart ));
  }

  return ( 
    readyPage ?
      <ParallaxProvider>
        <Component 
          {...pageProps}
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
          addShoppingCart={addShoppingCart}
          deleteProduct={deleteProduct}
          updateQuantity={updateQuantity}
          alert={alert}
          setAlert={setAlert}
          total={total}
          setTotal={setTotal}
          totalPoints={totalPoints}
          setTotalPoints={setTotalPoints}
        />    
      </ParallaxProvider>     
    : null
  )
}