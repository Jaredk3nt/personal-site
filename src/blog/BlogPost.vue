<template lang="html">
    <div class="page">
        <div class="page-body blogpost content">
            <div class="header">
                <img src="../assets/jared.jpg" class="headshot">
                <div class="info">
                    <h3>CS373 Fall 2017: Jared Jones</h3>
                </div>
            </div>
            <h2>{{post.title}}</h2>
            <h4 v-if="post.subtitle != undefined">{{post.subtitle}}</h4>
            <ul>
                <li v-for="paragraph in post.content">
                    <h5>{{paragraph.title}}</h5>
                    <p>{{paragraph.body}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
const blogPost = require('../../static/blogPosts.json');

export default {
    name: 'BlogPost',
    props: [],
    data: function() {
        return {
            post: blogPost[this.$route.params.id]
        }
    }
}
</script>

<style lang="scss">
@import '../main.scss';
.header {
    display: flex;
    align-items: flex-start;
    flex-direction: row;

    .headshot {
        display: inline-block;
        height: 200px;
    }

    .info {
        margin-left: 2em;

        h3 {
            margin: .2em 0em;
        }

        p {
            margin: .1em 0em;
        }
    }
}

.blogpost {
    ul {
        margin: 0em;
        padding: 0em;
        list-style: none;
    }

}
</style>
