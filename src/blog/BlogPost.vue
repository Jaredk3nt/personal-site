<template lang="html">
    <div class="page">
        <div class="page-body content">
            <div class="blogpost">
                <div class="title">
                    <h2>{{post.title}}</h2>
                </div>
                <Header
                    title="Programmable"
                    name="Jared Jones"
                    tagline="Computer Science student @ the University of Texas at Austin. I'm here to write about what I know and ask about what I don't."
                    github="Jaredk3nt"
                    twitter="Jaredk3nt">
                </Header>
                <div class="post-body" v-html="postBody"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../molecules/Header';
import marky from 'markyjs';
const posts = require('../../static/posts.json');

export default {
    name: 'BlogPost',
    props: [],
    data: function() {
        return {
            postList: posts["posts"],
        }
    },
    computed: {
        post: function() {
            for(var i in this.postList) {
                if( this.postList[i].id === this.$route.params.id) {
                    return this.postList[i];
                }
            }
        },
        postBody: function() {
            return marky(this.post.content);
        }
    },
    components: {
        Header
    }
}
</script>

<style lang="scss">
@import '../main.scss';

.blogpost {
    padding: .5em 2em;
    border-radius: 5px;
    color: #333;

    @media only screen and (max-width : $screen-small) {
        padding: .5em 1em;
    }
    .title {
        text-align: center;

        h2 {
            font-family: $serif;
            font-size:3rem;
            line-height: .5;
            margin-bottom: .25em;
            color: #333;
        }
        h4 {
            font-family: $sans-serif;
            font-weight: 700;
            font-size: 2rem;
            color: $dark-blue;
        }
    }
    ul {
        margin: 0em;
        padding: 0em;
        list-style: none;

        li {
            h5 {
                font-size: 1.4rem;
                text-align: center;
                margin-top: 2em;
            }
        }
    }
}
</style>
