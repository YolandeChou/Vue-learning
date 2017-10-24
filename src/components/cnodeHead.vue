<template>
   <div class="head">
   	  <router-link to="/">
   	     <img src="../assets/cnodejs.svg" />
   	  </router-link>
   	  <el-button @click="dialogVisible=true">关于</el-button>
   	  <el-dialog title='Vue.js重写CnodeJS社区' v-model='dialogVisible' size='tiny'>
            <div class='dialogDiv'>
                <span>
                    <strong>作者: &nbsp;&nbsp;</strong>
                </span>
                <a href='https://shuirong.github.io/' target='_blank'>林水溶</a>
                </span>
                <br>
                <span>
                    <strong>源代码: &nbsp;&nbsp;</strong>
                </span>
                <a href='https://github.com/shuiRong/VueCnodeJS' target='_blank'>Github</a>
                <span class='star'>&nbsp;&nbsp;Star Star</span>
                <br>
                <br>
                <span>
                    <strong>技术栈: </strong>
                </span>
                <ul>
                    <li>Vue.js</li>
                    <li>Vue-router</li>
                    <li>Axios</li>
                    <li>Element</li>
                    <li>CnodeJS API</li>
                </ul>
            </div>
        </el-dialog>
   </div>
</template>

<script>
   export default{
     data() {
     	return {
     		dialogVisible: false
     	}
     }
   }
</script>

<style>
@import url("https://cdn.bootcss.com/element-ui/1.2.8/theme-default/index.css");
.head{
  height:3.6rem;
  width:100%;
  position:absolute;
  background-color:#ccc;
  top:0;
  left:0;
}
.head img{
  width:10rem;
  height:3.5rem;
  margin-left:10rem;
}
.head>button{
  float:right;
  padding:1rem;
  font-size:1rem;
  font-weight: bold;
}
.head .dialogDiv {
    font-size: 17px;
}

.head ul {
    margin-left: 1rem;
}

.head a {
    text-decoration: none;
    color: #13CE66;
}
</style>
