export interface Post {
  owner: number;
  id: string;
  images: string[];
  description: string;
}

export interface ApiResponse<T> {
  status: string;
  payload?: T;
  error?: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}