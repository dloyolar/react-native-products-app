import coffeClient from './coffeClient';
import {
  CategoriesResponse,
  LoginData,
  LoginResponse,
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
  categories: () => {
    return coffeClient.get<CategoriesResponse>('/categorias');
  },
};

export default coffeApi;
