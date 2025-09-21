// frontend/src/app/lib/types.ts

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  stock: number;
  category: string;
  createdAt: string; // Date được serialize thành string khi trả JSON
  updatedAt: string;
}


export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
