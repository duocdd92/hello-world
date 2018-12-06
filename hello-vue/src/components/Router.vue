<template>
  <div>
    <h1>Router testing</h1>
    <ul id="router-menu">
      <li><router-link to="/router/user/foo">foo</router-link></li>
      <li><router-link to="/router/user/bar">bar</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'RouterTest',
  created: function () {
    console.log('route', this.$route)
    console.log('router', this.$router)
    console.log('window.history', window.history)
  }
}
</script>

<style>
#router-menu li{
  text-align: left;
}

#router-menu li a{
  display: block;
  padding: 10px 20px;
}
</style>
