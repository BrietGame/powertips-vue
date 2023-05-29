import axios from "axios";

export default {
    findAll() {
        return axios.get("http://localhost:3001/guide/all");
    },
    findById(id) {
        return axios.get(`http://localhost:3001/guide/${id}`);
    },
    create(guide) {
        return axios.post("http://localhost:3001/guide/create", guide);
    },
    update(id, guide) {
        return axios.put(`http://localhost:3001/guide/${id}`, guide);
    },
    delete(id) {
        return axios.delete(`http://localhost:3001/guide/${id}`);
    }
}