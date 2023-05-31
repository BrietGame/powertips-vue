import axios from "axios";

export default {
    findAll() {
        return axios.get(process.env.VUE_APP_BASE_URL + "/note/all");
    },
    findById(id) {
        return axios.get(process.env.VUE_APP_BASE_URL + `/note/${id}`);
    },
    create(note) {
        return axios.post(process.env.VUE_APP_BASE_URL + `/note/create`, note);
    },
    update(id, note) {
        return axios.put(process.env.VUE_APP_BASE_URL + `/note/${id}`, note);
    },
    delete(id) {
        return axios.delete(process.env.VUE_APP_BASE_URL + `/note/${id}`);
    }
}