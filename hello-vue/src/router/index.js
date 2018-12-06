import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Core from '@/components/Core'
import RouterTest from '@/components/Router'
import UserHome from '@/components/user/UserHome'
import UserProfile from '@/components/user/UserProfile'
import UserPosts from '@/components/user/UserPosts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/core-testing',
      name: 'Core',
      component: Core
    },
    {
      path: '/router',
      name: 'RouterTest',
      component: RouterTest,
      children: [
        {
          path: 'user/:userId',
          name: 'UserHome',
          component: UserHome,
          children: [
            {
              path: 'profile',
              name: 'UserProfile',
              component: UserProfile
            },
            {
              path: 'posts',
              name: 'UserPosts',
              component: UserPosts
            }
          ]
        }
      ]
    }
  ]
})
