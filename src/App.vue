<template>
  <div id="app">
    <cnode-head></cnode-head>
    <router-view name="main"></router-view>
    <router-view name="side"></router-view>
  </div>
</template>

<script>
import cnodeHead from './components/cnodeHead'

export default {
  name: 'app',
  components: {
    cnodeHead
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
