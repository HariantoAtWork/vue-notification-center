import { createApp } from 'vue'
import App from './App.vue'
import './styles/variables.css'
import NotificationCenter from '@notification-center/vue-notification-center.es.js'
import '@notification-center/vue-notification-center.es.css'

const app = createApp(App)
app.use(NotificationCenter)
app.mount('#app')
