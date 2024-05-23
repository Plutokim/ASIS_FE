import Head from "next/head";
import dynamic from 'next/dynamic'

const UsersListScreen = dynamic(() => import("~/components/screens/UsersLIST"), { ssr: false })

export default function Home() {

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <UsersListScreen />
    </>
  );
}
