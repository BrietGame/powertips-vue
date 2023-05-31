import axios from "axios";

export default {
    findAll() {
        return axios.get(process.env.VUE_APP_BASE_URL + "/comment/all");
    },
    findById(id) {
        return axios.get(process.env.VUE_APP_BASE_URL + `/comment/${id}`);
    },
    create(comment) {
        return axios.post(process.env.VUE_APP_BASE_URL + "/comment/create", comment);
    },
    update(id, comment) {
        return axios.put(process.env.VUE_APP_BASE_URL + `/comment/${id}`, comment);
    },
    delete(id) {
        return axios.delete(process.env.VUE_APP_BASE_URL + `/comment/${id}`);
    }
}