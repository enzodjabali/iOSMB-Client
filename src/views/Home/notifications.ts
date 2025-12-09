import { reactive } from 'vue'
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from 'vue-router'
import { Store, useStore } from 'vuex'

interface NotificationOptions {
  title: string
  message: string
  sound: boolean
  icon?: Nullable<string>
}

let route: Nullable<RouteLocationNormalizedLoaded> = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: Nullable<Store<any>> = null
let router: Nullable<Router> = null

const state = reactive({
  notifSound: null as Nullable<HTMLAudioElement>,
})

const sendNotifierNotification = (options: NotificationOptions, messageData: { authorDocid: string; personId: string }) => {
  // Use Web Notifications API
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return
  }

  if (Notification.permission === 'granted') {
    showNotification(options, messageData)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showNotification(options, messageData)
      }
    })
  }
}

const showNotification = (options: NotificationOptions, messageData: { authorDocid: string; personId: string }) => {
  // Play notification sound if not using system sound
  if (!store?.state.systemSound && options.sound) {
    state.notifSound?.play()
  }

  // Don't show notification if window is focused and we're already in that chat
  if (document.hasFocus() && route?.params.id != messageData.personId) {
    return
  }

  const iconUrl = options.icon || `${store?.getters.httpURI}/contactimg?docid=${messageData.authorDocid}&auth=${encodeURIComponent(store?.state.password)}`

  const notification = new Notification(options.title, {
    body: options.message,
    icon: iconUrl,
    tag: messageData.personId,
  })

  notification.onclick = () => {
    window.focus()
    router?.push('/chat/' + messageData.personId)
    notification.close()
  }
}

export { state, sendNotifierNotification }

export default () => {
  store = useStore()
  route = useRoute()
  router = useRouter()

  return { state }
}
