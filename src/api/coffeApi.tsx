import coffeClient from './coffeClient';
import {LoginData, LoginResponse} from '../interfaces/appInterfaces';

const coffeApi = {
  auth: {
    login: (params: LoginData) => {
      return coffeClient.post<LoginResponse>('/auth/login', params);
    },
  },
};

export default coffeApi;
