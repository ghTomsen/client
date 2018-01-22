<template>
  <div>
    <div v-for="item in goodsgroup" :key="item.level1cateid" class="section">

      <!--子类-->
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <router-link v-for="subtitle in item.level2catelist" :key="subtitle.subcateid" to="">{{subtitle.subcatetitle}}</router-link>
          <a href="/goods/40.html">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <!--/子类-->
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">

            <li v-for="subitem in item.datas" :key="subitem.artID">
                <!-- :to="{ name: 'goodsDetail', params: { id: subitem.artID } }" -->
              <router-link :to="{ name : 'goodsDetail' , params : { id : subitem.artID } }">
                <div class="img-box">
                  <img :src="subitem.img_url">
                </div>
                <div class="info">
                  <h3>{{subitem.artTitle}}</h3>
                  <p class="price">
                    <b>¥{{subitem.sell_price}}</b>元</p>
                  <p>
                    <strong>库存 {{subitem.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{subitem.market_price}}</s>
                    </span>
                  </p>
                </div>
              </router-link>
            </li>

          </ul>
        </div>
      </div>

    </div>
  </div>


</template>
<script>
  export default {
    data() {
      return {
        goodsgroup: [
        ]
      }
    },
    methods: {
      getData() {
        this.$http.get(this.$api.goodsContent).then(res => {
          // console.log(res.data.message);
          this.goodsgroup = res.data.message;
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>
<style>
</style>