import { useState, useEffect } from 'react';
import Router from 'next/router';
import Layout from "@/components/layout";
import Image from "next/image";
import Alerta from '@/components/alert';
import { useFetchUser } from '../../lib/authContext';
import styles from "../../styles/shoppingCart.module.css";
import Link from 'next/link';
import { fetcher } from '../../lib/api';
import {getTokenFromLocalCookie} from '../../lib/auth';
import Cookies from 'js-cookie';

export default function ShoppingCart({shoppingCart, setShoppingCart, updateQuantity, deleteProduct, total, setTotal, alert, setAlert}) {
    const jwt = getTokenFromLocalCookie();
    const {user, loading} = useFetchUser();
    const [values, setValues] = useState(Array(shoppingCart.length).fill(0));
    const orderDetailCk = Cookies.get('orderDetailCk');
    let orderDetail = {}

    useEffect(() => {
        setValue(shoppingCart)        
      }, []);
    
    useEffect(()=>{
        const totalCalculation = shoppingCart.reduce((total, product)=> total + (product.quantity * product.price), 0);
        setTotal(totalCalculation);
    }, [shoppingCart])

    const incrementValue = (index, id) => {
        if (values[index] < 99) {
            const newValues = [...values];
            newValues[index] += 1;
            setValues(newValues);
            updateQuantity({
                id : id,
                quantity : newValues[index]
            })
        }
    };

    const decrementValue = (index, id) => {
        if (values[index] > 0) {
            const newValues = [...values];
            newValues[index] -= 1;
            setValues(newValues);
            updateQuantity({
                id : id,
                quantity : newValues[index]
            })
        }
    };

    const setValue = (shoppingCart) =>{
        shoppingCart.map((product, index)=> (
            values[index]= product.quantity
        ))
    }

    const createNewOrder = async (e) => {

        if (orderDetailCk) {
            setAlert({
                message : "Tienes un pedido activo por confirma su pago",
                tipo: 1
            })
            return            
        }

        e.preventDefault();
        try {
            const responseData = await fetcher(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders`,
                {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    data: {
                        status: 'Pendiente de pago',      
                        user: user,                    
                    },
                }),
                method: 'POST',
                }
            );
            
            if(responseData){
                orderDetail = {
                    order               : responseData?.data?.id,
                    totalPrice          : total,
                    deliveryAddress     : 'Retiro en tienda',
                    recipientsName      : '',
                    productsAndQuantity : shoppingCart.map((product) => {return `${product.name} x ${product.quantity}`} ).join(',')
                }                
                createNewOrderDetail()

            }
        } catch (error) {
          console.error(error);
        }
    };

    const createNewOrderDetail = async () => {

        try {
            const responseData = await fetcher(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/order-details`,
                {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body : JSON.stringify({
                    data: orderDetail,
                }), 
                method: 'POST',
                }
            );

            if(responseData){
                orderDetail.id = responseData.data.id;
                Cookies.set('orderDetailCk', JSON.stringify(orderDetail));
                setShoppingCart([]);
                Router.push('/store/checkout');
            }
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <Layout 
            user={user}
            title="Carrito de compras"
            shoppingCart={shoppingCart}
        >
            {alert ?
                <Alerta
                    alert={alert}
                    setAlert={setAlert}
                />
                : ''
            }
            <main className="px-5 mt-10 mx-auto lg:w-9/12">
                <h1 className="px-4 text-center lg:px-0 text-[#f5884d] block text-5xl lg:text-6xl my-10 uppercase font-extrabold">Carrito</h1>
                <div className={styles.contenido}>
                    <div className={styles.carrito}>
                        <h2 className='text-lg font-bold'>Articulos</h2>
                        {shoppingCart.length === 0 ? 'No hay aproductos en tu carrito todavía' : (
                            shoppingCart.map((product, index)=> (
                                <div 
                                    key={product.id}
                                    className={styles.producto}
                                >
                                    <div>
                                        <Image width={1080} height={720} src={product.image} alt={`imagen de producto ${product.name} `} className='w-[20rem] p-0 lg:w-[10rem] lg:p-5'/>
                                    </div>
                                    <div>
                                        <p className={styles.nombre}>{product.name}</p>
                                        <p className={styles.precio}>$<span>{product.price}</span></p>
                                        <div>
                                            <label htmlFor="bedrooms-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Elegir cantidad:</label>
                                            <div className="relative flex items-center max-w-[11rem] mb-1">
                                                <button type="button" id="decrement-button" onClick={() => decrementValue(index, product.id)} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                                    </svg>
                                                </button>
                                                <input 
                                                    type="text" 
                                                    className="bg-gray-50 border-x-0 border-gray-300 h-11  font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={values[index]} 
                                                    min="0" 
                                                    max="99"
                                                    required
                                                    readOnly
                                                />
                                                <button type="button" id="increment-button" onClick={() => incrementValue(index, product.id)} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <p className={styles.subtotal}>Subtotal: <span>${values[index] * product.price}</span></p>
                                    </div>
                                    <button
                                        className={styles.eliminar}
                                        type='button'
                                        onClick={()=>{deleteProduct(product.id)}}
                                    >
                                        x
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <aside className={`${styles.resumen} mb-10`}>
                        <h3 className='text-lg font-bold'>Resumen del pedido</h3>
                        <p>Total a pagar: <span>${total}</span></p>
                        {
                            user ? shoppingCart ?
                            <Link   
                                href='#'
                                onClick={createNewOrder} 
                                className='mt-4 w-fit font-bold text-white bg-[#c21a7f] hover:bg-[#970b5f] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center'
                            >Comprar ahora</Link> 
                            : '' 
                            :   <p className=' pt-4'>
                                    Para completar tú compra: 
                                    <Link   
                                        href='/loginRegister?form=login' 
                                        className='text-[#c21a7f] hover:text-[#970b5f] font-semibold'
                                    > Inicia sesión</Link> ó 
                                    <Link 
                                        href='/loginRegister?form=register'
                                        className='text-[#c21a7f] hover:text-[#970b5f] font-semibold'
                                    > Registrate</Link>
                                </p>
                        }
                    </aside>
                </div>
            </main>
            
        </Layout>
    )
}