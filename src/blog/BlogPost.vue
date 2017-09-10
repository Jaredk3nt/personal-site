<template lang="html">
    <div class="page">
        <div class="page-body content">
            <div class="header">
                <img src="../assets/jared.jpg" class="headshot">
                <div class="info">
                    <router-link :to="'/'"><h3>CS373 Fall 2017: Jared Jones</h3></router-link>
                    <p>Computer Science student @ the University of Texas at Austin</p>
                    <a href="https://github.com/Jaredk3nt"><img src="../assets/github.svg" alt="Github" class="icon"></a>
                    <a href="https://twitter.com/Jaredk3nt"><img src="../assets/twitter.svg" alt="Twitter" class="icon"></a>
                </div>
            </div>
            <div class="blogpost">
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
    background: #f5f5f5;
    border-radius: 5px;
    height: 200px;
    margin: 0em 2em 2em 2em;

    @media only screen and (max-width : $screen-small) {
        height: 100px;
        margin: 1em;
    }

    .headshot {
        display: inline-block;
        height: 200px;
        border-radius: 5px 0px 0px 5px;

        @media only screen and (max-width : $screen-small) {
            height: 100px;
        }
    }

    .info {
        padding: 2em;

        @media only screen and (max-width : $screen-small) {
            padding: .5em 1em .5em 1em;
        }

        h3 {
            margin: .2em 0em;

            @media only screen and (max-width : $screen-medium) {
                font-size: 1.2rem;
            }

            @media only screen and (max-width : $screen-small) {
                font-size: 1rem;
            }
        }

        p {
            margin: .1em 0em;
            font-size: 1.1rem;

            @media only screen and (max-width : $screen-medium) {
                font-size: .95rem;
            }

            @media only screen and (max-width : $screen-small) {
                display: none;
            }
        }

        .icon {
            height: 25px;
            margin: .5em .35em;

            @media only screen and (max-width : $screen-medium) {
                height: 20px;
            }
        }
    }
}

.blogpost {
    //background: #fff;
    padding: .5em 2em;
    border-radius: 5px;

    @media only screen and (max-width : $screen-small) {
        padding: .5em 1em;
    }

    ul {
        margin: 0em;
        padding: 0em;
        list-style: none;
    }

}
</style>
