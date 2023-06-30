<template>
  <div class="container">
    <h1 v-if="!isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Créer un guide</h1>
    <h1 v-if="isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Modifier le guide : {{ guide.name }}</h1>

    <form @submit.prevent="onSubmit" v-if="guide !== null">
      <div class="mb-6">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
        <input v-model="guide.title" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
      </div>
      <div class="mb-6">
        <label for="excerpt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Excerpt</label>
        <input v-model="guide.excerpt" type="text" id="excerpt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
      </div>
      <div class="mb-6">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contenu <span class="text-red-700">*</span></label>
        <Editor api-key="jvkkt0fcf302er790c5oht9l3eks48wtow8qjwn9c0z8gf6l"
                v-model="guide.content"
                :init="{
             height: 500,
             menubar: false,
             plugins: [
               'advlist autolink lists link image charmap print preview anchor',
               'searchreplace visualblocks code fullscreen',
               'insertdatetime media table paste code help wordcount',
               'image'
             ],
             toolbar:
               'undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help | image',
             location: '/uploads/guides/image/image.png'
           }"
                :class="guide.content === '' ? 'bg-red-50 border border-red-500 text-red-900' : guide.content === null ? '' : 'bg-green-50 border border-green-500 text-green-900'" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-6">
        <label for="media" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Media</label>
        <input v-model="guide.media" type="text" id="media" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
      </div>
      <div class="mb-6">
        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
        <select v-model="guide.status" type="text" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="PUBLISHED">Publié</option>
          <option value="WAITING">En attente de validation</option>
          <option value="DRAFT">Brouillon</option>
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
import Editor from "@tinymce/tinymce-vue";
export default {
  name: 'FormGuide',
  components: {
    Editor
  },
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
      return this.$store.getters.getCategories;
    }
  },
  methods: {
    onSubmit() {
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
    this.$store.dispatch('findAllGuides');
    if (this.$route.params.id) {
      this.$store.dispatch('findGuideById', this.$route.params.id).then(() => {
        this.guide = this.$store.getters.getGuide;
        this.isEdit = true;
      });
    }
  }
}
</script>