import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-b8b1b.firebaseio.com/'
});

export default instance;