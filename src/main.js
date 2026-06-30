import { Transition, createApp } from 'vue'
import router from './router'
import App from './App.vue'

import '@/assets/style.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)
app.component('Transition', Transition)
app.use(router)

app.mount('#app')
