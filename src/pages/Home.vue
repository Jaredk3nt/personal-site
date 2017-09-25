<template lang="html">
    <div class="page">
        <div class="page-body small content">
            <div class="home">
                <ul class="posts">
                    <li v-for="(post, id) in posts" class="post">
                        <h3>{{ post.title }}</h3>
                        <router-link :to="'/blog/' + id"><h1>{{ post.subtitle }}</h1></router-link>
                        <p class="hint">{{post.content[0].body.substr(0, 100) + '...'}}</p>
                        <router-link :to="'/blog/' + id" class="seemore">READ</router-link>
                    </li>
                </ul>
            </div>
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

.home {
    padding: .5em 1em;

    h2 {
        color: #e9ac00;
    }
    hr {
        height: 3px;
        background: #577b90;
        border: none;
    }
}

.posts {

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
        h3 {
            margin: 0em;
            color: $yellow;
            font-size: 1em;
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
