import axios from 'axios';

export default {
    login(user) {
        return axios.post(import.meta.env.VITE_BASE_URL + '/auth/login', user);
    },
    register(user) {
        return axios.post(import.meta.env.VITE_BASE_URL + '/auth/register', user);
    }
}