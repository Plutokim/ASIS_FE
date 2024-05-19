import { SuccessResponseType } from "./types";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_folder_url: string;
  available_quantity: number;
};

class ProductApi {
  private baseUrl = "http://localhost:8080/api/product";
  constructor() {}

  async list(): Promise<Product[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      console.error("Failed to fetch products");
      return [];
    }
    return await response
      .json()
      .then((body: SuccessResponseType<Product[]>) => body.data);
  }

  async create(
    name: string,
    price: number,
    description: string,
    image_folder_url: string,
    available_quantity: number
  ): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        description,
        image_folder_url,
        available_quantity,
      }),
    });
    if (!response.ok) {
      console.error("Failed to create product");
    }
  }

  async read(id: string): Promise<Product | null> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      console.error("Failed to fetch product");
      return null;
    }
    return await response
      .json()
      .then((body: SuccessResponseType<Product>) => body.data);
  }

  async update(
    id: string,
    name: string,
    price: number,
    description: string,
    image_folder_url: string,
    available_quantity: number
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        price,
        description,
        image_folder_url,
        available_quantity,
      }),
    });
    if (!response.ok) {
      console.error("Failed to update product");
    }
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Failed to delete product");
    }
  }
}

export default ProductApi;
