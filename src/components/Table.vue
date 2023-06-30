<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Rechercher</label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" v-if="data.labels != null">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th v-for="label in data.labels" scope="col" class="px-6 py-3">
            {{ label }}
          </th>
        </tr>
        </thead>
        <tbody v-if="data.values != null">
        <tr v-for="value in data.values" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td v-for="(v, key) in value" class="px-6 py-4">
            <div v-if="key === 'status'">
              <span v-if="v === 'WAITING'" class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"><font-awesome-icon :icon="['fas', 'clock']" /> Attente de validation</span>
              <span v-if="v === 'DRAFT'" class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"><font-awesome-icon :icon="['fas', 'file-pen']" /> Brouillon</span>
              <span v-if="v === 'REFUSED'" class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"><font-awesome-icon :icon="['fas', 'circle-xmark']" /> Publication refusée</span>
              <span v-if="v === 'PUBLISHED'" class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"><font-awesome-icon :icon="['fas', 'circle-check']" /> Publication acceptée</span>
            </div>
            <div v-else-if="key === 'content'">
              {{ v.substring(0, 100) }}...
            </div>
            <div v-else-if="key === 'user'">
              <div class="author flex gap-4 items-center">
                <div class="avatar">
                  <img class="w-11 h-11 rounded-3xl" :src="v.avatar" :alt="v.username" />
                </div>
                <div class="infos">
                  <h2 class="text-xl font-bold">{{ v.username }}</h2>
                </div>
              </div>
            </div>
            <div v-else-if="key === 'avatar'">
              <img class="w-11 h-11 rounded-3xl" :src="v" />
            </div>
            <div v-else-if="key === 'roles'">
              <span v-for="(role, ka) in utils.returnRoles(v)" :key="ka" :class="role === 'ROLE_ADMIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800' " class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{{ role }}</span>
            </div>
            <div v-else-if="key === 'category'">
              <RouterLink :to="'/categories/' + v.id">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{{ v.name }}</span>
              </RouterLink>
            </div>
            <div v-else>
              {{ v }}
            </div>
          </td>
          <td v-if="data.actions != null" class="px-6 py-4">
            <div class="inline-flex rounded-md shadow-sm gap-4" role="group">
              <div v-for="(action, ka) in data.actions" :key="ka">
                <RouterLink :to="action.action + (value.slug !== undefined ? value.slug : value.id)">
                  <button type="button" :class="`outline outline-2 outline-gray-600 px-4 py-2 text-sm font-medium text-gray-900 bg-transparent hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white ${ka === 'delete' ? 'hover:bg-red-500 hover:outline-red-500' : 'hover:bg-blue-600 hover:outline-blue-600' }`">
                    {{ action.label }}
                  </button>
                </RouterLink>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
import {onMounted} from "vue";
import {utils} from "@/utils";

onMounted(() => {
  initFlowbite()
})
</script>

<script>
import router from "@/router";

export default {
  name: "Table",
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>