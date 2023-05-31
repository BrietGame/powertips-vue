import axios from "axios";

export default {
    findAll() {
        return axios.get(process.env.VUE_APP_BASE_URL + "/user/all");
    },
    findById(id) {
        return axios.get(process.env.VUE_APP_BASE_URL + `/user/${id}`);
    },
    create(user) {
        return axios.post(process.env.VUE_APP_BASE_URL + "/user/create", user);
    },
    update(id, user) {
        return axios.put(process.env.VUE_APP_BASE_URL + `/user/${id}`, user);
    },
    delete(id) {
        return axios.delete(process.env.VUE_APP_BASE_URL + `/user/${id}`);
    }
}