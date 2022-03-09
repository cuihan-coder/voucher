<template>
	<view>
		<view class="contain" :style="'height:' + screenHeight + 'px'">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<navigator class="go-back" url="./index">
				<image src="http://img.hls178.cn/static/image/fhjt.png"></image>
				<text>返回</text>
			</navigator>
			
			<view class="touch-qq" @click="showTouchqqValue = !showTouchqqValue">
				<view>添加导师</view>
			</view>
			
			<view class="open-music">
				<text>提示语音</text>
				<u-switch activeColor="#f9ae3d" v-model="qzmusicValue" @change="qzMusicChange" size="18"></u-switch>
			</view>
			
			<view class="open-music top-self">
				<text>后台抢券</text>
				<u-switch activeColor="#f9ae3d" v-model="htchangeValue" @change="htchange" size="18"></u-switch>
			</view>
			
			<view class="wallet-title" :style="is_gt == true ? 'top:21%;' : ''">
				<image src="http://img.hls178.cn/static/image/wallet/qq_dx_ziti@2x.png"></image>
			</view>
			<view class="wallet" :style="is_gt == true ? 'top:33%;' : '' ">
				<view class="wallet-tc1">
					<image src="http://img.hls178.cn/static/image/wallet/qq_dx_bg5@2x.png"></image>
				</view>
				<!-- 券 -->
				<view class="wallet-tc2">
					<image src="http://img.hls178.cn/static/image/wallet/qq_dx_yyq4@2x.png"></image>
				</view>
				<!-- 红包 -->
				<view class="wallet-tc3">
					<image src="http://img.hls178.cn/static/image/wallet/qq_dx_hb3@2x.png"></image>
				</view>
				<view class="wallet-tc4">
					<image src="http://img.hls178.cn/static/image/wallet/qq_dx_jinbi2@2x.png"></image>
				</view>
				<view class="wallet-tc5">
					<image src="http://img.hls178.cn/static/image/wallet/qq_dx_qg1@2x.png"></image>
				</view>
				<!-- 人 -->
				<view class="wallet-tc6">
					<image src="http://img.hls178.cn/static/image/wallet/qq_dx_r@2x.png"></image>
				</view>
				<view class="wallet-tc7">
					<image src="http://img.hls178.cn/static/image/wallet/qq_dx_one@2x.png"></image>
				</view>
				
			</view>
			
			<!-- 抢券动画 -->
			<view class="qq-dh" v-if="is_start_get == true"  @click="stopGetVoucher">
				<view class="quan-1"></view>
				<view class="quan-2"></view>
				<view class="quan-3"></view>
			</view>
			
			<view class="footer-qiang">
				<view v-if="info.ipUsed == false" class="ip-info">
					<image @click="checkIp" src="http://img.hls178.cn/static/image/wallet/hone_qq_ip_n@2x.png"></image>
					<text  @click="checkIp">IP可用</text>
					<image  @click="ipShow = !ipShow" src="http://img.hls178.cn/static/image/wallet/hone_qq_ip_w@2x.png"></image>
				</view>
				<view v-if="info.ipUsed == true" class="ip-info">
					<image @click="checkIp" src="http://img.hls178.cn/static/image/wallet/hone_qq_ip_s@2x.png"></image>
					<text  @click="checkIp">IP占用</text>
					<image @click="ipShow = !ipShow" src="http://img.hls178.cn/static/image/wallet/hone_qq_ip_w@2x.png"></image>
				</view>
				<view class="get_voucher">
					<view class="end-btn" v-if="is_start_get == true">
						<view>抢券中</view>
						<view>点击停止抢券</view>
					</view>
					<view class="freeze-btn" v-if="info.countDown > 0">
						<view>
							<countdown :times="info.countDown" :_style="{fontSize:'24rpx',fontWeight:'500',color:'#fff',opacity:'0.8',textAlign: 'center'}"></countdown>
						</view>
						<view>后可抢券</view>
					</view>
					<view @click="getVoucherCheck" class="btn-start"  v-if="info.countDown <= 0 && is_start_get == false">
						<view>开始抢券</view>
					</view>
				</view>
				<view class="set-acount" @click="changeAcountShow = !changeAcountShow">
					<view>
						<image src="http://img.hls178.cn/static/image/wallet/hone_qq_dy@2x.png"></image>
						<text>{{activeAccountName?activeAccountName:'请设置抢券号'}}</text>
						<image src="http://img.hls178.cn/static/image/wallet/hone_qq_gd@2x.png"></image>
					</view>
				</view>
			</view>
			
			<!-- 点击IP 弹窗 -->
			<u-popup :show="ipShow" mode="center"  round="20" >
				<view class="tips">
					<view class="title">提示</view>
					<text class="content">
						1、使用手机流量，开启飞行模式再
						    关闭，可以切换IP。
						2、同一WiFi下，都是一个IP。	
					</text>
					<u-button @click="ipShow = !ipShow" class="self-btn" shape="circle" text="了解" color="linear-gradient(-30deg, #FD7028, #FC4231)"></u-button>
				</view>
				
			</u-popup>
			<!-- 点击IP 弹窗 -->
			
			<!-- 领到券显示 -->	
			<u-popup
			  v-if="voucherInfo.length != 0"
			 :show="showVoucher"
			  bgColor='rgba(0, 0, 0, 0)' 
			  :closeOnClickOverlay="true"
			  :closeable="true"
			  @close="showVoucher = !showVoucher"
			  mode="center"  >
				<view class="voucher-block">
					<view class="gongxi">恭喜你获得</view>
					<view class="title">指定商品 {{voucherInfo.task.goodsMoney}}元 抵扣券</view>
					<view class="voucher-item">
						<image class="image" :src="voucherInfo.task.goods[0].imgURL"></image>
						<view class="info">
							<view>{{voucherInfo.task.goods[0].name}}</view>
							<text>核券后全返+金币{{voucherInfo.money}}</text>
							<view>0.00</view>
						</view>
					</view>
					<view class="voucher-info">
						<view class="left">
							<view>抵扣券 满{{voucherInfo.task.goodsMoney}}可用</view>
							<view>有效期：{{ 
								(new Date(voucherInfo.expireTime)).getFullYear()
								+ '.'
								+ ((new Date(voucherInfo.expireTime)).getMonth()+1 < 10 ? '0'+((new Date(voucherInfo.expireTime)).getMonth()+1) : (new Date(voucherInfo.expireTime)).getMonth()+1)
								 + '.'
								 +
								 ((new Date(voucherInfo.expireTime)).getDate() < 10 ? '0' + (new Date(voucherInfo.expireTime)).getDate() : (new Date(voucherInfo.expireTime)).getDate())
								 + ' '
								 + (new Date(voucherInfo.expireTime)).getHours() 
								 + ':'
								 + (new Date(voucherInfo.expireTime)).getMinutes()
								 }}</view>
								
							<view>一次用户限1次</view>
						</view>
						<view class="right">
							<view>{{voucherInfo.task.goodsMoney}}</view>
							<navigator :url="'../voucher/voucherinfo?id=' + voucherInfo.id ">去使用</navigator>
						</view>
					</view>
					<view class="voucher-into"><text>优惠券已放入您的账户中，点击</text><navigator url="../voucher/index">优惠券</navigator><text>可查看</text></view>
				</view>
			</u-popup>
			<!-- 领到券显示 -->
			<!-- 选择奖励类型 -->
			<goodsSelect :show="showGoodsSelectValue" :list="info.goods"></goodsSelect>
			<!-- 用户的账户列表 -->
			<accountList :changeAcountShow="changeAcountShow"></accountList>
			<!-- 新手提示tip -->
			<newertip 
			:show="newerTipValue"
			:userIsRookie="userIsRookie"
			:accountIsSet="accountIsSet"
			:cashInfoIsSet="cashInfoIsSet"
			></newertip>
			<!-- 客服联系方式 -->
			<touchqq :show="showTouchqqValue" :info="touchInfo"></touchqq>
		</view>
	</view>
	
