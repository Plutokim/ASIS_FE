import { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { styled } from "goober";
import { useRouter } from "next/router";
import PaymentApi, { Payment } from "~/API/payment";
import { PaymentForm } from "../business/payment/form";

const PaymentsScreen = (): ReactElement => {
  const router = useRouter();
  const [products, setProducts] = useState<Payment[]>([]);
  const api = useMemo(() => new PaymentApi(), []);
  useEffect(() => {
    api.list().then((data) => setProducts(data));
  }, [api]);

  const handleReload = async (): Promise<void> => {
    const data = await api.list();
    setProducts(data);
  };

  const remove = async (id: string): Promise<void> => {
    await api.delete(id);
    await handleReload();
  };
  return (
    <div>
      {products.map((payment) => (
        <Container key={payment.id}>
          <Text>Id:{payment.id}</Text>
          <Text>UserId: {payment.user_id}</Text>
          <Text>Token: {payment.card_token}</Text>
          <Text>Number: {payment.card_number}</Text>
          <Text>Expiry Date: {payment.expiry_date}</Text>
          <Wrapper>
            <Remove onClick={async () => await remove(payment.user_id)}>
              Remove
            </Remove>
            <Edit onClick={() => router.push("/payment/" + payment.user_id)}>
              Edit
            </Edit>
          </Wrapper>
          <Separator />
        </Container>
      ))}
      <PaymentForm onSubmit={handleReload} />
    </div>
  );
};

const Remove = styled("button")`
  background-color: red;
  border: none;
  border-radius: 18px;
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Edit = styled("button")`
  background-color: blue;
  border: none;
  border-radius: 18px;
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Wrapper = styled("div")`
  display: flex;
  gap: 20px;
`;

const Text = styled("p")`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  color: #000;
  margin: 0;
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const Separator = styled("div")`
  width: 100%;
  height: 1px;
  background-color: #000;
`;

export default PaymentsScreen;
