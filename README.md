# Vue-learning
##2017.10.20
从九月分开始找工作，发觉自己在Vue方面还不是吃的很透，所以狠下心来好好补补，从今天开始记录，来帮助自己成长。
```html
<div id="app">
  <p>
    <router-link to="/user/foo">/user/foo</router-link>
    <router-link to="/user/foo/profile">/user/foo/profile</router-link>
    <router-link to="/user/foo/posts">/user/foo/posts</router-link>
  </p>
  <router-view></router-view>
</div>
```
```javascript
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const UserHome = { template: '<div>Home</div>' }
const UserProfile = { template: '<div>Profile</div>' }
const UserPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { path: '', component: UserHome },
				
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: UserPosts }
      ]
    }
  ]
})

const app = new Vue({ router }).$mount('#app')
```

上面是vue-router的官方例子，router主要是为了在单页面上某些链接，可达到页面区域内容的切换效果。首先是1.在html中router-link定义实现路由的链接，
to属性后接路由地址；2.定义router-view，用于渲染路由的内容。<br>
然后在javascript中添加路由界面：1.定义需要路由的模块内容并赋予名字，方便使用；2.实例化VueRouter对象，其中routes为路由地址下的
具体实现哪个播版内容——path：路由地址，对应<route-link>中的路由地址，点击对应的<route-link>可实现该部分的路由；component：渲染的内容。js最后一句
用于将实例化的router应用于id为app的对象中
