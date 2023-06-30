<template>
  <div class="container">
    <h1 v-if="!isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Créer une catégorie</h1>
    <h1 v-if="isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Modifier la catégorie : {{ category.name }}</h1>

    <form @submit.prevent="onSubmit" v-if="category !== null">
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
        <input v-model="category.name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
      </div>
      <div class="mb-6">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <textarea v-model="category.description" type="text" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div class="mb-6">
        <label for="parent_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parent</label>
        <select v-model="category.parent_id" type="text" id="parent_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="null">Aucun</option>
          <option v-for="categoryDb in categories" :value="categoryDb.id">{{ categoryDb.name }}</option>
        </select>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormCategory',
  data() {
    return {
      category: {
        name: null,
        description: null,
        parent_id: null
      },
      isEdit: false
    }
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    }
  },
  methods: {
    onSubmit() {
      if (this.isEdit) {
        this.$store.dispatch('updateCategory', this.category).then(() => {
          this.$router.push('/admin/categories');
        });
      } else {
        this.$store.dispatch('createCategory', this.category).then(() => {
          this.$router.push('/admin/categories');
        });
      }
    }
  },
  created() {
    this.$store.dispatch('findAllCategories');
    if (this.$route.params.id) {
      this.$store.dispatch('findCategoryById', this.$route.params.id).then(() => {
        this.category = this.$store.getters.getCategory;
        this.isEdit = true;
      });
    }
  }
}
</script>