import './assets/main.css'
import '../src/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store} from "@/store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faCommentDots, faStar, faClock, faFilePen, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Notifications from '@kyvg/vue3-notification'
const app = createApp(App)

app.use(router)
app.use(store)
app.use(Notifications)
library.add(faEye, faCommentDots, faStar, faClock, faFilePen, faCircleCheck, faCircleXmark)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
