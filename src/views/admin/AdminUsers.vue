<template>


  <Table v-if="users != null" :data="users" />
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  name: 'AdminUsers',
  components: {Table},
  data() {
    return {
      users: null,
      userSelected: null
    }
  },
  methods: {
    setUsers() {
      this.users = {
        models: [
          {
            label: 'Id',
            type: 'number',
            value: null,
            isEditable: false
          },
          {
            label: 'Email',
            type: 'email',
            value: 'email',
            isEditable: true
          },
          {
            label: 'Username',
            type: 'text',
            value: 'username',
            isEditable: true
          },
          {
            label: 'Roles',
            type: 'text',
            value: 'roles',
            isEditable: false
          }
        ],
        values: this.$store.state.users,
        actions: {
          edit: {
            label: 'Edit',
            action: (user) => {
              console.log(user)
            }
          },
          delete: {
            label: 'Delete',
            action: (user) => {
              console.log(user)
            }
          }
        },
        onSubmit: (user) => {
          console.log(user)
        }
      }
    },
  },
  mounted() {
    this.$store.dispatch('findAllUsers');
    setTimeout(() => {
      this.setUsers();
    }, 300)
  }
}
</script>