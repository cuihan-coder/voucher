<template>
	<view>
		<u-popup 
		:show="show" 
		round="30" 
		mode="center"  
		>
			<view class="contain">
				<image class="app-up" src="http://img.hls178.cn/static/image/gx_icon@2x.png"></image>
				<view class="title">新版本升级</view>
				<view class="sub-title">更新内容</view>
				<text class="cont">{{upgradeLog}}</text>
				<u-button @click="updateyes" class="self-btn" shape="circle" text="马上更新" color="linear-gradient(-30deg, #FD7028, #FC4231)"></u-button>
				<view @click="updateno"  v-if="forceUpgrade == 0"  class="not-up">暂不更新</view>
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
			upgradeLog:{
				type:String,
				default:''
			},
			forceUpgrade:{
				type:[Number,String],
				default:0
			}
		},
		methods:{
			updateyes:() => {
				uni.$emit('updateyesEmit',{})
			},
			updateno:() => {
				uni.$emit('updatenoEmit',{})
			}
		}
	}
</script>

<style lang="scss">
	.contain{
		width: calc(520rpx - 74rpx) ;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 90rpx 37rpx 43rpx;
		position: relative;
		
		& .app-up{
			position: absolute;
			top: -92rpx;
			left: calc(50% - 150rpx);
			width: 300rpx;
			height: 270rpx;
		}
		& .title{
			padding-top: 86rpx;
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FD7028;
			text-align: center;
		}
		
		& .sub-title{
			padding-top: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #000000;
		}
		
		
		& .cont{
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #A5A5A5;
			line-height: 34rpx;
		}
		
		& .not-up{
			padding-top: 29rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			text-align: center;
		}
		& .self-btn{
			margin-top:50rpx;
			width: 80%;
		}
	}
</style>
