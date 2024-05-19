import { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { styled } from "goober";
import { useRouter } from "next/router";
import PaymentApi, { Payment } from "~/API/payment";
import { PaymentForm } from "../business/payment/form";
import { ProductForm } from "../business/product/form";
import ProductApi, { Product } from "~/API/product";

const ProductsScreen = (): ReactElement => {
  const router = useRouter();
  const [payments, setPayments] = useState<Product[]>([]);
  const api = useMemo(() => new ProductApi(), []);
  useEffect(() => {
    api.list().then((data) => setPayments(data));
  }, [api]);

  const handleReload = async (): Promise<void> => {
    const data = await api.list();
    setPayments(data);
  };

  const remove = async (id: string): Promise<void> => {
    await api.delete(id);
    await handleReload();
  };
  return (
    <div>
      {payments.map((product) => (
        <Container key={product.id}>
          <Text>Id:{product.id}</Text>
          <Text>Name: {product.name}</Text>
          <Text>Price: {product.price}</Text>
          <Text>Description: {product.description}</Text>
          <Text>Image folder url: {product.image_folder_url}</Text>
          <Text>Quantity: {product.available_quantity}</Text>
          <Wrapper>
            <Remove onClick={async () => await remove(product.id)}>
              Remove
            </Remove>
            <Edit onClick={() => router.push("/product/" + product.id)}>
              Edit
            </Edit>
          </Wrapper>
          <Separator />
        </Container>
      ))}
      <ProductForm onSubmit={handleReload} />
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

export default ProductsScreen;
