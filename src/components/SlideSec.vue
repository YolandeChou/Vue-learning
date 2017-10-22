<template>
    <div class="secDiv">
    	<router-view :to='{name:"UserRoute",params:{name:userInfo.loginname}}'>
    	   <img :src="userInfo.avatar_url" :title="userInfo.loginname" />
    	   <span>{{ userInfo.loginname }}</span>
    	</router-view>
    	<icon name="score" scale="4"></icon>{{ userInfo.score}}
    	<icon name="github" scale="4"></icon>https://github.com/{{ userInfo.loginname }}
    </div>
</template>

<script>
   export default{
   	data() {
   		return {
   			loading:true,
   			userInfo:{}
   		}
   	},
   	beforeCreated(){
   		this.$http({
   			url:`https://cnodejs.org/api/v1/user/${this.$route.path}`,
   			method:'get',
   		}).then((res)=>{
           this.userInfo = res.data.data;
   		}).catch((res)=>{
   			console.log(res);
   		})
   	},
   	watch:{
   		userInfo(val){
   			if(val){
   				this.loading = false;
   			}
   		}
   	}
   }
</script>