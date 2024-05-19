import { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import UserApi, { User } from "~/API/user";
import { useRouter } from "next/router";
import { PaymentForm } from "../business/payment/form";
import PaymentApi, { Payment } from "~/API/payment";

const PaymentEditScreen = ({ id }: { id: string }): ReactElement => {
  const router = useRouter();
  const [payment, setSetpayment] = useState<Payment | null>(null);
  const api = useMemo(() => new PaymentApi(), []);
  useEffect(() => {
    id && api.read(id).then((data) => setSetpayment(data));
  }, [api, id]);

  const handleSubmit = async (): Promise<void> => {
    await router.push("/payment-list");
  };

  return (
    <div>
      {payment && (
        <PaymentForm onSubmit={handleSubmit} payment={payment} type="edit" />
      )}
    </div>
  );
};

export default PaymentEditScreen;
