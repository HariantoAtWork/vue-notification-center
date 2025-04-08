import notificationCenter from './observables/notificationCenter'
const plugin = {
    install(Vue, options = {}) {
        Vue.$notificationCenter = notificationCenter
        Vue.prototype.$notificationCenter = notificationCenter
    }
}

export default plugin