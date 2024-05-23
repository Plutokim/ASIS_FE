import { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import PaymentApi, { Payment } from "~/API/payment";
import { styled } from "goober";

const ProductsLIST = (): ReactElement => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const api = useMemo(() => new PaymentApi(), []);
  useEffect(() => {
    api.list().then((data) => setPayments(data));
  }, [api]);

  return (
    <Container>
      <H>Payments</H>
      <Table>
        <tr>
          <th>id</th>
          <th>UserId</th>
          <th>Token</th>
          <th>Number</th>
          <th>Expiry Date</th>
        </tr>

        {payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>{payment.user_id}</td>
            <td>{payment.card_token}</td>
            <td>{payment.card_number}</td>
            <td>{payment.expiry_date}</td>
          </tr>
        ))}
      </Table>

    </Container>
  );
};

const Container = styled("div")`
  background-color: lightgray;
  width: 100vw;
  height: 100vh;
`;

const H = styled("h1")`
  text-align: center;
`;

const Table = styled("table")`
margin: 0 auto;
 &, th, td {
  border-collapse: collapse;
  border: 1px solid black;
}
  &>tr>th {
    width: 200px;
  }

  & tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;


export default ProductsLIST;
