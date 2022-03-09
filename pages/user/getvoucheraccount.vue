<template>
	<view class="contain">
		<u-navbar title="抢券号管理" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
		</u-navbar>

		<view class="cont-block">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!-- #endif -->
			<!-- 添加账户 -->
			<navigator url="../home/addaccount" class="add-acount">
				<image src="http://img.hls178.cn/static/image/wallet/qq_tj@2x.png"></image>
				<text>添加抢券账号</text>
			</navigator>
			<view class="tips">最多添加两个抢券号，请慎重添加</view>
			<!-- 添加账户 -->
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="acount-item">
					<view class="left">
						<image src="http://img.hls178.cn/static/image/wallet/hone_qq_dy@2x.png"></image>
						<image v-if="item.gender == 1" src="http://img.hls178.cn/static/image/wallet/qq_zh_nan@2x.png"></image>
						<image v-if="item.gender == 2" src="http://img.hls178.cn/static/image/wallet/qq_zh_nv@2x.png"></image>
					</view>
					<view class="right">
						<view>抖音号：{{item.name}}</view>
						<view v-if="item.status == 1" class="normal">正常可抢券</view>
						<view  v-if="item.status == 2" class="hyd">账户审核中</view>	
						<view v-if="item.status == 3" class="ztqq">该号你已设置暂停抢券</view>
						<view v-if="item.status == 4" class="wgjy">该号因违规，已被禁用</view>
						<view v-if="item.status == 5" class="abnormal">
							<text>该号已抢券，请等待</text>
							<countdown :times="item.countDown" :_style="{fontSize: '24rpx',color:'#FB3A3A'}"></countdown>
							<text>后再试</text>
						</view>
					</view>
				</view>
				<view class="cont">{{item.consignee}}·{{item.contact}}</view>
				<view class="cont">收货地址：{{item.province + item.city + item.district + item.address}}</view>
				<view class="edit" >
					<navigator @click="setEditTag(index)" :url="`../home/addaccount`">
						<image src="http://img.hls178.cn/static/image/user/me_zh_bj@2x.png"></image>
					</navigator>
					<view @click="accountActive(index)" v-if="[1,3].indexOf(item.status) != -1">
						<u-switch v-model="item.used" asyncChange   size="18"></u-switch>
					</view>
				</view>
			</view>
			
			<!-- 无账号 -->
			<emptyContent :show="list.length > 0 ? false : true"></emptyContent>
		</view>
	</view>
</template>

<script>
	import emptyContent from '@/components/empty/index.vue'
	import countdown from '@/components/countdown/index.vue'
	export default {
		components:{
			emptyContent,
			countdown
		},
		data() {
			return {
				timeData: {},
				list:[]
			};
		},
		async onLoad() {
			this.getData()
		},

		methods: {
			getData(){
				this.$helper.httpGet(this.$api.accounts_list_post,{category:1})
				.then(data => {
					this.list = data.data
					this.list.forEach((item,index) => {
						if(this.list[index].status == 1){
							this.list[index].used = true
						}
						if(this.list[index].status == 3){
							this.list[index].used = false
						}
					})
				})
			},
			//切换使用状态
			accountActive(index){
				this.$helper.httpPost(this.$api.accounts_active_post,{id:this.list[index].id}).then(data => {
					if(data.code == 0){
						this.list[index].used = !this.list[index].used
						if(this.list[index].status  == 1){
							this.list[index].status = 3
						}else{
							this.list[index].status = 1
						}
						return 
					}else{
						uni.showToast({
							title:data.message,
							icon:'none'
						})
					}
					this.list[index].used = this.list[index].used
				})
				
			},
			setEditTag(index){
				this.$store.commit('account/SET_ACCOUNT_INFO',this.list[index])
			},
			timeOnChange(e) {
				this.timeData = e
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $color-F4;
	}
	.status_bar{
		width: 100%;
		height: var(--status-bar-height);
	}
	.contain {
		& .cont-block {
			padding: 120rpx 40rpx;
			& .add-acount {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 29rpx 0;
				background: #FFFFFF;
				border-radius: 20rpx;

				& image {
					width: 40rpx;
					height: 40rpx;
				}

				& text {
					padding-left: 10rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-99;
				}

			}
			& .tips{
				padding-top: 30rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $uni-color-error;
				text-align: center;
			}

			& .list {
				margin-top: 20rpx;
				padding: 40rpx;
				background: $color-ff;
				border-radius: 20px;
				& .acount-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 20rpx;
					

					& .left {
						position: relative;
						width: 100rpx;
						height: 100rpx;

						& image:nth-child(1) {
							position: absolute;
							width: 100%;
							height: 100%;
						}

						& image:nth-child(2) {
							position: absolute;
							right: 0;
							bottom: 0;
							width: 34rpx;
							height: 34rpx;
						}
					}

					& .right {
						width: 76%;
						display: flex;
						flex-direction: column;

						& view:nth-child(1) {
							font-size: 40rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: $color-33;
							text-align: right;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							line-clamp: 1;
						}

						& .normal {
							display: grid;
							align-self: flex-end;
							width: 110rpx;
							margin-top: 10rpx;
							background: $color-e8f8e7;
							border-radius: 22rpx;
							padding: 8rpx 20rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: $color-14BC0B;
						}

						& .abnormal {
							display: flex;
							align-items: center;
							margin-top: 10rpx;
							background: #fed;
							border-radius: 22rpx;
							padding: 8rpx 25rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: $color-FF6113;

							& .time {
								font-size: 22rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: $color-FF6113;
							}
						}

						& .hyd {
							display: grid;
							align-self: flex-end;
							margin-top: 10rpx;
							background: #e1ebff;
							border-radius: 22rpx;
							padding: 8rpx 20rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #3271FF;
						}

						& .wgjy {
							display: grid;
							align-self: flex-end;
							margin-top: 10rpx;
							background: #ffe1df;
							border-radius: 22rpx;
							padding: 8rpx 20rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FF4A4A;
						}

						& .ztqq {
							display: grid;
							align-self: flex-end;
							margin-top: 10rpx;
							background: #f3f3f3;
							border-radius: 22rpx;
							padding: 8rpx 20rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #8E8D8D;
						}
					}
				}
				
				& .cont{
					padding-top: 10rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 32rpx;
				}
				
				& .edit{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30rpx;
					& image{
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}



	}
</style>
