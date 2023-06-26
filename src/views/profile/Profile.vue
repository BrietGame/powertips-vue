<template>
  <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Mon profil</h1>

  <div class="flex justify-between">
    <div class="flex flex-col gap-8">
      <div class="author flex gap-4 items-center">
        <div class="avatar">
          <img class="w-32 h-32 rounded-3xl" :src="user.avatar" :alt="user.username" />
        </div>
        <div class="infos">
          <h2 class="text-xl font-bold">{{ user.username }}</h2>
          <p class="text-gray-500">{{ user.email }}</p>
        </div>
      </div>
      <div>
        <RouterLink to="/create-guide">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Créer un guide</button>
        </RouterLink>
        <RouterLink to="/profile">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Modifier mon profil</button>
        </RouterLink>
        <RouterLink to="/my-guides">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mes guides</button>
        </RouterLink>
      </div>
    </div>
    <div class="flex flex-col">
      <div v-if="guides != null">
        <RouterLink v-for="guide in guides" :to="'/guides/' + guide.id" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://cdn.streamcave.tv/yunktisbanner.jpg" alt="">
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ guide.title }}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ guide.excerpt }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from '../../utils/index';

export default {
  name: 'Profile',
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