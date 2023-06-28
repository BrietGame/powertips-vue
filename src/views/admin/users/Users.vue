<template>
  <div>
    <Table v-if="users != null" :data="users" />
    <Loading v-else />
    <div class="text-center mt-3">
      <button @click="refresh" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Actualiser la liste</button>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: 'Users',
  components: {Loading, Table},
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
            isEditable: false
          },
          {
            label: 'Email',
            type: 'email',
            isEditable: true
          },
          {
            label: 'Username',
            type: 'text',
            isEditable: true
          },
          {
            label: 'Roles',
            type: 'text',
            isEditable: false
          }
        ],
        labels: ['Id', 'Email', 'Username', 'Roles', 'Action'],
        values: this.$store.getters.getUsers,
        actions: {
          view: {
            label: 'Voir',
            action: '/users/'
          },
          edit: {
            label: 'Editer',
            action: '/admin/users/edit/'
          },
          delete: {
            label: 'Supprimer',
            action: '/admin/users/delete/'
          }
        }
      }
    },
    refresh() {
      this.users = null;
      this.$store.dispatch('findAllUsers');
      setTimeout(() => {
        this.setUsers();
      }, 300)
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>