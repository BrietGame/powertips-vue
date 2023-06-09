import { createStore } from "vuex";
import authService from "@/services/authService";
import userService from "@/services/userService";
import categoryService from "@/services/categoryService";
import commentService from "@/services/commentService";
import guideService from "@/services/guideService";
import noteService from "@/services/noteService";
import reportService from "@/services/reportService";

export const store = createStore({
    state: {
        users: [],
        user: null,
        categories: [],
        category: null,
        comments: [],
        comment: null,
        guides: [],
        guide: null,
        notes: [],
        note: null,
        reports: [],
        report: null,
        moyNote: null,
        isConnected: !!localStorage.getItem('token')
    },
    getters: {
        getUsers: state => state.users,
        getUser: state => state.user,
        getCategories: state => state.categories,
        getCategory: state => state.category,
        getComments: state => state.comments.map(comment => {
            comment.created_at = new Date(comment.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            return comment;
        }),
        getComment: state => state.comment,
        getGuides: state => state.guides.map(guide => {
            guide.created_at = new Date(guide.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            guide.updated_at = new Date(guide.updated_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            return guide;
        }),
        getGuidesPublished: state => state.guides.filter(guide => guide.status === 'PUBLISHED').map(guide => {
            guide.created_at = new Date(guide.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            guide.updated_at = new Date(guide.updated_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            return guide;
        }),
        getGuidesForList: state => state.guides.map(guide => {
            return {
                id: guide.id,
                title: guide.title,
                status: guide.status,
                slug: guide.slug,
                user: {
                    id: guide.user.id,
                    username: guide.user.username,
                    avatar: guide.user.avatar,
                    roles: guide.user.roles
                },
                category: {
                    id: guide.category.id,
                    name: guide.category.name
                },
                date: new Date(guide.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
            }
        }),
        getGuide: state => state.guide,
        getNotes: state => state.notes,
        getNote: state => state.note,
        getReports: state => state.reports,
        getReport: state => state.report,
        getMoyNote: state => state.moyNote,
        getIsConnected: state => state.isConnected
    },
    mutations: {
        CONNECTED(state, value) {
            state.isConnected = value;
        },
        USERS(state, users) {
            state.users = users.data;
        },
        USER(state, user) {
            state.user = user != null ? user.data : null;
        },
        CATEGORIES(state, categories) {
            state.categories = categories.data;
        },
        CATEGORY(state, category) {
            state.category = category != null ? category.data : null;
        },
        COMMENTS(state, comments) {
            state.comments = comments.data;
        },
        COMMENT(state, comment) {
            state.comment = comment != null ? comment.data : null;
        },
        GUIDES(state, guides) {
            state.guides = guides.data;
        },
        GUIDE(state, guide) {
            state.guide = guide != null ? guide.data : null;
        },
        NOTES(state, notes) {
            state.notes = notes.data;
        },
        NOTE(state, note) {
            state.note = note != null ? note.data : null;
        },
        REPORTS(state, reports) {
            state.reports = reports.data;
        },
        REPORT(state, report) {
            state.report = report != null ? report.data : null;
        },
        MOY_NOTE(state, moyNotes) {
            state.moyNote = moyNotes.data;
        }
    },
    actions: {
        auth({commit}, user) {
            return new Promise((resolve, reject) => {
                authService.login(user).then((response) => {
                    commit('CONNECTED', true);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                authService.register(user).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        logout({commit}) {
            commit('CONNECTED', false);
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
        findUserById({commit}, id) {
            return new Promise((resolve, reject) => {
                userService.findById(id).then((response) => {
                    commit('USER', response.data);
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findUserByEmail({commit}, email) {
            return new Promise((resolve, reject) => {
                userService.findByEmail(email).then((response) => {
                    commit('USER', response.data);
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createUser({commit}, user) {
            return new Promise((resolve, reject) => {
                userService.create(user).then((response) => {
                    commit('USER', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateUser({commit}, user) {
            return new Promise((resolve, reject) => {
                userService.update(user.id, user).then((response) => {
                    commit('USER', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteUser({commit}, id) {
            return new Promise((resolve, reject) => {
                userService.delete(id).then((response) => {
                    commit('USER', null);
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
        findCategoryById({commit}, id) {
            return new Promise((resolve, reject) => {
                categoryService.findById(id).then((response) => {
                    commit('CATEGORY', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createCategory({commit}, category) {
            return new Promise((resolve, reject) => {
                categoryService.create(category).then((response) => {
                    commit('CATEGORY', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateCategory({commit}, category) {
            return new Promise((resolve, reject) => {
                categoryService.update(category.id, category).then((response) => {
                    commit('CATEGORY', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteCategory({commit}, id) {
            return new Promise((resolve, reject) => {
                categoryService.delete(id).then((response) => {
                    commit('CATEGORY', null);
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
        findAllCommentsByGuideId({commit}, id) {
            return new Promise((resolve, reject) => {
                commentService.findAllByGuideId(id).then((response) => {
                    commit('COMMENTS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findAllCommentsByUserId({commit}, id) {
            return new Promise((resolve, reject) => {
                commentService.findAllByUserId(id).then((response) => {
                    commit('COMMENTS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findCommentById({commit}, id) {
            return new Promise((resolve, reject) => {
                commentService.findById(id).then((response) => {
                    commit('COMMENT', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createComment({commit}, comment) {
            return new Promise((resolve, reject) => {
                commentService.create(comment).then((response) => {
                    commit('COMMENT', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateComment({commit}, comment) {
            return new Promise((resolve, reject) => {
                commentService.update(comment.id, comment).then((response) => {
                    commit('COMMENT', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteComment({commit}, id) {
            return new Promise((resolve, reject) => {
                commentService.delete(id).then((response) => {
                    commit('COMMENT', null);
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
        findAllGuidesByUserId({commit}, id) {
            return new Promise((resolve, reject) => {
                guideService.findAllByUserId(id).then((response) => {
                    commit('GUIDES', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findAllGuidesByCategoryId({commit}, id) {
            return new Promise((resolve, reject) => {
                guideService.findAllByCategoryId(id).then((response) => {
                    commit('GUIDES', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findGuideById({commit}, id) {
            return new Promise((resolve, reject) => {
                guideService.findById(id).then((response) => {
                    commit('GUIDE', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findGuideBySlug({commit}, slug) {
            return new Promise((resolve, reject) => {
                guideService.findBySlug(slug).then((response) => {
                    commit('GUIDE', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createGuide({commit}, guide) {
            return new Promise((resolve, reject) => {
                guideService.create(guide).then((response) => {
                    commit('GUIDE', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateGuide({commit}, guide) {
            return new Promise((resolve, reject) => {
                guideService.update(guide.id, guide).then((response) => {
                    commit('GUIDE', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteGuide({commit}, id) {
            return new Promise((resolve, reject) => {
                guideService.delete(id).then((response) => {
                    commit('GUIDE', null);
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
        findNoteById({commit}, id) {
            return new Promise((resolve, reject) => {
                noteService.findById(id).then((response) => {
                    commit('NOTE', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findNotesByGuideId({commit}, id) {
            return new Promise((resolve, reject) => {
                noteService.findAllByGuideId(id).then((response) => {
                    commit('NOTE', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findAllNotesByUserId({commit}, id) {
            return new Promise((resolve, reject) => {
                noteService.findAllByUserId(id).then((response) => {
                    commit('NOTES', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findNoteMoyenneByGuideId({commit}, id) {
            return new Promise((resolve, reject) => {
                noteService.findMoyenneByGuideId(id).then((response) => {
                    commit('MOY_NOTE', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createNote({commit}, note) {
            return new Promise((resolve, reject) => {
                noteService.create(note).then((response) => {
                    commit('NOTE', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        updateNote({commit}, note) {
            return new Promise((resolve, reject) => {
                noteService.update(note.id, note).then((response) => {
                    commit('NOTE', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        deleteNote({commit}, id) {
            return new Promise((resolve, reject) => {
                noteService.delete(id).then((response) => {
                    commit('NOTE', null);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findAllReports({commit}) {
            return new Promise((resolve, reject) => {
                reportService.findAll().then((response) => {
                    commit('REPORTS', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        findReportById({commit}, id) {
            return new Promise((resolve, reject) => {
                reportService.findById(id).then((response) => {
                    commit('REPORT', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        createReport({commit}, report) {
            return new Promise((resolve, reject) => {
                reportService.create(report).then((response) => {
                    commit('REPORT', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
});