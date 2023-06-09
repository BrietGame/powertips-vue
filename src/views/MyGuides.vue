<template>
  <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Mes guides</h1>

  <Table v-if="guides != null" :data="guides" />
</template>

<script>
import {utils} from "@/utils";
import Table from "@/components/Table.vue";

export default {
  name: 'MyGuides',
  components: {Table},
  data() {
    return {
      guides: null
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
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
            label: 'Content',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).content : null,
            isEditable: true
          },
          {
            label: 'Media',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).media : null,
            isEditable: true
          },
          {
            label: 'Stats',
            type: 'text',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).stats : null,
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
            label: 'Crée le',
            type: 'date',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).created_at : null,
            isEditable: true
          },
          {
            label: 'Modifié le',
            type: 'date',
            value: this.$store.state.guide !== null ? this.$store.state.guides.find(guide => guide.id === this.$store.state.guide.id).updated_at : null,
            isEditable: true
          }
        ],
        labels: ['Id', 'Title', 'Excerpt', 'Content', 'Media', 'Stats', 'Status', 'User', 'Category', 'Création', 'Modification', 'Actions'],
        values: this.$store.getters.getGuides,
        actions: {
          view: {
            label: 'View',
            action: '/guides/'
          },
          edit: {
            label: 'Edit',
            action: '/my-guides/edit/'
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
    const decoded = utils.decodeToken();
    this.$store.dispatch('findUserById', decoded.id);
    this.$store.dispatch('findAllGuidesByUserId', decoded.id);
    setTimeout(() => {
      this.setGuides();
    }, 300)
  }
}
</script>