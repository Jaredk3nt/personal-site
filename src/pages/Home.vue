<template lang="html">
    <div class="page">
        <div class="page-body small content">
            <ul class="posts">
                <li v-for="(post, id) in posts" class="post">
                    <div class="dates">
                        <h3>{{ " " + post.date }}</h3><h3 class="dark">{{ post.title }}</h3>
                    </div>
                    <router-link :to="'/blog/' + id"><h1>{{ post.subtitle }}</h1></router-link>
                    <p class="hint">{{post.content[0].body.substr(0, 100) + '...'}}</p>
                    <router-link :to="'/blog/' + id" class="seemore">READ</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
const blogPosts = require('../../static/blogPosts.json');

export default {
    name: 'Home',
    data: function() {
        return {
            posts: blogPosts
        }
    }
}
</script>

<style lang="scss">
@import '../main.scss';

.posts {
    padding: .5em 1em;
    .post {
        margin: 4em 0em;

        &:first-child {
            margin-top: 0em;
        }
        h1 {
            font-family: $sans-serif;
            margin: 0em 0em;
            color: $dark-blue;
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
            font-size: 1.2em !important;
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
