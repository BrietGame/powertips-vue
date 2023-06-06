<template>
  <div>
    <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{{ guide.title }}</h1>
    <div class="metadata">
      <p>Publié le {{ guide.created_at == guide.updated_at ? formatDate(guide.created_at) : formatDate(guide.updated_at) }}</p>
      <ul>
        <li><font-awesome-icon :icon="['fas', 'eye']" /> vue</li>
        <li><font-awesome-icon :icon="['fas', 'comment-dots']" /> {{ comments.length }}</li>
        <li v-if="note !== null"><font-awesome-icon v-for="n in Array.from({length: note})" :icon="['fa', 'star']" /></li>
      </ul>
    </div>
    <div class="status text-center py-10">
      <span v-if="guide.status == 'WAITING'" class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"><font-awesome-icon :icon="['fas', 'clock']" /> Attente de validation</span>
      <span class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"><font-awesome-icon :icon="['fas', 'file-pen']" /> Brouillon</span>
      <span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"><font-awesome-icon :icon="['fas', 'circle-xmark']" /> Publication refusée</span>
      <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"><font-awesome-icon :icon="['fas', 'circle-check']" /> Publication acceptée</span>
    </div>

    <section class="flex justify-between">
      <div class="content">
        <div v-html="guide.content"></div>
      </div>
      <div class="author flex flex-col items-center">
        <div class="avatar">
          <img class="w-32 h-32 rounded-3xl" :src="author.avatar" :alt="author.username" />
        </div>
        <div class="infos">
          <h2 class="text-xl font-bold">{{ author.username }}</h2>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-4">Commentaires</h2>

      <form @submit.prevent="onSubmitComment" v-if="this.$store.getters.getUser != null">
        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" class="sr-only">Ton commentaire</label>
            <textarea v-model="newComment" id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Écrit un commentaire..." required></textarea>
          </div>
          <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Publier mon commentaire
            </button>
          </div>
        </div>
      </form>
      <p class="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>

      <div class="py-4" v-for="comment in comments">
        <div class="author flex gap-2 items-center">
          <div class="avatar">
            <img class="w-10 h-10 rounded-3xl" :src="author.avatar" :alt="author.username" />
          </div>
          <div class="infos">
            <h2 class="text-xl font-bold">{{ author.username }}</h2>
          </div>
        </div>
        <div class="py-2" v-html="comment.content"></div>
      </div>
    </section>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: 'GuideDetails',
  components: {FontAwesomeIcon},
  data() {
    return {
      newComment: null
    }
  },
  computed: {
    guide() {
      return this.$store.getters.getGuide;
    },
    note() {
      console.log('getMoyNote', this.$store.getters.getMoyNote)
      return this.$store.getters.getMoyNote !== undefined ? Math.min(this.$store.getters.getMoyNote, 5) : null;
    },
    comments() {
      return this.$store.getters.getComments !== undefined ? this.$store.getters.getComments : null;
    },
    author() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    formatDate(date) {
      let dateFormated = new Date(date);
      return dateFormated.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    },
    onSubmitComment() {
      if (this.newComment != null) {
        this.$store.dispatch('createComment', {
          content: this.newComment,
          guide_id: this.guide.id,
          user_id: this.$store.getters.getUser.id
        }).then(() => {
          this.newComment = null;
          this.$store.dispatch('findAllCommentsByGuidId', this.$route.params.id);
        });
      }
    }
  },
  created() {
    if (this.$route.params.id !== null) {
      this.$store.dispatch('findGuideById', this.$route.params.id).then(() => {
        if (this.guide === null) {
          this.$router.push('/guides');
        }
        console.log('findUserById', this.guide.user_id)
        this.$store.dispatch('findUserById', this.guide.user_id);
      });
      this.$store.dispatch('findNoteMoyenneByGuideId', this.$route.params.id);
      this.$store.dispatch('findAllCommentsByGuidId', this.$route.params.id);
    } else {
      this.$router.push('/guides');
    }
  }
}
</script>