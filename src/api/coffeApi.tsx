import coffeClient from './coffeClient';
import {
  CategoriesResponse,
  LoginData,
  LoginResponse,
  ProductData,
  Producto,
  ProductsResponse,
  RegisterData,
} from '../interfaces/appInterfaces';

const coffeApi = {
  auth: {
    login: (params: LoginData) => {
      return coffeClient.post<LoginResponse>('/auth/login', params);
    },
    checkToken: () => {
      return coffeClient.get<LoginResponse>('/auth');
    },
    signup: (params: RegisterData) => {
      return coffeClient.post<LoginResponse>('/usuarios', params);
    },
  },
  products: () => {
    return coffeClient.get<ProductsResponse>('/productos');
  },
  addProduct: (params: ProductData) => {
    return coffeClient.post<Producto>('/productos', params);
  },
  updateProduct: (
    id: string,
    params: {nombre: string; categoria: string; img?: string},
  ) => {
    return coffeClient.put<Producto>(`/productos/${id}`, params);
  },
  productById: (id: string) => {
    return coffeClient.get<Producto>(`/productos/${id}`);
  },
  categories: () => {
    return coffeClient.get<CategoriesResponse>('/categorias');
  },
};

export default coffeApi;
