<template>
	<view class="contain">
		<u-navbar title="兑换现金" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
		</u-navbar>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<view class="cont-block">
			<view class="dxj">
				<view class="title">
					<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
					<text>兑现金</text>
				</view>
				<view class="kd">
					<view class="title">可兑换金币</view>
					<input v-model="userInfo.money" @input="moneychange" type="number" class="gold"></input>
				</view>
				<view class="money">= {{Math.floor(userInfo.money / 100 * 100) / 100}}元</view>
			</view>

			<view class="editzfb">
				<text>兑换至</text>
				<navigator url="../user/collection">修改 ></navigator>
			</view>

			<view class="zhshow" v-if="userInfo.alipay">
				<image src="http://img.hls178.cn/static/image/earnings/sy_dxj_zfb@2x.png"></image>
				<view class="name">{{userInfo.alipayRealName}}</view>
				<view class="num">{{userInfo.alipay}}</view>
			</view>
			<view class="noshow" v-if="!userInfo.alipay">
				<navigator url="../user/collection" class="add">
					<image src="http://img.hls178.cn/static/image/wallet/qq_tj@2x.png"></image>
					<text>添加收款信息</text>
				</navigator>
			</view>
			<!-- #ifdef APP-PLUS -->
			<u-button @click="subWithdraw" :class="class_" shape="circle" text="确定提交"></u-button>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<u-button @click="gotoDwonapp" :class="class_" shape="circle" text="确定提交"></u-button>
			<!-- #endif -->

			<!-- 提交后的弹窗 -->
			<u-modal :show="false" title="提示" confirmText="知道了，返回首页">
				<view class="slot-content">
					恭喜您，已成功兑换至支付宝
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				class_: 'disable-btn',
				is_subing: false
			};
		},
		async onShow() {

			this.$helper.httpGet(this.$api.user_info_get)
				.then(data => {
					this.userInfo = data.data
					this.$store.commit('userInfo/SET_USER_INFO', this.userInfo)
					this.userInfo = this.$store.state.userInfo.info
					this.class_ = this.userInfo.alipay && this.userInfo.money >= 10 ? 'self-btn' : 'disable-btn'
				})
		},

		methods: {
			moneychange(e) {

				if (e.detail.value < 100) {
					uni.showToast({
						title: '最低提现需100金币',
						icon: 'none'
					})

				}
			},
			gotoDwonapp() {
				let sysInfo = uni.getSystemInfoSync()
				if (sysInfo.platform == 'ios') {
					this.subWithdraw()
				} else {
					uni.showModal({
						title: '提示',
						content: '为防止提现失败，请下载欢乐送APP进行操作',
						confirmText: '前去下载',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "../share/appdown"
								})
							}
						}
					});
				}
			},
			subWithdraw() {
				if (this.class_ == 'disable-btn') {
					return
				}
				if (this.is_subing == true) {
					return
				}
				this.is_subing = true

				let money = this.userInfo.money

				this.$helper.httpPost(this.$api.withdraw_post, {
						money
					})
					.then(data => {
						this.is_subing = false
						if (data.code == 0) {
							uni.showToast({
								title: '恭喜您，提现成功',
								icon: 'none'
							})
							this.userInfo.money -= money
							this.$store.commit('userInfo/SET_USER_INFO', this.userInfo)
						} else {
							uni.showToast({
								title: data.message,
								icon: 'none'
							})
						}

					})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $color-F4;
	}

	.contain {
		.cont-block {
			margin-top: 90rpx;
			padding: 24rpx 30rpx;

			& .dxj {
				padding: 30rpx 30rpx 40rpx;
				background: #FFFFFF;
				border-radius: 20rpx;

				& .title {
					& image {
						width: 20rpx;
						height: 20rpx;
					}

					& text {
						padding-left: 11rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
					}
				}

				& .kd {
					width: 92%;
					margin: 52rpx auto 0;
					padding-bottom: 14rpx;
					border-bottom: solid 1rpx #E7E7E7;

					& .title {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
					}

					& .gold {
						font-size: 60rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FF2424;
					}

				}


				& .money {
					width: 92%;
					margin: 20rpx auto 0;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					text-align: right;

				}
			}

			& .editzfb {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 29rpx;

				& text:nth-child(1) {
					font-size: 26rpx;
					font-family: Source Han Sans SC;
					font-weight: 500;
					color: #666666;
				}

				& navigator:nth-child(2) {
					font-size: 26rpx;
					font-family: Source Han Sans SC;
					font-weight: 500;
					color: #2A73F8;
				}
			}

			& .zhshow {
				margin-top: 20rpx;
				padding: 30rpx 30rpx 50rpx;
				background: #FFFFFF;
				border-radius: 30rpx;

				& image {
					width: 220rpx;
					height: 60rpx;
				}

				& .name {
					margin-top: 22rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					text-align: right;
				}

				& .num {
					margin-top: 20rpx;
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					text-align: right;
				}
			}

			& .noshow {
				line-height: 240rpx;
				background: #FFFFFF;
				border-radius: 30rpx;
				margin-top: 20rpx;

				& .add {
					display: flex;
					align-items: center;
					justify-content: center;

					& image {
						width: 40rpx;
						height: 40rpx;
					}

					& text {
						padding-left: 10rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}

			}

			& .self-btn {
				margin-top: 170rpx;
				width: 80%;
				height: 94rpx;
				background: linear-gradient(-30deg, #FD7028, #FC4231);
				color: #ffffff;
			}

			& .disable-btn {
				margin-top: 170rpx;
				width: 80%;
				height: 94rpx;
				background: #BBBBBB;
				color: #ffffff;
			}

			& .slot-content {
				padding: 80rpx 0;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				text-align: center;
			}
		}

	}
</style>
