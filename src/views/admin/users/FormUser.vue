<template>
  <div class="container">
    <h1 v-if="!isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Créer un utilisateur</h1>
    <h1 v-if="isEdit" class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Modifier l'utilisateur : {{ user.email }}</h1>

    <form @submit.prevent="onSubmit" v-if="user !== null">
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse mail</label>
        <input v-model="user.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
      </div>
      <div class="mb-6" v-if="!isEdit">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
        <input v-model="user.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      </div>
      <div class="mb-6">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'utilisateur</label>
        <input v-model="user.username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormUser',
  data() {
    return {
      user: {
        email: null,
        username: null
      },
      isEdit: false
    }
  },
  methods: {
    onSubmit() {
      if (this.isEdit) {
        this.$store.dispatch('updateUser', this.user).then(() => {
          this.$router.push('/admin/users');
        });
      } else {
        this.$store.dispatch('createUser', this.user).then(() => {
          this.$router.push('/admin/users');
        });
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.$store.dispatch('findUserById', this.$route.params.id).then(() => {
        this.user = this.$store.getters.getUser;
        this.isEdit = true;
      });
    }
  }
}
</script>