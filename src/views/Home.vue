<template>
  <section v-if="guides != null" class="flex justify-between">
    <div v-for="(guide, i) in guides" :key="i" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="img-guide">
        <img class="relative rounded-t-lg " :src="guide.media != null ? guide.media : 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'" alt="" />
        <div class="categories">
          <RouterLink :to="'/categories/' + guide.category.id">
            <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{{ guide.category.name }}</span>
          </RouterLink>
        </div>
      </div>
      <div class="p-5">
        <RouterLink :to="'/guides/' + guide.id">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{guide.title}}</h5>
        </RouterLink>
        <p v-if="guide.excerpt !== null" class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{
            guide.excerpt.length > 100
                ? guide.excerpt.substring(0, 100) + '...'
                : guide.excerpt
          }}.</p>
        <p v-else>{{ guide.content.substring(0, 100) + '...' }}</p>
        <RouterLink :to="'/guides/' + guide.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Lire le guide
          <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </RouterLink>
      </div>
    </div>
  </section>
  <Loading v-else />
  <section class="bg-white dark:bg-gray-900">
    <div class="grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-auto place-self-center lg:col-span-7">
        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Partagez vos connaissances</h1>
        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Vous savez faire une recette de cuisine et que vous souhaitez la partager pour en faire profiter tout le monde ? Alors <span class="text-bold">inscrivez-vous</span> dès maintenant et partagez vos connaissances.</p>
        <RouterLink to="/register" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
          Commencer
          <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </RouterLink>
      </div>
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup">
      </div>
    </div>
  </section>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
  name: 'Home',
  components: {Loading},
  computed: {
    guides() {
      return this.$store.getters.getGuides;
    }
  },
  mounted() {
    this.$store.dispatch('findAllGuides');
  }
}
</script>

<style>
.img-guide {
  position: relative;
}
.img-guide img {
  position: relative;
}
.categories {
  position: absolute;
  top: 5%;
  left: 5%;
  padding: 0.5rem;
  z-index: 1;
  display: flex;
}
</style>