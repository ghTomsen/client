<template>
  <div id="appHeader">
    <div id="header" class="header">
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>vue2.0单页应用</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <a href="/login.html">登录</a>
            <a href="/register.html">注册</a>
            <router-link :to="{ name: 'shopCart' }">
              <i class="iconfont icon-cart"></i>
              <span>购物车({{$store.getters.total}})</span>
           </router-link>
          </div>
        </div>
      </div>

    </div>
    <router-link @click.native="logout" to="">退出</router-link>

  </div>
</template>
<script>
  export default {
    methods: {
      logout() {
        this.$http.get(this.$api.logout).then(res => {
          if (res.data.status == 0) {
            this.$router.push({ name: 'login' });
          } else {
            this.$alert(res.data.message);
          }
        });
      }
    }
  }
</script>
<style>
</style>