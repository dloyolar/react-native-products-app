import axios from 'axios';

const baseURL = 'https://coffe-rn-node.herokuapp.com/api';

const coffeClient = axios.create({
  baseURL,
});

export default coffeClient;
