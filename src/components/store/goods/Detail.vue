<template>
  <div>
    <!-- 导航栏 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>

      </div>
    </div>

    <!-- 商品详情 -->
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">

          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">
              <!--商品图片-->
              <div class="pic-box">
                  <detail-view :detailView="detailInfo.imglist"></detail-view>               
              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <!-- detailInfo -->
              <detail-info :goodsinfo="detailInfo.goodsinfo"></detail-info>
              <!--/商品信息-->
            </div>

            <div id="goodsTabs" class="goods-tab bg-wrap">
              <!--选项卡-->
              <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                <ul>
                  <li>
                    <a class="selected" href="javascript:;">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" class="">商品评论</a>
                  </li>
                </ul>
              </div>
              <!--/选项卡-->

              <!--选项内容-->
              <div class="tab-content entry" style="display:block;">
                内容
              </div>

              <div class="tab-content" style="display: block;">
                <!--网友评论-->
                <commont tableName="goods"></commont>

                <!--/网友评论-->
              </div>

            </div>

          </div>
          <!--/页面左边-->

          <!--页面右边-->
          <div class="left-220">
            <hot-list :list="detailInfo.hotgoodslist"></hot-list>
          </div>
          <!--/页面右边-->
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import hotList from "./common/SliderList.vue";
  import detailInfo from "./common/DetailInfo.vue";
  import detailView from "./common/DetailView.vue";
  import commont from "./common/commont.vue"
  export default {
    components: {
      hotList,
      detailInfo,
      detailView,
      commont
    },
    data() {
      return {
        id:null,
        detailInfo:{
          goodsinfo: [],
          hotgoodslist: [],
          imglist: [],
        }
      }
    },
    watch: {
      $route(){
        this.id=this.$route.params.id;
        this.getDetail();
      }
    },
    methods: {
      getDetail() {
        this.$http.get(this.$api.goodsDetail+this.id).then(res => {
          // console.log(res);
          this.detailInfo=res.data.message;
        })
      }
    },
    created() {
      this.id=this.$route.params.id;
      this.getDetail();
      // console.log(this.id);
      
    }
  }
</script>
<style>
</style>