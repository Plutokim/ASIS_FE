import { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import UserApi, { User } from "~/API/user";
import { UserForm } from "../business/users/form";
import { styled } from "goober";
import { useRouter } from "next/router";

const UsersScreen = (): ReactElement => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const api = useMemo(() => new UserApi(), []);
  useEffect(() => {
    api.list().then((data) => setUsers(data));
  }, [api]);

  const handleReload = async (): Promise<void> => {
    const data = await api.list();
    setUsers(data);
  };

  const remove = async (id: string): Promise<void> => {
    await api.delete(id);
    await handleReload();
  };
  return (
    <div>
      {users.map((user) => (
        <Container key={user.id}>
          <Text>Id:{user.id}</Text>
          <Text>Fullname:{user.full_name}</Text>
          <Text>Phone number: {user.phone_number}</Text>
          <Text>Email: {user.email}</Text>
          <Wrapper>
            <Remove onClick={async () => await remove(user.id)}>Remove</Remove>
            <Edit onClick={() => router.push("/user/" + user.id)}>Edit</Edit>
          </Wrapper>
          <Separator />
        </Container>
      ))}
      <UserForm onSubmit={handleReload} />
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

export default UsersScreen;
