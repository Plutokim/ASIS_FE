import { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import UserApi, { User } from "~/API/user";
import { UserForm } from "../business/users/form";
import { useRouter } from "next/router";

const UsersEditScreen = ({ id }: { id: string }): ReactElement => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const api = useMemo(() => new UserApi(), []);
  useEffect(() => {
    id && api.read(id).then((data) => setUser(data));
  }, [api, id]);

  const handleSubmit = async (): Promise<void> => {
    await router.push("/user-list");
  };

  return (
    <div>
      {user && <UserForm onSubmit={handleSubmit} user={user} type="edit" />}
    </div>
  );
};

export default UsersEditScreen;
