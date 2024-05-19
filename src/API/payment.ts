import { SuccessResponseType } from "./types";

export type Payment = {
  id: string;
  user_id: string;
  card_token: string;
  card_number: string;
  expiry_date: string;
};

class PaymentApi {
  private baseUrl = "http://localhost:8080/api";
  constructor() {}

  async list(): Promise<Payment[]> {
    const response = await fetch(this.baseUrl + "/payment");
    if (!response.ok) {
      console.error("Failed to fetch products");
      return [];
    }
    return await response
      .json()
      .then((body: SuccessResponseType<Payment[]>) => body.data);
  }

  async create(
    user_id: string,
    card_token: string,
    card_number: string,
    expiry_date: string
  ): Promise<void> {
    const response = await fetch(
      this.baseUrl + "/user/" + user_id + "/payment",
      {
        method: "POST",
        body: JSON.stringify({ card_token, card_number, expiry_date }),
      }
    );
    if (!response.ok) {
      console.error("Failed to create product");
    }
  }

  async read(user_id: string): Promise<Payment | null> {
    const response = await fetch(this.baseUrl + "/user/" + user_id + "/payment");
    if (!response.ok) {
      console.error("Failed to fetch product");
      return null;
    }
    return await response
      .json()
      .then((body: SuccessResponseType<Payment>) => body.data);
  }

  async update(
    user_id: string,
    card_token: string,
    card_number: string,
    expiry_date: string
  ): Promise<void> {
    const response = await fetch(
      this.baseUrl + "/user/" + user_id + "/payment",
      {
        method: "PUT",
        body: JSON.stringify({ card_token, card_number, expiry_date }),
      }
    );
    if (!response.ok) {
      console.error("Failed to update product");
    }
  }

  async delete(user_id: string): Promise<void> {
    const response = await fetch(
      this.baseUrl + "/user/" + user_id + "/payment",
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      console.error("Failed to delete product");
    }
  }
}

export default PaymentApi;
