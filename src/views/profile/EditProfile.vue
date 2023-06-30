<template>
  <div>
    <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Modifier mon profil</h1>

    <form @submit.prevent="onSubmit">
      <div class="mb-6">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'utilisateur</label>
        <input v-model="username" type="text" id="title">
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
    </form>
  </div>
</template>

<script>
import {utils} from "@/utils";

export default {
  name: 'EditProfile',
  data() {
    return {
      username: '',
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    onSubmit() {
      this.user.username = this.username || this.user.username
      this.$store.dispatch('updateUser', this.user).then(() => {
        this.$notify({
          title: 'Succès',
          text: 'Votre profil a été mis à jour avec succès',
          type: 'success'
        });
      })
    }
  },
  created() {
    // Decode JWT token
    const decoded = utils.decodeToken();
    this.$store.dispatch('findUserById', decoded.id);
  }
}
</script>