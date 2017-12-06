<template>
    <div id="app" class="container">
        <div class="nav" v-if="$route.path !== '/Cards'">
            <router-link :to="'/'">Home</router-link>
            <router-link :to="'/About'">About</router-link>
            <router-link :to="'/Cards'">Cards</router-link>
        </div>
        <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import './main.scss';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}
</style>
