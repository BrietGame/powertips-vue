import axios from "axios";

export default {
    findAll() {
        return axios.get(import.meta.env.VITE_BASE_URL + "/category/all");
    },
    findById(id) {
        return axios.get(import.meta.env.VITE_BASE_URL + `/category/${id}`);
    },
    create(category) {
        return axios.post(import.meta.env.VITE_BASE_URL + "/category/create", category);
    },
    update(id, category) {
        return axios.put(import.meta.env.VITE_BASE_URL + `/category/${id}`, category);
    },
    delete(id) {
        return axios.delete(import.meta.env.VITE_BASE_URL + `/category/${id}`);
    }
}