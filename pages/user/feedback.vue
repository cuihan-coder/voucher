<template>
	<view class="contain">
		<u-navbar title="联系我们" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
		</u-navbar>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<view class="block">
			<view class="select" @click="show = !show">
				<text class="left">反馈类型</text>
				<view class="right">
					<text>{{feedbackColumns[0][singleIndex].label}}</text>
					<image src="http://img.hls178.cn/static/image/earnings/fl_jt_n@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">备注</view>
			<u--textarea maxlength="1000" :count="true" height="150" border="none" v-model="content" placeholder="请备注信息（详细说明，或联系方式等），我们回尽快给您回电！" ></u--textarea>

		</view>
		<!-- 反馈类型 -->
		<u-picker @cancel="show = false" @confirm="choose" :singleIndex="singleIndex" :show="show" keyName="label" :columns="feedbackColumns"></u-picker>
		<u-button @click="subinfo" class="self-btn" shape="circle" text="确定提交" color="linear-gradient(-30deg, #FD7028, #FC4231)"></u-button>
		
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
				feedbackColumns:[
					[
						{
							label: '提现',
							id: 1
						},
						{
							label: '优惠券',
							id: 2
						},
						{
							label: '好评券',
							id: 3
						},
						{
							label: '抵扣券',
							id: 4
						},
						{
							label: 'BUG',
							id: 5
						},
						{
							label: '其他',
							id: 6
						}
					]
				],
				singleIndex:0,//当前类型的下标
				show:false,
				content:''
			};
		},
		async onLoad() {
			
		},
		
		methods: {
			choose(e){
				this.singleIndex = e.indexs[0]
				this.show = false
			},
			subinfo(){
				let category = this.feedbackColumns[0][this.singleIndex].id
				let content = this.content
				if(content == ''){
					uni.showToast({
						title:'请输入您的建议',
						icon:'none'
					})
					return
				}
				this.$helper.httpPost(this.$api.articles_post,{category,content})
				.then(data => {
					
					if(data.code == 0){
						uni.showToast({
							title:'感谢您的反馈',
							icon:'none'
						})
						let timerId = setInterval(() => {
							clearInterval(timerId)
							uni.navigateBack({
								delta: 1
							})
						},2000)
					}else{
						uni.showToast({
							title:data.message,
							icon:'none'
						})
					}
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
		padding: 100rpx 40rpx 150rpx;
		& .block{
			background: #FFFFFF;
			border-radius: 30rpx;
			padding: 47rpx 42rpx;
			margin-bottom: 20rpx;
			
			& .select{
				display: flex;
				align-items: center;
				justify-content: space-between;
				& .left{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
				}
				& .right{
					display: flex;
					align-items: center;
					& >text{
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
						padding-right: 20rpx;
					}
					& image{
						width: 10rpx;
						height: 16rpx;
					}
				}
				
			}
			
			& .title{
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
			}
		
		}
		
		& .self-btn{
			width: 80%;
			margin-top: 90rpx;
		}
	}
</style>
