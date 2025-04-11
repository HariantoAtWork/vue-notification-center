// plugins/NotificationCenter/index.js
import Notification from './components/Notification.vue'
import NotificationCenter from './components/NotificationCenter.vue'
import notificationCenter from './notificationCenter'
import './scss/index.scss'

const provide = {
  nc: notificationCenter.methods
}
const components = {
  Notification,
  NotificationCenter
}
const plugin = {
  install(vueApp) {
    vueApp.component('NotificationCenter', NotificationCenter)
    vueApp.provide('nc', notificationCenter.methods)
    vueApp.config.globalProperties.$notify = notificationCenter.methods.addNotification
  }
}

export {
  plugin as default,
  notificationCenter,
  Notification,
  NotificationCenter,
  components,
  provide
}
