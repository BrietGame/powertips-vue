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
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(user => user.id === this.$store.state.guide.id).id : null,
            isEditable: false
          },
          {
            label: 'Title',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(user => user.id === this.$store.state.guide.id).title : null,
            isEditable: true
          },
          {
            label: 'Excerpt',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(user => user.id === this.$store.state.guide.id).excerpt : null,
            isEditable: true
          },
          {
            label: 'Content',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(user => user.id === this.$store.state.guide.id).content : null,
            isEditable: true
          },
          {
            label: 'Media',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(user => user.id === this.$store.state.guide.id).media : null,
            isEditable: true
          },
          {
            label: 'Stats',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(user => user.id === this.$store.state.guide.id).stats : null,
            isEditable: true
          },
          {
            label: 'Status',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(user => user.id === this.$store.state.guide.id).status : null,
            isEditable: true
          },
          {
            label: 'Category',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(user => user.id === this.$store.state.guide.id).category_id : null,
            isEditable: true
          }
        ],
        labels: ['Id', 'Title', 'Excerpt', 'Content', 'Media', 'Stats', 'Status', 'Category', 'Actions'],
        values: this.$store.state.guides,
        actions: {
          edit: {
            label: 'Edit',
            action: '/admin/guides/edit/'
          },
          delete: {
            label: 'Delete',
            action: '/admin/guides/delete/'
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