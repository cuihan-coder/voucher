<template>
	<view class="contain">
		<u-navbar
			title="历史明细"
			leftText="返回"
			:fixed="true"
			@rightClick="rightClick"
			@leftClick="leftClick"
		>
		</u-navbar>
		
		<view class="cont-block">
			
			<scroll-view class="drawer" :scroll-top="scrollTop" scroll-y="true" @scrolltolower="lower">
				<!-- #ifdef APP-PLUS -->
				<view class="status_bar"></view>
				<!-- #endif -->
				<view @click="date = item" v-for="(item,index) in dateList" :class="date == item ? 'active' : 'inactive'">{{item}}</view>
			</scroll-view>
			<view class="content">
				<!-- #ifdef APP-PLUS -->
				<view class="status_bar"></view>
				<!-- #endif -->
				<view class="title">
					<text>当月明细</text>
					<text>(金币）</text>
				</view>
				<view class="shouyi">
					<text>总收益：</text>
					<text>{{totalNumber}}</text>
				</view>
				
				<scroll-view class="list" :scroll-top="scrollTop" scroll-y="true" @scrolltolower="lower">
					<view class="log-item" v-for="(item,index) in list" :key="index">
						<text>{{item.createTime}}</text>
						<view>
							<text>收益：</text>
							<text>{{item.number}}</text>
						</view>
					</view>
					<!-- 没有内容 -->
					<emptyContent :show="list.length == 0 ? true : false"></emptyContent>
				</scroll-view>
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
				dateList:[],
				date:'',
				list:[],
				totalNumber:0
			};
		},
		async onLoad() {
			this.getDateList()
		},
		watch:{
			date(newVal,oldVal){
				this.getList(newVal)
			}
		},
		methods: {
			getDateList(){
				this.$helper.httpGet(this.$api.incomeMonths_get)
				.then(data => {
					this.dateList = data.data
					this.date = data.data == null ? [] : data.data[0]
					if(this.date.length == 0){
						this.dateList = ['本月']
						this.date = "本月"
						
					}
					console.log(data.data)
				})
			},
			getList(date){
				this.$helper.httpGet(this.$api.incomeHistory_get,{date})
				.then(data => {
					this.list = data.data.list == null ? [] : data.data.list
					this.totalNumber = data.data.totalNumber
				})
			},
			scrollTop(){
				
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-ff;
	}
	.contain{
		.cont-block{
			padding-top: 100rpx;
			display: flex;
			justify-content: flex-start;
			
			& .drawer{
				position: fixed;
				top: 100rpx;
				left: 0;
				width: 29%;
				min-height: calc(100% - 100rpx);
				max-height: calc(100% - 100rpx);
				background-color: #F5F5F5;
				overflow-y: hidden;
				overflow: scroll;
				& .inactive{
					padding: 35rpx 39rpx;
					background-color: #F5F5F5;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #555555;
					background-image: url(http://img.hls178.cn/static/image/earnings/fl_jt_n@2x.png);
					background-repeat: no-repeat;
					background-position: 84% 50%;
					background-size: 8rpx 12.9rpx;
				}
				
				& .active{
					display: flex;
					align-items: center;
					padding: 35rpx 39rpx 35rpx 0;
					background-color: #ffffff;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FF5632;
					background-image: url(http://img.hls178.cn/static/image/earnings/fl_jt_s@2x.png);
					background-repeat: no-repeat;
					background-position: 84% 50%;
					background-size: 12.9rpx 8rpx;
				}
				& .active:before{
					display: inline-block;
					content: '';
					margin-right: 32rpx;
					width: 7rpx;
					height: 40rpx;
					background-image: url(http://img.hls178.cn/static/image/earnings/fl_1@2x.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
			}
			
			& .content{
				position: fixed;
				top: 100rpx;
				left: 29%;
				width: calc(71% - 56rpx);
				padding: 28rpx;
				
				& .title{
					font-family: PingFang SC;
					font-weight: 600;
					color: #333333;
					& text:nth-child(1){
						font-size: 28rpx;
					}
					& text:nth-child(2){
						font-size: 24rpx;
					}
				}
				
				& .shouyi{
					margin-top: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					font-size: 26rpx;
					& text:nth-child(1){
						color: #333333;
					}
					& text:nth-child(2){
						color: #FF2B2B;
					}
				}
				
				& .list{
					position: fixed;
					top: 240rpx;
					left: calc(29% + 28rpx);
					width: calc(71% - 56rpx);
					max-height: calc(100% - 340rpx);
					overflow-y: hidden;
					overflow: scroll;
					padding-bottom: 500rpx;
					& .log-item{
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 20rpx;
						padding: 38rpx 30rpx;
						background: #F5F5F5;
						border-radius: 10rpx;
						& >text{
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #555555;
						}
						
						& >view{
							& text:nth-child(1){
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #555555;
							}
							& text:nth-child(2){
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #FF2B2B;
							}
						}
					}
				}
				
				
			}
		}
	}	
</style>
