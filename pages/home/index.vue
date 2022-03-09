<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<view class="contain">
			<!-- 消息入口 -->
			<image @click="toPage('/pages/home/msglist')" class="msg-icon" src="http://img.hls178.cn/static/image/nav_xx@2x.png"></image>
			<!-- 轮播图 -->
			 <swiper class="swiper" indicator-dots="true" autoplay="true"  duration="2000" indicator-color="#999999" indicator-active-color="#ffffff">
				<swiper-item v-for="(item,index) in home.banners" :key="index">
					<navigator class="swiper-item" :url="'/pages/user/artinfo?id=' + item.id">
						<image :src="item.imgURL"></image>
					</navigator>
				</swiper-item>
			</swiper>
			
			<view class="cont-block">
				<view class="notify">
					<image src="http://img.hls178.cn/static/image/home_kb@2x.png"></image>
					<u-notice-bar icon="" color="#000000"	 fontSize="13" bgColor="#ffffff" direction="column" :text="home.messages"></u-notice-bar>
				</view>
				
				<navigator class="receive-voucher" url="./getvoucher">
					<image src="http://img.hls178.cn/static/image/hone_qq@2x.png"></image>
				</navigator>
				
				<view>
					<view class="hot-active">
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<text>热门活动</text>
					</view>
					<u-swiper
						:list="list3"
						indicator
						indicatorMode="line"
						circular
						@click="bannerClick"
					></u-swiper>
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<tabbar :value="0"></tabbar>
		<!-- app更新 -->
		<!-- #ifdef APP-PLUS -->
		<appUpdate
		:show="isupdate"
		:upgradeLog="upgradeLog"
		:forceUpgrade="forceUpgrade"
		></appUpdate>
		<!-- #endif -->
		
		<!-- 新消息弹窗 -->
			<alert
			:show="alertMsgShow"
			:title="alertMsg"
			></alert>

	</view>
	
</template>

<script>
	import tabbar from '@/components/footer/index.vue'
	import appUpdate from '@/components/appupdate/index.vue'
	import alert from '@/components/alert/index.vue'
	export default {
		components:{
			tabbar,
			appUpdate,
			alert
		},
		data() {
			return {
				text1:[],
				list3: [],
				home:{},
				alertMsgShow:false ,//新消息获取弹窗
				alertMsg:'恭喜你，获得新好评返现券，快去看看吧~~',
				isupdate:false,
				upgradeLog:'app更新',
				forceUpgrade:0,
				appUrl:'',
			};
		},
		async onShow() {
			
			// #ifdef APP-PLUS
			uni.$on('updateyesEmit',()=>{
				plus.runtime.openURL(this.appUrl,(err)=>{
					uni.showToast({
						title:'打开浏览器下载失败',
						icon:'none'
					})
				});  
				plus.runtime.quit();
			})
			
			uni.$on('updatenoEmit',()=>{
				 this.isupdate = false
			})
			if(this.$store.state.is_close_update == true){
				return
			}else{
				this.$store.commit('SET_IS_CLOSE_UPDATE',true)
			}
			this.$helper.httpGet(this.$api.config_get)
			.then(res => {
				let android = res.data.android ? res.data.android :null
				let ios = res.data.ios ? res.data.ios : null
				let sysInfo = uni.getSystemInfoSync()
				let localVersionNo = plus.runtime.version.split('.').join('')
				
				if(sysInfo.platform == 'ios' && ios != null){
					if(localVersionNo < ios.versionCode){
						this.isupdate = true
						this.forceUpgrade = ios.forceUpgrade
						this.upgradeLog = ios.upgradeLog
						this.appUrl = ios.upgradeUrl
					}
				}
				
				if(sysInfo.platform == 'android' && android != null){
					if(localVersionNo < android.versionCode){
						this.isupdate = true
						this.forceUpgrade = android.forceUpgrade
						this.upgradeLog = android.upgradeLog
						this.appUrl = android.upgradeUrl
					}
				}
			})
			// #endif
		},
		async onLoad() {
			this.$helper.httpGet(this.$api.config_get)
			.then((data) =>{
				console.log(data)
				this.$helper._setCache('appConfig',data.data)
				if(data.data.user.hasParent == false){
					uni.redirectTo({
						url:'../login/index'
					})
					return
				}
			})
			this.getData()
		},
		
		methods: {
			getData(){
				this.$helper.httpGet(this.$api.app_index_get)
				.then(data => {
					this.home = data.data
					this.home.activities.forEach((item,index) => {
						this.list3.push(item.imgURL)
					})
				})
			},
			bannerClick(index){
				this.toPage('/pages/user/artinfo?id=' + this.home.activities[index].id)
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-F4;
	}
	.status_bar{
		width: 100%;
		height: var(--status-bar-height);
	}

	.contain{
		& .msg-icon{
			position: fixed;
			right: 36rpx;
			/* #ifdef APP-PLUS */
			top: calc(var(--status-bar-height) + 36rpx);
			/* #endif */
			/* #ifdef H5 */
			top: 36rpx;
			/* #endif */
			
			width: 44rpx;
			height: 44rpx;
			z-index: 100;
		}
		
		padding-bottom: 150rpx;
		& .swiper{
			background-color: $color-F4;
			width: 100%;
			height: 500rpx;
			& .swiper-item{
				width: 100%;
				height: 100%;
				& image{
					width: 100%;
					height: 100%;
				}
			}
		}
		& .cont-block{
			padding: 27rpx 40rpx 0;
			& .notify{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				height: 88rpx;
				padding: 0 29rpx;
				background-color: $color-ff;
				border-radius: 20rpx;
				& image{
					width: 180rpx;
					height: 40rpx;
					margin-right: 40rpx;
				}
			}
			
			& .receive-voucher{
				margin-top: 20rpx;
				& image{
					width: 100%;
				}
				
			}
			
			& .hot-active{
				display: flex;
				justify-content:flex-start;
				align-items: center;
				margin: 30rpx 0 20rpx;
				& image{
					width: 20rpx;
					height: 20rpx;
				}
				& text{
					margin-left: 10rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: $color-33;
				}
			}
			
		}
	}
</style>
