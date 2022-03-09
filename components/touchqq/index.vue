<template>
	<view>
		<u-popup 
		:show="show" 
		round="30" 
		mode="center"  
		@close="close" 
		:closeable="true"
		>
			<view class="contain">
				<view class="app-up">您的导师</view>
				<view class="kf-avatar">
					<image  src="http://img.hls178.cn/static/image/ds_tx@2x.png"></image>
				</view>
				<view class="name">{{info.name}}</view>
				<view class="wxh" @click="copyCont(1111)">
					<text>微信号：{{info.wx}}</text>
					<image src="http://img.hls178.cn/static/image/voucher/copy.png"></image>
				</view>
				<view class="qq-btn">
					<image src="http://img.hls178.cn/static/image/ds_qq@2x.png"></image>
					<view class="right"  @click="copyCont(1111)">
						<view class="qq-name">QQ交流群</view>
						<view class="num">
							<text>{{info.qq}}</text>
							<image src="http://img.hls178.cn/static/image/voucher/yyq_hq_fz@2x.png"></image>
						</view>
					</view>
				</view>
			</view>
			
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:'app-update',
		props:{
			show:{
				type:Boolean,
				default:false
			},
			info:{
				type:Object,
				default:() => {
					return {}
				}
			}
		},
		methods:{
			close:() => {
				uni.$emit('touchQQCloseEmit',{data:false})
			},
			copyCont(val){
				uni.setClipboardData({ data: val.toString(), success:function(data){
					uni.showToast({
						title:'复制成功',
						icon:'none'
					})
				}, fail:function(err){
					uni.showToast({
						title:'复制失败',
						icon:'none'
					})
				}, complete:function(res){} })
			}
		}
		
	}
</script>

<style lang="scss">
	.contain{
		width: calc(630rpx - 180rpx) ;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 0 100rpx 127rpx;
		& .app-up{
			margin: 0 auto;
			width: 355rpx;
			line-height: 60rpx;
			background: url(http://img.hls178.cn/static/image/ds_by_bg@2x.png) no-repeat;
			background-size: 100% 100%;
			font-size: 30rpx;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
		}
		
		& .kf-avatar{
			width: 200rpx;
			height: 200rpx;
			margin: 147rpx auto 0;
			& image{
				width: 100%;
				height: 100%;
			}
		}
		
		& .name{
			margin-top: 39rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
			text-align: center;
		}
		
		& .wxh{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20rpx;
			& text{
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;
				
			}
			& image{
				width: 20rpx;
				height: 20rpx;
				margin-left: 22rpx;
			}
		}
		
		& .qq-btn{
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 75rpx;
			margin-top: 80rpx;
			background: linear-gradient(-30deg, #FD7028, #FC4231);
			border-radius: 49px;
			& image{
				width: 60rpx;
				height: 60rpx;
			}
			
			& .right{
				margin-left: 20rpx;
				& .qq-name{
					font-size: 24rpx;
					font-weight: bold;
					color: #FFFFFF;
					text-align: left;
				}
				& .num{
					& text{
						font-size: 32rpx;
						font-weight: bold;
						color: #FFFFFF;
					}
					& image{
						width: 20rpx;
						height: 20rpx;
						margin-left: 22rpx;
					}
				}
			}
			
		}
		
	}
</style>
