<template>
  <h1>S'inscrire</h1>
  <form @submit.prevent="onSubmit">
    <div class="mb-6">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
    </div>
    <div class="mb-6">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
      <input v-model="username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
    </div>
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input v-model="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    </div>
    <div class="mb-6">
      <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input v-model="confirmPassword" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.email && this.username && this.password && this.confirmPassword) {
        if (this.password === this.confirmPassword) {
          this.$store.dispatch('register', {
            email: this.email,
            username: this.username,
            password: this.password,
            roles: 'USER'
          })
        } else {
          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'Error',
            text: 'Passwords do not match'
          })
        }
      } else {
        this.$notify({
          group: 'auth',
          type: 'error',
          title: 'Error',
          text: 'Please fill in all fields'
        })
      }
    }
  }
}
</script>