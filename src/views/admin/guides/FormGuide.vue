<template>
  <div class="container">
    <h1 v-if="!isEdit">Créer un guide</h1>
    <h1 v-if="isEdit">Modifier le guide : {{ guide.name }}</h1>

    {{ guide }}
    <form @submit.prevent="onSubmit" v-if="guide !== null">
      <div class="mb-6">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
        <input v-model="guide.title" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
      </div>
      <div class="mb-6">
        <label for="excerpt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Excerpt</label>
        <input v-model="guide.excerpt" type="text" id="excerpt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
      </div>
      <div class="mb-6">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
        <textarea v-model="guide.content" type="text" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div class="mb-6">
        <label for="media" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Media</label>
        <input v-model="guide.media" type="text" id="media" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
      </div>
      <div class="mb-6">
        <label for="slug" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
        <input v-model="guide.stats" type="text" id="slug" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
      </div>
      <div class="mb-6">
        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
        <select v-model="guide.status" type="text" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          <option value="published">Publié</option>
          <option value="draft">Brouillon</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="parent_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
        <select v-model="guide.category_id" type="text" id="parent_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
  name: 'FormGuide',
  data() {
    return {
      guide: {
        title: null,
        excerpt: null,
        content: null,
        media: null,
        stats: null,
        status: null,
        category_id: null
      },
      isEdit: false
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
      console.log(this.guide)
      if (this.isEdit) {
        this.$store.dispatch('updateGuide', this.guide).then(() => {
          this.$router.push('/admin/guides');
        });
      } else {
        this.$store.dispatch('createGuide', this.guide).then(() => {
          this.$router.push('/admin/guides');
        });
      }
    }
  },
  created() {
    console.info('findAllGuides')
    this.$store.dispatch('findAllGuides');
    console.log(this.$route.params.id)
    if (this.$route.params.id) {
      console.info('findGuideById')
      this.$store.dispatch('findGuideById', this.$route.params.id).then(() => {
        this.guide = this.$store.getters.getGuide;
        this.isEdit = true;
        console.log(this.guide)
      });
    }
  }
}
</script>