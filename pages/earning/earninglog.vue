<template>
	<view class="contain">
		<u-navbar
			title="收益记录"
			leftText="返回"
			:fixed="true"
			@rightClick="rightClick"
			@leftClick="leftClick"
		>
		</u-navbar>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<view class="cont-block">
			<view class="gaikuang" >
				<view class="item-1">
					<view class="left">
						<view class="circle"></view>
						<text>收益概况</text>
					</view>
					<navigator url="./historyexchangelog" class="right">
						<text>历史明细</text> 
						<u-icon size="8" color="#ffffff" name="arrow-right"></u-icon>
					</navigator>
				</view>
				<view class="item-2">今日累计获得金币</view>
				<view class="item-3">{{info.user.todayTaskMoney + info.user.todayPromoteMoney + info.user.todayDeposit
				?info.user.todayTaskMoney + info.user.todayPromoteMoney + info.user.todayDeposit : 0}}</view>
				
				<view class="item-4">
					<view class="item">
						<text>今日返利收益</text>
						<text>{{info.user.todayTaskMoney ?info.user.todayTaskMoney:0 }}</text>
					</view>
					<view class="item">
						<text>今日推广收益</text>
						<text>{{info.user.todayPromoteMoney ?info.user.todayPromoteMoney:0 }}</text>
					</view>
					<view class="item">
						<text>今日优惠券返款</text>
						<text>{{info.user.todayDeposit ?info.user.todayDeposit:0 }}</text>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="title">收益明细</view>
				<view class="item" v-for="(item,index) in info.list">
					<view class="up">
						<text>ID:{{item.id}}</text>
						<text v-if="item.type == 10">优惠券返利</text>
						<text v-if="item.type == 20">分润奖励</text>
						<text v-if="item.type == 30">优惠券返款</text>
						<text v-if="item.type == 40">推荐奖励</text>
						<text v-if="item.type == 60">好评卷返利</text>
					</view>
					<view class="down">
						<text>+{{item.number}}</text>
						<text>{{item.createTime}}</text>
					</view>
				</view>
				
				<!-- 没有内容 -->
				<emptyContent :show="info.list.length == 0"></emptyContent>
			</view>
			
		</view> 
		
	</view>
</template>

<script>
	import emptyContent from '@/components/empty/index.vue'
	export default {
		components:{
			emptyContent
		},
		data() {
			return {
				info:{
					list:[],
					user:{}
				}
			};
		},
		async onLoad() {
			this.getData()
		},
		
		methods: {
			getData(){
				this.$helper.httpGet(this.$api.income_get)
				.then(res => {
					this.info = res.data
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-F4;
	}
	.contain{
		.cont-block{
			padding: 100rpx 30rpx 100rpx;
			
			& .gaikuang{
				padding: 40rpx 30rpx;
				background: linear-gradient(36deg, #FD7028, #FC4231);
				border-radius: 30rpx;
				
				& .item-1{
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					& .left{
						display: flex;
						align-items: center;
						& .circle{
							width: 14rpx;
							height: 14rpx;
							border: 6rpx solid #FFFFFF;
							border-radius: 50%;
						}
						& text{
							padding-left: 10rpx;
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
					
					& .right{
						display: flex;
						align-items: center;
						& >text{
							padding-left: 10rpx;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							padding-right: 10rpx;
						}
					}
				}
				
				& .item-2{
					padding-left: 20rpx;
					padding-top: 40rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 20rpx;
					opacity: 0.8;
				}
				
				& .item-3{
					padding-left: 20rpx;
					padding-top: 10rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 20rpx;
				}
				
				& .item-4{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30rpx;
					padding-left: 20rpx;
					& .item{
						width: 30%;
						& text{
							display: block;
						}
						& text:nth-child(1){
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							opacity: 0.8;
						}
						& text:nth-child(2){
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
				}
			
			}
			
			& .list{
				margin-top: 20rpx;
				padding: 40rpx;
				background: #FFFFFF;
				border-radius: 30rpx;
				
				& .title{
					padding: 23rpx 0 20rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #222222;
				}
				
				& .item{
					padding: 40rpx 0;
					border-top: solid 2rpx #F1F1F1;
					
					& .up{
						display: flex;
						justify-content: space-between;
						& text:nth-child(1){
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #666666;
						}
						& text:nth-child(2){
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #3F75FE;
						}
					}
					
					& .down{
						display: flex;
						justify-content: space-between;
						margin-top: 30rpx;
						& text:nth-child(1){
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FF5252;
						}
						& text:nth-child(2){
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
						}
					}
					
				}
			}
		}
	}	
</style>
