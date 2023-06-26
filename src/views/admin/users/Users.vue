<template>
  <div>
    <Table v-if="users != null" :data="users" />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  name: 'Users',
  components: {Table},
  data() {
    return {
      users: null
    }
  },
  methods: {
    setUsers() {
      this.users = {
        models: [
          {
            label: 'Id',
            type: 'number',
            value: this.$store.state.user !== null ? this.$store.state.users.find(user => user.id === this.$store.state.user.id).id : null,
            isEditable: false
          },
          {
            label: 'Email',
            type: 'email',
            value: this.$store.state.user !== null ? this.$store.state.users.find(user => user.id === this.$store.state.user.id).email : null,
            isEditable: true
          },
          {
            label: 'Username',
            type: 'text',
            value: this.$store.state.user !== null ? this.$store.state.users.find(user => user.id === this.$store.state.user.id).username : null,
            isEditable: true
          },
          {
            label: 'Roles',
            type: 'text',
            value: this.$store.state.user !== null ? this.$store.state.users.find(user => user.id === this.$store.state.user.id).roles : null,
            isEditable: false
          }
        ],
        labels: ['Id', 'Email', 'Username', 'Roles', 'Action'],
        values: this.$store.state.users,
        actions: {
          edit: {
            label: 'Edit',
            action: '/admin/users/edit/'
          },
          delete: {
            label: 'Delete',
            action: '/admin/users/delete/'
          }
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('findAllUsers');
    setTimeout(() => {
      this.setUsers();
    }, 300)
  }
}
</script>