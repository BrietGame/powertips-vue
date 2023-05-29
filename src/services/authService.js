import axios from 'axios';

export default {
    login(user) {
        return axios.post('http://localhost:3001/auth/login', user);
    },
    register(user) {
        return axios.post('http://localhost:3001/auth/register', user);
    },
    logout() {
        return axios.get('http://localhost:3001/auth/logout');
    }
}