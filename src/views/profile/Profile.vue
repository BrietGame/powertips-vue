<template>
  <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Mon profil</h1>

  <div v-if="user != null" class="flex justify-between">
    <div class="flex flex-col w-full md:flex-row md:!w-full md:gap-8 md:items-center">
      <div class="author flex flex-col text-center gap-4 items-center justify-center md:flex-col md:text-left">
        <div class="avatar">
          <img class="w-32 h-32 rounded-3xl" :src="user.avatar" :alt="user.username" />
        </div>
        <div class="infos">
          <h2 class="text-xl font-bold">{{ user.username }}</h2>
          <p class="text-gray-500">{{ user.email }}</p>
        </div>
      </div>
      <div class="mx-auto flex flex-col gap-2 mt-3 w-full md:flex-row md:!w-full">
        <RouterLink to="/create-guide">
          <button type="button" class="w-full md:!w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Créer un guide</button>
        </RouterLink>
        <RouterLink to="/edit-profile">
          <button type="button" class="w-full md:!w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Modifier mon profil</button>
        </RouterLink>
        <RouterLink to="/my-guides">
          <button type="button" class="w-full md:!w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mes guides</button>
        </RouterLink>
      </div>
    </div>
  </div>
  <Loading v-else />
  <div>
    <h2 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Mes guides</h2>
    <p class="text-center mb-10 text-gray-500 dark:text-gray-400">Retrouvez tous les guides que vous avez écrit ci-dessous.</p>
    <section v-if="guides != null" class="flex flex-col gap-10 md:flex-row md:justify-between md:gap-3">
      <GuideCard :guides="guides" />
    </section>
    <Loading v-else />
  </div>
</template>

<script>
import { utils } from '../../utils/index';
import Loading from "@/components/Loading.vue";
import GuideCard from "@/components/GuideCard.vue";

export default {
  name: 'Profile',
  components: {GuideCard, Loading},
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    guides() {
      return this.$store.getters.getGuides || null;
    }
  },
  created() {
    // Decode JWT token
    const decoded = utils.decodeToken();
    this.$store.dispatch('findUserById', decoded.id);
    this.$store.dispatch('findAllGuidesByUserId', decoded.id);
  }
}
</script>