import Head from "next/head";
import { useRouter } from "next/router";
import PaymentEditScreen from "~/components/screens/PaymentEdit";

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      <PaymentEditScreen id={id as string} />
    </>
  );
}
