<template>
	<view class="contain" :style="'height:' + screenHeight + 'px'">
		<view class="tops"  v-if="is_read_contact == false">
			<view class="input-item">
				<input type="number" v-model="mobile" placeholder-class="plho" placeholder="请输入手机号"  />
			</view>
			<view class="input-item">
				<input v-model="verify_code"  type="number" placeholder-class="plho" placeholder="请输入验证码"  />
				<view @click="getCode" :class="countdown == 60 ? 'verify-code' : 'verify-code-click'">{{countdown == 60 ? '获取验证码' : `倒计时${countdown}秒`}}</view>
			</view>
			<view class="input-item">
				<view class="labal">我的推荐人</view>
				<input v-model="invite_bind" disabled="" type="text" class="rig" placeholder-class="plho" placeholder="邀请人编码"/>
			</view>
			<u-button @click="login()"  class="custom-style" text="立即注册" shape="circle" color="#FFDC19"></u-button>
			
			<view class="login-contact">
				<image @click="is_agree_contact = !is_agree_contact" v-if="is_agree_contact == false" src="http://img.hls178.cn/static/image/loding_dxk_n@2x.png"></image>
				<image @click="is_agree_contact = !is_agree_contact" v-if="is_agree_contact == true" src="http://img.hls178.cn/static/image/loding_dxk_s@2x.png"></image>
				<text>我已同意并阅读</text>
				<navigator @click="getPrivacy" url="">《隐私协议》</navigator>
			</view>
		</view>
		<view v-if="is_read_contact == true" class="xieyi">
			<u-parse :content="content"></u-parse>
			<u-button @click="closeReadContact" class="self-btn" shape="circle" text="我以阅读并了解" color="linear-gradient(-30deg, #FD7028, #FC4231)"></u-button>
		</view>
		
		<navigator url="./appdown" class="goxiazai">前去下载欢乐送APP</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight:'',
				countdown:60,
				is_agree_contact:false,
				mobile:'',
				//是否查看阅读协议中
				is_read_contact:false,
				is_allow_sub:false,
				verify_code:'',
				invite_bind:''
			};
		},
		async onLoad(option) {
			this.invite_bind = option.usercode
			this.init()
			
		},
		methods: {
			login(){
				if(this.mobile.match(/1(3|4|5|6|7|8|9)\d{9}/) == null){
					uni.showToast({
						title:'手机号码错误',
						icon:'none'
					})
					return 
				}
				if(this.verify_code == ''){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
					return 
				}
				if(this.invite_bind == ''){
					uni.showToast({
						title:'请输入邀请人',
						icon:'none'
					})
					return 
				}
				
				this.$helper.httpPost(this.$api.login_post,{
					mobile:this.mobile,
					captcha:this.verify_code,
				}).then(data => {
					uni.showToast({
						title:data.message,
						icon:'none'
					})
					if(data.code == 0){
						uni.showToast({
							title:data.message,
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
							return
						}
						
						this.$helper.httpPost(this.$api.bindParent_post + '?hashID=' + this.invite_bind).then(data => {
							uni.showToast({
								title:data.message,
								icon:'none'
							})
							if(data.code == 0){
								let timerId = setInterval(() => {
									clearInterval(timerId)	
									uni.reLaunch({
										url:'../home/index'
									})
								},2000)
							}
						})
					}
					
				})
				
			},
			//获取隐私协议
			getPrivacy(){
				this.$helper.httpGet(this.$api.privacy_get)
				.then(data => {
					this.is_read_contact = true
					this.content = data.data.privacy
				})
			},
			//获取验证码
			getCode(){
				if(this.mobile.match(/1(3|4|5|6|7|8|9)\d{9}/) == null){
					uni.showToast({
						title:'手机号码错误',
						icon:'none'
					})
					return 
				}
				if(this.countdown != 60){
					return
				}
				this.$helper.httpGet(this.$api.captcha_send_get,{mobile:this.mobile})
				.then(data => {
					uni.showToast({
						icon:'none',
						title:data.message
					})
				})
				let timer = setInterval(() => {
					if(this.countdown == 1){
						clearInterval(timer)
						this.countdown = 60
						return;
					}
					this.countdown--
				},1000)
			}
			,init(){
				let sysInfo = uni.getSystemInfoSync()
				this.screenHeight = sysInfo.screenHeight
			},
			
			closeReadContact(){
				this.is_read_contact = false
				this.is_agree_contact = true
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-ff;
	}
	.contain{
		background: url(http://img.hls178.cn/static/image/tjy_gb@2x.png) no-repeat;
		background-size:100% 100% ;
		& .xieyi{
			background-color: $color-ff;
			padding: 30rpx 20rpx 120rpx;
			& .self-btn{
				position: fixed;
				left: 10%;
				bottom: 20rpx;
				width: 80%;
				
			}
		}
		& .tops{
			padding-top: 720rpx;
			width: calc(100% - 180rpx);
			margin: 0 auto;
			& .input-item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 88rpx;
				margin-bottom: 20rpx;
				border: 3rpx solid #FFC119;
				border-radius: 44rpx;
				& input{
					padding-left: 43rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #FFFFFF;
				}
				& .plho{
					font-size: 28rpx;
					font-weight: 400;
					color: #FFFFFF;
				}
				& .rig{
					text-align: right;
					padding-right: 45rpx;
				}
				& .verify-code{
					flex-shrink: 0;
					width: 187rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 26rpx;
					font-weight: bold;
					color: #A60D02;
					border-radius: 30rpx;
					background: #FFDC19;
					margin-right: 16rpx;
				}
				
				& .verify-code-click{
					flex-shrink: 0;
					width: 187rpx;
					line-height: 60rpx;
					text-align: center;
					background-color: $color-99;
					font-size: 26rpx;
					color: $color-ff;
					border-radius: 30rpx;
					margin-right: 16rpx;
				}
				
				& .labal{
					font-size: 28rpx;
					font-weight: 400;
					color: #FFFFFF;
					padding-left: 42rpx;
				}
			}
			
			& .custom-style{
				margin-top: 40rpx;
				font-size: 32rpx !important;
				font-weight: bold;
				color: #A60D02 !important;
			}
			
			& .login-contact{
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 30rpx;
				& image{
					width: 24rpx;
					height: 24rpx;
				}
				
				& text{
					margin-left: 5rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #fff;
					opacity: 0.8;
				}
				
				& navigator{
					margin-left: 8rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #fff;
					opacity: 0.8;
				}
			}
		}
		
	}
	
	.goxiazai{
		width: 260rpx;
		display: block;
		padding: 4rpx 6rpx;
		margin: 100rpx auto 0;
		background-color: #fff;
		color: #333;
		font-size: 28rpx;
		font-weight: bold;
		border-radius: 4rpx;
		text-align: center;
		
	}
	
</style>
