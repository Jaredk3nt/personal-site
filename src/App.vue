<template>
    <div id="app" class="container">
        <div class="nav">
            <router-link :to="'/'">Home</router-link>
            <router-link :to="'/About'">About</router-link>
        </div>
        <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
@import './main.scss';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav {
    position: fixed !important;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    margin: 1em 0em 0em 1em;
    font-family: $sans-serif;

    @media only screen and (max-width : $screen-small) {
        margin: 0em;
        background: #fff;
        padding-left: 1.5em;

        -webkit-box-shadow: 0px 10px 32px -8px rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 10px 32px -8px rgba(0,0,0,0.25);
        box-shadow: 0px 10px 32px -8px rgba(0,0,0,0.25);
    }

    a {
        text-decoration: none;
        font-size: 1.25em;
        color: $yellow;
        display: block;
        margin-bottom: 1em;

        @media only screen and (max-width : $screen-small) {
          display: inline-block;
          margin: .5em 1em .5em 0em;
        }

        &:visited {
          color: $yellow;
        }
        &:hover {
          color: $dark-blue;
        }
    }
}
</style>
