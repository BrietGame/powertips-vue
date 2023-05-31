import axios from "axios";

export default {
    findAll() {
        return axios.get(process.env.VUE_APP_BASE_URL + "/guide/all");
    },
    findById(id) {
        return axios.get(process.env.VUE_APP_BASE_URL + `/guide/${id}`);
    },
    create(guide) {
        return axios.post(process.env.VUE_APP_BASE_URL + "/guide/create", guide);
    },
    update(id, guide) {
        return axios.put(process.env.VUE_APP_BASE_URL + `/guide/${id}`, guide);
    },
    delete(id) {
        return axios.delete(process.env.VUE_APP_BASE_URL + `/guide/${id}`);
    }
}