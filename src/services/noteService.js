import axios from "axios";

export default {
    findAll() {
        return axios.get("http://localhost:3001/note/all");
    },
    findById(id) {
        return axios.get(`http://localhost:3001/note/${id}`);
    },
    create(note) {
        return axios.post("http://localhost:3001/note/create", note);
    },
    update(id, note) {
        return axios.put(`http://localhost:3001/note/${id}`, note);
    },
    delete(id) {
        return axios.delete(`http://localhost:3001/note/${id}`);
    }
}