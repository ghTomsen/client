<template>
  <div>
      <div class="section">
          <div class="location">
              <span>当前位置：</span>
              <router-link to="/goods/list">首页</router-link>
          </div>
      </div>
      <List-top></List-top>
      <List-main></List-main>
  </div>
</template>
<script>
  import ListTop from "./common/Listtop.vue";
  import ListMain from "./common/Listmain.vue";
  export default{
    components: {
      ListTop,
      ListMain
    }
  }
  
</script>
<style>
</style>