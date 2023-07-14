<template>
  <div v-if="category != null">
    <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">{{ category.name }}</h1>
    <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Retrouvez tous les guides de la catégorie {{ category.name }} <span v-if="category.description != null"><br>{{ category.description }}</span></p>
    <section v-if="guides != null" class="flex justify-between">
      <GuideCard :guides="guides" />
    </section>
  </div>
  <Loading v-else />
</template>

<script>
import Loading from "@/components/Loading.vue";
import GuideCard from "@/components/GuideCard.vue";

export default {
  name: 'Category',
  components: {GuideCard, Loading},
  data () {
    return {
      category: null,
      guides: null
    }
  },
  methods: {
    getCategory() {
      this.$store.dispatch('findCategoryById', this.$route.params.id)
        .then(() => {
          this.category = this.$store.getters.getCategory
        })
    },
    getGuidesByCategory() {
      this.$store.dispatch('findAllGuidesByCategoryId', this.$route.params.id)
        .then(() => {
          this.guides = this.$store.getters.getGuidesForList
        })
    }
  },
  created() {
    this.getCategory()
    this.getGuidesByCategory()
  }
}
</script>