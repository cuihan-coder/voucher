<template>
	<u-overlay :show="show" zIndex="10000000" @click="show = false">
		<u-popup
		:show="show" 
		round="20" 
		mode="center"  
		:closeable="true"
		@close="close" 
		>
			<view class="contain">
				<image mode="widthFix" class="good-img" :src="goodsInfo.imgURL"></image>
				<view class="desc">{{goodsInfo.name}}</view>
				<view class="goods">{{goodsInfo.content}}</view>
				<view class="select">
					<text>0.00</text>
					<view @click="choose" class="self-btn">选择此商品</view>
				</view>
			</view>
		</u-popup>
	</u-overlay>
</template>

<script>
	export default {
		name:'goods-info',
		props:{
			show:{
				type:Boolean,
				default:false
			},
			goodsInfo:{
				type:[Array,Object],
				default:()=>{
					return []
				}
			}
		},
		methods:{
			close:() => {
				uni.$emit('goodsInfoCloseEmit',{data:false})
			},
			choose:() => {
				uni.$emit('startGetVoucherEmit')
			}
		}
	}
</script>

<style lang="scss">
	.contain{
		width: calc(630rpx - 35rpx) ;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx;
		& .good-img{
			min-width: 600rpx;
			width: 100%;
			margin-top: 34rpx;
		}
		& .desc{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
		& .goods{
			margin-top: 20rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		& .select{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 40rpx;
			
			& > text{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FF2929;
			}
			& > text:before{
				content: '¥';
				padding-right: 10rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FF2929;
			}
			
			& .self-btn{
				width: 200rpx;
				line-height: 54rpx;
				background: linear-gradient(-39deg, #FD7028, #FC4231);
				border-radius: 27rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
			}
		}
		
	}
</style>
