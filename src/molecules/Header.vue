<template>
  <div class="header">
        <img src="../assets/jared.jpg" class="headshot">
        <div class="info">
            <router-link :to="'/'"><h3>"{{title}}": <strong>{{name}}</strong></h3></router-link>
            <p>{{tagline}}</p>
            <a v-bind:href="githubUrl"><img src="../assets/github.svg" alt="Github" class="icon"></a>
            <a v-bind:href="twitterUrl"><img src="../assets/twitter.svg" alt="Twitter" class="icon"></a>
        </div>
    </div>
</template>

<script>
export default {
    name: "header",
    props: ['title', 'name', 'tagline', 'github', 'twitter'],
    computed: {
        githubUrl: function() {
            return "https://github.com/" + this.github;
        },
        twitterUrl: function() {
            return "https://twitter.com/" + this.twitter;
        },
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
    margin: 1em 0em;

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
</style>
