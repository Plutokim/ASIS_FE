import { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import UserApi, { User } from "~/API/user";
import { useRouter } from "next/router";
import { PaymentForm } from "../business/payment/form";
import PaymentApi, { Payment } from "~/API/payment";
import ProductApi, { Product } from "~/API/product";
import { ProductForm } from "../business/product/form";

const ProductEditScreen = ({ id }: { id: string }): ReactElement => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const api = useMemo(() => new ProductApi(), []);
  useEffect(() => {
    id && api.read(id).then((data) => setProduct(data));
  }, [api, id]);

  const handleSubmit = async (): Promise<void> => {
    await router.push("/product-list");
  };

  return (
    <div>
      {product && (
        <ProductForm
          onSubmit={handleSubmit}
          product={{
            id: product.id,
            name: product.name,
            price: product.price + "",
            description: product.description,
            image_folder_url: product.image_folder_url,
            available_quantity: product.available_quantity + "",
          }}
          type="edit"
        />
      )}
    </div>
  );
};

export default ProductEditScreen;
