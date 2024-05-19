import Head from "next/head";
import PaymentsScreen from "~/components/screens/Payments";

export default function Home() {
  return (
    <>
      <Head>
        <title>Payments</title>
      </Head>
      <PaymentsScreen />
    </>
  );
}
