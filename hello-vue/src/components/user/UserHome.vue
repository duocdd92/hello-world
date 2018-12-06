<template>
  <div>
    <h2>User {{ userId }}</h2>
    <ul>
      <li><router-link :to="profileUrl">profile</router-link></li>
      <li><router-link :to="postsUrl">posts</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'UserHome',
  data: function () {
    return {
      userId: this.$route.params.userId,
      profileUrl: '/router/user/' + this.$route.params.userId + '/profile',
      postsUrl: '/router/user/' + this.$route.params.userId + '/posts'
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log('to', to)
      // console.log('from', from)
      this.userId = to.params.userId
      this.profileUrl = '/router/user/' + to.params.userId + '/profile'
      this.postsUrl = '/router/user/' + to.params.userId + '/posts'
    }
  }
}
</script>
