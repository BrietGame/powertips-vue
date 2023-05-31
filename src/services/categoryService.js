import axios from "axios";

export default {
    findAll() {
        return axios.get(process.env.VUE_APP_BASE_URL + "/category/all");
    },
    findById(id) {
        return axios.get(process.env.VUE_APP_BASE_URL + `/category/${id}`);
    },
    create(category) {
        return axios.post(process.env.VUE_APP_BASE_URL + "/category/create", category);
    },
    update(id, category) {
        return axios.put(process.env.VUE_APP_BASE_URL + `/category/${id}`, category);
    },
    delete(id) {
        return axios.delete(process.env.VUE_APP_BASE_URL + `/category/${id}`);
    }
}