import Head from "next/head";
import ProductsScreen from "~/components/screens/Products";
import UsersScreen from "~/components/screens/Users";

export default function Home() {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <ProductsScreen />
    </>
  );
}
