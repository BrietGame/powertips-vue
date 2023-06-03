import axios from "axios";

export default {
    findAll() {
        return axios.get(import.meta.env.VITE_BASE_URL + "/note/all");
    },
    findById(id) {
        return axios.get(import.meta.env.VITE_BASE_URL + `/note/${id}`);
    },
    create(note) {
        return axios.post(import.meta.env.VITE_BASE_URL + `/note/create`, note);
    },
    update(id, note) {
        return axios.put(import.meta.env.VITE_BASE_URL + `/note/${id}`, note);
    },
    delete(id) {
        return axios.delete(import.meta.env.VITE_BASE_URL + `/note/${id}`);
    }
}