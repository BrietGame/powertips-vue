<template>
  <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Mes guides</h1>
  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
  <Table v-if="guides != null && guides.values.length > 0" :data="guides" />
  <section v-else-if="guides != null && guides.values.length === 0" class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Aucune publication</h1>
      <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">N'hésitez pas dès maintenant à partager vos meilleurs guides à la communauté..</p>
      <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <RouterLink to="/create-guide" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
          Créer mon premier guide
          <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </RouterLink>
        <RouterLink to="/about" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
          En savoir plus
        </RouterLink>
      </div>
    </div>
  </section>
  <Loading v-else />

</template>

<script>
import {utils} from "@/utils";
import Table from "@/components/Table.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: 'MyGuides',
  components: {Loading, Table},
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
            action: '/edit-guide/',
          },
          delete: {
            label: 'Delete',
            action: '/my-guides/delete/'
          }
        }
      }
    },
    deleteGuide(id) {
      console.log("delete guide" + id)
      this.$store.dispatch('deleteGuide', id);
      this.refreshGuides();
    },
    refreshGuides() {
      const decoded = utils.decodeToken();
      this.$store.dispatch('findAllGuidesByUserId', decoded.id);
      setTimeout(() => {
        this.setGuides();
      }, 300)
    }
  },
  mounted() {
    const decoded = utils.decodeToken();
    this.$store.dispatch('findUserById', decoded.id);
    this.refreshGuides();
    if (this.$route.name === 'delete-guide') {
      this.deleteGuide(this.$route.params.id);
    }
  }
}
</script>