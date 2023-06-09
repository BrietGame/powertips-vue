<template>
  <div class="container">
    <h1>Guides</h1>
    <Table v-if="guides != null" :data="guides" />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  name: 'Guides',
  components: {Table},
  data() {
    return {
      guides: null
    }
  },
  methods: {
    setGuides() {
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
            label: 'View',
            action: '/guides/'
          },
          edit: {
            label: 'Edit',
            action: '/edit-guide/'
          },
          delete: {
            label: 'Delete',
            action: '/my-guides/delete/'
          }
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('findAllGuides');
    setTimeout(() => {
      this.setGuides();
    }, 300)
  }
}
</script>