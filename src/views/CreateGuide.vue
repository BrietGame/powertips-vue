<template>
  <h1>Créer mon guide</h1>

  <form @submit.prevent="onSubmit">
    <div class="mb-6">
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
      <input v-model="title" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
    </div>
    <div class="mb-6">
      <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contenu</label>
      <textarea v-model="content" type="text" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required></textarea>
    </div>
    <div class="mb-6">
      <label for="excerpt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Extrait</label>
      <textarea v-model="excerpt" type="text" id="excerpt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required></textarea>
    </div>
    <div class="mb-6">
      <label for="category_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sélectionnez une catégorie</label>
      <select v-model="category_id" type="text" id="category_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'CreateGuide',
  data() {
    return {
      title: '',
      content: '',
      excerpt: '',
      category_id: ''
    }
  },
  computed: {
    categories() {
      console.log(this.$store.getters.getCategories)
      return this.$store.getters.getCategories;
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('createGuide', {
        title: this.title,
        content: this.content,
        excerpt: this.excerpt,
        category_id: this.category_id
      });
    }
  },
  created() {
    this.$store.dispatch('findAllCategories');
  }
}
</script>