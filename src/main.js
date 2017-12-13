// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Home from './pages/Home'
import BlogPost from './blog/BlogPost'
import Popup from './pages/Popup'
import CardRoot from './CardRoot';
import CardPage from './CardPage';
import Card from './Card';
import Collection from './Collection.vue';
import FilterButtons from './cards/FilterButtons.vue';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, Home, BlogPost, Popup, CardPage, Card, Collection, CardRoot }
})
