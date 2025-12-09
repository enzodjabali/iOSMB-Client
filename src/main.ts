import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from './directives'
import filters from './filters'
import axios from 'axios'
import VueNativeSock from 'vue-native-websocket-vue3'
import VueFeather from 'vue-feather'
import linkify from 'vue-linkify'
import jQuery from 'jquery'
import { longClickDirective } from 'vue-long-click'
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faThumbsUp, faThumbsDown, faLaughSquint, faExclamation, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import VueLazyImage from './components/@techassi/vue-lazy-image'

declare global {
  interface Window {
    $: JQueryStatic
    jQuery: JQueryStatic
  }
}

window.$ = jQuery
window.jQuery = jQuery

const app = createApp(App)
  .use(store)
  .use(router)

app.use(VueNativeSock, 'ws://', {
  format: 'json',
  reconnection: true,
  connectManually: true,
})

app.use(VueLazyImage)

library.add(faHeart as IconDefinition)
library.add(faThumbsUp as IconDefinition)
library.add(faThumbsDown as IconDefinition)
library.add(faLaughSquint as IconDefinition)
library.add(faExclamation as IconDefinition)
library.add(faQuestion as IconDefinition)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('font-awesome-layers', FontAwesomeLayers)
app.component('feather', VueFeather)

// Set axios defaults from store
axios.defaults.headers.common['Authorization'] = store.state.password
app.provide(
  '$http',
  axios.create({
    // For web, we don't need the https agent with rejectUnauthorized
    // Users can handle certificate issues through browser
  })
)

app.directive('linkified', linkify)
app.directive('longclick', longClickDirective({ delay: 800, interval: 0 }))

app.directive('click-outside', {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event: MouseEvent) => {
      const target = event.target as Element

      if (!(el == event.target || el.contains(event.target)) && !$('.emojiBtn').has(target).length) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: el => {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})

app.config.globalProperties.$filters = filters
directives(app)

app.mount('#app')

export default app
