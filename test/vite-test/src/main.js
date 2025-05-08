import { createApp } from 'vue'
import App from './App.vue'
import NotificationCenter from '@vue-notification-center/vue-notification-center.esm.js'
import '@vue-notification-center/vue-notification-center.esm.css'

const app = createApp(App)
app.use(NotificationCenter)
app.mount('#app')
