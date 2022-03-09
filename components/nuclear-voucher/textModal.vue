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
				<view class="title">提交申诉</view>
				<view class="labal">申诉内容</view>
				<view>
					<u--textarea height="185" v-model="value" placeholder="请详细描述申诉内容" autoHeight ></u--textarea>
				</view>
				<u-button @click="subInfo" class="self-btn" shape="circle" text="提交" color="linear-gradient(-30deg, #FD7028, #FC4231)"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:'text-modal',
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				value:''
			};
		},
		methods:{
			close:() => {
				console.log(1111)
				uni.$emit('textModalClose',{})
			},
			subInfo(){
				uni.$emit('textModalSubEmit',{reson:this.value})
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
		& .labal{
			margin-top: 48rpx;
			margin-bottom: 26rpx;
			height: 26rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
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
				& input, .placeholder{
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
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
