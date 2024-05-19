import Head from "next/head";
import { useRouter } from "next/router";
import PaymentEditScreen from "~/components/screens/PaymentEdit";
import ProductEditScreen from "~/components/screens/ProductEdit";

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      <ProductEditScreen id={id as string} />
    </>
  );
}
