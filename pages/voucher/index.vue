<template>
	<view>
		<u-navbar
			title="优惠券"
			leftIconSize="0"
			:fixed="true"
			@rightClick="kefushow = !kefushow"
			@leftClick="leftClick"
		>
			<view
				class="u-nav-slot"
				slot="right"
			>
				<image src="http://img.hls178.cn/static/image/voucher/ty_kf@2x.png"></image>
			</view>
		</u-navbar>
		<view class="contain">
			<view class="tabs">
				<view class="tab-list">
					<view @click="changeTab(0)" :class="status == 0 ? 'tab-item tab-item-active' : 'tab-item' ">
						<text :class="status == 0 ? 'tab-active' : '' ">全部券类</text>
						<!-- <text :class="status == 0 ? 'circle' : '' "></text> -->
					</view>
					<view @click="changeTab(20)" :class="status == 20 ? 'tab-item tab-item-active' : 'tab-item' ">
						<text :class="status == 20 ? 'tab-active' : '' ">待使用</text>
						<!-- <text :class="status == 20 ? 'circle' : '' "></text> -->
					</view>
					<view @click="changeTab('31,33')" :class="status == '31,33' ? 'tab-item tab-item-active' : 'tab-item' ">
						<text :class="status == '31,33' ? 'tab-active' : '' ">核券失败</text>
						<!-- <text :class="status == 31 ? 'circle' : '' "></text> -->
					</view>
					<view @click="changeTab(-1)"  :class="status == -1 ? 'tab-item tab-item-active' : 'tab-item' ">
						<text :class="status == -1 ? 'tab-active' : '' ">申诉券类</text>
						<!-- <text :class="status == -1 ? 'circle' : '' "></text> -->
					</view>
					
				</view>
				<view class="tab-status">
					<view>
						<text @click="changeTab(21)" :class="status == 21 ? 'active' : '' ">待核券</text>
					</view>
					<view>
						<text  @click="changeTab(30)" :class="status == 30 ? 'active' : '' ">待返利</text>
					</view>
					<view>
						<text  @click="changeTab(40)" :class="status == 40 ? 'active' : '' ">已完成</text>
					</view>
					<view>
						<text @click="changeTab(24)" :class="status == 24 ? 'active' : '' ">已失效</text>
					</view>
				</view>
			</view>
			<view class="notify">
				 <u-notice-bar bgColor="#fff6ed" color="#ff8a0c " text="有任何问题，请点击右上角联系平台客服，都能及时解决！恶意骚扰商家，将有封号风险！"></u-notice-bar>
			</view>
		   
			
			<!-- 优惠券item -->
			<navigator :url="'voucherinfo?id=' + item.id " class="voucher-items" v-for="(item,index) in list" :key="index">
				<view v-if="item.status == 20 && item.issueStatus == 0" class="tag dsy">待使用</view>
				<view v-if="item.status == 21 && item.issueStatus == 0" class="tag dhq">待核券</view>
				<view v-if="item.status == 30 && item.issueStatus == 0" class="tag dfl">待返利</view>
				<view v-if="item.status == 40 && item.issueStatus == 0" class="tag ywc">已完成</view>
				<view v-if="[31,33].indexOf(item.status) != -1 && item.issueStatus == 0" class="tag hqsb">核券失败</view>
				<view v-if="[23,24].indexOf(item.status) != -1 && item.issueStatus == 0" class="tag ysx">已失效</view>
				<view v-if="item.issueStatus == 1" class="tag ssz">申诉中</view>
				<view v-if="item.issueStatus == 2" class="tag sscg">申诉成功</view>
				<view v-if="item.issueStatus == 3" class="tag sssb">申诉失败</view>
				<image class="goods-image" :src="item.task.goods[0].imgURL"></image>
				<view class="center">
					<view class="title">
						<!-- <text>指定商品</text>
						<text>9.8元</text>
						<text>抵扣券</text> -->
						<text v-if="item.category == 2">好评返利券</text>
						<text v-if="item.category == 1">指定商品</text>
						<text v-if="item.category == 1">{{item.task.goodsMoney}}元</text>
						<text v-if="item.category == 1">抵扣券</text> 
					</view>
					<!-- 返多少金币 -->
					<view v-if="item.status != 40" class="fanli">
						<text v-if="item.category == 1">核券后全返+{{item.money}}金币</text>
						<text v-if="item.category == 2">核券后+{{item.money}}金币</text>
					</view>
					<!-- 收益余额 -->
					<view v-if="[40].indexOf(item.status) != -1 && item.transferType == 3" class="yue">
						<text>已返利至收益余额</text>
					</view>
					<!-- 微信 -->
					<text v-if="[40].indexOf(item.status) != -1 && item.transferType == 2"  class="weixin">
						<image src="http://img.hls178.cn/static/image/voucher/yyq_he_fkwx_b@2x.png"></image>
						<text>已返利至微信</text>
					</text>
					<!-- 支付宝 -->
					<view v-if="[40].indexOf(item.status) != -1 && item.transferType == 1"  class="zhifubao">
						<image src="http://img.hls178.cn/static/image/voucher/yyq_he_fkzfb_b@2x.png"></image>
						<text>已返利至支付宝</text>
					</view>
					
					<!-- 待使用倒计时 -->
					<view  v-if="[20].indexOf(item.status) != -1 " class="daojishi">
						<text>
							到期时间还剩：
						</text>
						<text>
							<!-- <u-count-down  :time="30 * 60 * 60 * index" format="HH:mm:ss"  @change="timeOnChange(e,index)">
								<view class="time">
									<text class="time__item">{{ timeData.hours>10 ? timeData.hours:'0'+timeData.hours}}:</text>
									<text class="time__item">{{ timeData.minutes }}:</text>
									<text class="time__item">{{ timeData.seconds }}</text>
								</view>
							</u-count-down> -->
							<countdown :times="item.finishExpireCountDown" :style="{fontSize: '24rpx',color:'#FB3A3A'}"></countdown>
						</text>
					</view>
					<!-- 待使用倒计时 -->
					
					<!-- 无效过期 -->
					<view v-if="[22,23,24].indexOf(item.status) != -1 " class="daojishi">
						<text v-if="[22,23].indexOf(item.status) != -1 ">
							您主动拒绝券，已失效
						</text>
						<text  v-if="[24].indexOf(item.status) != -1 ">
							超时未使用，已失效
						</text>
					</view>
					<!-- 无效过期 -->
					
					<!-- 实付金额 -->
					<view class="youxiao">
						
						<text v-if="[20,22,23,24].indexOf(item.status) == -1 && item.category == 1">实付金额：{{item.realMoney}}元</text>
						<!-- 已完成备注 -->
						<text v-if="[40].indexOf(item.status) != -1 && item.issueStatus == 0" class="money-yc">注：若返利金额不对，超时请72小时内申诉</text>
						<!-- 已完成备注 -->
						<!-- 待和券备注 -->
						<text v-if="[21].indexOf(item.status) != -1" class="money-yc">注：一般24小时左右核券</text>
						<!-- 待和券备注 -->
						<!-- 待返利备注 -->
						<text v-if="[30].indexOf(item.status) != -1" class="money-yc">注：最迟48小时返利，超时请联系客服</text>
						<!-- 待返利备注 -->
					
						<!-- 拒绝原因 -->
						<text  v-if="[30,31,32,40,41].indexOf(item.status) != -1" class="order-yc">{{item.rejectReason}}</text>
						<!-- 拒绝原因 -->
						<!-- 申诉中 -->
						<text v-if="item.issueStatus == 1" class="money-yc">注：一般24小时左右会出申诉结果</text>
						<!-- 申诉中 -->
						<!-- 申诉成功 -->
						<text v-if="item.issueStatus == 2" class="money-yc">注：已解决，请查看</text>
						<!-- 申诉成功 -->
						<!-- 申诉失败 -->
						<text v-if="item.issueStatus == 3" class="money-yc">注：{{item.issueRemark}}</text>
						<!-- 申诉失败 -->
					</view>
					<!-- 实付金额 -->
					
				</view>
				
				<view :url="'voucherinfo?id=' + item.id " v-if="[20].indexOf(item.status) != -1" class="right">
					去使用
				</view>
				
				<!-- 有效券 -->
				<!-- 需要申诉 -->
				<view v-if="[31,32,41].indexOf(item.status) != -1 && [0,3].indexOf(item.issueStatus) != -1" class="right">
					去申诉
				</view>
				<!-- 需要申诉-->
			</navigator>
			<!-- 优惠券item -->
			<!-- 无数据 -->
			<empty :show="list.length > 0 ? false : true"></empty>
		</view>
		<!-- 底部菜单 -->
		<tabbar :value="1"></tabbar>
		<!-- 聊天引导 -->
		<u-action-sheet :actions="kefulist"  round="20" @select="kefured" :closeOnClickAction="true" cancelText="取消" @close="kefushow = !kefushow" :show="kefushow"></u-action-sheet>

	</view>
	
