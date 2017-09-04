<template lang="html">
    <div class="page">
        <div class="page-body content">
            <p>Temporary Home Page for jaredjones.me</p>
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
@import url('https://fonts.googleapis.com/css?family=Open+Sans:600,700|PT+Serif');
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3em;

    .page-body {
        width: 60%;
        text-align: left;

        ul {
            list-style: none;
            li {
                margin: 0em;
            }
        }

        a {
            text-decoration: none;

            &:hover {
                text-decoration: underline;
                color: #000;
            }
        }
    }
}

.content {
    h2 {
        font-family: 'Open Sans', sans-serif;
        font-weight: 700;
        font-size: 2.5rem;
        color: #3e70c1;
        margin: .4em 0em;
    }

    h3 {
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        font-size: 1.5rem;
        color: #000;
        margin: .2em 0em;
    }

    p {
        white-space: pre-wrap;
        font-family: 'PT Serif', serif;
        font-size: 1.15rem;
        margin: .2em 0em;
    }
}
</style>
