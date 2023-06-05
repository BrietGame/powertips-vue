<template>
  <div class="container">
    <h1>Admin</h1>
<!--    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">-->
<!--      <div class="pb-4 bg-white dark:bg-gray-900">-->
<!--        <label for="table-search" class="sr-only">Search</label>-->
<!--        <div class="relative mt-1">-->
<!--          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">-->
<!--            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>-->
<!--          </div>-->
<!--          <input type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">-->
<!--        </div>-->
<!--      </div>-->
<!--      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">-->
<!--        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">-->
<!--        <tr>-->
<!--          <th scope="col" class="p-4">-->
<!--            <div class="flex items-center">-->
<!--              <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">-->
<!--              <label for="checkbox-all-search" class="sr-only">checkbox</label>-->
<!--            </div>-->
<!--          </th>-->
<!--          <th scope="col" class="px-6 py-3">-->
<!--            ID-->
<!--          </th>-->
<!--          <th scope="col" class="px-6 py-3">-->
<!--            Email-->
<!--          </th>-->
<!--          <th scope="col" class="px-6 py-3">-->
<!--            Username-->
<!--          </th>-->
<!--          <th scope="col" class="px-6 py-3">-->
<!--            Roles-->
<!--          </th>-->
<!--          <th scope="col" class="px-6 py-3">-->
<!--            Action-->
<!--          </th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        <tr v-for="user in users" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">-->
<!--          <td class="w-4 p-4">-->
<!--            <div class="flex items-center">-->
<!--              <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">-->
<!--              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>-->
<!--            </div>-->
<!--          </td>-->
<!--          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">-->
<!--            {{ user.email }}-->
<!--          </th>-->
<!--          <td class="px-6 py-4">-->
<!--            {{ user.id }}-->
<!--          </td>-->
<!--          <td class="px-6 py-4">-->
<!--            {{ user.username }}-->
<!--          </td>-->
<!--          <td class="px-6 py-4">-->
<!--            {{ user.roles }}-->
<!--          </td>-->
<!--          <td class="px-6 py-4">-->
<!--            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>-->
<!--          </td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--    </div>-->

    <Table v-if="users != null" :labels="users.labels" :values="users.values" :actions="users.actions" />
    <Table v-if="guides != null" :labels="guides.labels" :values="guides.values"/>
    <Table v-if="categories != null" :labels="categories.labels" :values="categories.values"/>
    <Table v-if="notes != null" :labels="notes.labels" :values="notes.values"/>
    <Table v-if="comments != null" :labels="comments.labels" :values="comments.values"/>
  </div>
</template>

<script>

import {mapGetters, mapState} from "vuex";
import Table from "@/components/Table.vue";

export default {
  name: 'Admin',
  components: {Table},
  data() {
    return {
      users: null,
      guides: null,
      categories: null,
      notes: null,
      comments: null
    }
  },
  methods: {
    setUsers() {
      this.users = {
        labels: ['Id', 'Email', 'Username', 'Roles', 'Action'],
        values: this.$store.state.users,
        actions: {
          edit: {
            label: 'Edit',
            action: (user) => {
              console.log(user)
            }
          },
          delete: {
            label: 'Delete',
            action: (user) => {
              console.log(user)
            }
          }
        }
      }
    },
    setGuides() {
      this.guides = {
        labels: ['Id', 'Title', 'Excerpt', 'Content', 'Media', 'Stats', 'Status', 'Category', 'Crée', 'Modifié', 'Action'],
        values: this.$store.state.guides
      }
    },
    setCategories() {
      this.categories = {
        labels: ['Id', 'Name', 'Description', 'Parent_id', 'Action'],
        values: this.$store.state.categories
      }
    },
    setNotes() {
      this.notes = {
        labels: ['Id', 'Score', 'User', 'Guide', 'Action'],
        values: this.$store.state.notes
      }
    },
    setComments() {
      this.comments = {
        labels: ['Id', 'Content', 'User', 'Guide', 'Crée', 'Action'],
        values: this.$store.state.comments
      }
    }
  },
  mounted() {
    this.$store.dispatch('findAllUsers');
    this.$store.dispatch('findAllGuides');
    this.$store.dispatch('findAllCategories');
    this.$store.dispatch('findAllNotes');
    this.$store.dispatch('findAllComments');
    setTimeout(() => {
      this.setUsers();
      this.setGuides();
      this.setCategories();
      this.setNotes();
      this.setComments();
    }, 300)
  }
}
</script>