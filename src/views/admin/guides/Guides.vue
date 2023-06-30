<template>
  <div>
    <Table v-if="guides != null" :data="guides" />
    <Loading v-else />
    <div class="text-center mt-3">
      <button @click="refresh" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Actualiser la liste</button>
      <button @click="addGuide" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ajouter un guide</button>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: 'Guides',
  props: {
    user_id: Number
  },
  components: {Loading, Table},
  data() {
    return {
      guides: null
    }
  },
  methods: {
    setGuides() {
      console.log("setGuides")
      this.guides = {
        models: [
          {
            label: 'Id',
            type: 'number',
            isEditable: false
          },
          {
            label: 'Title',
            type: 'text',
            isEditable: true
          },
          {
            label: 'Slug',
            type: 'text',
            isEditable: true
          },
          {
            label: 'Status',
            type: 'text',
            isEditable: true
          },
          {
            label: 'User',
            type: 'text',
            isEditable: true
          },
          {
            label: 'Category',
            type: 'text',
            isEditable: true
          },
          {
            label: 'Actualisation',
            type: 'date',
            isEditable: true
          }
        ],
        labels: ['Id', 'Title', 'Status', 'Slug', 'User', 'Catégorie(s)', 'Date', 'Actions'],
        values: this.$store.getters.getGuidesForList,
        actions: {
          view: {
            label: 'Voir',
            action: '/guides/'
          },
          edit: {
            label: 'Editer',
            action: '/admin/guides/edit/'
          },
          delete: {
            label: 'Supprimer',
            action: '/admin/guides/delete/'
          }
        }
      }
    },
    refresh() {
      this.guides = null;
      if (this.user_id !== undefined) {
        this.$store.dispatch('findAllGuidesByUserId', this.user_id);
      } else {
        this.$store.dispatch('findAllGuides');
      }
      this.$store.dispatch('findAllGuides');
      setTimeout(() => {
        this.setGuides();
      }, 300)
    },
    addGuide() {
      this.$router.push('/admin/guides/create');
    },
    deleteGuide(id) {
      this.$store.dispatch('deleteGuide', id);
      this.$router.push('/admin/guides');
    }
  },
  beforeUpdate() {
    if (this.$route.name === 'admin-guides-delete' && this.$route.params.slug) {
      // On récupère l'id du guide à supprimer à partir du slug
      this.$store.dispatch('findGuideBySlug', this.$route.params.slug).then(() => {
        this.deleteGuide(this.$store.getters.getGuide.id);
      });
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>