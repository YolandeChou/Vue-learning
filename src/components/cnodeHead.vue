<template>
   <div class="head">
   	  <router-link to="/">
   	     <img src="../assets/cnodejs.svg" />
   	  </router-link>
   	  <el-button @click="dialogVisible=true">关于</el-button>
   	  <el-dialog titile="Yolande's Test" v-model="dialogVisible">
   	     <div class="dialog">
   	     	<span>作者：</span>
   	     	<a href="#">Yolande</a>
   	     	<span>代码源：</span>
   	     	<span>技术栈</span>
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