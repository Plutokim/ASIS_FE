import { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import UserApi, { User } from "~/API/user";
import { styled } from "goober";

const UsersListScreen = (): ReactElement => {
  const [users, setUsers] = useState<User[]>([]);
  const api = useMemo(() => new UserApi(), []);
  useEffect(() => {
    api.list().then((data) => setUsers(data));
  }, [api]);

  return (
    <Container>
      <H>Users</H>
      <Table>
        <tr>
          <th>id</th>
          <th>Full Name</th>
          <th>Phone Number</th>
          <th>Email</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.full_name}</td>
            <td>{user.phone_number}</td>
            <td>{user.email}</td>
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


export default UsersListScreen;
