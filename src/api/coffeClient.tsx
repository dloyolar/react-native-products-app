import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://coffe-rn-node.herokuapp.com/api';

const coffeClient = axios.create({
  baseURL,
});

coffeClient.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers!['x-token'] = token;
  }
  return config;
});

export default coffeClient;
