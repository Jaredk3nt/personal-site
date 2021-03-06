import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home.vue';
import BlogPost from '../blog/BlogPost.vue';
import About from '../pages/About.vue';
import Resume from '../pages/Resume.vue';
import CardRoot from '../CardRoot.vue';
import CardPage from '../CardPage.vue';
import Collection from '../Collection.vue';
import CharacterCards from '../cards/CharacterCards.vue';

Vue.use(Router)

export default new Router({
	mode: 'history',
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/blog/:id', component: BlogPost },
        { path: '/About', name: 'About', component: About },
        { path: '/Resume', name: 'Resume', component: Resume },
        { path: '/cards', name: 'cards', component: CardRoot,
            children: [
                {
                    path: '',
                    component: CardPage
                },
                {
                    path: 'collection',
                    component: Collection
                },
                {
                    path: 'character/:name',
                    component: CharacterCards,
                    props: true
                }
            ]    
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
})
