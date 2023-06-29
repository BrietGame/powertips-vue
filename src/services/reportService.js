import axios from '../axiosInstance';

export default {
    findAll() {
        return axios.get(import.meta.env.VITE_BASE_URL + "/report/all");
    },
    findById(id) {
        return axios.get(import.meta.env.VITE_BASE_URL + `/report/${id}`);
    },
    create(report) {
        return axios.post(import.meta.env.VITE_BASE_URL + `/report/create`, report);
    }
}