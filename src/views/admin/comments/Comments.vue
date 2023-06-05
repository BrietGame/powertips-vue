<template>
  <div class="container">
    <h1>Commentaires</h1>
    <Table v-if="comments != null" :data="comments" />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  name: 'Comments',
  components: {Table},
  data() {
    return {
      comments: null
    }
  },
  methods: {
    setComments() {
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
            label: 'Edit',
            action: '/admin/comments/edit/'
          },
          delete: {
            label: 'Delete',
            action: '/admin/comments/delete/'
          }
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('findAllComments');
    setTimeout(() => {
      this.setComments();
    }, 300)
  }
}
</script>