import { styled } from "goober";
import { ReactElement, useMemo, useState } from "react";
import ProductApi from "~/API/product";

const defaultProduct = {
  name: "",
  price: "0",
  description: "",
  image_folder_url: "",
  available_quantity: "0",
};

type Props = {
  onSubmit: () => Promise<void>;
  type?: "create" | "edit";
  product?: Record<string, string>;
};

export const ProductForm = ({
  onSubmit,
  type = "create",
  product = defaultProduct,
}: Props): ReactElement => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [foldet, setFolder] = useState(product.image_folder_url);
  const [quantity, setQuantity] = useState(product.available_quantity);
  const api = useMemo(() => new ProductApi(), []);
  const handleSubmit = async (): Promise<void> => {
    if (type === "edit") {
      await api.update(
        product.id,
        name,
        +price,
        description,
        foldet,
        +quantity
      );
    } else {
      await api.create(name, +price, description, foldet, +quantity);
    }
    await onSubmit();
  };
  return (
    <div>
      <Header>{type === "create" ? "Create" : "Edit"} Product</Header>
      <Form>
        <FormItem>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>Price</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>Folder url</Label>
          <Input
            type="text"
            value={foldet}
            onChange={(e) => setFolder(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>Quantity</Label>
          <Input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </FormItem>
        <Submit onClick={handleSubmit}>Create</Submit>
      </Form>
    </div>
  );
};

const Form = styled("div")`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormItem = styled("div")`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 300px;
`;

const Input = styled("input")`
  background: white;
  border: 0.5px solid #949191;
  border-radius: 5px;
`;

const Label = styled("label")`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  color: #000;
  margin: 0;
`;

const Submit = styled("button")`
  background-color: #f39712;
  border: none;
  border-radius: 18px;
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Header = styled("h1")`
  text-align: center;
`;
