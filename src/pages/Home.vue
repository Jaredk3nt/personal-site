<template lang="html">
    <div class="page">
        <div class="page-body content">
            <h2>Blog Posts</h2>
            <ul id="v-for-object" class="demo">
                <li v-for="(post, id) in posts">
                    <router-link :to="'/blog/' + id"><h3>{{ post.title }}</h3></router-link>
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
</style>
