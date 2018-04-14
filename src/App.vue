<template>
  <div id="app">
    <Charts/>
  </div>
</template>

<script>
import Charts from './components/Charts'

export default {
  name: 'App',
  components: {
    Charts
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
