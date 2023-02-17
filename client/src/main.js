import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-theme.min.css'
import './assets/css/fontAwesome.css'
import './assets/css/light-box.css'
import './assets/css/templatemo-style.css'





const store = createStore({
    state () {
      return {
        statusOverly: false,
        statusModal: false,
        statusBackground: true,
      }
    }
  })

createApp(App).use(router).use(store).mount('#app')
