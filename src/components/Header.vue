<template>
  <header>

    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <RouterLink to="/" class="flex items-center">
          <img src="../assets/logo.png" class="h-8 mr-3" alt="Flowbite Logo" />
        </RouterLink>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 gap-4">
            <li>
              <RouterLink to="/" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Accueil
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/create-guide" class="ease-in-out duration-300 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Créer un guide
              </RouterLink>
            </li>
            <li v-if="!isConnected">
              <RouterLink to="/login" class="ease-in-out duration-300 block px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-white hover:outline hover:outline-2 hover:outline-gray-600 hover:text-black">
                Se connecter
              </RouterLink>
            </li>
            <li v-if="!isConnected">
              <RouterLink to="/register" class="ease-in-out duration-300 block px-4 py-2 outline outline-2 outline-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                S'inscrire
              </RouterLink>
            </li>
            <li v-if="isConnected">
              <RouterLink to="/profile" class="ease-in-out duration-300 block px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-white hover:outline hover:outline-2 hover:outline-gray-600 hover:text-black">
                Profil
              </RouterLink>
            </li>
            <li v-if="isConnected && isAdmin">
              <RouterLink to="/admin" class="ease-in-out duration-300 block px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-white hover:outline hover:outline-2 hover:outline-gray-600 hover:text-black">
                Admin
              </RouterLink>
            </li>
            <li v-if="isConnected">
              <RouterLink to="/logout" class="ease-in-out duration-300 block px-4 py-2 outline outline-2 outline-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Se déconnecter
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import {utils} from "@/utils";

export default {
  name: 'Header',
  data() {
    return {
      user: null,
      roles: null,
      isAdmin: null
    }
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
    isConnected() {
      return this.$store.getters.getIsConnected;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    checkIfAdmin() {
      // Json to array
      const separator = ',';
      // Supprimer les crochets
      this.roles = this.roles.replace('[', '');
      this.roles = this.roles.replace(']', '');
      // Supprimer les guillemets
      this.roles = this.roles.replace(/"/g, '');
      // Supprimer les espaces
      this.roles = this.roles.replace(/ /g, '');
      const array = this.roles.split(separator);

      if (array != null) {
        array.forEach(role => {
          if (role === 'ROLE_ADMIN') {
            this.isAdmin = true;
          }
        })
      }
    }
  },
  mounted() {
    this.$store.dispatch('findAllCategories');
    const decoded = utils.decodeToken();
    if (decoded != null) {
      this.$store.dispatch('findUserById', decoded.id).then(() => {
        this.user = this.$store.getters.getUser;
        this.roles = this.$store.getters.getUser.roles;
        this.checkIfAdmin();
      });
    }
  }
}
</script>

<style>
nav {
  position: fixed;
  width: 100%;
  z-index: 999;
}
</style>