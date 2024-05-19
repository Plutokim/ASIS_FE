import { styled } from "goober";
import { ReactElement, useMemo, useState } from "react";
import UserApi from "~/API/user";

const defaultUser = {
  full_name: "",
  phone_number: "",
  email: "",
  password: "",
};

type Props = {
  onSubmit: () => Promise<void>;
  type?: "create" | "edit";
  user?: Record<string, string>;
};

export const UserForm = ({
  onSubmit,
  type = "create",
  user = defaultUser,
}: Props): ReactElement => {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [fullName, setFullName] = useState(user.full_name);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const api = useMemo(() => new UserApi(), []);
  const handleSubmit = async (): Promise<void> => {
    if (type === "edit") {
      await api.update(user.id, fullName, phoneNumber, email, password);
    } else {
      await api.create(fullName, phoneNumber, email, password);
    }
    await onSubmit();
  };
  return (
    <div>
      <Header>{type === "create" ? "Create" : "Edit"} user</Header>
      <Form>
        <FormItem>
          <Label>Full Name</Label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>Phone Number</Label>
          <Input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>Password</Label>
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
