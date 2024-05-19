import { SuccessResponseType } from "./types";

export type User = {
  id: string;
  full_name: string;
  phone_number: string;
  password: string;
  email: string;
};

class UserApi {
  private baseUrl = "http://localhost:8080/api/user";
  constructor() {}

  async list(): Promise<User[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      console.error("Failed to fetch users");
      return [];
    }
    return await response
      .json()
      .then((body: SuccessResponseType<User[]>) => body.data);
  }

  async create(
    full_name: string,
    phone_number: string,
    email: string,
    password: string
  ): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      body: JSON.stringify({ full_name, phone_number, email, password }),
    });
    if (!response.ok) {
      console.error("Failed to create user");
    }
  }

  async read(id: string): Promise<User | null> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      console.error("Failed to fetch user");
      return null;
    }
    return await response
      .json()
      .then((body: SuccessResponseType<User>) => body.data);
  }

  async update(
    id: string,
    full_name: string,
    phone_number: string,
    email: string,
    password: string
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ full_name, phone_number, email, password }),
    });
    if (!response.ok) {
      console.error("Failed to update user");
    }
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Failed to delete user");
    }
  }
}

export default UserApi;
