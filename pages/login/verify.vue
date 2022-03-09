<template>
	<view class="contain">
		<u-navbar
			title="登陆/注册"
			leftText="返回"
			:fixed="true"
			@rightClick="rightClick"
			@leftClick="leftClick"
		>
		</u-navbar>
		<view class="cont-block">
			<view class="login-title">验证码</view>
			<view class="login-no-btn">
				<input v-model="verify_code" type="number" placeholder="请输入验证码" />
				<view @click="getCode" :class="countdown == 60 ? 'verify-code' : 'verify-code-click'">{{countdown == 60 ? '获取验证码' : `倒计时${countdown}秒`}}</view>
			</view>
			<view class="login-sub-btn">
				<navigator @click="login" v-if="is_allow_sub == true"  hover-class="" >
					<image src="http://img.hls178.cn/static/image/loding_xyb_n@2x.png"></image>
				</navigator>
				<image v-if="is_allow_sub == false" src="http://img.hls178.cn/static/image/loding_xyb_d@2x.png"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				verify_code:'',
				countdown:60,
				is_allow_sub:false
			};
		},
		async onLoad() {
			
		},
		watch:{
			verify_code(newVal){
				this.is_allow_sub = (Boolean)(newVal.length > 0)
			}
		},
		methods: {
			//获取验证码
			getCode(){
				if(this.countdown != 60){
					return
				}
				this.$helper.httpGet(this.$api.captcha_send_get,{mobile:this.$store.state.login.mobile})
				.then(data => {
					if(data.code == 0){
						uni.showToast({
							icon:'none',
							title:'发送成功'
						})
					}else{
						uni.showToast({
							icon:'none',
							title:data.message
						})
					}
					
				})
				let timer = setInterval(() => {
					if(this.countdown == 1){
						clearInterval(timer)
						this.countdown = 60
						return;
					}
					this.countdown--
				},1000)
			},
			login(){
				this.$helper.httpPost(this.$api.login_post,{
					mobile:this.$store.state.login.mobile,
					captcha:this.verify_code,
				}).then(data => {
					
					if(data.code == 0){
						uni.showToast({
							title:'登录成功',
							icon:'none'
						})
						this.$helper._setCache('loginToken', data.data[0].token)
						this.$helper._setCache('userInfo', data.data[0].data)
						//未绑定上级
						if(data.data[0].hasParent == false){
							let timerId = setInterval(() => {
								clearInterval(timerId)	
								uni.reLaunch({
									url:'./recommend'
								})
							},2000)
							
						}
						//已绑定上级 去首页
						if(data.data[0].hasParent == true){
							let timerId = setInterval(() => {
								clearInterval(timerId)	
								uni.reLaunch({
									url:'../home/index'
								})
							},2000)
						}
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
				
				& .verify-code{
					flex-shrink: 0;
					width: 187rpx;
					line-height: 60rpx;
					text-align: center;
					background-color: $color-3E76FF;
					font-size: 24rpx;
					font-weight: 400;
					font-family: PingFang SC;
					color: $color-ff;
					border-radius: 30rpx;
				}
				
				& .verify-code-click{
					flex-shrink: 0;
					width: 187rpx;
					line-height: 60rpx;
					text-align: center;
					background-color: $color-99;
					font-size: 24rpx;
					font-weight: 400;
					font-family: PingFang SC;
					color: $color-ff;
					border-radius: 30rpx;
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
