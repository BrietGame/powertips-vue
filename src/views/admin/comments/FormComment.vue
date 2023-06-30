<template>
  <div class="container">
    <h1 v-if="!isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Créer un commentaire</h1>
    <h1 v-if="isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Modifier le commentaire : {{ comment.id }}</h1>

    <form @submit.prevent="onSubmit" v-if="comment !== null">
      <div class="mb-6">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
        <textarea v-model="comment.content" type="text" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div class="mb-6">
        <label for="user_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User</label>
        <select v-model="comment.user_id" type="text" id="user_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="null">Aucun</option>
          <option v-for="userDb in users" :value="userDb.id">{{ userDb.username }}</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="guide_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Guide</label>
        <select v-model="comment.guide_id" type="text" id="guide_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="null">Aucun</option>
          <option v-for="guideDb in guides" :value="guideDb.id">{{ guideDb.title }}</option>
        </select>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormComment',
  data() {
    return {
      comment: {
        content: null,
        user_id: null,
        guide_id: null
      },
      isEdit: false
    }
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
    guides() {
      return this.$store.getters.getGuides;
    }
  },
  methods: {
    onSubmit() {
      if (this.isEdit) {
        this.$store.dispatch('updateComment', this.comment).then(() => {
          this.$router.push('/admin/comments');
        });
      } else {
        this.$store.dispatch('createComment', this.comment).then(() => {
          this.$router.push('/admin/comments');
        });
      }
    }
  },
  created() {
    this.$store.dispatch('findAllGuides');
    this.$store.dispatch('findAllUsers');
    if (this.$route.params.id) {
      this.$store.dispatch('findCommentById', this.$route.params.id).then(() => {
        this.comment = this.$store.getters.getComment;
        this.isEdit = true;
      });
    }
  }
}
</script>