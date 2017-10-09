import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import './stylus/main.styl'
import store from './store'

Vue.use(Vuetify)
Vue.use(Vuex)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