</template>

<script>
	import goodsSelect from '@/components/goodsSelect/index.vue'
	import accountList from '@/components/accounts-list/index.vue'
	import newertip from '@/components/newertip/index.vue'
	import touchqq from '@/components/touchqq/index.vue'
	import countdown from '@/components/countdown/index.vue'
	export default {
		components:{
			goodsSelect,
			accountList,
			newertip,
			touchqq,
			countdown
		},
		data() {
			return {
				screenHeight:'',
				is_gt:false,//是否大于750
				ipShow:false,//是否点击IP显示内容
				timeData: {},
				changeAcountShow:false,//是否点击切换抖音号
				showVoucher:false,//领到券显示
				voucherInfo:[],//券信息
				is_start_get:false,//是否开始抢券
				info:{},
				activeAccountId:'',//选择的账号ID
				activeAccountName:'',//选择的账号name
				htchangeValue:true,//是否后台抢券
				qzmusicValue:false,//是否抢中播放音乐
				htTimerId:'',//后台抢券任务ID
				showGoodsSelectValue:false, //是否显示商品类型选择
				htDuration:1000 ,//抢券间隔时间
				newerTipValue:false,//是否需要新手提示
				userIsRookie:false,//是否是新用户
				accountIsSet:false,//是否设置了账号
				cashInfoIsSet:false,//是否设置了收款码
				showTouchqqValue:false ,//是否显示客服信息
				touchInfo:{} ,//客服弹窗
			};
		},
		async onLoad() {
			let that = this
			this.init()
			this.getInfo()
			//切换账户组件显示监听
			uni.$on('changeAcountShowEmit',(data) => {
				this.changeAcountShow = data.data
			})
			//激活账户事件
			uni.$on('activeAccountIdEmit',(data) => {
				this.activeAccountId = data.data
			})
			
			uni.$on('activeAccountNameEmit',(data) => {
				this.changeAcountShow = false
				this.activeAccountName = data.data
			})
			//检查是否完成账号完善(二次选择账号的时候判断，第一次不判断)
			uni.$on('accountisCompleteEmit',(data) => {
				if(this.userIsRookie == true){
					if(this.cashInfoIsSet == false){
						this.newerTipValue = true
					}
				}
			})
			
			//监听选择商品
			uni.$on('showGoodsSelectValueEmit',(data) => {
				this.showGoodsSelectValue = data.data
			})
			//开始抢券
			uni.$on('startGetVoucherEmit',(data) => {
				
				if(this.activeAccountId == ''){
					this.changeAcountShow = true
					return
				}
				this.showGoodsSelectValue = false
				
				this.startGetVoucher()
				
			})
			//关闭新手引导
			uni.$on('newerTipCloseEmit',(data) => {
				this.newerTipValue = false
			})
			//关闭添加客服弹窗
			uni.$on('touchQQCloseEmit',(data) => {
				this.showTouchqqValue = false
			})
			
		},
		onHide(){
			if(this.htchangeValue == false){
				clearInterval(this.htTimerId)
			}
		},
		onUnload(){
			if(this.htchangeValue == false){
				clearInterval(this.htTimerId)
			}
			uni.$off('changeAcountShowEmit')
			//激活账户事件
			uni.$off('activeAccountIdEmit')
			//监听选择商品
			uni.$off('showGoodsSelectValueEmit')
			//开始抢券
			uni.$off('startGetVoucherEmit')
			//新手指导
			uni.$off('newerTipCloseEmit')
			
		},
		methods: {
			getVoucherCheck(){
				if(this.info.ipUsed == true){
					uni.showToast({
						title:'当前IP暂时无法抢券',
						icon:'none'
					})
					return
				}
				
				if(this.activeAccountId == null || this.activeAccountId == ''){
					uni.showToast({
						title:'当前没有可抢券账号',
						icon:'none'
					})
					return
				}
				this.showGoodsSelectValue = !this.showGoodsSelectValue
			},
			//点击开始抢券
			startGetVoucher(){
				this.is_start_get = true
				this.htTimerId =  setInterval(() => {
					this.getVoucher()
				},10000)
				this.getVoucher()
				
			},
			//停止抢券
			stopGetVoucher(){
				this.is_start_get = false
				if(this.htTimerId){
					clearInterval(this.htTimerId)
				}
			},
			//获取抢券首页数据
			getInfo() {
				this.$helper.httpGet(this.$api.task_index_get)
				.then(data => {
					this.info =  data.data == null ? [] : data.data
					this.userIsRookie = this.info.userIsRookie
					this.accountIsSet = this.info.accountIsSet
					this.cashInfoIsSet = this.info.cashInfoIsSet
					if(this.userIsRookie == true){
						if(this.accountIsSet == false ){
							this.newerTipValue = true
						}
					}
				})
			},
			//抢券
			getVoucher() {
				this.$helper.httpGet(this.$api.task_get_get,{accountID:this.activeAccountId})
				.then(data => {
					console.log('====',data)
					if(data.code == 0 && data.data != null){
						this.voucherInfo = data.data
						//显示优惠券弹窗
						this.showVoucher = true	
						let a = setInterval(() => {
							clearInterval(a)
							this.stopGetVoucher()
						},2000)
						//播放音乐
						if(this.qzmusicValue == true){
							this.playAudio(this.info.hintAudio)
						}
						
						return
					}else if(data.code == 500){
						let a = setInterval(() => {
							clearInterval(a)
							this.stopGetVoucher()
						},2000)
						uni.showToast({
							title:data.message,
							icon:'none',
							duration:4000
						})
						this.init()
						return 
					}
					
				})
			},
			timeOnChange(e) {
				this.timeData = e
				if(e.milliseconds == 0){
					this.info.countDown = 0
				}
			},
			 init(){
				let sysInfo = uni.getSystemInfoSync()
				this.screenHeight = sysInfo.screenHeight
				if(this.screenHeight  >= 750){
					this.is_gt = true
				}
				this.$helper._getCache('appConfig').then(data => {
					this.touchInfo.wx = data.wechat
					this.touchInfo.qq = data.qqGroup
					this.touchInfo.name = data.wechatNickname
				})
				
				
			},
			htchange(e){
				this.htchangeValue = e
			},
			qzMusicChange(e){
				this.qzmusicValue = e
			},
			//播放音乐
			playAudio(src){
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = src;
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
				
			},
			checkIp(){
				this.$helper.httpGet(this.$api.ip_check_get)
				.then(res => {
					this.info.ipUsed = res.data.used
					if(res.data.used == false){
						uni.showToast({
							title:'ip可正常使用',
							icon:'none'
						})
					}else{
						uni.showToast({
							title:'ip被占用',
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.status_bar{
		width: 100%;
		height: var(--status-bar-height);
	}
	.contain{
		width: 100%;
		background: url(http://img.hls178.cn/static/image/wallet/qq_dx_bg@2x.png) no-repeat;
		background-size: 100% 100%;
		.go-back{
			position: fixed;
			/* #ifdef APP-PLUS */
			top: calc(--status-bar-height + 50rpx);
			/* #endif */
			
			/* #ifdef H5 */
			top: 50rpx;
			/* #endif */
			
			left: 42rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			z-index: 100;
			& image{
				width: 30rpx;
				height: 30rpx;
				z-index: 100;
			}
			& text{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-ff;
			}
		}
		.touch-qq{
			position: fixed;
			top: 90rpx;
			right: 0;
			width: 200rpx;
			height: 74rpx;
			background: url(http://img.hls178.cn/static/image/wallet/home_qq_ds@2x.png);
			background-size: 100% 100%;
			& view{
				width: 100%;
				line-height: 74rpx;
				padding-left: 80rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-ff;
			}
		}
		
		.open-music{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			z-index: 100;
			position: fixed;
			bottom: 300rpx;
			right: 0;
			padding: 15rpx 20rpx  15rpx 30rpx;
			background: rgba(0,0,0,0.68);
			border-radius: 37rpx 0rpx 0rpx 37rpx;
			& text{
				padding-right: 10rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-ff;
			}
		}
		
		.top-self{
			bottom: 220rpx;
		}
		
		.wallet-title{
			position: absolute;
			top: 13%;
			width: 100%;
			& image{
				width: 100%;
				height: 170rpx;
			}
		}
		
		@keyframes quan{
			0% {
				top: 5rpx;
			}
			25% {
				top: 15rpx;
			}
			
			50% {
				top: 20rpx;
			}
			75% {
				top: 15rpx;
			}
			100% {
				top: 0rpx;
			}
		}
		@keyframes hongbao{
			0% {
				top: 3rpx;
			}
			25% {
				top: 13rpx;
			}
			
			50% {
				top: 16rpx;
			}
			75% {
				top: 13rpx;
			}
			100% {
				top: 0rpx;
			}
		}
		@keyframes people{
			0% {
				bottom: 0rpx;
			}
			15% {
				bottom: 20rpx;
			}
			
			30% {
				bottom: 40rpx;
			}
			
			50% {
				bottom: 74rpx;
			}
			
			75% {
				bottom: 40rpx;
			}
			
			100% {
				bottom: 0rpx;
			}
		}
		.wallet{
			position: relative;
			top: 20%;
			width: 100%;
			height: 850rpx;
			& .wallet-tc1{
				position: absolute;
				z-index: 2;
				width: 100%;
				height: 100%;
				& image{
					width: 100%;
					height: 100%;
				}
			}
			& .wallet-tc2{
				position: absolute;
				z-index:3;
				width: 100%;
				height: 100%;
				& image{
					width: 100%;
					height: 100%;
				}
				animation: quan 0.8s linear infinite;
				-webkit-animation:quan 0.8s linear infinite;
				// animation: quan ;
				// -webkit-animation:quan;
				// animation-duration:0.8s;
				// -webkit-animation-duration:0.8s;
				// animation-timing-function:linear;
				// -webkit-animation-timing-function:linear; 
				// animation-iteration-count:infinite;
				// -webkit-animation-iteration-count:infinite;
			}
			& .wallet-tc3{
				position: absolute;
				z-index:4;
				width: 100%;
				height: 100%;
				& image{
					width: 100%;
					height: 100%;
				}
				animation: hongbao 0.8s linear infinite;
				-webkit-animation:hongbao 0.8s linear infinite;
			}
			& .wallet-tc4{
				position: absolute;
				z-index:5;
				width: 100%;
				height: 100%;
				& image{
					width: 100%;
					height: 100%;
				}
			}
			& .wallet-tc5{
				position: absolute;
				z-index:6;
				width: 100%;
				height: 100%;
				& image{
					width: 100%;
					height: 100%;
				}
			}
			& .wallet-tc6{
				position: absolute;
				right: 0;
				bottom: 74rpx;
				z-index:7;
				width: 229rpx;
				height: 280rpx;
				& image{
					width: 100%;
					height: 100%;
				}
				animation: people 0.8s linear infinite;
				-webkit-animation:people 0.8s linear infinite;
			}
			& .wallet-tc7{
				position: absolute;
				top: 70rpx;
				z-index:6;
				width: 100%;
				height: 100%;
				& image{
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.footer-qiang{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			z-index: 100;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 174rpx;
			background: url(http://img.hls178.cn/static/image/wallet/hone_qq_tabbg@2x.png) no-repeat;
			background-size: cover;
			
			& .ip-info{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				width: 33.3%;
				padding-top: 10%;
				& image:nth-child(1){
					width: 40rpx;
					height: 40rpx;
					margin-left: 30rpx;
				}
				& text{
					margin-left: 10rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-ff;
				}
				& image:nth-child(3){
					margin-left: 9rpx;
					width: 22rpx;
					height: 22rpx;
				}
			}
			
			& .get_voucher{
				width: 33.3%;
				display: flex;
				justify-content: center;
				& .btn-start{
					display: grid;
					justify-content: center;
					align-items: center;
					width: 150rpx;
					height: 150rpx;
					background: url(http://img.hls178.cn/static/image/wallet/hone_qq_kq@2x.png) no-repeat;
					background-size: 100% 100%;
					background-position: left center; 
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-B21610;
				}
				& .end-btn{
					display: grid;
					justify-content: center;
					width: 150rpx;
					height: 150rpx;
					background: url(http://img.hls178.cn/static/image/wallet/hone_qq_kq@2x.png) no-repeat;
					background-size: 100% 100%;
					background-position: left center; 
					& view:nth-child(1){
						display: grid;
						align-items: flex-end;
						justify-content: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-B21610;
					}
					& view:nth-child(2){
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 900;
						color: $color-B21610;
						transform: scale(0.7,1);
						opacity: 0.8;
					}
					
				}
				
				& .freeze-btn{
					display: grid;
					justify-content: center;
					width: 150rpx;
					height: 150rpx;
					background: url(http://img.hls178.cn/static/image/wallet/hone_qq_lq@2x.png) no-repeat;
					background-size: 100% 100%;
					background-position: left center; 
					& view:nth-child(1){
						display: flex;
						align-items: flex-end;
						justify-content: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-ff;
					}
				
					& view:nth-child(2){
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-ff !important;
						transform: scale(0.7,1);
						opacity: 0.8;
						text-align: center;
						& .time{
							display: flex;
							align-items: center;
							text-align: center;
						}
					}
				}
				
			}
			
			& .set-acount{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 33.3%;
				margin-top: 10%;
				& view:nth-child(1){
					display: flex;
					align-items: center;
					justify-content: flex-start;
					padding: 4rpx 10rpx 4rpx 8rpx;
					height: 48rpx;
					background: $color-B51E13;
					border-radius: 24rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-ff;
					line-height: 20px;
					& image:nth-child(1){
						width: 40rpx;
						height: 40rpx;
						margin-right: 8rpx;
					}
					& image:nth-child(3){
						margin-left: 8rpx;
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}
		
		.tips{
			padding: 53rpx 62rpx;
			& .title{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $color-33;
				text-align: center;
			}
			
			& .content{
				display: block;
				margin-top: 90rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $color-33;
			}
			
			& .self-btn{
				margin-top: 100rpx;
				width: 90%;
			}
		}
		
	
		
		& .voucher-block{
			width: 600rpx;
			height: 970rpx;
			margin: 0 auto;
			background: url(http://img.hls178.cn/static/image/wallet/qq_yyq_bg@2x.png) no-repeat;
			background-size: 100% 100%;
			
			& .gongxi{
				margin-top: 320rpx;
				font-size: 50rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: $color-FFECBF;
				text-align: center;
			}
			& .title{
				margin-top: 10rpx;
				font-size: 33rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $color-FFECBF;
				text-align: center;
			}
			
			& .voucher-item{
				width:80%;
				margin: 30rpx auto 0;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 21rpx 36rpx 21rpx 21rpx;
				background: $color-ff;
				border-radius: 20rpx;
				& .image{
					width: 190rpx;
					height: 190rpx;
					border-radius: 10rpx;
					flex-shrink: 0;
				}
				& .info{
					margin-top: 28rpx;
					padding-left: 21rpx;
					& view:nth-child(1){
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-33;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					
					& text{
						display: inline-block;
						padding: 2rpx 19rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-CB7636;
						background: linear-gradient(90deg, #FFC9A1, #FFEEDA);
						border-radius: 16rpx;
						
					}
					
					& view:nth-child(3){
						margin-top: 18rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-E84538;
					}
					& view:nth-child(3):before{
						content: '¥';
						font-size: 22rpx;
						color: $color-E84538;
						padding-right: 6rpx;
					}
				}
				
			}
			
			& .voucher-info{
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: calc(80% + 57rpx);
				height: 134rpx;
				margin: 10rpx auto 0;
				background: url(http://img.hls178.cn/static/image/wallet/qq_yyh1_bg@2x.png) no-repeat;
				background-size:100% 100%;
				
				& .left{
					width: 64%;
					padding-left: 30rpx;
					& view:nth-child(1){
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-33;
					}
					& view:nth-child(2){
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-99;
					}
					& view:nth-child(3){
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-99;
					}
					
				}
				
				& .right{
					display: grid;
					align-items: center;
					justify-items: center;
					width: 30%;
					
					& view:nth-child(1){
						font-size: 41rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-E84538;
					}
					& view:nth-child(1):before{
						content: '¥';
						font-size: 25rpx;
						color: $color-E84538;
						padding-right: 6rpx;
					}
					
					& navigator:nth-child(2){
						width: 88rpx;
						line-height: 30rpx;
						background: $color-E84538;
						border-radius: 15rpx;
						text-align: center;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-FAF6F7;
					}
				}
			}
			
			
			& .voucher-into{
				display: flex;
				justify-content: center;
				margin-top: 40rpx;
				& text{
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-ff;
				}
			
				& navigator{
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-FFC807;
				}
			}
		
		}	
		@keyframes quan1{
			from {
				display: none;
			}
			to {
				display: block;
				width: 60%;
				height: 60%;
				border: 10rpx solid #FCBE4B;
				opacity: 0.35;
				box-shadow: 0 0 5rpx #FCBE4B;
			}
		}
		@keyframes quan2{
			from {
				display: none;
			}
			to {
				display: block;
				width: 80%;
				height: 80%;
				border: 10rpx solid #FCBE4B;
				opacity: 0.35;
				box-shadow: 0 0 5rpx #FCBE4B;
			}
		}
		@keyframes quan3{
			from {
				display: none;
			}
			to {
				display: block;
				width: 100%;
				height: 100%;
				border: 10rpx solid #FCBE4B;
				opacity: 0.35;
				box-shadow: 0 0 5rpx #FCBE4B;
			}
		}
		& .qq-dh{
			position: fixed;
			left: calc(50% - 169rpx);
			bottom: -80rpx;
			width: 338rpx;
			height: 338rpx;
			z-index: 10000;
			display: flex;
			align-items: center;
			justify-content: center;
			
			& .quan-3{
				position: absolute;
				width: 90%;
				height: 90%;
				border: 6rpx solid #FCBE4B;
				opacity: 0.15;
				border-radius: 50%;
				//display: none;
				animation:quan3 1s linear infinite;
				-webkit-animation:quan3 1s  linear infinite;
			}
			
			& .quan-2{
				position: absolute;
				width: 70%;
				height: 70%;
				border: 6rpx solid #FCBE4B;
				opacity: 0.15;
				border-radius: 50%;
				//display: none;
				animation:quan2 1s  linear infinite;
				-webkit-animation:quan2 1s  linear infinite;
			}
			
			& .quan-1{
				position: absolute;
				width: 50%;
				height: 50%;
				border: 6rpx solid #FCBE4B;
				opacity: 0.15;
				border-radius: 50%;
				//display: none;
				animation:quan1 1s linear infinite;
				-webkit-animation:quan1 1s linear infinite;
			}
		}
		
	}
</style>
