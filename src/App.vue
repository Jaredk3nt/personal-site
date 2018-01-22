<template>
    <div id="app" class="container">
        <div class="nav" v-if="isCards">
            <router-link :to="'/'">Home</router-link>
            <router-link :to="'/About'">About</router-link>
            <router-link :to="'/cards'">Cards</router-link>
        </div>
        <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  computed : {
    isCards : function() {
      // let bool = true;
      // if((this.$route.path !== '/Cards') || (this.$route.path !== '/cardcollection')) {
      //   bool = false;
      // }
      console.log(this.$route.path);
      return this.$route.path.substring(0,6) !== '/cards';
    }
  }
}
</script>

<style lang="scss">
@import './main.scss';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background: #fff;
}
</style>
