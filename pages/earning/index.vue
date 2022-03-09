<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<view class="contain">
			<view class="top-header">
				<view class="title">收益</view>
				<view class="sub-title">
					<image src="http://img.hls178.cn/static/image/earnings/sy_jb_icon@2x.png"></image>
					<text>累计获得金币</text>
				</view>
				<view class="money">{{userInfo.historyMoney}}</view>
				<view class="detail">
					<view class="item">
						<text>今日获得金币</text>
						<text>{{userInfo.todayMoney}}</text>
					</view>
					<view class="item">
						<text>今日推广获得</text>
						<text>{{userInfo.todayPromoteMoney}}</text>
					</view>
					<view class="item">
						<text>可用金币</text>
						<text>{{userInfo.money}}</text>
					</view>
				</view>
			</view>
			<view class="block">
				<view class="gonglue">
					<view class="hover">金币兑换现金攻略</view>
					<view class="cont">
						<image src="http://img.hls178.cn/static/image/earnings/sy_dh_ch@2x.png"></image>
						<view class="right">
							<text>支付宝现金红包兑换</text>
							<text>100金币 = 1元·即时到账</text>
							<navigator url="./exchange" class="self-btn">马上兑换 > </navigator>
						</view>
					</view>
				</view>
				
				<navigator url="./exchangelog" class="into-item">
					<text>兑换记录</text>
					<text>></text>
				</navigator>
				<navigator  url="./earninglog" class="into-item">
					<text>收入记录</text>
					<text>></text>
				</navigator>
			</view>
		</view>
		<!-- 底部菜单 -->
		<tabbar :value="2"></tabbar>
	</view>
	
</template>

<script>
	import tabbar from '@/components/footer/index.vue'
	export default {
		components:{
			tabbar
		},
		data() {
			return {
				userInfo:{}
			};
		},
		async onLoad() {
			this.getData()
		},
		onPullDownRefresh() {
			this.getData()
		},
		methods: {
			getData(){
				this.$helper.httpGet(this.$api.user_info_get)
				.then(data => {
					this.userInfo = data.data
					this.$store.commit('userInfo/SET_USER_INFO',this.userInfo)
					uni.stopPullDownRefresh();
				})
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-F4;
	}
	.status_bar{
		width: 100%;
		height: var(--status-bar-height);
	}
	.contain{
		& .top-header{
			width: 100%;
			height: 518rpx;
			background: url(http://img.hls178.cn/static/image/earnings/sy_top_bg@2x.png) no-repeat;
			background-size: 100% 100%;
			
			& .title{
				padding-top: 38rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
			}
			
			& .sub-title{
				display: flex;
				align-items: center;
				padding-left: 44rpx;
				margin-top: 63rpx;
				& image{
					width: 42rpx;
					height: 42rpx;
				}
				& text{
					padding-left: 10rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			
			& .money{
				padding-left: 44rpx;
				font-size: 70rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
			& .detail{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 60rpx 52rpx 0;
				
				& .item{
					
					& text:nth-child(1){
						display: block;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						opacity: 0.7;
						text-align: center;
					}
					& text:nth-child(2){
						display: block;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
						text-align: center;
					}
				}
			}
		
		}
		
		& .block{
			padding: 30rpx;
			
			& .gonglue{
				height: 314rpx;
				background: #FFFFFF;
				border-radius: 20px;
				margin-bottom: 29rpx;
				& .hover{
					width: 320rpx;
					line-height: 50rpx;
					margin: 0 auto;
					background: url(http://img.hls178.cn/static/image/earnings/sy_by_bg@2x.png) no-repeat;
					background-size: 100% 100%;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #B06F11;
					text-align: center;
				}
				
				& .cont{
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 40rpx;
					& image{
						width: 250rpx;
						height: 190rpx;
					}
					& .right{
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						& text{
							display: block;
						}
						& text:nth-child(1){
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}
						& text:nth-child(2){
							margin-top: 10rpx;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
						}
						
						& .self-btn{
							margin-top: 20rpx;
							width: 220rpx;
							line-height: 54rpx;
							background: linear-gradient(36deg, #FD7028, #FC4231);
							border-radius: 27rpx;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							text-align: center;
						}
					}
					
				}
				
			}
		
			& .into-item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 29rpx 32rpx;
				margin-bottom: 20rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				& text:nth-child(1){
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				& text:nth-child(2){
					font-size: 16rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #999;
				}
			}
		}
		
		
		
	}
</style>
