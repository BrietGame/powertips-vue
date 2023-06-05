<template>
  <div class="container">
    <h1>Notes</h1>
    <Table v-if="notes != null" :data="notes" />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  name: 'Notes',
  components: {Table},
  data() {
    return {
      notes: null
    }
  },
  methods: {
    setNotes() {
      this.notes = {
        models: [
          {
            label: 'Id',
            type: 'number',
            value: this.$store.state.note !== null ? this.$store.state.notes.find(user => user.id === this.$store.state.note.id).id : null,
            isEditable: false
          },
          {
            label: 'Score',
            type: 'text',
            value: this.$store.state.note !== null ? this.$store.state.notes.find(user => user.id === this.$store.state.note.id).score : null,
            isEditable: true
          },
          {
            label: 'User',
            type: 'text',
            value: this.$store.state.note !== null ? this.$store.state.notes.find(user => user.id === this.$store.state.note.id).user_id : null,
            isEditable: true
          },
          {
            label: 'Guide',
            type: 'text',
            value: this.$store.state.note !== null ? this.$store.state.notes.find(user => user.id === this.$store.state.note.id).guide_id : null,
            isEditable: true
          }
        ],
        labels: ['Id', 'Score', 'User', 'Guide', 'Actions'],
        values: this.$store.state.notes,
        actions: {
          edit: {
            label: 'Edit',
            action: '/admin/notes/edit/'
          },
          delete: {
            label: 'Delete',
            action: '/admin/notes/delete/'
          }
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('findAllNotes');
    setTimeout(() => {
      this.setNotes();
    }, 300)
  }
}
</script>