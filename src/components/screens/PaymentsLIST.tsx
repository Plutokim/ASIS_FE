import { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import ProductApi, { Product } from "~/API/product";
import { styled } from "goober";

const PaymentsListScreen = (): ReactElement => {
  const [products, setProducts] = useState<Product[]>([]);
  const api = useMemo(() => new ProductApi(), []);
  useEffect(() => {
    api.list().then((data) => setProducts(data));
  }, [api]);

  return (
    <Container>
      <H>Products</H>
      <Table>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Image folder url</th>
          <th>Quantity</th>
        </tr>

        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.image_folder_url}</td>
            <td>{product.available_quantity}</td>
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


export default PaymentsListScreen;
