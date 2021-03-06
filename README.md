# Vue-learning
## 2017.10.20 
从九月分开始找工作，发觉自己在Vue方面还是实践经验不足~所以从今天开始记录自己的学习过程，来帮助自己成长。
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

上面是vue-router的官方例子，router主要是为了在单页面上某些链接，可达到页面区域内容的切换效果。<br>
首先是1.在html中router-link定义实现路由的链接，to属性后接路由地址；2.定义router-view，用于渲染路由的内容。<br>
然后在javascript中添加路由界面：1.定义需要路由的模块内容并赋予名字，方便使用；2.实例化VueRouter对象，其中routes为路由地址下的
具体实现哪个播版内容——path：路由地址，对应<route-link>中的路由地址，点击对应的<route-link>可实现该部分的路由；component：渲染的内容。js最后一句
用于将实例化的router应用于id为app的对象中.<br>
一个页面中可有多个router-view渲染，如下：
```html
  <router-view class="view one"></router-view>
  <router-view class="view two" name="a"></router-view>
  <router-view class="view three" name="b"></router-view>
```
用name属性可进行不同渲染部分的区分，没有name的则用default代替。
```javascript
 components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
```
对于渲染内容的定义，可用name名来区分定义，这样就清晰多了~


## 2017.10.21
今天在看别人的项目中，看到了axios，可以实现js中ajax的功能。
```javascript
this.$http({
                url: 'https://cnodejs.org/api/v1/topics',
                method: 'get',
                params: {
                    page: 1,
                    limit: this.limit,
                    mdrender: 'false',
                },
            }).then((res) => {
                this.content = res.data.data;
                //console.log(res,this.content);
            }).catch((res) => {
                console.log('MaiSec.vue: ', res);
            });
```
作者先import了axios，然后定义Vue.prototype.$http为axios,方便我们平时的写码习惯。可以看到，url定义的是一个外域，所以说这个功能还是想但方便的呢，其中的catch部分主要是用来捕获失败后的信息，总体来说和ajax用法很像，也很方便，应该是更加方便。<br>
不过params参数选项不太清楚了，可能后台有相应的参数选择，以后对cnode再多了解下应该能解答这个问题了。<br><br>
在vue中插入小图标可以使用vue-svg-icon，svg图片来源它有推荐一个<a href="http://www.iconfont.cn/plus">iconfont</a>,里面还有表情呐~先看一下怎么用，首先肯定是要npm安装下，然后在main.js里面引入：
```javascript
import Icon from 'vue-svg-icon/Icon';

Vue.component('icon',Icon);
```
把需要用得到svg放到src\svg目录下面，在需要用得到的地方印入如下即可：
```html
 <icon name='github' scale='4'></icon>
```
name属性为需要用到图片的名字，scale表视图的大小规模。
## 2017.10.22
上传了这几天一直在做一个vue的练习，主要实现的是从服务器获取文章界面，作者信息等内容，为单页面结构。里面用到了之前提到的vue-router,axios等，通过这段时间的练习呢，我对webpack和Vue也有了更深的认识。这个作品还没有添加样式，所以暂时看来有点丑，哈哈，不过我会很快给他装扮起来的。

## 2017.10.24
昨天生日给自己放了半天假，哈哈，不过还是把第一个完整的vue小项目搞完了。需要说的是，当我第一次按下npm run-dev的时候，一场篇的错误提醒代码，全是来自eslint Rules的，好吧，不得不承认我的代码是有随意的地方，我也确实不太在意在function括号后面空格。所以在调试的时候就默默的把eslint rules给删除了。现在看来，确实给自己提了个醒，以后还会敲更多代码，所以应当规范自己的代码习惯，下次我会默默的加进来的~<br>
这里插一个我觉得还挺好的垂直居中的方法，在做对话框之类的定高页面挺好用的：
```html
<style rel="stylesheet">

.main{
  width:100%;
  height:500px;
  background-color:pink;
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%)
}
.box{
  width:50px;
  height:50px;
  background-color: black;
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
</style>
<body>
<div class="main">
  <div class="box"></div>
</div>
```
今天打算开始啃下一个项目了，是一个单页面的新闻网页，除了用到Vue-router,axios,还涉及到了VueX,Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。我简单的理解为一个状态的在、集中处理中心，比如顾客点击购买以后，所有涉及物品数量会统一改变。关于VueX的内容，我会在多读几遍官方文档、熟悉官方文档例子后再做详细记录。


