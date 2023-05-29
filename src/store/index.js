import { createStore } from "vuex";
import authService from "@/services/authService";

export const store = createStore({
    state: {
        token: "",
    },
    getters: {
        token: state => state.token,
    },
    mutations: {
        CONNECTED(state, token) {
            state.token = token;
        }
    },
    actions: {
        auth({commit}, user) {
            return new Promise((resolve, reject) => {
                authService.login(user).then((response) => {
                    commit('CONNECTED', response);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});