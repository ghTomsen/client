<template>
  <div class="goods-spec">
    <h1>{{goodsinfo.title}}}</h1>
    <p class="subtitle">{{goodsinfo.sub_title}}</p>
    <div class="spec-box">
      <dl>
        <dt>货号</dt>
        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
      </dl>
      <dl>
        <dt>市场价</dt>
        <dd>
          <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
        </dd>
      </dl>
      <dl>
        <dt>销售价</dt>
        <dd>
          <em class="price" id="commoditySellPrice">¥{{goodsinfo.sell_price}}</em>
        </dd>
      </dl>
    </div>

    <div class="spec-box">
      <dl>
        <dt>购买数量</dt>
        <dd>
          <div class="stock-box">
            <el-input-number size="mini" v-model="num"></el-input-number>
          </div>
          <span class="stock-txt">
            库存
            <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
          </span>
        </dd>
      </dl>
      <dl>
        <dd>
          <div class="btn-buy" id="buyButton">
            <button class="buy">立即购买</button>
            <!-- <router-link class="add" to="" @click="add">加入购物车</router-link> -->
            <button class="add" @click="add">加入购物车</button>
          </div>
        </dd>
      </dl>
    </div>

  </div>
</template>
<script>
 
  export default {
    props: ['goodsinfo'],
    data() {
      return {
        num: 0
      }
    },
    methods: {
      add(){
        this.$store.commit('updateNum',{
          id:this.$route.params.id,
          count:this.num+(this.$store.state.shopping[this.$route.params.id] || 0)
        })
      }
    }
  }
</script>
<style>
</style>