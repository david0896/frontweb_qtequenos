import { useState } from "react"; 
import Image from "next/image";
import Layout from "@/components/layout";
import Link from "next/link";
import styles from '../styles/styles.module.css'


export default function Home() {

  return (
    <>
      <Layout
        title={'Inicio'}
        description={''}
      >
        <div>
          Nueva pagina web
        </div>
      </Layout>
    </>
  )
}