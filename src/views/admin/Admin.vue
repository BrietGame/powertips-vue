<template>
  <div class="container">
    <h1>Admin</h1>

    <Table v-if="users != null" :data="users" />
    <Table v-if="guides != null" :data="guides"/>
    <Table v-if="categories != null" :data="categories"/>
    <Table v-if="notes != null" :data="notes"/>
    <Table v-if="comments != null" :data="comments"/>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  name: 'Admin',
  components: {Table},
  data() {
    return {
      users: null,
      guides: null,
      categories: null,
      notes: null,
      comments: null
    }
  },
  methods: {
    setUsers() {
      console.log(this.$store.state.user !== null)
      console.info(this.$store.state.users.find(user => user.id === this.$store.state.user.id))
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
    setGuides() {
      this.guides = {
        labels: ['Id', 'Title', 'Excerpt', 'Content', 'Media', 'Stats', 'Status', 'Category', 'Crée', 'Modifié', 'Action'],
        values: this.$store.state.guides
      }
    },
    setCategories() {
      this.categories = {
        labels: ['Id', 'Name', 'Description', 'Parent_id', 'Action'],
        values: this.$store.state.categories
      }
    },
    setNotes() {
      this.notes = {
        labels: ['Id', 'Score', 'User', 'Guide', 'Action'],
        values: this.$store.state.notes
      }
    },
    setComments() {
      this.comments = {
        labels: ['Id', 'Content', 'User', 'Guide', 'Crée', 'Action'],
        values: this.$store.state.comments
      }
    }
  },
  mounted() {
    this.$store.dispatch('findAllUsers');
    this.$store.dispatch('findAllGuides');
    this.$store.dispatch('findAllCategories');
    this.$store.dispatch('findAllNotes');
    this.$store.dispatch('findAllComments');
    setTimeout(() => {
      this.setUsers();
      this.setGuides();
      this.setCategories();
      this.setNotes();
      this.setComments();
    }, 300)
  },
  beforeUpdate() {
    console.log('beforeUpdate')
    console.log(this.$store.state.user)
    this.setUsers();
    this.setGuides();
    this.setCategories();
    this.setNotes();
    this.setComments();
  }
}
</script>