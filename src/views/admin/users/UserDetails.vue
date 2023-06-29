<template>
  <div v-if="user != null" class="container">
    <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Détails de : {{ user.username }}</h1>

    <div class="flex gap-4">
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-end px-4 pt-4">
          <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span class="sr-only">Open dropdown</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
          </button>
          <!-- Dropdown menu -->
          <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2" aria-labelledby="dropdownButton">
              <li>
                <RouterLink :to="'/admin/users/edit/' + user.id" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Editer
                </RouterLink>
              </li>
              <li>
                <RouterLink :to="'/admin/users/delete/' + user.id" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Supprimer
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col items-center pb-10">
          <img class="w-24 h-24 mb-3 rounded-full shadow-lg" :src="user.avatar" :alt="'Avatar de ' + user.username"/>
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ user.username }}</h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</span>
          <div class="flex mt-4 space-x-3 md:mt-6">
            <RouterLink :to="'/admin/users/edit/' + user.id" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Editer
            </RouterLink>
            <RouterLink :to="'/admin/users/delete/' + user.id" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
              Supprimer
            </RouterLink>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
            <li class="mr-2" role="presentation">
              <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="guides-tab" data-tabs-target="#guides" type="button" role="tab" aria-controls="guides" aria-selected="false">Guides</button>
            </li>
            <li class="mr-2" role="presentation">
              <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="comments-tab" data-tabs-target="#comments" type="button" role="tab" aria-controls="comments" aria-selected="false">Commentaires</button>
            </li>
            <li class="mr-2" role="presentation">
              <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="notes-tab" data-tabs-target="#notes" type="button" role="tab" aria-controls="notes" aria-selected="false">Notes</button>
            </li>
          </ul>
        </div>
        <div id="myTabContent">
          <div class="hidden" id="guides" role="tabpanel" aria-labelledby="guides-tab">
            <Guides :user_id="user.id" />
          </div>
          <div class="hidden" id="comments" role="tabpanel" aria-labelledby="comments-tab">
            <Comments :user_id="user.id" />
          </div>
          <div class="hidden" id="notes" role="tabpanel" aria-labelledby="notes-tab">
            <Notes :user_id="user.id" />
          </div>
        </div>
      </div>
    </div>


  </div>

  <Loading v-else />
</template>

<script>
import Loading from "@/components/Loading.vue";
import GuideCard from "@/components/GuideCard.vue";
import Guides from "@/views/admin/guides/Guides.vue";
import Comments from "@/views/admin/comments/Comments.vue";
import Notes from "@/views/admin/notes/Notes.vue";

export default {
  name: 'UserDetails',
  components: {Notes, Comments, Guides, GuideCard, Loading},
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    guides() {
      return this.$store.getters.getGuides;
    }
  },
  methods: {
    getUser() {
      this.$store.dispatch('findUserById', this.$route.params.id)
      this.$store.dispatch('findAllGuidesByUserId', this.$route.params.id);
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>