import Head from "next/head";
import dynamic from 'next/dynamic'
 
const ProductsLIST = dynamic(() => import("~/components/screens/ProductsLIST"), { ssr: false })

export default function Home() {

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductsLIST />
    </>
  );
}
