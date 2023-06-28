<template>
  <div>
    <Table v-if="notes != null" :data="notes" />
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
  name: 'Notes',
  components: {Loading, Table},
  data() {
    return {
      notes: null
    }
  },
  methods: {
    setNotes() {
      console.log("setNotes")
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
            label: 'Editer',
            action: '/admin/notes/edit/'
          },
          delete: {
            label: 'Supprimer',
            action: '/admin/notes/delete/'
          }
        }
      }
    },
    refresh() {
      this.notes = null;
      this.$store.dispatch('findAllNotes');
      setTimeout(() => {
        this.setNotes();
      }, 300)
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>