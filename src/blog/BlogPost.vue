<template lang="html">
    <div class="page">
        <div class="blog-post content">
            <div class="header">
                <img src="../assets/jared.jpg" class="headshot">
                <div class="info">
                    <h3>Blog of Jared K. Jones</h3>
                    <p>CS 373 SWE</p>
                </div>
            </div>
            <h2>{{post.title}}</h2>
            <p>{{post.content}}</p>
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
@import url('https://fonts.googleapis.com/css?family=Open+Sans:600,700|PT+Serif');

.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3em;

    .blog-post {
        width: 60%;
        text-align: left;
        margin-bottom: 5em;

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

    p {
        white-space: pre-wrap;
        font-family: 'PT Serif', serif;
        font-size: 1.15rem;
    }
}
</style>
