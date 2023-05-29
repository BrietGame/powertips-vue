import axios from "axios";

export default {
    findAll() {
        return axios.get("http://localhost:3001/user/all");
    },
    findById(id) {
        return axios.get(`http://localhost:3001/user/${id}`);
    },
    create(user) {
        return axios.post("http://localhost:3001/user/create", user);
    },
    update(id, user) {
        return axios.put(`http://localhost:3001/user/${id}`, user);
    },
    delete(id) {
        return axios.delete(`http://localhost:3001/user/${id}`);
    }
}