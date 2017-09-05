<template lang="html">
    <div class="page">
        <div class="page-body content">
            <div class="home">
                <h2>Blog Posts</h2>
                <hr>
                <ul class="posts">
                    <li v-for="(post, id) in posts" class="post">
                        <router-link :to="'/blog/' + id"><h3>{{ post.title }}</h3></router-link>
                        <p class="hint">{{post.content[0].body.substr(0, 200) + '...'}}</p>
                        <router-link :to="'/blog/' + id" class="seemore">See more...</router-link>
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
}

.posts {

    .post {
        background: #f2f2f2;
        padding: 1em;
        border-radius: 5px;
        margin-bottom: 1em !important;

        .hint {
            overflow: hidden;
            text-overflow: ellipsis;
        }
        p {
            font-size: 1em !important;
        }

        .seemore {
            color: #3e70c1 !important;
        }
    }

}
@import '../main.scss';
</style>
