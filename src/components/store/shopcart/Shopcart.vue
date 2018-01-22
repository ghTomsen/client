<template>
	<div>
		<!-- 导航 -->
		<div class="section">
			<div class="location">
				<span>当前位置：</span>
				<router-link to="/">首页</router-link>&gt;
				<router-link to="">购物车</router-link>
			</div>
		</div>

		<div class="section">
			<div class="wrapper">
				<div class="bg-wrap">
					<!-- 头部进度 -->
					<div class="cart-head clearfix">
						<h2>
							<i class="iconfont icon-cart"></i>我的购物车</h2>
						<div class="cart-setp">
							<ul>
								<li class="first active">
									<div class="progress">
										<span>1</span> 放进购物车
									</div>
								</li>
								<li>
									<div class="progress">
										<span>2</span> 填写订单信息
									</div>
								</li>
								<li class="last">
									<div class="progress">
										<span>3</span> 支付/确认订单
									</div>
								</li>
							</ul>
						</div>
					</div>

					<!-- 商品列表 -->
					<div class="cart-box">
						<input id="jsondata" name="jsondata" type="hidden">
						<table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
							<tbody>
								<tr>
									<th width="48" align="center">
										<el-switch @change="allEvent" :value="allSelectStatus" active-color="#13ce66"></el-switch>
									</th>
									<th align="left" colspan="2">商品信息</th>
									<th width="84" align="left">单价</th>
									<th width="104" align="center">数量</th>
									<th width="104" align="left">金额(元)</th>
									<th width="54" align="center">操作</th>
								</tr>

								<tr v-for="item in goodsList" :key="item.id">
									<th width="48" align="center">
										<el-switch v-model="item.selected" active-color="#13ce66"></el-switch>
									</th>
									<th align="left" colspan="2">
										<img width="50" height="50" :src="item.img_url" alt="">
										<span>{{item.title}}</span>
									</th>
									<th width="84" align="left">
										￥{{item.sell_price}}
									</th>
									<th width="104" align="center">
										<el-input-number @change="change(item.id,$event)" v-model="item.buycount" size="mini" :min="1"></el-input-number>
									</th>
									<th width="104" align="left">
										<td>￥{{item.sell_price*item.buycount}}</td>
									</th>
									<th width="54" align="center">
										<el-button size="mini" @click="del(item.id)">删除</el-button>
									</th>
								</tr>

								<tr v-if="goodsList.length==0">
									<td colspan="10">
										<div class="msg-tips">
											<div class="icon warning">
												<i class="iconfont icon-tip"></i>
											</div>
											<div class="info">
												<strong>购物车没有商品！</strong>
												<p>您的购物车为空，
													<a href="/index.html">马上去购物</a>吧！</p>
											</div>
										</div>
									</td>
								</tr>

								<tr>
									<th align="right" colspan="8">
										已选择商品
										<b class="red" id="totalQuantity">{{allTotal}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
										<span class="red">￥</span>
										<b class="red" id="totalAmount">{{allPrice}}</b>元
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<!--购物车底部-->
					<div class="cart-foot clearfix">
						<div class="right-box">
							<button class="button">继续购物</button>
							<button class="submit" @click="toTotal">立即结算</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				ids: null
			}
		},
		created() {

			// this.ids=Object.keys(this.$store.state.shopping).join(",");
			this.ids = this.$store.getters.getShoppingID;
			this.getCartList();
			// console.log(this.ids);

		},

		computed: {
			//全选按钮的状态
			allSelectStatus() {
				return this.goodsList.every(v => v.selected)
			},
			//所选商品的总数
			allTotal() {
				return this.goodsList.reduce((total, v) => total + (v.selected ? v.buycount : 0), 0);
				// return this.goodsList.reduce((sum,v)=>{})
			},
			//所选商品的总价格
			allPrice() {
				return this.goodsList.reduce((price, v) => price + (v.selected ? v.buycount * v.sell_price : 0), 0)
			}
		},
		methods: {
			//结算
			toTotal() {
				let ids=this.goodsList.filter(v=>v.selected).map(v=>v.id).join(",");
				this.$router.push({name:"orderCommit",params:{ids:ids}});
			},
			//删除商品
			del(id) {
				this.goodsList = this.goodsList.filter(v => v.id != id);
				this.$store.commit("delProduct", id);
			},
			//点击全选按钮
			allEvent(boolean) {
				// console.log(boolean);
				this.goodsList.forEach(v => v.selected = boolean)
			},
			//计数器
			change(id, currentCount) {
				this.goodsList.forEach(v => {
					if (v.id == id) {
						v.buycount = currentCount;
					}
				})
				this.$store.commit('updateNum', { id: id, count: currentCount })
			},
			//获取数据
			getCartList() {
				this.$http.get(this.$api.shopcartGoods + this.ids).then(res => {
					// console.log(res.data.message);
					res.data.message.forEach(v => {
						v.buycount = this.$store.state.shopping[v.id];
						v.selected = true;
					})
					this.goodsList = res.data.message;
				})
			}
		}
	}
</script>

<style>
</style>