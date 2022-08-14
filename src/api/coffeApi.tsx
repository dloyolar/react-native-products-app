import coffeClient from './coffeClient';
import {LoginData, LoginResponse} from '../interfaces/appInterfaces';

const coffeApi = {
  auth: {
    login: (params: LoginData) => {
      return coffeClient.post<LoginResponse>('/auth/login', params);
    },
    checkToken: () => {
      return coffeClient.get<LoginResponse>('/auth');
    },
  },
};

export default coffeApi;
