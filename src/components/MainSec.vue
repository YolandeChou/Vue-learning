<template>
   <div class="secDiv" v-loading="loading">
   	  <div v-for="item of content" :key='item.id'>
   	  	 <router-link :to='{name:"UserRoute",params:{name:item.author.loginname}}'> 
   	  	 	<img :src='item.author.avatar_url' :title='item.author.loginname' />
   	  	 </router-link>
         <div class="textDiv">
     	  	 <router-link :to='{name:"ArticleRoute",params:{ id:item.id }}'>{{ item.title }}</router-link>
           <span>回复：{{ item.reply_count }}</span>
           <span>创建于：{{ getTime }}</span>
         </div>
   	  </div>
   </div>
</template>

<script>
console.log('Begin 1');
   export default{
   	data() {
   		return {
   			loading:true,
   			content:[],
   			limit: 0,
   			item: {
                create_at: '2017-02-22T11:32:43.547Z',
            },
   		}
   	},
   	methods: {
   	   scrollMethod() {
   	   	  const sumH = document.body.scrollHeight;
	        const viewH = document.documentElement.clientHeight;
	        const scrollH = document.body.scrollTop;
	        if (viewH + scrollH === sumH) {
	            this.getData();
	        }
   	   },
       getData() {
          this.limit+=10;
          this.$http({
          	url: 'https://cnodejs.org/api/v1/topics',
          	method: 'get',
          	params: {
          		page: 1,
          		limit: this.limit,
          		mdrender: false
          	},
          }).then((res) => {
          	this.content = res.data.data;
            console.log(content);
          }).catch((res) => {
          	console.log(res);
          })
       }
   	},
   	mounted() {
        window.addEventListener('scroll',this.scrollMethod);
   	},
   	computed:{
        getTime() {
        	return String(this.item.create_at).match(/.{10}/);
        }
   	},
   	created() {
       this.getData();
   	},
   	watch:{
       content(val) {
       	if(val) {
       		this.loading = false;
       	}
       }
   	}
   }
</script>

<style scoped>
.secDiv{
   width:60%;
}
.secDiv>div{
   display:flex;
   justify-content: flex-start;
   margin-top:1rem;
}
.secDiv img{
  width:6rem;
  height:6rem;
  padding-right:2rem;
}
.textDiv{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.textDiv a{
   font-weight: bold;
   text-decoration: none;
   color:#000;
}
.textDiv span{
  font-size: .8rem;
  padding-right:2rem;
  margin-top:1rem;
}
</style>
