import Head from "next/head";
import { useRouter } from "next/router";
import UsersEditScreen from "~/components/screens/UserEdit";

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <UsersEditScreen id={id as string} />
    </>
  );
}
