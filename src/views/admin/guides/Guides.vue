<template>
  <div>
    <Table v-if="guides != null" :data="guides" />
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
  name: 'Guides',
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
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).id : null,
            isEditable: false
          },
          {
            label: 'Title',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).title : null,
            isEditable: true
          },
          {
            label: 'Excerpt',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).excerpt : null,
            isEditable: true
          },
          {
            label: 'Status',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).status : null,
            isEditable: true
          },
          {
            label: 'User',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).user_id : null,
            isEditable: true
          },
          {
            label: 'Category',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).category_id : null,
            isEditable: true
          },
          {
            label: 'Actualisation',
            type: 'date',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).created_at : null,
            isEditable: true
          }
        ],
        labels: ['Id', 'Title', 'Excerpt', 'Status', 'User', 'Catégorie(s)', 'Date', 'Actions'],
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
      this.$store.dispatch('findAllGuides');
      setTimeout(() => {
        this.setGuides();
      }, 300)
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>