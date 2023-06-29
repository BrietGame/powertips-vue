<template>
  <div>
    <Table v-if="comments != null" :data="comments" />
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
  name: 'Comments',
  props: {
    user_id: Number
  },
  components: {Loading, Table},
  data() {
    return {
      comments: null
    }
  },
  methods: {
    setComments() {
      console.log("setComments")
      this.comments = {
        models: [
          {
            label: 'Id',
            type: 'number',
            value: this.$store.state.comment !== null ? this.$store.state.comments.find(user => user.id === this.$store.state.comment.id).id : null,
            isEditable: false
          },
          {
            label: 'Content',
            type: 'text',
            value: this.$store.state.comment !== null ? this.$store.state.comments.find(user => user.id === this.$store.state.comment.id).content : null,
            isEditable: true
          },
          {
            label: 'User',
            type: 'text',
            value: this.$store.state.comment !== null ? this.$store.state.comments.find(user => user.id === this.$store.state.comment.id).user_id : null,
            isEditable: true
          },
          {
            label: 'Guide',
            type: 'text',
            value: this.$store.state.comment !== null ? this.$store.state.comments.find(user => user.id === this.$store.state.comment.id).guide_id : null,
            isEditable: true
          }
        ],
        labels: ['Id', 'Content', 'User', 'Guide', 'Actions'],
        values: this.$store.state.comments,
        actions: {
          edit: {
            label: 'Editer',
            action: '/admin/comments/edit/'
          },
          delete: {
            label: 'Supprimer',
            action: '/admin/comments/delete/'
          }
        }
      }
    },
    refresh() {
      this.comments = null;
      if (this.user_id !== undefined) {
        this.$store.dispatch('findCommentsByUser', this.user_id);
      } else {
        this.$store.dispatch('findAllComments');
      }
      setTimeout(() => {
        this.setComments();
      }, 300)
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>