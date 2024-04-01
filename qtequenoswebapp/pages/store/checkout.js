import { useState, useEffect} from 'react';
import Layout from "@/components/layout";
import MessagePrompt from '@/components/messagePrompt';
import SuccessfullPayment from '@/components/successfullPayment';
import Alerta from '@/components/alert';
import { useFetchUser } from '../../lib/authContext';
import { fetcher } from '../../lib/api';
import { emailSend } from '@/lib/sendEmail';
import {getTokenFromLocalCookie} from '../../lib/auth';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function Checkout({payMethods, alert, setAlert, shoppingCart, priceDelivery}) {
    const schema = yup.object().shape({
        email             : yup.string().trim().required('El campo es requerido').email('Ingrese un correo valido como: ejemplo@next.com'),
        amountTransferred : yup.number('El campo admite solo numeros').required('El campo es requerido')
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)        
      });
   
    const [data, setData] = useState({
        deliveryAddress: 'Retiro en tienda',
        recipientsName: '',
    });
    const [dataBankReference, setDataBankReference] = useState({
        Bank: '',
        BankReference: '',
        amountTransferred: ''
    });
    const [bankReference, setBankReference] = useState(false);
    const [zelleReference, setZelleReference] = useState(false);
    const [cashReference, setCashReference] = useState(false);
    const [payPointReference, setPayPointReference] = useState(false);
    const [successfulPayment, setSuccessfulPayment] = useState(false);
    const [formDirection, setFormDirection] = useState(false);
    const [sinDelivery, setSinDelivery] = useState(true);
    const [availablePoints, setAvailablePoints] = useState(0);
    const [totalPointsSpent, setTotalPointsSpent] = useState(0);
    const [idRecordPoint,setIdRecordPoint] = useState(0);
    const {user, loading} = useFetchUser();
    const orderDetail = Cookies.get('orderDetailCk') ? JSON.parse(Cookies.get('orderDetailCk')) : {};
    const jwt = getTokenFromLocalCookie();  
    
    useEffect(() => {
        getRecordPoints();
        if(orderDetail.recipientsName !== "" )
            setFormDirection(true);

    }, [user])

    const handleSubmitOrderDetail = async (e) => {
        e.preventDefault();
        const responseData = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/order-details/${orderDetail.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({data : {
                totalPrice: !sinDelivery ? orderDetail.totalPrice >= 25 ? orderDetail.totalPrice : orderDetail.totalPrice + priceDelivery.data.attributes.parameterA : orderDetail.totalPrice,
                deliveryAddress: data.deliveryAddress,
                recipientsName: data.recipientsName,
            }}),
          },
          setAlert
        );

        if(responseData){
            orderDetail.totalPrice = !sinDelivery ? orderDetail.totalPrice >= 25 ? orderDetail.totalPrice : orderDetail.totalPrice + priceDelivery.data.attributes.parameterA : orderDetail.totalPrice;
            orderDetail.deliveryAddress = data.deliveryAddress;
            orderDetail.recipientsName = data.recipientsName;
            Cookies.set('orderDetailCk', JSON.stringify(orderDetail));
            setFormDirection(true);
            setSinDelivery(true);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmitBankReference = async (e) => {
        e.preventDefault();
        setRecordPoints();
        const responseData = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/transactions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({data : {
                bankReference: dataBankReference.BankReference,
                bank: dataBankReference.Bank,
                amountTransferred: dataBankReference.amountTransferred,
                amount: orderDetail.totalPrice,
                order: orderDetail.order.toString(),
            }}),
          },
          setAlert
        );

        if(Object.keys(responseData).length !== 0 && !(responseData?.error?.status === 400)){
            setSuccessfulPayment(true);
            setUpdateStatusOrder(orderDetail.order, 1);
            Cookies.remove('orderDetailCk');   
            emailSend(setAlert, {
                usuario : user,
                detalleDeLaOrden : orderDetail,
                infoPago : {referenciaBancaria : dataBankReference.BankReference,
                banco : dataBankReference.Bank,
                montoTransferido : dataBankReference.amountTransferred}
            });                  
        }
    };

    const handleChangeBankReference = (e) => {
        setDataBankReference({ ...dataBankReference, [e.target.name]: e.target.value });
    };

    const handleSubmitZelleReference = async zelleData => {
        try {
            if(zelleData){
                setRecordPoints();
                const responseData = await fetcher(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/transactions`,
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({data : {
                        zelleEmail: zelleData.email,
                        amountTransferred: zelleData.amountTransferred,
                        amount: orderDetail.totalPrice,
                        order: orderDetail.order.toString(),
                    }}),
                },
                setAlert
                );

                if(Object.keys(responseData).length !== 0 && !(responseData?.error?.status === 400)){
                    setSuccessfulPayment(true);
                    setUpdateStatusOrder(orderDetail.order, 1);
                    Cookies.remove('orderDetailCk'); 
                    emailSend(setAlert, {
                        usuario : user,
                        detalleDeLaOrden : orderDetail,
                        infoPago : {correoZelle : zelleData.email,
                                    montoTransferido: zelleData.amountTransferred}
                    });                    
                }
            }
    } catch (error) {
    console.error(error);
    }
    };

    const handleSubmitCashReference = async (e) => {
        e.preventDefault();
        setRecordPoints();
        const responseData = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/transactions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({data : {
                cash: true,
                amount: orderDetail.totalPrice,
                order: orderDetail.order.toString(),
            }}),
          },
          setAlert
        );

        if(Object.keys(responseData).length !== 0 && !(responseData?.error?.status === 400)){
            setSuccessfulPayment(true);
            setUpdateStatusOrder(orderDetail.order, 1);
            Cookies.remove('orderDetailCk'); 
            emailSend(setAlert,{
                usuario : user,
                detalleDeLaOrden : orderDetail,
                infoPago : {pagoEfectivo : "Si"}
            });                      
        }
    };

    const handleSubmitPayPointReference = async (e) => {
        e.preventDefault();
        if(availablePoints < orderDetail.totalPriceInPoints){
            setAlert({
                message : "Upss, tus Q'puntos son insuficientes :(",
                tipo    : 1
            })
            return;
        }

        setRecordPoints();

        const responseData = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/transactions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({data : {
                amountInPoints  : orderDetail.totalPriceInPoints,
                payPoints       : true,
                amount          : orderDetail.totalPrice,
                order           : orderDetail.order.toString(),
            }}),
          },
          setAlert
        );


        if(Object.keys(responseData).length !== 0 && !(responseData?.error?.status === 400)){
            setSuccessfulPayment(true);
            setUpdateStatusOrder(orderDetail.order, 2);
            Cookies.remove('orderDetailCk'); 
            emailSend(setAlert,{
                usuario : user,
                detalleDeLaOrden : orderDetail,
                infoPago : {Qpuntos : "Si"}
            });                   
        }
    };
   
    const setRecordPoints = async () => {

        let operationRecordPoints = {}
        if(availablePoints >= orderDetail.totalPriceInPoints){
            operationRecordPoints = {
                availablePoints  : (availablePoints - orderDetail.totalPriceInPoints) + orderDetail.pointsEarned,
                totalPointsSpent : totalPointsSpent + orderDetail.totalPriceInPoints,
            }
        }else if(availablePoints < orderDetail.totalPriceInPoints){
            operationRecordPoints = {
                availablePoints  : availablePoints + orderDetail.pointsEarned,
            }
        }

        const responseData = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/record-points/${idRecordPoint}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({data : operationRecordPoints}),
          },
          setAlert
        );
    };

    const getRecordPoints = async () => {
        const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/record-points?filters[username][$eqi]=${user}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
          },
          setAlert
        );

        if(responseData){
            setIdRecordPoint(responseData?.data[0]?.id)
            setAvailablePoints(responseData?.data[0]?.attributes?.availablePoints);
            setTotalPointsSpent(responseData?.data[0]?.attributes?.totalPointsSpent)
        }
    };

    const setUpdateStatusOrder = async (idOrder, status) =>{
        const responseData = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/${idOrder}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                    data : {  
                        order_status : status === 1 ? "Procesando pago" : "Pago confirmado",
                    },
                }),
            },
            setAlert
          )
    }

    return (
        <Layout 
            user={user}
            title="Checkout"
            shoppingCart={shoppingCart}
        >
            {Object.keys(alert).length !== 0 ?
                <Alerta
                    alert={alert}
                    setAlert={setAlert}
                />
                : ''
            }
            <main className="px-5 mt-10 mx-auto lg:w-9/12">                
                <h1 className="px-4 text-center lg:px-0 text-[#f5884d] block text-5xl lg:text-6xl my-5 uppercase font-extrabold">Checkout</h1>
                <MessagePrompt/>
                {
                    Object.keys(orderDetail).length !== 0 ?
                        <div>
                            <p className={`${Object.keys(orderDetail).length !== 0 ? 'hidden' : 'block'} text-center text-lg font-medium text-zinc-500`}>Completa los detalles para retirar tu pedido y confirma tu pago</p>               
                            <div className='grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-2 mt-4 mb-20'> 
                                <div className='col-span-3 border-solid border-[1px] border=[#cfcfcf] p-5'>
                                    {
                                        !formDirection ? 
                                            <div>
                                                <h2 className='text-2xl text-[#f5884d] font-semibold'>Información de retiro del pedido</h2>
                                                <form onSubmit={handleSubmitOrderDetail} className="mt-5">
                                                    <fieldset>
                                                        <div className="flex items-center mb-4">
                                                        <input id="country-option-1" onClick={()=>{setSinDelivery(true);
                                                            setData({
                                                                deliveryAddress: 'Retiro en tienda',
                                                                recipientsName: '',
                                                                })}} 
                                                        type="radio" name="countries" value="Retiro en tienda" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 " defaultChecked/>
                                                        <label htmlFor="country-option-1" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            Retiro en tienda
                                                        </label>
                                                        </div>

                                                        <div className="flex items-center mb-4">
                                                        <input id="country-option-2" onClick={()=>setSinDelivery(false)} type="radio" name="countries" value="Germany" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                                                        <label htmlFor="country-option-2" className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            Dirección personalizada
                                                        </label>
                                                        </div>
                                                    </fieldset>
                                                    <div className='p-5 mb-5 rounded-lg border-solid border-[1px] border=[#cfcfcf]'>
                                                        <p className={`${sinDelivery ? 'opacity-20' : ''} pb-5`}>{priceDelivery.data.attributes.name}: <span className=' font-medium'>$ {priceDelivery.data.attributes.parameterA}</span></p>                                                                                 
                                                        <div className="relative z-0 w-full mb-5 group">
                                                            <input  type="text"
                                                                    name="deliveryAddress"
                                                                    onChange={handleChange} 
                                                                    id="deliveryAddress"
                                                                    className={`${sinDelivery ? 'opacity-20' : ''} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer`} 
                                                                    placeholder="" 
                                                                    disabled={sinDelivery}
                                                                    required
                                                            />
                                                            <label htmlFor="text" className={`${sinDelivery ? 'opacity-20' : ''} peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#d3850f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Dirección</label>
                                                        </div>
                                                        <div className="relative z-0 w-full mb-5 group">
                                                            <input  type="text"
                                                                    name="recipientsName"
                                                                    onChange={handleChange} 
                                                                    id="recipientsName" 
                                                                    className={`${sinDelivery ? 'opacity-20' : ''} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#d3850f] peer`} 
                                                                    placeholder="" 
                                                                    disabled={sinDelivery} 
                                                                    required
                                                            />
                                                            <label htmlFor="text" className={`${sinDelivery ? 'opacity-20' : ''} peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#d3850f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Nombre de quien recibe</label>
                                                        </div>
                                                    </div>
                                                    <button type="submit" className={`bg-[#d3850f] hover:bg-[#943800] text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>Confirmar datos de envío</button>
                                                </form>    
                                            </div>                                  
                                        :formDirection ? 
                                            <div>
                                                <h2 className='text-2xl text-[#f5884d] font-semibold pb-6'>Metodos de pago disponibles</h2>
                                                {payMethods?.data?.map(payMethod => 
                                                    <div key={payMethod.id} className=' text-lg mb-2'>
                                                        <div className=' font-medium'>- {payMethod.attributes.name}</div>
                                                        <div className=' ml-4'>
                                                            <div className={`${payMethod.attributes?.bank ? 'block' : 'hidden'} text-base`}>{payMethod.attributes?.bank}</div>
                                                            <div className={`${payMethod.attributes?.IdentityDocument ? 'block' : 'hidden'} text-base`}>{payMethod.attributes?.IdentityDocument}</div>
                                                            <div className={`${payMethod.attributes?.phone ? 'block' : 'hidden'} text-base`}>{payMethod.attributes?.phone}</div>
                                                            <div className={`${payMethod.attributes?.accountNumber ? 'block' : 'hidden'} text-base`}>{payMethod.attributes?.accountNumber}</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div> : ''
                                    }
                                    <div className=' border-[1px] border-[#cfcfcf] mt-5 p-5 rounded-lg font-medium text-[#6c6c6c]'>
                                        <p>
                                            Tus Q&apos;puntos: <span className='font-semibold'>{availablePoints}</span>
                                        </p>
                                        <p>
                                            Q&apos;puntos a ganar: <span className='font-semibold text-green-700'>+{orderDetail.pointsEarned}</span>
                                        </p>
                                    </div> 
                                </div>
                                <div className='col-span-2 border-solid border-[1px] border=[#cfcfcf] p-5'>
                                    <div className=' bg-gray-50 rounded-md p-5'>
                                        <h3 className='border-[1px] p-3 border-solid border-[#8e8e8e] text-2xl font-semibold mb-10'>Resumen del pedido</h3>
                                        <h4 className='border-b-[1px] border-solid border-[#8e8e8e] text-lg font-medium flex justify-between mb-5'>
                                            Número del pedido <span className='text-xl font-semibold'>{orderDetail.order}</span>
                                        </h4>
                                        <div className='text-sm mb-5'>
                                            <span className='block text-base font-medium'>Productos:</span>{orderDetail.productsAndQuantity.split(',').map((product, index)=>{return (<p key={index} className=' mb-2 border-b-[1px] border-solid border-gray-300'>{product.split(':').map((productDescription, index)=>{return(<span key={index} className={`${index === 0 ? 'block' : index === 3 ? 'block text-right': 'inline-flex'}`}><span className=' ml-1'>{index === 1 ? 'Precio unitario: $' : index === 2 ? 'Cantidad:' : index === 3 ? 'SubTotal: $' : ''}</span><span className={`${index !== 0 ? 'ml-1 font-medium' : ''}`}>{productDescription}</span></span>)})}</p> )})}
                                        </div>
                                        {!sinDelivery && 
                                            <p className='text-sm mb-5 text-right'>
                                                <span className='block text-base font-medium text-left'>Delivery:</span>
                                                costo por envio: <span className=' font-medium'>$ {orderDetail.totalPrice >= 25 ? 0 : priceDelivery.data.attributes.parameterA}</span>
                                            </p>
                                        }
                                        <div className='border-b-[1px] border-solid border-[#8e8e8e] text-lg font-medium flex justify-between'>
                                            Total a pagar: <span className='text-xl font-semibold'>$ {!sinDelivery ? orderDetail.totalPrice >= 25 ? orderDetail.totalPrice : priceDelivery.data.attributes.parameterA + orderDetail.totalPrice : orderDetail.totalPrice}</span>
                                        </div>
                                        <div className='mb-5 text-right'><span className={`text-base font-semibold ${availablePoints >= orderDetail.totalPriceInPoints ? "text-green-700" : "text-red-600"}`}>Q&apos;puntos {orderDetail.totalPriceInPoints}</span></div>
                                        {formDirection ? 
                                            <div>
                                                <h3 className='border-b-[1px] border-solid border-[#8e8e8e] text-lg font-medium flex justify-between mb-5'>
                                                    Retiro del pedido
                                                </h3>
                                                <p className=' text-base font-medium mb-5'>Localización de entrega: <span className='text-sm font-normal'>{orderDetail.deliveryAddress}</span></p>
                                                <p className={`${orderDetail.recipientsName ? 'block' : ' hidden'} text-base font-medium mb-5`}>Recibe: <span className='text-sm font-normal'>{orderDetail.recipientsName}</span></p>
                                                <h3 className='border-b-[1px] border-solid border-[#8e8e8e] text-lg font-medium flex justify-between mb-5'>
                                                    Confirmación de pago
                                                </h3>
                                                <div className="flex items-center mb-4">
                                                    <input id="country-option-1" onClick={()=>{setBankReference(true);setZelleReference(false);setCashReference(false);setPayPointReference(false)}} type="radio" name="countries" value="pago movil" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="country-option-1" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        Pago movíl
                                                    </label>
                                                </div>
                                                {bankReference ? 
                                                    <form onSubmit={handleSubmitBankReference} className="mt-5 ">
                                                        <div className="relative z-0 w-full mb-5 group ">
                                                            <input  type="text"
                                                                    name="Bank"
                                                                    onChange={handleChangeBankReference} 
                                                                    id="Bank"
                                                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#d3850f] peer`} 
                                                                    placeholder="" 
                                                                    required
                                                            />
                                                            <label htmlFor="Bank" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Nombre del banco</label>                           
                                                        </div>
                                                        <div className="relative z-0 w-full mb-5 group ">
                                                            <input  type="text"
                                                                    name="BankReference"
                                                                    onChange={handleChangeBankReference} 
                                                                    id="BankReference" 
                                                                    className={` block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#d3850f] peer`} 
                                                                    placeholder="" 
                                                                    required
                                                            />
                                                            <label htmlFor="BankReference" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#d3850f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Número de referencia bancaria</label>
                                                        </div>
                                                        <div className="relative z-0 w-full mb-5 group ">
                                                            <input  type="text"
                                                                    name="amountTransferred"
                                                                    onChange={handleChangeBankReference} 
                                                                    id="amountTransferred" 
                                                                    className={` block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#d3850f] peer`} 
                                                                    placeholder="" 
                                                                    required
                                                            />
                                                            <label htmlFor="amountTransferred" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#d3850f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Monto transferido</label>
                                                        </div>
                                                        <button type="submit" className={`bg-[#d3850f] hover:bg-[#943800] text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Confirmar pago</button>
                                                    </form>
                                                : ''}
                                                <div className="flex items-center my-4">
                                                    <input id="country-option-1" onClick={()=>{setZelleReference(true);setBankReference(false);setCashReference(false);setPayPointReference(false)}} type="radio" name="countries" value="zelle" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="country-option-1" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        Zelle
                                                    </label>
                                                </div>
                                                {zelleReference ? 
                                                    <form onSubmit={handleSubmit(handleSubmitZelleReference)}  className="mt-5 ">
                                                        <div className="relative z-0 w-full mb-5 group ">
                                                        <input  
                                                            type="text"
                                                            name="email"
                                                            {...register("email")}
                                                            id="email" 
                                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                                            placeholder=""                                                             
                                                        />
                                                            <label htmlFor="zelleEmail" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#d3850f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Correo del que envía</label>
                                                            {errors?.email?.message && <span className='text-[#721c24]'>{errors?.email?.message}</span>}
                                                        </div>
                                                        <div className="relative z-0 w-full mb-5 group ">
                                                            <input  
                                                                type="text"
                                                                name="amountTransferred"
                                                                id="amountTransferred" 
                                                                {...register("amountTransferred")}
                                                                className={` block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#d3850f] peer`} 
                                                                placeholder=""
                                                            />
                                                            <label htmlFor="amountTransferred" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#d3850f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Monto transferido</label>
                                                            {errors?.amountTransferred?.message && <span className='text-[#721c24]'>{errors?.amountTransferred?.message}</span>}
                                                        </div>
                                                        <button type="submit" className={`bg-[#d3850f] hover:bg-[#943800] text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Confirmar pago</button>
                                                    </form>
                                                : ''}
                                                <div className="flex items-center my-4">
                                                    <input id="country-option-1" onClick={()=>{setCashReference(true);setZelleReference(false);setBankReference(false);setPayPointReference(false)}} type="radio" name="countries" value="zelle" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="country-option-1" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        Efectivo
                                                    </label>
                                                </div>
                                                {cashReference ?
                                                    <form onSubmit={handleSubmitCashReference} className="flex items-center my-4">                                                   
                                                        <button type="submit" className={`bg-[#d3850f] hover:bg-[#943800] text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Confirmar pago</button>
                                                     </form>  
                                                : ''} 
                                                <div className="flex items-center my-4">
                                                    <input id="country-option-1" onClick={()=>{setPayPointReference(true);setCashReference(false);setZelleReference(false);setBankReference(false)}} type="radio" name="countries" value="zelle" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="country-option-1" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        Q&apos;puntos
                                                    </label>
                                                </div>
                                                {payPointReference ?
                                                    <form onSubmit={handleSubmitPayPointReference} className="flex items-center my-4">                                                   
                                                        <button type="submit" className={`bg-[#d3850f] hover:bg-[#943800] text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Confirmar pago</button>
                                                     </form>  
                                                : ''}                                           
                                            </div>: ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    : successfulPayment ? 
                        <SuccessfullPayment/> : 
                        <p className='mt-10 mb-[20rem] text-center text-lg font-medium'>Upss no tienes ningun pedido por <span className=' font-bold'>Confirmación de pago</span>, agrega productos al carrito.</p>
                }
            </main>
        </Layout>
    )
}

export async function getStaticProps(){
    const payMethods = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/paymethods`);
    const priceDelivery = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/config-parameters/2`);
    return{
        props:{
            payMethods:payMethods,
            priceDelivery:priceDelivery,
        }
    }
}
