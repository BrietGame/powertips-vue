<template>
  <div>
    <Table v-if="categories != null" :data="categories" />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  name: 'Categories',
  components: {Table},
  data() {
    return {
      categories: null
    }
  },
  methods: {
    setCategories() {
      this.categories = {
        models: [
          {
            label: 'Id',
            type: 'number',
            value: this.$store.state.category !== null ? this.$store.state.categories.find(user => user.id === this.$store.state.category.id).id : null,
            isEditable: false
          },
          {
            label: 'Name',
            type: 'text',
            value: this.$store.state.category !== null ? this.$store.state.categories.find(user => user.id === this.$store.state.category.id).name : null,
            isEditable: true
          },
          {
            label: 'Description',
            type: 'text',
            value: this.$store.state.category !== null ? this.$store.state.categories.find(user => user.id === this.$store.state.category.id).description : null,
            isEditable: true
          },
          {
            label: 'Parent Id',
            type: 'text',
            value: this.$store.state.category !== null ? this.$store.state.categories.find(user => user.id === this.$store.state.category.id).parent_id : null,
            isEditable: true
          }
        ],
        labels: ['Id', 'Name', 'Description', 'Parent Id', 'Actions'],
        values: this.$store.state.categories,
        actions: {
          edit: {
            label: 'Edit',
            action: '/admin/categories/edit/'
          },
          delete: {
            label: 'Delete',
            action: '/admin/categories/delete/'
          }
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('findAllCategories');
    setTimeout(() => {
      this.setCategories();
    }, 300)
  }
}
</script>