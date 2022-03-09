<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="status_bar"></view> -->
		<!-- #endif -->
		<view class="contain">
			<view class="title">我的</view>
			<view class="user">
				<image class="left" src="http://img.hls178.cn/static/image/user/me_img_nan@2x.png"></image>
				<!-- <image src="http://img.hls178.cn/static/image/user/me_img_nv@2x.png"></image> -->		
				<view class="right">
					<view class="shang">
						<text>{{info.nickname}}</text>
						<image src="http://img.hls178.cn/static/image/user/me_bj_hhr@2x.png"></image>
					</view>
					<view class="xia">
						<text>邀请码：{{info.hashID}}</text>
						<image @click="copyHashId(info.hashID)" src="http://img.hls178.cn/static/image/voucher/copy.png"></image>
					</view>
				</view>
			</view>
			<view class="block">
				<navigator url="./myteam" class="item bt-line">
					<view class="left">
						<image src="http://img.hls178.cn/static/image/user/me_icon_td@2x.png"></image>
						<text>我的团队</text>
					</view>
					<u-icon color="#999999" size="8" name="arrow-right"></u-icon>
				</navigator>
				<navigator url="./getvoucheraccount" class="item bt-line">
					<view class="left">
						<image src="http://img.hls178.cn/static/image/user/me_icon_qq@2x.png"></image>
						<text>我的抢券账号</text>
					</view>
					<u-icon color="#999999" size="8" name="arrow-right"></u-icon>
				</navigator>
				<navigator url="./collection" class="item">
					<view class="left">
						<image src="http://img.hls178.cn/static/image/user/me_icon_sk@2x.png"></image>
						<text>收款信息</text>
					</view>
					<u-icon color="#999999" size="8" name="arrow-right"></u-icon>
				</navigator>
			</view>
			<view class="block">
				<navigator url="/pages/user/help" class="item bt-line">
					<view class="left">
						<image src="http://img.hls178.cn/static/image/user/me_icon_bz@2x.png"></image>
						<text>使用帮助</text>
					</view>
					<u-icon color="#999999" size="8" name="arrow-right"></u-icon>
				</navigator>
				<navigator url="./feedback" class="item ">
					<view class="left">
						<image src="http://img.hls178.cn/static/image/user/me_icon_fk@2x.png"></image>
						<text>反馈</text>
					</view>
					<u-icon color="#999999" size="8" name="arrow-right"></u-icon>
				</navigator>
			</view>
			<view class="block">
				<!-- #ifdef APP-PLUS -->
				<view @click="checkupdate" class="item bt-line">
					<view class="left">
						<image src="http://img.hls178.cn/static/image/user/me_icon_gx@2x.png"></image>
						<text>检查更新</text>
					</view>
					<view class="update">
						<text>{{updateText}}</text>
						<u-icon color="#999999" size="8" name="arrow-right"></u-icon>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<navigator class="item bt-line">
					<view class="left">
						<image src="http://img.hls178.cn/static/image/user/me_icon_gx@2x.png"></image>
						<text>检查更新</text>
					</view>
					<view class="update">
						<text></text>
						<u-icon color="#999999" size="8" name="arrow-right"></u-icon>
					</view>
				</navigator>
				<!-- #endif -->
				
				<view  @click="layoutshow = !layoutshow" class="item">
					<view  class="left">
						<image src="http://img.hls178.cn/static/image/user/me_icon_tc@2x.png"></image>
						<text>退出</text>
					</view>
					<u-icon color="#999999" size="8" name="arrow-right"></u-icon>
				</view>
			</view>
			<!-- 底部菜单 -->
			<tabbar :value="4"></tabbar>
			<!-- 退出登陆 -->
			<u-modal @cancel="layoutshow = !layoutshow" @confirm="layout" :showCancelButton="true" :show="layoutshow" title="您确定退出登录吗？"></u-modal>
		</view>
		<!-- app更新 -->
		<!-- #ifdef APP-PLUS -->
		<appUpdate
		:show="isupdate"
		:upgradeLog="upgradeLog"
		:forceUpgrade="forceUpgrade"
		></appUpdate>
		<!-- #endif -->
	</view>
	
</template>

