<template>
  <div v-if="guide != null">
    <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{{ guide.title }}</h1>
    <div class="metadata">
      <p>Publié le {{ guide.created_at == guide.updated_at ? formatDate(guide.created_at) : formatDate(guide.updated_at) }}</p>
      <ul>
        <li><font-awesome-icon :icon="['fas', 'eye']" /> {{guide.stats != null ? guide.stats.views : ''}}</li>
        <li><font-awesome-icon :icon="['fas', 'comment-dots']" /> {{ comments.length }}</li>
        <li v-if="note !== null"><font-awesome-icon v-for="n in Array.from({length: note})" :icon="['fa', 'star']" /></li>
      </ul>
    </div>
    <div v-if="author != null && userConnected !== null" class="flex flex-col items-center gap-3 text-center py-10">
      <div class="status">
        <span v-if="author.id == userConnected.id && guide.status == 'WAITING'" class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"><font-awesome-icon :icon="['fas', 'clock']" /> Attente de validation</span>
        <span v-if="author.id == userConnected.id && guide.status == 'DRAFT'" class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"><font-awesome-icon :icon="['fas', 'file-pen']" /> Brouillon</span>
        <span v-if="author.id == userConnected.id && guide.status == 'REFUSED'" class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"><font-awesome-icon :icon="['fas', 'circle-xmark']" /> Publication refusée</span>
        <span v-if="author.id == userConnected.id && guide.status == 'PUBLISHED'" class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"><font-awesome-icon :icon="['fas', 'circle-check']" /> Publication acceptée</span>
      </div>
      <RouterLink :to="'/edit-guide/' + guide.slug" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-w-[250px] sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Modifier mon guide
      </RouterLink>
    </div>
    <Loading v-else />

    <section class="flex-col flex md:justify-evenly md:flex-row">
      <div class="content flex-3">
        <div v-html="guide.content"></div>
      </div>
      <div v-if="author != null" class="author flex flex-col items-center flex-1 min-w-[200px]">
        <div class="avatar">
          <img class="w-32 h-32 rounded-3xl" :src="author.avatar" :alt="author.username" />
        </div>
        <div class="infos">
          <h2 class="text-xl font-bold">{{ author.username }}</h2>
        </div>
      </div>
      <Loading v-else />
    </section>

    <section class="py-10">
      <h2 class="text-2xl font-bold mb-4">Commentaires</h2>
      <div class="py-5">
        <p>Donnez une note</p>
        <div class="flex items-center">
          <font-awesome-icon v-for="(n, i) in Array.from({length: 5})" :icon="['fa', 'star']" @click="addNote(i)" />
        </div>
      </div>
      <form @submit.prevent="onSubmitComment" v-if="userConnected">
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
      <p class="ml-auto text-xs text-gray-500 dark:text-gray-400">Votre commentaire doit respecter les <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">règles de la communauté</a>.</p>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
      <div v-if="comments != null" class="py-4" v-for="comment in comments">
        <div class="author flex gap-2 items-center">
          <div class="avatar">
            <img class="w-10 h-10 rounded-3xl" :src="comment.user.avatar" :alt="comment.user.username" />
          </div>
          <div class="infos">
            <h2 class="text-xl font-bold">{{ comment.user.username }}</h2>
          </div>
        </div>
        <div class="py-2" v-html="comment.content"></div>
      </div>
      <Loading v-else />

      <button @click="reportGuide" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        <font-awesome-icon :icon="['fas', 'flag']" /> Signaler le guide
      </button>
    </section>
  </div>
  <Loading v-else />
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Loading from "@/components/Loading.vue";

export default {
  name: 'GuideDetails',
  components: {Loading, FontAwesomeIcon},
  data() {
    return {
      newComment: null,
      guide: null
    }
  },
  computed: {
    note() {
      return this.$store.getters.getMoyNote;
    },
    comments() {
      return this.$store.getters.getComments !== undefined ? this.$store.getters.getComments : null;
    },
    author() {
      return this.$store.getters.getUsers.find(user => user.id === this.guide.user_id);
    },
    userConnected() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    formatDate(date) {
      let dateFormated = new Date(date);
      return dateFormated.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    },
    addNote(i) {
      this.$store.dispatch('createNote', {
        score: i + 1,
        guide_id: this.guide.id,
        user_id: this.$store.getters.getUser.id
      }).then(() => {
        this.$notify({
          title: 'Note ajoutée',
          text: 'Votre note a bien été ajoutée !',
          type: 'success'
        });
      });
    },
    onSubmitComment() {
      if (this.newComment != null && this.$store.getters.getUser != null) {
        this.$store.dispatch('createComment', {
          content: this.newComment,
          guide_id: this.guide.id,
          user_id: this.$store.getters.getUser.id
        }).then(() => {
          this.newComment = null;
          this.$store.dispatch('findAllCommentsByGuideId', this.guide.id);
        });
      } else {
        this.$notify({
          title: 'Erreur',
          text: 'Vous devez être connecté pour poster un commentaire !',
          type: 'error'
        });
      }
    },
    reportGuide() {
      this.$store.dispatch('createReport', {
        guide_id: this.guide.id,
        user_id: this.$store.getters.getUser.id
      }).then(() => {
        this.$notify({
          title: 'Guide signalé',
          text: 'Le guide a bien été signalé !',
          type: 'success'
        });
      });
    }
  },
  mounted() {
    if (this.$route.params.slug !== null) {
      this.$store.dispatch('findGuideBySlug', this.$route.params.slug).then(() => {
        this.guide = this.$store.getters.getGuide;
        if (this.guide === null) {
          this.$router.push('/guides');
        }
        // Ajouter une vue au guide
        this.guide.stats = JSON.parse(this.guide.stats);
        if (this.guide.stats == null) {
          this.guide.stats = {
            views: 0
          }
        }
        this.guide.stats.views = this.guide.stats.views + 1;
        this.guide.stats = JSON.stringify(this.guide.stats)
        this.$store.dispatch('updateGuide', this.guide);
        // Transformer un json en objet
        this.guide.stats = JSON.parse(this.guide.stats);

        this.$store.dispatch('findAllUsers');
        this.$store.dispatch('findNoteMoyenneByGuideId', this.guide.id);
        this.$store.dispatch('findAllCommentsByGuideId', this.guide.id);
      });
    } else {
      this.$router.push('/guides');
    }
  }
}
</script>