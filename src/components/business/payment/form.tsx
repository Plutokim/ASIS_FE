import { styled } from "goober";
import { ReactElement, useMemo, useState } from "react";
import PaymentApi from "~/API/payment";

const defaultPayment = {
  user_id: "",
  card_token: "",
  card_number: "",
  expiry_date: "",
};

type Props = {
  onSubmit: () => Promise<void>;
  type?: "create" | "edit";
  payment?: Record<string, string>;
};

export const PaymentForm = ({
  onSubmit,
  type = "create",
  payment = defaultPayment,
}: Props): ReactElement => {
  const [userId, setUserId] = useState(payment.user_id);
  const [token, setToken] = useState(payment.card_token);
  const [number, setNumber] = useState(payment.card_number);
  const [date, setDate] = useState(payment.expiry_date);
  const api = useMemo(() => new PaymentApi(), []);
  const handleSubmit = async (): Promise<void> => {
    if (type === "edit") {
      await api.update(userId, token, number, date);
    } else {
      await api.create(userId, token, number, date);
    }
    await onSubmit();
  };
  return (
    <div>
      <Header>{type === "create" ? "Create" : "Edit"} Payment</Header>
      <Form>
        {type === "create" ? (
          <FormItem>
            <Label>User ID</Label>
            <Input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </FormItem>
        ) : (
          <div>
            <Label>User ID: {userId}</Label>
          </div>
        )}

        <FormItem>
          <Label>Token</Label>
          <Input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>Number</Label>
          <Input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>Exp date</Label>
          <Input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
