<template>
  <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">S'inscrire</h1>

  <form @submit.prevent="onSubmit">
    <div class="mb-6">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse mail</label>
      <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
      <p v-if="!emailCheck && emailCheck != null" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-bold">Adresse mail</span> déjà existante. Veuillez vous connecter</p>
    </div>
    <div class="mb-6">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'utilisateur</label>
      <input v-model="username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="DoeJohn76" required>
    </div>
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
      <input @input="samePassword" v-model="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      <p v-if="!passwordCheck && passwordCheck != null" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-bold">Mot de passes</span> non identiques.</p>
      <p v-if="passwordCheck && passwordCheck != null" class="mt-2 text-sm text-green-600 dark:text-green-500"><span class="font-bold">Parfait !</span> Les mots de passes sont identiques.</p>
    </div>
    <div class="mb-6">
      <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmer votre mot de passe</label>
      <input @input="samePassword" v-model="confirmPassword" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      <p v-if="!passwordCheck && passwordCheck != null" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-bold">Mot de passes</span> non identiques.</p>
      <p v-if="passwordCheck && passwordCheck != null" class="mt-2 text-sm text-green-600 dark:text-green-500"><span class="font-bold">Parfait !</span> Les mots de passes sont identiques.</p>
    </div>
    <div class="max-w-lg mx-auto flex flex-col gap-6">
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Créer mon compte</button>
      <RouterLink to="/login">
        <button type="submit" class="w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">J'ai un compte. Se connecter</button>
      </RouterLink>
    </div>
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
      await this.$store.getters.getUser != null ? this.emailCheck = false : this.emailCheck = true
    },
    async onSubmit() {
      await this.emailAlreadyExist()
      if (this.email && this.username && this.password && this.confirmPassword) {
        if (this.emailCheck && this.passwordCheck) {
          this.$store.dispatch('register', {
            email: this.email,
            username: this.username,
            password: this.password,
            roles: ['ROLE_USER']
          })
          this.$router.push('/login')
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Compte créé avec succès'
          })
        } else {
          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'Error',
            text: 'L\'email existe déjà'
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