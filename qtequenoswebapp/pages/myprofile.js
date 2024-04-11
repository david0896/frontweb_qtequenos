import { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "../components/pagination"
import Layout from "@/components/layout"
import Alerta from "@/components/alert";
import { useFetchUser } from '../lib/authContext';
import { fetcher } from '../lib/api';
import {getTokenFromLocalCookie} from '../lib/auth';
import { mydateFormat } from "@/lib/useful";
import Modal from "@/components/modal";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Myprofile = ({shoppingCart, alert, setAlert, priceDelivery, deleteOrderDB}) => {
    const orderDetailCk = Cookies.get('orderDetailCk') ? JSON.parse(Cookies.get('orderDetailCk')) : {};
    const router = useRouter();
    const { page } = router.query;

    const [listOrdes, setListOrdes] = useState({
      data : {},
      meta : {}
    });
    const [orderDetail, setOrderDetail] = useState({
      data : {},
      id : 0,
      dataPayMethod : {}
    });
    const [orderDetailChanged, setOrderDetailChanged] = useState(false);
    const [loadingListOrdes, setLoadingListOrdes] = useState(false);
    const [orderActuali, setOrderActuali]= useState(0);
    const [orderDetailActuali, setOrderDetailActuali]= useState(0);
    const [separatedProductsAndQuantity, setSeparatedProductsAndQuantity]= useState([]);
    const [ infoUser, setInfoUser ] = useState({});
    const [ showModal, setShowModal ] = useState(false);
    const [ availablePoints, setAvailablePoints ] = useState(0);
    const { user, loading } = useFetchUser();
    const jwt = getTokenFromLocalCookie(); 

    useEffect(() => {
      getInfoUser();
      getRecordPoints();
      getListOrders(page);
      setOrderActuali(orderDetailCk.order);
      setOrderDetailActuali(orderDetailCk.id);
  }, [user])

  useEffect(() => {
    setSeparatedProductsAndQuantity(String(orderDetail.data.productsAndQuantity).split(','));
    setOrderDetailChanged(true);
    console.log(orderDetail)
  }, [orderDetail])

  useEffect(() => {
    if(page !== undefined){
      getListOrders(page);
    }
  }, [page])

  useEffect(() => {
    setLoadingListOrdes(true);
  }, [listOrdes])

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

    const getInfoUser = async () => {
      const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
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
          setInfoUser(responseData)
      }
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
          setAvailablePoints(responseData?.data[0]?.attributes?.availablePoints);
      }
  };

  const getListOrders = async (page = 1)=>{
    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders?filters[user][$eqi]=${user}&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=10`,
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
          setListOrdes({
            data : responseData.data,
            meta : responseData.meta
          })
      }
  }

  const getOrderDetail = async (idOrder)=>{
    
    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/order-details?filters[order][$containsi]=${idOrder}`,
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
          setOrderDetail({
              data: responseData.data[0].attributes,
              id: responseData.data[0].id,
              dataPayMethod: {}
            }
          )
          getPayMethod(idOrder);
      }
  }

  const getPayMethod = async (idOrder) => {
    const responseData = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/transactions?filters[order][$eqi]=${idOrder}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
      setAlert
    );

    if(Object.keys(responseData).length > 0){
      setOrderDetail(prevState => ({
        ...prevState,
        dataPayMethod: Object.keys(responseData.data).length > 0 ? responseData.data[0].attributes : {},
      }));

      return;
    }
};

  const deleteOrderOrderDatail = ()=>{
    deleteOrderDB(orderActuali, orderDetailActuali);
  }

  return (
    <Layout
        user={user}      
        title={'Mi perfil'}
        description={'Accede a tu historial de compras'} 
        shoppingCart={shoppingCart}
    >
      {Object.keys(alert).length !== 0 ?
          <Alerta
              alert={alert}
              setAlert={setAlert}
          />
          : ''
      }
      <div className="px-4 mt-10 mb-[6rem] mx-auto lg:w-9/12 space-y-[0.5rem]">
        <div className=" grid grid-cols-1 lg:grid-cols-5 lg:gap-2">
          <div className="mb-2 lg:mb-0 col-span-2 border-[1px] border-[#cfcfcf] p-5 rounded-lg">
            <div className="border-[1px] border-[#cfcfcf] rounded-md p-3 flex justify-between">
              <h1 className="text-lg font-semibold">Mis datos</h1>
              <span className="text-[#d3850f] font-medium text-lg">Q&apos;puntos: {availablePoints}</span>
            </div>
            <form onSubmit={handleSubmit} className="mt-5 pb-4 lg:pb-0 pt-4 lg:pt-2 max-h-full overflow-y-auto">
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input  type="text"
                                name="name"
                                id="name" 
                                value={infoUser.name || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                placeholder="" 
                                disabled
                        />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                        {/* {errors.name?.message && <span className='text-[#721c24]'>{errors.name?.message}</span>} */}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input  type="text"
                                name="lastname"
                                id="lastname" 
                                value={infoUser.lastname || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                placeholder="" 
                                disabled                                 
                        />
                        <label htmlFor="lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido</label>
                        {/* {errors.lastname?.message && <span className='text-[#721c24]'>{errors.lastname?.message}</span>} */}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input  type="text"
                                name="document"
                                id="document" 
                                value={infoUser.document || ""}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                placeholder=""
                                disabled 
                        />
                        <label htmlFor="document" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cedula/rif</label>
                        {/* {errors.document?.message && <span className='text-[#721c24]'>{errors.document?.message}</span>} */}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input  type="text"
                              name="phone"
                              id="phone" 
                              value={infoUser.phone || ""}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                              placeholder="" 
                              minLength="11"
                              maxLength="11"
                              disabled
                      />
                      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefono</label>
                      {/* {errors.phone?.message && <span className='text-[#721c24]'>{errors.phone?.message}</span>} */}
                    </div>
                </div> 
                <div className="relative z-0 w-full mb-5 group">
                    <input  type="text"
                            name="email"
                            id="email" 
                            value={infoUser.email || ""}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                            placeholder=""
                            disabled
                    />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo</label>
                    {/* {errors.email?.message && <span className='text-[#721c24]'>{errors.email?.message}</span>} */}
                </div>
                <button type="submit" className="hidden text-white bg-[#d3850f] hover:bg-[#943800] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Editar</button>
            </form>
          </div>
          <div className=" col-span-3 border-[1px] border-[#cfcfcf] p-5 rounded-lg">
            <div>
              {Object.keys(orderDetailCk).length !== 0 ?
                <div>
                  <h2 className="text-lg font-semibold border-[1px] border-[#cfcfcf] rounded-md p-3 flex justify-between">
                    Confirmar pago
                    <span className="text-[#d3850f] font-medium text-lg">Pedido #{orderDetailCk.order}</span>
                  </h2>
                  <div className="flex flex-col h-[15rem]">
                    <div className="mt-6 max-h-24 overflow-hidden overflow-y-scroll scr">
                      {orderDetailCk.productsAndQuantity.split(',').map((product, index)=>{return (<p key={index} className=' mb-2 border-b-[1px] border-solid border-gray-300'>{product.split(':').map((productDescription, index)=>{return(<span key={index} className={`${index === 0 ? 'block' : index === 3 ? 'block text-right': 'inline-flex'}`}><span className=' ml-1'>{index === 1 ? 'Precio unitario: $' : index === 2 ? 'Cantidad:' : index === 3 ? 'Precio: $' : ''}</span><span className={`${index !== 0 ? 'ml-1 font-medium' : ''}`}>{productDescription}</span></span>)})}</p> )})}
                      {<p className=" text-right font-normal mt-2"> Subtotal: <span className="font-semibold">$ {orderDetailCk.totalPrice < 25 ? orderDetailCk.recipientsName !== "" ? (orderDetailCk.totalPrice - priceDelivery) : orderDetailCk.totalPrice : orderDetailCk.totalPrice}</span></p>}
                      {orderDetailCk.totalPrice < 25 ? orderDetailCk.recipientsName !== "" ? <p className=" flex justify-between mt-2">Delivery: <span>$ {priceDelivery}</span></p> : '' : ''}
                    </div>
                    <div className="mt-auto">
                      <div className="flex justify-between w-full my-2 ">
                        <Link href="/store/checkout" className="text-green-700 font-semibold hover:text-green-900">Confirmar pago</Link>
                        <Link href="#" onClick={()=>deleteOrderOrderDatail()} className="text-[#b2323f] font-semibold hover:text-[#6a2e34]">Cancelar pedido</Link>
                      </div>
                      <div className="border-[1px] border-[#cfcfcf] rounded-md p-3 flex justify-between">
                        <p>
                          Q&apos;puntos a ganar:
                          <span className=" font-semibold"> {orderDetailCk.pointsEarned}</span>
                        </p>
                        <p className="text-right lg:text-left">Total a pagar: 
                          <span className=" font-semibold"> ${orderDetailCk.totalPrice}</span>
                          <span className=" font-semibold block text-right text-sm">Q&apos;puntos {orderDetailCk.totalPriceInPoints}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                : <div>
                    <h2>No tienes ningun pedido pendiente por confirmación de pago</h2>
                  </div>
              }
            </div>
          </div>
        </div>
        <div className=" border-[1px] border-[#cfcfcf] rounded-md p-3">        
          <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Código de pedido
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Estatus
                          </th>
                          <th scope="col" className="px-6 py-3 hidden lg:block">
                              Fecha
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Acciones
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    { 
                      user &&
                      Object.keys(listOrdes.data).length > 0 ?
                        
                        listOrdes.data.map((data)=>{return(
                            <tr key={data.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                  {data.id}
                                </th>
                                <td className="px-6 py-4">
                                  {data.attributes.order_status}
                                </td>
                                <td className="px-6 py-4 hidden lg:block">
                                  {mydateFormat(data.attributes.createdAt)}
                                </td>
                                <td className="px-6 py-4">
                                  <a href="#" onClick={()=>{getOrderDetail(data.id);setShowModal(true)}} className="font-medium text-blue-600  hover:underline">Ver más</a>
                                </td>                              
                            </tr>                          
                        )}) : Object.keys(listOrdes.data).length === 0 && !loadingListOrdes ? <tr><th>Cargando datos...</th><th>Cargando datos...</th><th>Cargando datos...</th><th>Cargando datos...</th></tr> : <tr><th></th><th></th><th></th><th></th></tr>
                    }
                  </tbody>
              </table>
              {
                Object.keys(listOrdes.data).length !== 0 ?
                  user &&
                    <Pagination
                      pagination={listOrdes.meta.pagination}
                    />
                : ""
              }
          </div>
        </div>
      </div>
      <Modal 
        isVisible={showModal}
        onClose={()=>setShowModal(false)}
      >
        {Object.keys(orderDetail.data).length > 0 &&
          <div>
            <h1 className="text-lg font-semibold mb-3">Detalles del pedido nº {orderDetail.data.order}</h1>
            <div className="flex flex-col h-[90%] space-y-5">
              <div className="mt-6 overflow-hidden overflow-y-scroll p-3">
                <div className="flex justify-between py-4 border-b-[1px] mb-4 border-[#cfcfcf]">
                  <h3 className=" ml-1 font-medium">Metodo de pago</h3>
                 {orderDetailChanged &&
                    <span>{`${Object.keys(orderDetail.dataPayMethod).length <= 0 ? 'Por confirmar' : orderDetail.dataPayMethod.bank !== null  ? 'Pago móvil' : orderDetail.dataPayMethod.cash !== false ? 'Efectivo': orderDetail.dataPayMethod.zelleEmail !== null ? 'Zelle' : orderDetail.dataPayMethod.payPoints !== false ? 'Q`puntos': 'Por confirmar'}`}</span>
                  }
                </div>
                {String(orderDetail.data.productsAndQuantity).split(',').map((product, index)=>{return (<p key={index} className='mb-2'>{product.split(':').map((productDescription, index)=>{return(<span key={index} className={`${index === 3 ? 'text-right': ''} block`}><span className=' ml-1'>{index === 1 ? 'Precio unitario: $' : index === 2 ? 'Cantidad:' : index === 3 ? 'Precio: $' : ''}</span><span className={`${index !== 0 ? 'ml-1 font-medium' : ''}`}>{productDescription}</span></span>)})}</p> )})}      
                {<p className=" text-right font-normal mt-2"> Subtotal: <span className="font-semibold">$ {orderDetail.data.totalPrice < 25 ? orderDetail.data.recipientsName !== "" ? (orderDetail.data.totalPrice - priceDelivery) : orderDetail.data.totalPrice : orderDetail.data.totalPrice}</span></p>}
                {orderDetail.data.totalPrice < 25 ? orderDetail.data.recipientsName !== "" ? <p className=" flex justify-between mt-2">Delivery: <span>$ {priceDelivery}</span></p> : '' : ''}
              </div>
              <div className="mt-auto">
                <div className="border-[1px] border-[#cfcfcf] rounded-md p-3 flex justify-end">
                  <p className="text-right lg:text-left">Total: 
                    <span className=" font-semibold"> ${orderDetail.data.totalPrice}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      </Modal>        
    </Layout>
  )
}

export default Myprofile


export async function getStaticProps(){
  const priceDelivery = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/config-parameters/2`);
  return{
      props:{
          priceDelivery:priceDelivery.data.attributes.parameterA,
      }
  }
}