<template>
  <div id="app">
    <Header/>
    <Charts/>
  </div>
</template>

<script>
import Charts from './components/Charts'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header,
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
