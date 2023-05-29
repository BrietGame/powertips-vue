<template>
  <div>test</div>
  <div>{{token}}</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      users: [],
      token: null,
    }
  },
  methods: {
    getToken() {
      this.$store.dispatch('auth', {
        email: 'alexis.briet2003@gmail.com',
        password: 'azerty'
      }).then(
        (response) => {
          this.token = response.data.token;
        }
      )
    },
  },
  mounted() {
    this.getToken();
  }
}
</script>