<template v-loading.lock="loading">
    <div class="secDiv">
    	<span>发布于：{{getTime}}</span>
        <router-link :to='{name:"UserRoute",params:{name:article.author.loginname}}'>
    	   <span>作者：{{ article.author.loginname }}</span>
    	</router-link>
    	<span>浏览量：{{ article.visit_count }}</span>
    	<span>来自：{{article.tab}}</span>
    	<h3>{{ article.title }}</h3>
    	<div class="content" id="content" v-html = 'article.content'></div>
        <div id="reply">
        	<div v-for='(reply,index) of article.replies' class="reply">
                 <router-link :to='{name:"UserRoute",params:{name:reply.author.loginname}}'>
                    <img :src="reply.author.avatar_url" :title='reply.author.loginname' />
                 </router-link>
                 <div>
                     <div class="replyInfo">
                         <span>{{ reply.author.loginname }}</span>
                         <span>{{ replyTime }}</span>
                         <span v-if='reply.ups.length > 0' class="thumbs">
                         	<icon name="thumbs-up" scale='4'></icon>
                         	<span>{{ reply.ups.length }}</span>
                         </span>
                    </div>
                     <p v-html='reply.content'></p>
                </div>
        	</div>
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
    watch: {
        article(val){
            if(val){
                this.loading =false;
            }
        }
    },
	 beforeCreate() {
        this.$http({
            url: `https://cnodejs.org/api/v1${this.$route.path}`,
            method: 'get',
        }).then((res) => {
            console.log(111,res);
            if (res.data.success === true) {
                this.article = res.data.data;
                this.$parent.authorName = this.article.author.loginname;
            } else {
                this.article = 'Sorry, Something wrong happened when getting the remote data';
            }
        }).catch((res) => {
            console.log('ArticleCom.vue: ', res);
        });
    },
}
</script>
<style scoped>
@import url('../assets/markdowm-github.css');
.secDiv{
    width:60%;
    padding:2rem;

}
.reply img{
    width:6rem;
    height:6rem;
}
#content {
    margin: 2rem auto 2rem auto;
    padding: 2rem 1rem 2rem 1rem;
    border: 1px solid #ddd;
    line-height: 1.6;
    padding-bottom: 1rem;
    background: #EFF2F7;
}

#reply {
    display: flex;
    flex-direction: column;
}

#reply img {
    width: 5rem;
    height: 5rem;
    margin-right: 1rem;
}
.reply{
    display:flex;
    padding:2rem 0;
    border-bottom:1px solid #ccc;
}
.reply>div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
    justify-content: space-around;
}
.replyInfo,.reply p{
    width:100%;
}
.replyInfo>span{
    font-size:0.8rem;
    color:#999;
    margin-right:2rem;
}
.replyInfo .thumbs{
    float:right;
}
</style>
