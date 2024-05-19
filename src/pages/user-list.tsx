import Head from "next/head";
import UsersScreen from "~/components/screens/Users";

export default function Home() {

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <UsersScreen />
    </>
  );
}
