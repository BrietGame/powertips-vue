<template>
  <div>
    <Table v-if="notes != null" :data="notes" />
    <Loading v-else />
    <div class="text-center mt-3">
      <button @click="refresh" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Actualiser la liste</button>
      <button @click="addNote" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ajouter une note</button>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: 'Notes',
  props: {
    user_id: Number
  },
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
            isEditable: false
          },
          {
            label: 'Score',
            type: 'text',
            isEditable: true
          },
          {
            label: 'User',
            type: 'text',
            isEditable: true
          },
          {
            label: 'Guide',
            type: 'text',
            isEditable: true
          }
        ],
        labels: ['Id', 'Score', 'User', 'Guide', 'Actions'],
        values: this.$store.getters.getNotes,
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
      if (this.user_id !== undefined) {
        this.$store.dispatch('findAllNotesByUserId', this.user_id);
      } else {
        this.$store.dispatch('findAllNotes');
      }
      setTimeout(() => {
        this.setNotes();
      }, 300)
    },
    addNote() {
      this.$router.push('/admin/notes/create');
    },
    deleteNote(id) {
      this.$store.dispatch('deleteNote', id);
      this.$router.push('/admin/notes');
    }
  },
  beforeUpdate() {
    if (this.$route.name === 'admin-notes-delete' && this.$route.params.id) {
      this.deleteNote(this.$route.params.id);
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>