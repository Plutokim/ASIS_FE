import Head from "next/head";
import dynamic from 'next/dynamic'
 
const PaymentsListScreen = dynamic(() => import("~/components/screens/PaymentsLIST"), { ssr: false })

export default function Home() {

  return (
    <>
      <Head>
        <title>Paymnets</title>
      </Head>
      <PaymentsListScreen />
    </>
  );
}
