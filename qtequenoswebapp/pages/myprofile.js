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
    getListOrders(page);
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
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders?filters[user][$eqi]=${user}&populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=25`,
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
          </div>
        </div>
      </div>             
    </Layout>
  )
}

export default Myprofile
