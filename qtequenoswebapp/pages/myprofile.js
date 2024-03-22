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

const Myprofile = ({shoppingCart, alert, setAlert}) => {
    const orderDetailCk = Cookies.get('orderDetailCk') ? JSON.parse(Cookies.get('orderDetailCk')) : {};
    const router = useRouter();
    const { page } = router.query;

    const [ listOrdes, setListOrdes ] = useState({
      data : {},
      meta : {}
    });
    const [ orderDetail, setOrderDetail ] = useState({
      data : {},
      id : 0
    });
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
  }, [orderDetail])

  useEffect(() => {
    if(page !== undefined){
      getListOrders(page);
    }
  }, [page])

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
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders?filters[user][$eqi]=${user}&populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=10`,
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
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/order-details/${idOrder}`,
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
              data: responseData.data.attributes,
              id: responseData.data.id
            }
          )
      }
  }

  const deleteOrderDB = async (idOrder)=>{

    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/${idOrder}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        },
        setAlert
      );

      if(Object.keys(responseData).length !== 0 ){
          deleteOrderDetailDb(orderDetailActuali);
      }
  }
  
  const deleteOrderDetailDb = async (idOrderDetail)=>{

    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/order-details/${idOrderDetail}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        },
        setAlert
      );
      if(Object.keys(responseData).length !== 0 ){
          setAlert({
              message: 'Pedido cancelado satisfactoriamente',
              tipo: 2
          })
          Cookies.remove('orderDetailCk');
          router.reload();
      }
  }

  const deleteOrderOrderDatail = ()=>{
    deleteOrderDB(orderActuali);
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
                    <div className="mt-6">
                      {String(orderDetailCk.productsAndQuantity).split(',').map((producto, index)=>{
                            return (
                              <span key={index} className="block pb-1">
                                {producto}
                              </span>
                            )
                          })}
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
                        <p>Total a pagar: 
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
                            <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {data.id}
                                </th>
                                <td className="px-6 py-4">
                                  {data.attributes.order_statuses.data.map(data=>data.attributes.name)}
                                </td>
                                <td className="px-6 py-4 hidden lg:block">
                                  {mydateFormat(data.attributes.createdAt)}
                                </td>
                                <td className="px-6 py-4">
                                  <a href="#" onClick={()=>{getOrderDetail(data.id);setShowModal(true)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver más</a>
                                </td>                              
                            </tr>                          
                        )}) : <tr><th>Cargando datos...</th><th>Cargando datos...</th><th>Cargando datos...</th><th>Cargando datos...</th></tr>
                    }
                  </tbody>
              </table>
              {
                Object.keys(listOrdes.data).length !== 0 ?
                  user &&
                    <Pagination
                      pagination={listOrdes.meta.pagination}
                    />
                : <p>Cargando datos...</p>
              }
          </div>
        </div>
      </div>
      <Modal 
        isVisible={showModal}
        onClose={()=>setShowModal(false)}
      >
        <h1 className="text-lg font-semibold mb-3">Detalles del pedido nº {orderDetail.data.order}</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-[#d3850f]/10">
                <tr className="border-2 border-slate-700">
                    <th scope="col" className="px-6 py-3 border-r-2 border-slate-700 w-6/12">
                      Productos
                    </th>
                    <th scope="col" className="px-6 py-3 border-r-2 border-slate-700 w-3/12">
                      Precio Total
                    </th>
                    <th scope="col" className="px-6 py-3 w-3/12">
                      Fecha
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {
                        separatedProductsAndQuantity.map((producto, index)=>{
                          return (
                            <span key={index} className="block pb-1">
                              {producto}
                            </span>
                          )
                        })
                      }
                    </th>
                    <td className="px-6 py-4">
                      ${orderDetail.data.totalPrice}
                    </td>
                    <td className="px-6 py-4">
                      {
                        mydateFormat(orderDetail.data.createdAt)
                      }
                    </td>                            
                </tr>  
            </tbody>
        </table>
      </Modal>        
    </Layout>
  )
}

export default Myprofile
