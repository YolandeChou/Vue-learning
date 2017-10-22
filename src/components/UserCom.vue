<template>
   <div class="secDiv" >
   	 <div class="profile" v-loading.lock='loading'>
     	 	<div>
     	 	   <img :src='userInfo.avatar_url' :title='userInfo.loginname' />
     	 	</div>
     	 	<span>{{ userInfo.loginname }}</span>
     	 	<p>
     	 	    <icon name="score" scale = 4></icon>
     	 	    <span>积分：</span>{{ userInfo.score }}
     	 	</p>
     	 	<p>
     	 	    <icon name="github" scale=4></icon>
     	 	    <span>Github：</span> https://github.com/{{ userInfo.loginname }}
     	 	</p>
     	 	<p>
     	 	    <icon name="time" scale=4></icon>
     	 	    <span>注册时间：</span>{{getTime( userInfo.create_at )}}
     	 	</p>
   	 </div>
     <div class="replies" v-loading.lock='loading'>
        <p>最近参与的话题</p>
        <template v-for='(item,index) of userInfo.recent_replies'>
            <div v-if='index < 4' :key = 'index'>
                <router-link :to = '{name:"UserRoute",params:{name:item.author.loginname}}'>
                   <img :src="item.author.avatar_url" :title = "item.author.loginname" />
                </router-link>
                <router-link :to='{name:"ArticleRoute",params:{id:item.id}}'><p>{{ item.title }}</p></router-link>
            </div>
        </template>
     </div>
     <div class="topics" v-loading.lock='loading'>
       <p>最近创建的话题</p>
       <template v-for="(item,index) of userInfo.recent_topics">
          <div :key = 'index' :v-if='index<5'>
             <router-link :to='{name:"UserRoute",params:{name:item.author.loginname}}'>
                <img :src="item.author.avatar_url" title="item.author.loginname"/>
             </router-link>
             <router-link :to='{name:"ArticleRoute",params:{id:item.id}}'>
                <p>{{item.title }}</p>
             </router-link>
          </div>
       </template>
     </div>
   </div>
</template>



<script>
export default{
	data() {
		return {
			userInfo:{
				create_at: '2014-08-29'
			},
			loading: true
		}
	},
	created() {
        this.$http({
        	url:`https://cnodejs.org/api/v1${this.$route.path}`,
        	method:'get',
        }).then((res) =>{
        	this.userInfo = res.data.data;
        }).catch((res) => {
        	console.log(res);
        })
	},
	methods: {
         getTime(time) {
            return String(time).match(/.{10}/)[0].replace(/.{2}/,'').replace(/[T]/,' ');
         }
	},
	beforeRouteUpdate(to,from,next) {
         this.$http({
         	url:`https://cnodejs.org/api/v1$(to.path)`,
         	method:'get',
         }).then((res) => {
         	this.userInfo = res.data.data;
         }).catch((res) => {
         	console.log(res);
         })
         next();
	},
	watch: {
       userInfo(val) {
       	if(val){
       		this.loading = false;
       	}
       }
	}
}
</script>