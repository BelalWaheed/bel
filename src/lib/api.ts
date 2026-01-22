const API_URL = import.meta.env.VITE_URL;

interface FetchOptions extends RequestInit {
  body?: BodyInit | Record<string, unknown> | null;
}

async function fetchWithConfig<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // If body is an object, stringify it
  if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// ================================
// User API
// ================================
export const userApi = {
  getAll: () => fetchWithConfig<User[]>("/users"),
  
  getById: (id: string) => fetchWithConfig<User>(`/users/${id}`),
  
  create: (userData: Omit<User, "id">) =>
    fetchWithConfig<User>("/users", {
      method: "POST",
      body: userData as unknown as Record<string, unknown>,
    }),
  
  update: (id: string, userData: Partial<User>) =>
    fetchWithConfig<User>(`/users/${id}`, {
      method: "PUT",
      body: userData as unknown as Record<string, unknown>,
    }),
  
  delete: (id: string) =>
    fetchWithConfig<void>(`/users/${id}`, {
      method: "DELETE",
    }),
};

// ================================
// Product API
// ================================
export const productApi = {
  getAll: () => fetchWithConfig<Product[]>("/products"),
  
  getById: (id: string) => fetchWithConfig<Product>(`/products/${id}`),
  
  create: (productData: Omit<Product, "id">) =>
    fetchWithConfig<Product>("/products", {
      method: "POST",
      body: productData as unknown as Record<string, unknown>,
    }),
  
  update: (id: string, productData: Partial<Product>) =>
    fetchWithConfig<Product>(`/products/${id}`, {
      method: "PUT",
      body: productData as unknown as Record<string, unknown>,
    }),
  
  delete: (id: string) =>
    fetchWithConfig<void>(`/products/${id}`, {
      method: "DELETE",
    }),
};

// Types imported from types.ts
import type { User, Product } from "@/types";
