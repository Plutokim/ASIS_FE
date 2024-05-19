import { styled } from "goober";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <H>SELECT ENTITY</H>
      <Wrapper>
        <A onClick={() => router.push("/user-list")}>Users</A>
        <B onClick={() => router.push("/product-list")}>Products</B>
        <C onClick={() => router.push("/payment-list")}>Payments</C>
      </Wrapper>
    </>
  );
}

const H = styled("h1")`
    text-align: center;
`;

const Wrapper = styled("div")`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
`;
const A = styled("button")`
  background-color: blue;
  border: none;
  border-radius: 18px;
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  padding: 10px 20px;
  cursor: pointer;
`;

const B = styled("button")`
  background-color: black;
  border: none;
  border-radius: 18px;
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  padding: 10px 20px;
  cursor: pointer;
`;

const C = styled("button")`
  background-color: green;
  border: none;
  border-radius: 18px;
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  padding: 10px 20px;
  cursor: pointer;
`;