</template>

<script>
	import tabbar from '@/components/footer/index.vue'
	import empty from '@/components/empty/index.vue'
	import countdown from '@/components/countdown/index.vue'
	
	export default {
		components:{
			tabbar,
			empty,
			countdown
		},
		data() {
			return {
				timeData: {},
				page:1,
				status:0,//0全部卷 20待使用 21待核券 24已失效 30待返利 31核卷失败 40已完成 -1 申诉券
				issueStatus: false, //是否获取申诉订单 
				api_status:0,//0全部卷 20待使用 21待核券 24已失效 30待返利 31核卷失败 40已完成
				list:[],
				kefushow:false,
				kefulist:[
					{
						name:'人工客服',
						subname:'在线时间：09:30-19:00(周一至周六)'
					},
					{
						name: '常见问题',
						subname:'更多问题可自行查看'
					}
				]
			};
		},
	
		async onLoad() {
			this.dataInit()
			this.getData()
		},
		onPullDownRefresh() {
			this.page = 1
			this.list = []
			this.getData()
			uni.stopPullDownRefresh()
		},
		methods: {
			getData(){
				let param = {
					page: this.page,
					status: this.api_status,
					issueStatus: this.issueStatus
				}
				this.$helper.httpGet(this.$api.order_list_get,param)
				.then(res => {
					this.page++
					if(res.data.length <= 0){
						uni.showToast({
							title:'到底了',
							icon:'none'
						})
						return
					}
					let arr = this.list
					this.list = arr.concat(res.data)
					
				})
			},
			kefured(index){
				this.kefushow = false
				if(index.name == '人工客服'){
					// #ifdef APP-PLUS
					uni.navigateTo({
						url:"../home/webview?url=https://www.huolieyun.com/chat/cf07ef0dd2fef8d8"
					})
					console.log(2222)
					// #endif
					
					// #ifdef H5
						location.href="https://www.huolieyun.com/chat/cf07ef0dd2fef8d8"
					// #endif
					
				}
				if(index.name == '常见问题'){
					uni.navigateTo({
						url:'../user/help'
					})
				}
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				});
			},
			timeOnChange(e,index) {
				this.timeData = e
			},
			changeTab(status){
				if(this.status == status){
					return 
				}
				if(status == -1){
					this.api_status = 0
					this.issueStatus = true
				}else{
					this.api_status = status
					this.issueStatus = false
				}
				this.status = status
				this.dataInit()
				this.getData()
			},
			dataInit(){
				this.list = []
				this.page = 1
			},
			timespaceSeconde(time1){
				let remainingSeconds =  new Date(time1).getTime() - new Date().getTime()
				let seconds = parseInt(remainingSeconds / 1000) 
				return seconds < 0 ? 0 : seconds;
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-F4;
		padding-bottom: 100rpx;
	}
	.u-count-down {
		color:$color-E84538 !important;
		font-size:24rpx;
	}
	.u-nav-slot{
		& image{
			width: 44rpx;
			height: 44rpx;
		}
	}
	.contain{
		padding: calc(var(--status-bar-height) + 82rpx)  0 100rpx;
		
		& .tabs{
			padding: 20rpx 0rpx;
			background-color: $color-ff;
			& .tab-list{
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				& .tab-item{
					width: 25%;
					min-height: 55rpx;
					text-align: center;
					position: relative;
					& text:nth-child(1){
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-33 ;
					}
					& .circle{
						position: absolute;
						width: 10rpx !important;
						height: 10rpx !important;
						background: $color-FF4A3A;
						border-radius: 50%;
						
					}
					& text:nth-child(2){
						width: 0;
						height: 0;
					}
					
					& .tab-active{
						color: $color-FF4A3A !important;
					}
					
				}
				& .tab-item-active:after{
					content: '';
					display: block;
					width: 36rpx;
					height: 12rpx;
					margin-left: calc(50% - 18rpx);
					background: url(http://img.hls178.cn/static/image/voucher/yyq_nav_bs@2x.png);
					background-size: 100% 100%;
				}
			}
			
			& .tab-status{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10rpx;
				& view{
					width: 25%;
					text-align: center;
					& text{
						display: inline-block;
						width: 120rpx;
						line-height: 44rpx;
						background: $color-ED;
						border-radius: 2rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-33;
					}
					& .active{
						background: $color-ffe5e2 !important;
						color: $color-fc503b !important;
					}
				}
			}
			
			
		}
		& .notify{
			width: 100%;
		}
	
		& .voucher-items{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			position: relative;
			width: calc(100% - 90rpx);
			padding: 20rpx 30rpx 20rpx 20rpx;
			margin: 20rpx auto 0;
			background: url(http://img.hls178.cn/static/image/voucher/yyq_bg@2x.png) no-repeat;
			background-size: 100% 100%;
				
			& .tag{
				position: absolute;
				top: 0;
				left: 0;
				width: 100rpx;
				line-height: 36rpx;
				border-radius: 20rpx 0px 20rpx 0px;
				z-index: 2;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-ff;
				text-align: center;
			}
			// 待使用
			& .dsy{
				background: $color-FD7028;
			}	
			//待核券
			& .dhq {
				background: $color-A42EFF;
			}
			& .dfl{
				background: $color-08D726;
			}
			& .ywc{
				background: $color-047EF0;
			}
			& .hqsb{
				width: 120rpx !important;
				background: $color-FF4A3A;
			}
			& .ysx{
				background: $color-AFAFAF;
			}
			& .ssz{
				background: #A42EFF;
			}
			& .sscg{
				width: 120rpx !important;
				background: #3682FF;
			}
			& .sssb{
				width: 120rpx !important;
				background: #FF5959;
			}
				
			& .goods-image{
				width: 180rpx;
				height: 180rpx;
				border-radius: 10rpx;
				flex-shrink: 0;
			}
			
			& .center{
				width: 50%;
				margin-left: 70rpx;
				& .title{
					margin-bottom: 10rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: $color-00;
					& text:nth-child(2){
						color: $color-fc503b;
					}
					overflow: hidden;
					white-space: nowrap;
				}
				& .fanli{
					flex-shrink: 1;
					& text{
						padding: 0 28rpx;
						line-height: 38rpx;
						background: linear-gradient(90deg, #FFC9A1, #FFEEDA);
						border-radius: 19rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-CB7636;
					}
				}
				
				& .yue{
					& text{
						padding: 0 28rpx;
						line-height: 38rpx;
						background: $color-FD7028;
						border-radius: 19rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-FFFEFE;
					}
				}
				
				& .weixin{
					display: inline-flex;
					align-items: center;
					line-height: 38rpx;
					background: $color-07C322;
					border-radius: 19rpx;
					padding: 0 28rpx;
					& image{
						width: 25rpx;
						height: 21rpx;
					}
					& text{
						padding-left: 9rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-ff;
					}
				}
				
				& .zhifubao{
					display: inline-flex;
					align-items: center;
					line-height: 38rpx;
					background: $color-3480FF;
					border-radius: 19rpx;
					padding: 0 28rpx;
					& image{
						width: 23rpx;
						height: 24rpx;
					}
					& text{
						padding-left: 9rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-FFFEFE;
					}
				}
				
				& .daojishi{
					display: flex;
					align-items: center;
					margin-top: 39rpx;
					& text{
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: $color-99;
						& .time__item{
							color:$color-E84538;
						}
					}
					
				}
			
				& .youxiao{
					
					& text{
						display: block;
						padding-top: 28rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: $color-99;
						line-height: 20rpx;
					}
					& .money-yc{
						padding-top: 9rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: $color-FD7028;
						line-height: 25rpx;
					}
					
					& .order-yc{
						padding-top: 9rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: $color-FF4A3A;
						line-height: 20rpx;
					}
				}
			}
			
			& .right{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				margin-left: 10%;
				width: 44rpx;
				height: 140rpx;
				background: linear-gradient(-65deg, #FD7028, #FC4231);
				border-radius: 22rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $color-ff;
				writing-mode: tb-rl;
				text-align: center;
				letter-spacing:10rpx
			}
		}
	}
</style>
