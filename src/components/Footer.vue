<template>
  <div v-if="!isConnected" id="marketing-banner" tabindex="-1" class="fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600">
    <div class="flex flex-col items-start mb-3 mr-4 md:items-center md:flex-row md:mb-0">
      <RouterLink to="/" class="flex items-center mb-2 border-gray-200 md:pr-4 md:mr-4 md:border-r md:mb-0 dark:border-gray-600">
        <img src="../assets/logo.svg" class="h-8 mr-3" alt="Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PowerTips</span>
      </RouterLink>
      <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Connectez-vous et partagez dans vos guides votre savoir-faire en quelques clics !</p>
    </div>
    <div class="flex items-center flex-shrink-0">
      <RouterLink to="/login" class="px-5 py-2 mr-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Se connecter
      </RouterLink>
      <button data-dismiss-target="#marketing-banner" type="button" class="absolute top-2.5 right-2.5 md:relative md:top-auto md:right-auto flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
        <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Close banner</span>
      </button>
    </div>
  </div>
  
  <footer>
    <div class="container flex flex-col items-center justify-between px-4 py-8 mx-auto sm:flex-row">
      <p class="text-sm text-gray-500 dark:text-gray-400">© 2021 PowerTips, Inc. Tous droits réservés.</p>
      <div class="flex mt-4 space-x-4 sm:mt-0">
        <RouterLink to="/about" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">À propos</RouterLink>
        <RouterLink to="/contact" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">Contact</RouterLink>
        <RouterLink to="/terms" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">Conditions d'utilisation</RouterLink>
        <RouterLink to="/privacy" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">Politique de confidentialité</RouterLink>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      isConnected: false,
    }
  },
  computed: {
    isConnected() {
      return this.$store.getters.getIsConnected;
    }
  }
}
</script>

<style>
#marketing-banner {
  transition: all 0.3s ease-in-out;
  top: unset;
  z-index: 999;
 bottom: 4rem;
}
</style>