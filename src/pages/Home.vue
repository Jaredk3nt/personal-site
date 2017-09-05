<template lang="html">
    <div class="page">
        <div class="page-body content">
            <h2>Blog Posts</h2>
            <hr>
            <ul class="posts">
                <li v-for="(post, id) in posts">
                    <router-link :to="'/blog/' + id"><h3>{{ post.title }}</h3></router-link>
                    <p class="hint">{{post.content[0].body.substr(0, 200) + '...'}}</p>
                    <router-link :to="'/blog/' + id">See more...</router-link>
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
.posts {
    .hint {
        overflow: hidden;
        text-overflow: ellipsis;
    }
    p {
        font-size: 1em !important;
    }
}
@import '../main.scss';
</style>
