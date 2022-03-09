<template>
	<view class="contain">
		<u-navbar
			title="兑换记录"
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
			
			<view class="list">
				<view class="title">兑换明细</view>
				<view class="item" v-for="(item,index) in list">
					<view class="up">
						<text v-if="item.type == 50">兑换现金</text>
						<text v-if="item.type == 40">用户推广费用</text>
						<text v-if="item.type == 30">押金返款</text>
						<text v-if="item.type == 20">下级分账</text>
						<text v-if="item.type == 10">任务分账</text>
						<text class="suc" v-if="item.cashStatus == 10">已兑换到支付宝</text>
						<text class="err" v-if="item.cashStatus == 20">{{item.cashResult}}</text>
					</view>
					<view class="down">
						<text>{{item.number}}</text>
						<text>{{item.createTime}}</text>
					</view>
				</view>
				<!-- 没有内容 -->
				<emptyContent :show="list.length > 0 ? false : true"></emptyContent>
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
				page: 1,
				list:[]
			};
		},
		async onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.getList()
		},
		methods: {
			getList(){
				this.$helper.httpGet(this.$api.cashLog_get,{page:this.page})
				.then(res => {
					if(res.data == null){
						uni.showToast({
							title:'到底了',
							icon:'none'
						})
						return
					}
					let arr = this.list
					this.list = arr.concat(res.data) 
					this.page++
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
			& .list{
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
							flex-shrink: 0;
						}
						& text:nth-child(2){
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
						}
						& .suc{
							color: #3F75FE;
						}
						& .err{
							color: #FF5252;
							padding-left: 20rpx;
							// overflow: hidden;
							// text-overflow: ellipsis;
							// white-space: nowrap;
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
							color: #079A26;
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
