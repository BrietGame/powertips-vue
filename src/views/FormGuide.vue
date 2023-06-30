<template>
  <h1 v-if="!isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Créer un guide</h1>
  <h1 v-if="isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Modifier le guide</h1>

  <form @submit.prevent="onSubmit">
    <div class="mb-6">
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre <span class="text-red-700">*</span></label>
      <input v-model="title" type="text" id="title" :class="title === '' ? 'bg-red-50 border border-red-500 text-red-900' : title === null ? '' : 'bg-green-50 border border-green-500 text-green-900'" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Comment réaliser de bonnes pâtes carbonara ?" required>
    </div>
    <div class="mb-6">
      <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contenu <span class="text-red-700">*</span></label>
      <textarea v-model="content" type="text" id="content" :class="content === '' ? 'bg-red-50 border border-red-500 text-red-900' : content === null ? '' : 'bg-green-50 border border-green-500 text-green-900'" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></textarea>
    </div>
    <div class="mb-6">
      <label for="excerpt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Extrait</label>
      <textarea v-model="excerpt" type="text" id="excerpt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
    </div>
    <div class="mb-6">
      <label for="category_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sélectionnez une catégorie <span class="text-red-700">*</span></label>
      <select v-model="category_id" id="category_id" :class="category_id === '' ? 'bg-red-50 border border-red-500 text-red-900' : category_id === null ? '' : 'bg-green-50 border border-green-500 text-green-900'" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
  </form>
</template>

<script>
import {utils} from "@/utils";

export default {
  name: 'CreateGuide',
  data() {
    return {
      title: null,
      content: null,
      excerpt: null,
      category_id: null,
      isEdit: false
    }
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
    guide() {
      return this.$store.getters.getGuide || null;
    }
  },
  methods: {
    onSubmit() {
      if (this.$route.params.id) {
        this.$store.dispatch('updateGuide', {
          id: this.$route.params.id,
          title: this.title,
          content: this.content,
          excerpt: this.excerpt,
          category_id: this.category_id,
          user_id: utils.decodeToken().id
        }).then(() => {
          this.$notify({
            group: 'notify',
            title: 'Succès',
            text: 'Votre guide a bien été modifié',
            type: 'success'
          });
          this.$router.push('/my-guides');
        });
      } else {
        this.$store.dispatch('createGuide', {
          title: this.title,
          content: this.content,
          excerpt: this.excerpt,
          category_id: this.category_id,
          user_id: utils.decodeToken().id
        }).then(() => {
          this.$notify({
            group: 'notify',
            title: 'Succès',
            text: 'Votre guide a bien été créé',
            type: 'success'
          });
          this.$router.push('/my-guides');
        });
      }
    }
  },
  created() {
    this.$store.dispatch('findAllCategories');
    if (!this.$store.getters.getIsConnected) {
      this.$router.push('/login');
      this.$notify({
        title: 'Erreur',
        text: 'Vous devez être connecté pour accéder à cette page',
        type: 'error'
      });
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.$store.dispatch('findGuideById', this.$route.params.id).then(() => {
        this.title = this.guide.title;
        this.content = this.guide.content;
        this.excerpt = this.guide.excerpt;
        this.category_id = this.guide.category_id;
        this.isEdit = true;
      });
    }
  }
}
</script>