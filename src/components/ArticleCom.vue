<template v-loading.lock="loading">
    <div class="secDiv">
    	<span>发布于：{{getTime}}</span>
        <router-link :to='{name:"UserRoute",params:{name:article.author.loginname}}'>
    	   <span>作者：{{ article.author.loginname }}</span>
    	</router-link>
    	<span>浏览量：{{ article.visit_count }}</span>
    	<span>来自：{{article.tab}}</span>
    	<h3>{{ article.title }}</h3>
    	<div class="content" v-html = 'article.content'></div>
    	<div v-for='(reply,index) of article.replies'>
             <router-link :to='{name:"UserRoute",params:{name:reply.author.loginname}}'>
                <img :src="reply.author.avatar_url" :title='reply.author.loginname' />
             </router-link>
             <h5>{{ reply.author.loginname }}</h5>
             <span>{{ replyTime }}</span>
             <span>
             	<icon class="thumbs-up" scale='4'></icon>
             	<span>{{ reply.ups.length }}</span>
             </span>
             <p v-html='reply.content'></p>
    	</div>
    </div>
</template>

<script>
export default{
	data() {
		return {
            article: {
                title: '',
                author: {
                    loginname: 'temp',
                },
                visit_count: '',
                tab: '',
                content: '',
                create_at: '2017-04-130000',
                replies: '',
            },
		}
	},
	computed:{
		getTime() {
           return String(this.article.create_at).match(/.{10}/)[0];
		},
		replyTime() {
			return String(this.article.create_at).match(/.{16}/)[0].replace(/.{2}/,'').replace(/[T]/,' ');
		}
	},
	beforeCreated() {
		this.$http({
			url:`https://cnodejs.org/api/v1${this.$route.path}`,
			method:'Get'
		}).then((res)=>{
			this.article = res.data.data;
		}).catch((res)=>{
			console.log(res);
		})
	}
}
</script>