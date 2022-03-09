<template>
	
	<view class="contain">
		<u-navbar
			title="登陆"
			leftText="返回"
			:fixed="true"
			@rightClick="rightClick"
			@leftClick="selfleftClick"
		>
		</u-navbar>
		
		<view class="cont-block">
			<view class="login-title">推荐码</view>
			<view class="login-no-btn">
				<input v-model="invite_bind" type="text" placeholder="请输入推荐码" />
			</view>
			<view class="login-sub-btn">
				<view v-if="is_allow_sub == true" @click="login">
					<image src="http://img.hls178.cn/static/image/loding_xyb_n@2x.png"></image>
				</view>
				<image v-if="is_allow_sub == false" src="http://img.hls178.cn/static/image/loding_xyb_d@2x.png"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invite_bind: '',
				is_allow_sub:false
			};
		},
		async onLoad() {
			
		},
		watch:{
			invite_bind(newVal){
				if(newVal.length > 0){
					this.is_allow_sub = true
				}
			}
		},
		
		methods: {
			selfleftClick(){
				uni.redirectTo({
					url:'./index'
				})
			},
			login(){
				this.$helper.httpPost(this.$api.bindParent_post + '?hashID=' + this.invite_bind).then(data => {
				
					if(data.code == 0){
						uni.showToast({
							title:'绑定成功',
							icon:'none'
						})
						let timerId = setInterval(() => {
							clearInterval(timerId)	
							uni.reLaunch({
								url:'../home/index'
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
		background-color: $color-ff;
	}
	.contain{
		background-color: $color-ff;
		.cont-block{
			padding: 282rpx 114rpx 0;
			& .login-title{
				width: 100%;
				font-size: 50rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $color-00;
				line-height: 60rpx;
			}
			
			& .login-no-btn{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 83rpx;
				padding-bottom: 28rpx;
				width: 100%;
				border-bottom: 2rpx solid $color-ED;
				border-radius: 1rpx;
				& > input{
					width: 100%;
					height: 100%;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-99;
				}
			}
			
			& .login-sub-btn{
				margin-top: 53rpx;
				text-align: right;
				& image{
					width: 220rpx;
					height: 110rpx;
				}
			}
		}
	}
	
</style>
