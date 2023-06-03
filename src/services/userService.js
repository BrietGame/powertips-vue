import axios from "axios";

export default {
    findAll() {
        return axios.get(import.meta.env.VITE_BASE_URL + "/user/all");
    },
    findById(id) {
        return axios.get(import.meta.env.VITE_BASE_URL + `/user/${id}`);
    },
    create(user) {
        return axios.post(import.meta.env.VITE_BASE_URL + "/user/create", user);
    },
    update(id, user) {
        return axios.put(import.meta.env.VITE_BASE_URL + `/user/${id}`, user);
    },
    delete(id) {
        return axios.delete(import.meta.env.VITE_BASE_URL + `/user/${id}`);
    }
}