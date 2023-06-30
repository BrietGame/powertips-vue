<template>
  <div v-if="guide != null">
    <h1 v-if="!isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Créer un guide</h1>
    <h1 v-if="isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Modifier le guide</h1>

    <form @submit.prevent="onSubmit">
      <div class="mb-6">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre <span class="text-red-700">*</span></label>
        <input v-model="title" type="text" id="title" :class="title === '' ? 'bg-red-50 border border-red-500 text-red-900' : title === null ? '' : 'bg-green-50 border border-green-500 text-green-900'" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Comment réaliser de bonnes pâtes carbonara ?" required>
      </div>
      <div class="mb-6">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contenu <span class="text-red-700">*</span></label>
        <Editor api-key="jvkkt0fcf302er790c5oht9l3eks48wtow8qjwn9c0z8gf6l"
          v-model="content"
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
          :class="content === '' ? 'bg-red-50 border border-red-500 text-red-900' : content === null ? '' : 'bg-green-50 border border-green-500 text-green-900'" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-6">
        <label for="excerpt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Extrait</label>
        <textarea v-model="excerpt" type="text" id="excerpt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
      <div class="mb-6">
        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
        <select v-model="guide.status" type="text" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="WAITING">En attente de validation</option>
          <option value="DRAFT">Brouillon</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="category_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sélectionnez une catégorie <span class="text-red-700">*</span></label>
        <select v-model="category_id" id="category_id" :class="category_id === '' ? 'bg-red-50 border border-red-500 text-red-900' : category_id === null ? '' : 'bg-green-50 border border-green-500 text-green-900'" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
    </form>
  </div>
  <Loading v-else />
</template>

<script>
import {utils} from "@/utils";
import Loading from "@/components/Loading.vue";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: 'CreateGuide',
  components: {Loading, Editor},
  data() {
    return {
      title: null,
      content: null,
      excerpt: null,
      category_id: null,
      status: null,
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
      if (this.$route.params.slug) {
        this.$store.dispatch('updateGuide', {
          id: this.$store.getters.getGuide.id,
          title: this.title,
          content: this.content,
          excerpt: this.excerpt,
          category_id: this.category_id,
          slug: this.$store.getters.getGuide.slug,
          user_id: utils.decodeToken().id
        }).then(() => {
          this.$notify({
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
          user_id: utils.decodeToken().id,
          status: this.status === 'WAITING' ? 'WAITING' : 'DRAFT'
        }).then(() => {
          this.$notify({
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
    if (this.$route.params.slug) {
      this.$store.dispatch('findGuideBySlug', this.$route.params.slug).then((res) => {
        console.log(this.$store.getters.getGuide)
        this.title = this.$store.getters.getGuide.title;
        this.content = this.$store.getters.getGuide.content;
        this.excerpt = this.$store.getters.getGuide.excerpt;
        this.category_id = this.$store.getters.getGuide.category_id;
        this.isEdit = true;
      });
    }
  }
}
</script>