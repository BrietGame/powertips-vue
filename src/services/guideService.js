import axios from '../axiosInstance';

export default {
    findAll() {
        return axios.get(import.meta.env.VITE_BASE_URL + "/guide/all");
    },
    findAllByUserId(userId) {
        return axios.get(import.meta.env.VITE_BASE_URL + `/guide/all/${userId}`);
    },
    findAllByCategoryId(categoryId) {
        return axios.get(import.meta.env.VITE_BASE_URL + `/guide/all/category/${categoryId}`);
    },
    findById(id) {
        return axios.get(import.meta.env.VITE_BASE_URL + `/guide/${id}`);
    },
    findBySlug(slug) {
        return axios.get(import.meta.env.VITE_BASE_URL + `/guide/slug/${slug}`);
    },
    create(guide) {
        return axios.post(import.meta.env.VITE_BASE_URL + "/guide/create", guide);
    },
    update(id, guide) {
        return axios.put(import.meta.env.VITE_BASE_URL + `/guide/${id}`, guide);
    },
    delete(id) {
        return axios.delete(import.meta.env.VITE_BASE_URL + `/guide/${id}`);
    }
}