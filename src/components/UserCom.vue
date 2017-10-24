<template>
   <div class="secDiv" >
   	 <div class="profile" v-loading.lock='loading'>
     	 	<div>
     	 	   <img :src='userInfo.avatar_url' :title='userInfo.loginname' />
           <span>{{ userInfo.loginname }}</span>
     	 	</div>
     	 	
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
<style scoped>
.secDiv {
    padding: 0;
    box-sizing: border-box;
    border: none;
}

.profile {
    padding: 1rem;
    background: #EFF2F7;
    border-radius: 0.3rem;
}

.profile div {
    margin-bottom: 1.5rem;
}

.profile div span {
    font-size: 25px;
    color: black;
    margin-left: 1rem;
}

.profile p {
    display: flex;
    align-items: center;
    color: grey;
    margin: 0.5rem 0;
}

.profile p span {
    margin: 0 0.5rem;
    color: black;
}

.profile svg {
    color: black;
    margin-left: 0.2rem;
}
.replies,
.topics{
  margin-top:1.5rem;
  padding:1.2rem;
  background: #EFF2F7;
  border-radius: 1rem;
}
.replies>p,
.topics>p{
  font-weight:bold;
}
.replies img,
.topics img{
  width:5rem;
  height:5rem;
  padding-right:1rem;
}
.replies div,
.topics div{
  display:flex;
  align-items:center;
  margin:2rem 0;
  border-bottom:1px solid #ccc;
}
.replies div a,
.topics div a{
  color:#000;
  text-decoration: none;
}
</style>
