<template>
  <div>
    <Table v-if="categories != null" :data="categories" />
    <Loading v-else />
    <div class="text-center mt-3">
      <button @click="refresh" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Actualiser la liste</button>
      <button @click="addCategory" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ajouter une catégorie</button>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: 'Categories',
  components: {Loading, Table},
  data() {
    return {
      categories: null
    }
  },
  methods: {
    setCategories() {
      console.log("setCategories")
      this.categories = {
        models: [
          {
            label: 'Id',
            type: 'number',
            isEditable: false
          },
          {
            label: 'Name',
            type: 'text',
            isEditable: true
          },
          {
            label: 'Description',
            type: 'text',
            isEditable: true
          },
          {
            label: 'Parent Id',
            type: 'text',
            isEditable: true
          }
        ],
        labels: ['Id', 'Name', 'Description', 'Parent Id', 'Actions'],
        values: this.$store.getters.getCategories,
        actions: {
          view: {
            label: 'Voir',
            action: '/categories/'
          },
          edit: {
            label: 'Editer',
            action: '/admin/categories/edit/'
          },
          delete: {
            label: 'Supprimer',
            action: '/admin/categories/delete/'
          }
        }
      }
    },
    refresh() {
      this.categories = null;
      this.$store.dispatch('findAllCategories');
      setTimeout(() => {
        this.setCategories();
      }, 300)
    },
    addCategory() {
      this.$router.push('/admin/categories/create/');
    },
    deleteCategory(id) {
      this.$store.dispatch('deleteCategory', id);
    }
  },
  beforeUpdate() {
    if (this.$route.name === 'admin-categories-delete' && this.$route.params.id) {
      this.deleteCategory(this.$route.params.id);
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>