import axios from 'axios';

export default {
    login(user) {
        return axios.post(process.env.VUE_APP_BASE_URL + '/auth/login', user);
    },
    register(user) {
        return axios.post(process.env.VUE_APP_BASE_URL + '/register', user);
    },
    logout() {
        return axios.get(process.env.VUE_APP_BASE_URL + '/logout');
    }
}