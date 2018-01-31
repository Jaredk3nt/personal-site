<template lang="html">
    <div class="page no-margin">
        <Popup body="This blog was originally built in one day using Vuejs for my UT CS course CS373 weekly blog. If you want to see some of my other fun projects checkout the /About tab!"></Popup>
        <div class="page-body small content">
            <Header
                title="Programmable"
                name="Jared Jones"
                tagline="Computer Science student @ the University of Texas at Austin. I'm here to write about what I know and ask about what I don't."
                github="Jaredk3nt"
                twitter="Jaredk3nt">
            </Header>
            <div class="posts-title">Posts:</div>
            <ul class="posts">
                <li v-for="post in posts" class="post">
                    <router-link :to="'/blog/' + post['id']"><h1>{{ post.title }}</h1></router-link>
                    <div class="post-detail">{{post.date}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Popup from './Popup';
import Header from '../molecules/Header';
import marky from 'markyjs';
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
        Popup, Header
    }
}
</script>

<style lang="scss">
@import '../main.scss';
$border-grey: #dedede;

.posts-title {
    margin-top: .5em;
    color: $yellow;
    font-size: 1.75rem;
    font-family: $sans-serif;
    font-weight: 900;
}

.posts {
    .post {
        margin:0em;
        padding: 1em 0em;
        border-bottom: 1px solid $border-grey;

        &:first-child {
            margin-top: 0em;
            border-top: 1px solid $border-grey;
        }
        h1 {
            font-family: $sans-serif;
            margin: 0em 0em;
            color: $grey;
            font-weight: 900;
            font-size: 1.5rem;
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
        .post-detail {
            font-family: $sans-serif;
            color: #aaa;
            font-size: .9rem;
        }
    }
}
</style>
