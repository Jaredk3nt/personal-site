<template>
    <div id="app" class="container">
        <div class="nav">
            <router-link :to="'/'">Home</router-link>
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
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700|PT+Serif');
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav {
    position: fixed !important;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    margin: 0em 2em;
    padding: .6em;

    a {
        text-decoration: none;
        font-size: 1.25em;

        &:hover {
            text-decoration: underline;
            color: #000;
        }
    }
}
</style>
