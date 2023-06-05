import { createStore } from "vuex";
import authService from "@/services/authService";
import userService from "@/services/userService";
import categoryService from "@/services/categoryService";
import commentService from "@/services/commentService";
import guideService from "@/services/guideService";
import noteService from "@/services/noteService";

export const store = createStore({
    state: {
        users: [],
        user: null,
        categories: [],
        comments: [],
        guides: [],
        notes: []
    },
    getters: {
        getUsers: state => state.users,
        getUser: state => state.user,
        getCategories: state => state.categories,
        getComments: state => state.comments,
        getGuides: state => state.guides,
        getNotes: state => state.notes
    },
    mutations: {
        CONNECTED(state, token) {
            state.token = token;
        },
        USERS(state, users) {
            console.info("users: ")
            console.info(users.data)
            state.users = users.data;
            console.info(state.users)
        },
        USER(state, user) {
            state.user = user;
        },
        CATEGORIES(state, categories) {
            state.categories = categories.data;
        },
        COMMENTS(state, comments) {
            state.comments = comments.data;
        },
        GUIDES(state, guides) {
            state.guides = guides.data;
        },
        NOTES(state, notes) {
            state.notes = notes.data;
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
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                authService.register(user).then((response) => {
                    commit('CONNECTED', response);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                authService.logout().then((response) => {
                    commit('CONNECTED', response);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findAllUsers({commit}) {
            return new Promise((resolve, reject) => {
                userService.findAll().then((response) => {
                    commit('USERS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findUserById(id) {
            return new Promise((resolve, reject) => {
                userService.findById(id).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createUser(user) {
            return new Promise((resolve, reject) => {
                userService.create(user).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateUser(id, user) {
            return new Promise((resolve, reject) => {
                userService.update(id, user).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteUser(id) {
            return new Promise((resolve, reject) => {
                userService.delete(id).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findAllCategories({commit}) {
            return new Promise((resolve, reject) => {
                categoryService.findAll().then((response) => {
                    commit('CATEGORIES', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findCategoryById(id) {
            return new Promise((resolve, reject) => {
                categoryService.findById(id).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createCategory(category) {
            return new Promise((resolve, reject) => {
                categoryService.create(category).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateCategory(id, category) {
            return new Promise((resolve, reject) => {
                categoryService.update(id, category).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteCategory(id) {
            return new Promise((resolve, reject) => {
                categoryService.delete(id).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findAllComments({commit}) {
            return new Promise((resolve, reject) => {
                commentService.findAll().then((response) => {
                    commit('COMMENTS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findCommentById(id) {
            return new Promise((resolve, reject) => {
                commentService.findById(id).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createComment(comment) {
            return new Promise((resolve, reject) => {
                commentService.create(comment).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateComment(id, comment) {
            return new Promise((resolve, reject) => {
                commentService.update(id, comment).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteComment(id) {
            return new Promise((resolve, reject) => {
                commentService.delete(id).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findAllGuides({commit}) {
            return new Promise((resolve, reject) => {
                guideService.findAll().then((response) => {
                    commit('GUIDES', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findGuideById(id) {
            return new Promise((resolve, reject) => {
                guideService.findById(id).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createGuide(guide) {
            return new Promise((resolve, reject) => {
                guideService.create(guide).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateGuide(id, guide) {
            return new Promise((resolve, reject) => {
                guideService.update(id, guide).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteGuide(id) {
            return new Promise((resolve, reject) => {
                guideService.delete(id).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findAllNotes({commit}) {
            return new Promise((resolve, reject) => {
                noteService.findAll().then((response) => {
                    commit('NOTES', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findNoteById(id) {
            return new Promise((resolve, reject) => {
                noteService.findById(id).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createNote(note) {
            return new Promise((resolve, reject) => {
                noteService.create(note).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateNote(id, note) {
            return new Promise((resolve, reject) => {
                noteService.update(id, note).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteNote(id) {
            return new Promise((resolve, reject) => {
                noteService.delete(id).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});