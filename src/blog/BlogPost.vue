<template lang="html">
    <div class="page">
        <div class="page-body content">
            <div class="blogpost">
                <div class="title">
                    <h2>{{post.title}}</h2>
                    <h4 v-if="post.subtitle != undefined">{{post.subtitle}}</h4>
                </div>
                <div class="header">
                    <img src="../assets/jared.jpg" class="headshot">
                    <div class="info">
                        <router-link :to="'/'"><h3>CS373 Fall 2017: <strong>Jared Jones</strong></h3></router-link>
                        <p>Computer Science student @ the University of Texas at Austin. I'm here to write about what I know and ask about what I don't.</p>
                        <a href="https://github.com/Jaredk3nt"><img src="../assets/github.svg" alt="Github" class="icon"></a>
                        <a href="https://twitter.com/Jaredk3nt"><img src="../assets/twitter.svg" alt="Twitter" class="icon"></a>
                    </div>
                </div>
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
            postList: blogPost["blogposts"]
        }
    },
    created: function() {
        //console.log(this.postList);
    },
    computed: {
        post: function() {
            for(var i in this.postList) {
                if( this.postList[i].id === this.$route.params.id) {
                    return this.postList[i];
                }
            }
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
    background: #f9f9f9;
    height: 200px;
    margin: 2em 0em;

    @media only screen and (max-width : $screen-small) {
        height: 100px;
        margin: 1em;
    }
    .headshot {
        display: inline-block;
        height: 200px;

        @media only screen and (max-width : $screen-small) {
            height: 100px;
        }
    }
    .info {
        padding: 1.2em 2em;

        @media only screen and (max-width : $screen-small) {
            padding: .5em 1em .5em 1em;
        }

        h3 {
            margin: .2em 0em;
            color: $grey;

            @media only screen and (max-width : $screen-medium) {
                font-size: 1.2rem;
            }
            @media only screen and (max-width : $screen-small) {
                font-size: 1rem;
            }
            strong {
                color: $yellow;
            }
        }

        p {
            margin: .1em 0em;
            font-size: 1.1rem;
            color: $grey;
            line-height: 1.5;

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
