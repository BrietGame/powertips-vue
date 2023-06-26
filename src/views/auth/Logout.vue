<template>

</template>

<script>
export default {
  name: 'Logout',
  methods: {
    logout() {
      this.$store.dispatch('logout');
      localStorage.removeItem('token');
      this.$router.push('/login');
      this.$notify({
        title: 'Success',
        text: 'Vous êtes déconnecté',
        type: 'success'
      });
    }
  },
  mounted() {
    this.logout();
  }
}
</script>