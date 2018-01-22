<template lang="html">
    <div class="page">
        <Popup body="This blog was build in one day using Vuejs for my UT CS course CS373 weekly blog extra credit. If you want to see some of my other fun projects checkout the /About tab!"></Popup>
        <div class="page-body small content">
            <ul class="posts">
                <li v-for="post in posts" class="post">
                    <div class="dates">
                        <h3>{{ " " + post.date }}</h3>
                    </div>
                    <router-link :to="'/blog/' + post['id']"><h1>{{ post.title }}</h1></router-link>
                    <router-link :to="'/blog/' + post['id']"><p>View post >></p></router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Popup from './Popup'
import marky from 'markyjs'
const blogPosts = require('../../static/posts.json');

export default {
    name: 'Home',
    data: function() {
        return {
            posts: blogPosts["posts"]
        }
    },
    methods: {
        hintMaker: function(text) {
            return marky(text) + '...';
        } 
    },
    components: {
        Popup
    }
}
</script>

<style lang="scss">
@import '../main.scss';

.posts {
    padding: .5em 1em;
    .post {
        margin: 2em 0em;
        padding: 1em 1.5em;
        box-shadow: 0px 0px 15px rgba(0,0,0,.09);

        &:first-child {
            margin-top: 0em;
        }
        h1 {
            font-family: $sans-serif;
            margin: 0em 0em;
            color: $grey;
            font-weight: 900;
        }
        .dates {
            h3 {
                margin: 0em 1em 0em 0em;
                color: $yellow;
                font-size: 1em;
                display: inline-block;

                &.dark {
                    color: $grey;
                }
            }     
        }
        .hint {
            overflow: hidden;
            text-overflow: ellipsis;
        }
        p {
            font-size: 1em !important;
            color: $grey;
            margin: .2em;
            font-family: $sans-serif;
        }
        .seemore {
            color: $dark-blue !important;
            font-weight: 700;
            font-family: $sans-serif;

            &:hover {
                color: $grey;
            }
        }
    }
}
</style>
