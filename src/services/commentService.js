import axios from '../axiosInstance';

export default {
    findAll() {
        return axios.get(import.meta.env.VITE_BASE_URL + "/comment/all");
    },
    findAllByGuideId(id) {
        return axios.get(import.meta.env.VITE_BASE_URL + `/comment/guide/${id}`);
    },
    findById(id) {
        return axios.get(import.meta.env.VITE_BASE_URL + `/comment/${id}`);
    },
    create(comment) {
        return axios.post(import.meta.env.VITE_BASE_URL + "/comment/create", comment);
    },
    update(id, comment) {
        return axios.put(import.meta.env.VITE_BASE_URL + `/comment/${id}`, comment);
    },
    delete(id) {
        return axios.delete(import.meta.env.VITE_BASE_URL + `/comment/${id}`);
    }
}