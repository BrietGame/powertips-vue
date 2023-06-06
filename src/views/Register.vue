<template>
  <h1>S'inscrire</h1>
  <form @submit.prevent="onSubmit">
    <div class="mb-6">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
      <p v-if="!emailCheck && emailCheck != null" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-bold">Adresse mail</span> déjà existante. Veuillez vous connecter</p>
    </div>
    <div class="mb-6">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
      <input v-model="username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
    </div>
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input @input="samePassword" v-model="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      <p v-if="!passwordCheck && passwordCheck != null" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-bold">Mot de passes</span> non identiques.</p>
      <p v-if="passwordCheck && passwordCheck != null" class="mt-2 text-sm text-green-600 dark:text-green-500"><span class="font-bold">Parfait !</span> Les mots de passes sont identiques.</p>
    </div>
    <div class="mb-6">
      <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input @input="samePassword" v-model="confirmPassword" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      <p v-if="!passwordCheck && passwordCheck != null" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-bold">Mot de passes</span> non identiques.</p>
      <p v-if="passwordCheck && passwordCheck != null" class="mt-2 text-sm text-green-600 dark:text-green-500"><span class="font-bold">Parfait !</span> Les mots de passes sont identiques.</p>
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
      confirmPassword: '',
      passwordCheck: null,
      emailCheck: null
    }
  },
  methods: {
    samePassword() {
      console.log(this.password === this.confirmPassword)
      this.password === this.confirmPassword ? this.passwordCheck = true : this.passwordCheck = false
    },
    async emailAlreadyExist () {
      await this.$store.dispatch('findUserByEmail', this.email)
      console.log('userByEmail', this.$store.getters.getUser)
      console.log(this.$store.getters.getUser != null)
      await this.$store.getters.getUser != null ? this.emailCheck = false : this.emailCheck = true
    },
    onSubmit() {
      this.emailAlreadyExist()
      if (this.email && this.username && this.password && this.confirmPassword) {
        console.log('emailCheck', this.emailCheck)
        console.log('passwordCheck', this.passwordCheck)
        if (this.emailCheck && this.passwordCheck) {
          console.log('register')
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
            text: 'Email already exists'
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