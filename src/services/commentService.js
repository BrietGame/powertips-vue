import axios from "axios";

export default {
    findAll() {
        return axios.get("http://localhost:3001/comment/all");
    },
    findById(id) {
        return axios.get(`http://localhost:3001/comment/${id}`);
    },
    create(comment) {
        return axios.post("http://localhost:3001/comment/create", comment);
    },
    update(id, comment) {
        return axios.put(`http://localhost:3001/comment/${id}`, comment);
    },
    delete(id) {
        return axios.delete(`http://localhost:3001/comment/${id}`);
    }
}