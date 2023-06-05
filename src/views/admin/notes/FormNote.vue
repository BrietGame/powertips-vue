<template>
  <div class="container">
    <h1 v-if="!isEdit">Créer une note</h1>
    <h1 v-if="isEdit">Modifier la note : {{ note.id }}</h1>

    {{ note }}
    <form @submit.prevent="onSubmit" v-if="note !== null">
      <div class="mb-6">
        <label for="score" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Score</label>
        <textarea v-model="note.score" type="number" id="score" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div class="mb-6">
        <label for="user_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User</label>
        <select v-model="note.user_id" type="text" id="user_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="null">Aucun</option>
          <option v-for="userDb in users" :value="userDb.id">{{ userDb.username }}</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="guide_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Guide</label>
        <select v-model="note.guide_id" type="text" id="guide_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
  name: 'FormNote',
  data() {
    return {
      note: {
        score: null,
        user_id: null,
        guide_id: null
      },
      isEdit: false
    }
  },
  computed: {
    users() {
      console.log(this.$store.getters.getUsers)
      return this.$store.getters.getUsers;
    },
    guides() {
      console.log(this.$store.getters.getGuides)
      return this.$store.getters.getGuides;
    }
  },
  methods: {
    onSubmit() {
      if (this.isEdit) {
        this.$store.dispatch('updateNote', this.note).then(() => {
          this.$router.push('/admin/notes');
        });
      } else {
        this.$store.dispatch('createNote', this.note).then(() => {
          this.$router.push('/admin/notes');
        });
      }
    }
  },
  created() {
    this.$store.dispatch('findAllGuides');
    this.$store.dispatch('findAllUsers');
    console.log(this.$route.params.id)
    if (this.$route.params.id) {
      this.$store.dispatch('findNoteById', this.$route.params.id).then(() => {
        this.note = this.$store.getters.getNote;
        this.isEdit = true;
        console.log(this.note)
      });
    }
  }
}
</script>