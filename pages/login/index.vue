<template>
	<view>
		<view class="contain" v-if="is_read_contact == false">
			<view class="login-title">手机号码</view>
			<view class="login-no-btn">
				<input v-model="mobile" type="number" placeholder="请输入手机号码" />
			</view>
			<view class="login-contact">
				<image @click="is_agree_contact = !is_agree_contact" v-if="is_agree_contact == false" src="http://img.hls178.cn/static/image/loding_dxk_n@2x.png"></image>
				<image @click="is_agree_contact = !is_agree_contact" v-if="is_agree_contact == true" src="http://img.hls178.cn/static/image/loding_dxk_s@2x.png"></image>
				<text>我已同意并阅读</text>
				<navigator @click="getPrivacy" url="">《隐私协议》</navigator>
			</view>
			<view class="login-sub-btn">
				<navigator v-if="is_allow_sub == true" url="./verify"  hover-class="" >
					<image src="http://img.hls178.cn/static/image/loding_xyb_n@2x.png"></image>
				</navigator>
				<image v-if="is_allow_sub == false" src="http://img.hls178.cn/static/image/loding_xyb_d@2x.png"></image>
			</view>
			
		</view>
		
		<view v-if="is_read_contact == true" class="xieyi">
			<u-parse :content="content"></u-parse>
			<u-button @click="closeReadContact" class="self-btn" shape="circle" text="我以阅读并了解" color="linear-gradient(-30deg, #FD7028, #FC4231)"></u-button>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				//是否同意协议
				is_agree_contact:false,
				//是否勾选协议，填写电话
				is_allow_sub:false,
				//是否查看阅读协议中
				is_read_contact:false,
				//手机号码
				mobile:'',
				content:''
			};
		},
		async onLoad() {
			this.mobile = this.$store.state.login.mobile
		},
		watch:{
			mobile(newVal,old){
				this.checkIsNext()
				this.$store.commit('login/SET_MOBILE',newVal)
			},
			is_agree_contact(){
				this.checkIsNext()
			}
		},
		methods: {
			//获取隐私协议
			getPrivacy(){
				this.$helper.httpGet(this.$api.privacy_get)
				.then(data => {
					this.is_read_contact = true
					this.content = data.data.privacy
				})
			},
			closeReadContact(){
				this.is_read_contact = false
				this.is_agree_contact = true
			},
			//检查石是否可以下一步
			checkIsNext(){
				if(this.mobile.match(/1(3|4|5|6|7|8|9)\d{9}/)){
					this.is_allow_sub =  (Boolean)(this.is_agree_contact && this.mobile)
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-ff;
	}
	.contain{
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
		
		& .login-contact{
			display: flex;
			justify-content: flex-start;
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
				color: $color-99;
				opacity: 0.8;
			}
			
			& navigator{
				margin-left: 8rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-FF3F29;
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
	
	
	 .xieyi{
		padding: 30rpx 20rpx 120rpx;
		& .self-btn{
			position: fixed;
			left: 10%;
			bottom: 20rpx;
			width: 80%;
			
		}
	}
</style>
