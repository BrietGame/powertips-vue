import axios from "axios";

export default {
    findAll() {
        return axios.get("http://localhost:3001/category/all");
    },
    findById(id) {
        return axios.get(`http://localhost:3001/category/${id}`);
    },
    create(category) {
        return axios.post("http://localhost:3001/category/create", category);
    },
    update(id, category) {
        return axios.put(`http://localhost:3001/category/${id}`, category);
    },
    delete(id) {
        return axios.delete(`http://localhost:3001/category/${id}`);
    }
}