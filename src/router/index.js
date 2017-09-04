import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home.vue'
import BlogPost from '../blog/BlogPost.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/blog/:id', component: BlogPost }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
