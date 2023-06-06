import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Admin from "@/views/admin/Admin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/create-guide',
      name: 'create-guide',
      component: () => import('../views/CreateGuide.vue')
    },
    {
      path: '/guides/:id',
      name: 'guide',
      component: () => import('../views/GuideDetails.vue')
    },
      // Admin
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/admin/users/Users.vue')
    },
    {
      path: '/admin/users/edit/:id',
      name: 'admin-users-edit',
      component: () => import('../views/admin/users/FormUser.vue')
    },
    {
      path: '/admin/users/create',
      name: 'admin-users-create',
      component: () => import('../views/admin/users/FormUser.vue')
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('../views/admin/categories/Categories.vue')
    },
    {
      path: '/admin/categories/edit/:id',
      name: 'admin-categories-edit',
      component: () => import('../views/admin/categories/FormCategory.vue')
    },
    {
      path: '/admin/categories/create',
      name: 'admin-categories-create',
      component: () => import('../views/admin/categories/FormCategory.vue')
    },
    {
      path: '/admin/guides',
      name: 'admin-guides',
      component: () => import('../views/admin/guides/Guides.vue')
    },
    {
      path: '/admin/guides/edit/:id',
      name: 'admin-guides-edit',
      component: () => import('../views/admin/guides/FormGuide.vue')
    },
    {
      path: '/admin/guides/create',
      name: 'admin-guides-create',
      component: () => import('../views/admin/guides/FormGuide.vue')
    },
    {
      path: '/admin/comments',
      name: 'admin-comments',
      component: () => import('../views/admin/comments/Comments.vue')
    },
    {
      path: '/admin/comments/edit/:id',
      name: 'admin-comments-edit',
      component: () => import('../views/admin/comments/FormComment.vue')
    },
    {
      path: '/admin/comments/create',
      name: 'admin-comments-create',
      component: () => import('../views/admin/comments/FormComment.vue')
    },
    {
      path: '/admin/notes',
      name: 'admin-notes',
      component: () => import('../views/admin/notes/Notes.vue')
    },
    {
      path: '/admin/notes/edit/:id',
      name: 'admin-notes-edit',
      component: () => import('../views/admin/notes/FormNote.vue')
    },
    {
      path: '/admin/notes/create',
      name: 'admin-notes-create',
      component: () => import('../views/admin/notes/FormNote.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