<script>
	import appUpdate from '@/components/appupdate/index.vue'
	import tabbar from '@/components/footer/index.vue'
	export default {
		components:{
			tabbar,
			appUpdate
		},
		data() {
			return {
				info:[],
				layoutshow:false,
				isupdate:false,
				upgradeLog:'app更新',
				forceUpgrade:0,
				appUrl:'',
				updateText:''
			};
		},
		async onLoad() {
			this.getData()
			this.$helper.httpGet(this.$api.config_get)
			.then(res => {
				let android = res.data.android ? res.data.android :null
				let ios = res.data.ios ? res.data.ios : null
				let sysInfo = uni.getSystemInfoSync()
				let localVersionNo = plus.runtime.version.split('.').join('')
				
				if(sysInfo.platform == 'ios' && ios != null){
					if(localVersionNo < ios.versionCode){
						this.updateText = '当前有可用更新'
					}
				}
				
				if(sysInfo.platform == 'android' && android != null){
					if(localVersionNo < android.versionCode){
						this.updateText = '当前有可用更新'
					}
				}
			})
		},
		
		methods: {
			getData(){
				this.$helper.httpGet(this.$api.user_info_get)
				.then(data => {
					this.info = data.data
					this.$store.commit('userInfo/SET_USER_INFO',this.info)
				})
			},
			copyHashId(val){
				uni.setClipboardData({ data: val.toString(), success:function(data){
					uni.showToast({
						title:'复制成功',
						icon:'none'
					})
				}, fail:function(err){
					uni.showToast({
						title:'复制失败',
						icon:'none'
					})
				}, complete:function(res){} })
			},
			layout(){
				this.$helper._setCache('loginToken', '')
				this.$helper._setCache('userInfo', '')
				uni.showToast({
					title:'退出成功',
					icon:'none'
				})
				
				let timerId = setInterval(() => {
					clearInterval(timerId)
					uni.reLaunch({
						url:'../login/index'
					})
				},1500)
			},
			checkupdate(){
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
						}else{
							uni.showToast({
								title:'暂无最新版本',
								icon:'none'
							})
						}
					}
					
					if(sysInfo.platform == 'android' && android != null){
						if(localVersionNo < android.versionCode){
							this.isupdate = true
							this.forceUpgrade = android.forceUpgrade
							this.upgradeLog = android.upgradeLog
							this.appUrl = android.upgradeUrl
						}else{
							uni.showToast({
								title:'暂无最新版本',
								icon:'none'
							})
						}
					}
				})
			}
			
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-F4;
		background-image: url(http://img.hls178.cn/static/image/user/me_bg@2x.png);
		background-size:contain ;
		background-repeat: no-repeat;
		/* #ifdef APP-PLUS */
		background-position: 0 var(--status-bar-height);
		/* #endif */
		
	}
	.status_bar{
		width: 100%;
		height: var(--status-bar-height);
	}
	.contain{
		/* #ifdef APP-PLUS */
		padding: calc(var(--status-bar-height) + 0rpx) 40rpx 150rpx;
		/* #endif */
		/* #ifdef H5 */
		padding: 0 40rpx 150rpx;
		/* #endif */
		
		min-height: 500rpx;
		& .title{
			padding-top: 38rpx;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
		}
		
		& .user{
			display: flex;
			align-items: center;
			padding: 50rpx 60rpx;
			margin-top: 100rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			& .left{
				width: 100rpx;
				height: 100rpx;
			}
			& .right{
				padding-left: 13rpx;
				& .shang{
					display: flex;
					align-items: center;
					& text{
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						padding-right: 7rpx;
					}
					& image{
						width: 120rpx;
						height: 40rpx;
					}
				}
				& .xia{
					display: flex;
					align-items: center;
					& text{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						padding-right: 10rpx;
					}
					& image{
						width: 19rpx;
						height: 19rpx;
					}
				}
			}
			
		}
		
		
		& .block{
			margin-top: 20rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			& .item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 42rpx 0 38rpx;
				& .left{
					display: flex;
					align-items: center;
					line-height: 118rpx;
					& image{
						width: 54rpx;
						height: 54rpx;
					}
					& text{
						padding-left: 16rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #000000;
					}
				}
				& .update{
					display: flex;
					align-items: center;
					& > text{
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FF4646;
					}
				}
			}
			& .bt-line{
				border-bottom: solid 1rpx #F4F4F4;
			}
		}
	}
</style>
