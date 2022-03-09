<template>
	<view class="contain" :style="'height:' + screenHeight + 'px'">
		<view class="tops">
			<view class="shuom">
				<image src="http://img.hls178.cn/static/image/xz_rz@2x.png"></image>
				<text>经安全检测，可放心使用</text>
			</view>
			<view class="logo">
				<image src="http://img.hls178.cn/static/image/xz_logo@2x.png"></image>
			</view>
			<view class="version">欢乐送 v{{appConfig.android ? appConfig.android.versionName : ''}}</view>
			<view @click="download('android')" class="anzhuo">
				<image src="http://img.hls178.cn/static/image/xz_android@2x.png"></image>
				<text>下载安卓版</text>
			</view>
			<!-- <view @click="download('ios')"  class="anzhuo">
				<image src="http://img.hls178.cn/static/image/xz_iphone@2x.png"></image>
				<text>下载苹果版</text>
			</view> -->
		</view>
		
		<u-overlay :show="iswx" @click="iswx = false">
			<image class="img-1" src="http://img.hls178.cn/static/image/xjt.png"></image>
			<image class="img-2"  src="http://img.hls178.cn/static/image/more.png"></image>
			<image class="img-3"  src="http://img.hls178.cn/static/image/llq.png"></image>
		</u-overlay>
		
	</view>
</template>

<script>
	// #ifdef H5
	import DZMH5Download from 'dzm-dl-h5'
	// #endif
	export default {
		data() {
			return {
				screenHeight:'',
				appConfig:{},
				iswx:false
			};
		},
		async onLoad() {
			this.iswx = this.getiswx()
			this.appConfig = await this.$helper._getCache('appConfig')
			console.log(this.appConfig)
			this.init()
			
		},
		methods: {
			init(){
				let sysInfo = uni.getSystemInfoSync()
				this.screenHeight = sysInfo.screenHeight
			},
			download(plateform){
				if(plateform == 'android'){
					uni.showLoading({
						title:'下载中'
					})
					window.open(this.appConfig.android.upgradeUrl,'_blank')
					//Location.href=this.appConfig.android.upgradeUrl
					//DZMH5Download.DOWLOAD_FILE(this.appConfig.android.upgradeUrl)
				}
				if(plateform == 'ios'){
					uni.showLoading({
						title:'下载中'
					})
					DZMH5Download.DOWLOAD_FILE(this.appConfig.ios.upgradeUrl)
				}
				
				let id = setInterval(()=>{
					clearInterval(id)
					uni.hideLoading()
				},6000)
			},
			getiswx(){
				let ua = navigator.userAgent.toLowerCase()
				
				if(ua.match(/weixin/i) == 'weixin' || ua.match(/wechat/i) == 'wechat'){
					return true
				}else{
					return false
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
		background: url(http://img.hls178.cn/static/image/tjy_gb@2x.png) no-repeat;
		background-size:100% 100% ;
		
		& .tops{
			padding-top: 700rpx;
			width: calc(100% - 180rpx);
			margin: 0 auto;
			
			& .shuom{
				display: flex;
				justify-content: center;
				align-items: center;
				& image{
					width: 44rpx;
					height: 44rpx;
				}
				& text{
					font-size: 26rpx;
					font-weight: bold;
					color: #26FFB6;
					padding-left: 20rpx;
				}
				
			}
			
			& .logo{
				text-align: center;
				margin-top: 67rpx;
				& image{
					width: 140rpx;
					height: 140rpx;
				}
			}
			& .version{
				margin-top: 20rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
			}
			& .anzhuo{
				margin: 40rpx auto 0;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 450rpx;
				height: 88rpx;
				background: #FFDC19;
				border-radius: 44rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #A60D02;
				& image{
					width: 48rpx;
					height: 48rpx;
					margin-right: 19rpx;
				}
			}
		}
		
		& .img-1{
			position: fixed;
			top: 30rpx;
			right: 40rpx;
			width: 100rpx;
			height: 100rpx;
		}
		& .img-2{
			position: fixed;
			top: 130rpx;
			right: 240rpx;
			width: 60rpx;
			height: 60rpx;
		}
		& .img-3{
			position: fixed;
			top: 240rpx;
			right: 140rpx;
			width: 280rpx;
			height: 70rpx;
		}
	}
	
</style>
