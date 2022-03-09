<template>
	<view>
		<u-popup 
		:show="show" 
		round="20" 
		mode="center"  
		:closeable="true"
		@close="close" 
		>
			<view class="contain">
				<view class="title">提交核券</view>
				<view class="item">
					<text class="lable">第三方订单号：</text>
					<view class="input">
						<input placeholder-class="placeholder" v-model="value1" type="text" placeholder="请输入"/>
						<!-- <text>粘贴</text> -->
					</view>
				</view>
				<view class="item">
					<text class="lable">实付金额：</text>
					<view class="input">
						<input placeholder-class="placeholder" v-model="value2" type="digit" placeholder="请输入"/>
					</view>
				</view>
				<view class="tips">提示：请购买后认证填写再核券，不然会导致核券失败，且只有一次修改机会。</view>
				<u-button @click="subInfo" class="self-btn" shape="circle" text="了解" color="linear-gradient(-30deg, #FD7028, #FC4231)"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:'nuclear-voucher',
		props:{
			show:{
				type:Boolean,
				default:false
			},
			value1:{
				type:[String,Number],
				default:''
			},
			value2:{
				type:[String,Number],
				default:''
			}
		},
		methods:{
			close:() => {
				uni.$emit('numclearModalClose',{})
			},
			subInfo(){
				uni.$emit('numclearModalSub',{value1:this.value1,value2:this.value2})
			}
		}
	}
</script>

<style lang="scss">
	.contain{
		width: calc(630rpx - 120rpx) ;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 90rpx 60rpx 60rpx;
		& .title{
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			text-align: center;
		}
		& .item{
			padding-bottom: 30rpx;
			margin-top: 60rpx;
			border-bottom: solid 2rpx #E7E7E7;
			& .lable{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			
			& .input{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-top: 20rpx;
				& .placeholder{
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
				& input{
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333;
				}
				& text{
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #047EF0;
				}
			}
		}
		& .tips{
			padding-top: 30rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FF4D35;
		}
		
		& .self-btn{
			margin-top: 100rpx;
			width: 90%;
		}
	}
</style>
