<template>
  <div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <!--类别菜单-->
          <div class="left-220" style="margin:0;">
            <div class="banner-nav">
              <ul>
                <!--此处声明下面可重复循环-->
                <li v-for="item in all.catelist" :key="item.id">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span v-for="subitem in item.subcates" :key="subitem.id">{{subitem.title}}</span>
                    </p>
                  </h3>

                  <div class="item-box">
                    <!--如有三级分类，此处可循环-->
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <!-- <a href="/goods/43.html">手机通讯</a> -->
                        <Category-list :list="item.subcates"></Category-list>
                      </dd>
                    </dl>
                  </div>
                </li>


              </ul>
            </div>
          </div>
          <!--/类别菜单-->
          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">     
              <el-carousel :interval="2000" type="card" height="200px">
                <el-carousel-item v-for="item in all.sliderlist" :key="item.id">
                  <img :src="item.img_url" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!--/幻灯片-->

          <!--推荐商品-->
          <div class="left-220">
            <slider-list :list="all.toplist"></slider-list>
          </div>
          <!--/推荐商品-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CategoryList from "./CategoryList.vue";
  import sliderList from "./SliderList.vue";
  export default {
    components: {
      CategoryList,
      sliderList
    },
    data() {
      return {

        all: {}
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.$http.get(this.$api.goodsTop).then(res => {
          // console.log(res);
          this.all = res.data.message;
          // console.log(res.data.message);

        })
      }
    }
  }
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>