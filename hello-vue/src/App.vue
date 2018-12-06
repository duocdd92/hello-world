<template>
  <div id="app">
    <ul id="menu">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/core-testing">Core</router-link></li>
      <li><router-link to="/router">Router</router-link></li>
    </ul>
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#menu li{
  text-align: left;
}

#menu li a{
  display: block;
  padding: 10px 20px;
}

.router-link-exact-active{
  background-color: #f63131;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}
</style>
