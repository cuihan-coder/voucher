<template>
	<u-overlay :show="show" :opacity="0.85" >
		<view class="contain">
			<view class="title">
				<view v-if="userIsRookie == true">新用户另加送纸巾</view>
				<view v-if="userIsRookie != true">新手快速抢券指南</view>
				<view v-if="userIsRookie == true">仅需1步即可抢券</view>
				<view v-if="userIsRookie != true">仅需2步即可抢券</view>
			</view>
			<view class="entry-item">
				<image class="left" src="http://img.hls178.cn/static/image/voucher/newer/hone_qq_zh@2x.png"></image>
				<view class="center">
					<view class="up">
						<text>第一步：</text>
						<text v-if="accountIsSet == true" class="ysz">已设置</text>
						<text v-if="accountIsSet != true"  class="wsz">未设置</text>
					</view>
					<view class="down">设置抢券账号</view>
				</view>
				<navigator v-if="userIsRookie == true" :url="'../../pages/home/addaccount?userIsRookie=' +  userIsRookie" class="right">点击设置</navigator>
				<navigator v-if="userIsRookie == false" url="'../../pages/home/addaccount" class="right">点击设置</navigator>
			</view>
			
			<view class="entry-item" v-if="userIsRookie != true">
				<image class="left" src="http://img.hls178.cn/static/image/voucher/newer/hone_qq_skxx@2x.png"></image>
				<view class="center">
					<view class="up">
						<text>第二步：</text>
					<text v-if="cashInfoIsSet == true" class="ysz">已设置</text>
					<text v-if="cashInfoIsSet != true"  class="wsz">未设置</text>
					</view>
					<view class="down">设置收款信息</view>
				</view>
				<navigator  :url="'../../pages/user/collection?userIsRookie=' +  userIsRookie"  class="right">点击设置</navigator>
			</view>
			<image v-if="userIsRookie != true" @click="close" class="cha" src="http://img.hls178.cn/static/image/voucher/newer/hone_qq_gb@2x.png"></image>
		</view>
	</u-overlay>
</template>

<script>
	export default {
		name:'newertip',
		props:{
			show:{
				type:Boolean,
				default:false
			},
			//是否是新用户
			userIsRookie:{
				type:Boolean,
				default:false
			},
			//是否设置了账号
			accountIsSet:{
				type:Boolean,
				default:false
			},
			//是否设置了收款信息
			cashInfoIsSet:{
				type:Boolean,
				default:false
			},
		},
		data(){
			return {
				sss:false
			}
		},
		methods:{
			close:() => {
				uni.$emit('newerTipCloseEmit')
			}
		}
	}
</script>

<style lang="scss">
	.contain{
		width: calc(100% - 70rpx) ;
		margin: 300rpx auto;
		background: transparent;
		& .title{
			width: 340rpx;
			height: 140rpx;
			background: url(http://img.hls178.cn/static/image/voucher/newer/hone_qq_zn@2x.png) no-repeat;
			background-size: 100% 100%;
			
			& view:nth-child(1){
				padding-top: 27rpx;
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #F4F4F4;
				line-height: 23px;
				text-align: center;
			}
			& view:nth-child(2){
				font-size:26rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #F4F4F4;
				line-height: 23px;
				opacity: 0.8;
				text-align: center;
			}
		}
		
		& .entry-item{
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			width: calc(100% - 66rpx);
			padding: 44rpx 29rpx 36rpx 37rpx;
			background: #FFF;
			border-radius: 20rpx;
			
			& .left{
				width: 130rpx;
				height: 130rpx;
				flex-shrink: 0;
			}
			
			& .center{
				padding-left: 30rpx;
				& .up{
					display: flex;
					align-items: center;
					& text:nth-child(1){
						flex-shrink: 0;
						font-size: 28rpx;
						font-weight: 500;
						color: #333;
					}
					& .ysz{
						flex-shrink: 0;
						width: 120rpx;
						line-height: 40rpx;
						text-align: center;
						border-radius: 30rpx;
						font-size: 22rpx;
						font-weight: 500;
						color: #FFFFFF;
						background-color: #1AC50D;
					}
					& .wsz{
						flex-shrink: 0;
						width: 120rpx;
						line-height: 40rpx;
						text-align: center;
						border-radius: 30rpx;
						font-size: 22rpx;
						font-weight: 500;
						color: #FFFFFF;
						background-color: #FF4949;
					}
				}
				
				& .down{
					padding-top: 20rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
				}
			}
			& .right{
				margin-left: 54rpx;
				padding-right: 30rpx;
				background: url(http://img.hls178.cn/static/image/voucher/newer/hone_qq_gd@2x.png) no-repeat;
				background-position:90% 61%;
				background-size: 14rpx 20rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #999999;
			}
		}
		
		& .cha{
			width: 54rpx;
			height: 54rpx;
			margin-top: 102rpx ;
			margin-left: calc(50% - 27rpx);
		}
	}
</style>
