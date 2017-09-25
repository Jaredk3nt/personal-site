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
</style>
