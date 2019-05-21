import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-2867c.firebaseio.com/',
  timeout: 3000
});

export default instance;
