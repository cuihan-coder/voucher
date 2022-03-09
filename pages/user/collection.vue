<template>
	<view class="contain">
		<u-navbar title="收款信息" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
		</u-navbar>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<view class="block">
			<view class="title">
				<text>收款信息</text>
				<text>（确保收款码正确，避免资金受损失）</text>
			</view>
			<view class="skm-list">
				<view class="skm-item">
					<view class="shang">
						<image src="http://img.hls178.cn/static/image/voucher/yyq_he_fkwx@2x.png"></image>
						<text class="wx">微信收款码</text>
					</view>
					<view class="xia" @click="uploadImg('wx')">
						<view v-if="!userInfo.wechatQrcode" class="uplaod">
							<u-icon name="plus" size="31" color="#E8E8E8" ></u-icon>
						</view>
						<image v-if="userInfo.wechatQrcode" class="qrcode" :src="userInfo.wechatQrcode"></image>
						<view class="tip">点击修改或添加</view>
					</view>
				</view>
				<view class="skm-item">
					<view class="shang">
						<image src="http://img.hls178.cn/static/image/voucher/yyq_he_fkzfb@2x.png"></image>
						<text class="zfb">支付宝收款</text>
					</view>
					<view class="xia" @click="uploadImg('zfb')">
						<view v-if="!userInfo.alipayQrcode" class="uplaod">
							<u-icon name="plus" size="31" color="#E8E8E8" ></u-icon>
						</view>
						<image v-if="userInfo.alipayQrcode" class="qrcode" :src="userInfo.alipayQrcode"></image>
						<view class="tip">点击修改或添加</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="block">
			<view class="title">
				<text>提现信息</text>
				<text>（确定提现信息正确，否则导致提现失败）</text>
			</view>
			<view class="input-item bt-line">
				<text>真实姓名：</text>
				<input v-model="userInfo.alipayRealName" placeholder-class="input-place" placeholder="请输入真实信息"/>
			</view>
		<!-- 	<view class="input-item bt-line">
				<text>身份证号：</text>
				<input v-model="userInfo.idCard" placeholder-class="input-place" placeholder="请输入真实信息"/>
			</view> -->
			<view class="input-item">
				<text>支付宝账号：</text>
				<input v-model="userInfo.alipay" placeholder-class="input-place" placeholder="请输入账号(非昵称)"/>
			</view>
		</view>
		
		<view class="block">
			<view class="title">
				<text>联系信息</text>
			</view>
			<view class="input-item ">
				<text>微信号：</text>
				<input v-model="userInfo.wechat" placeholder-class="input-place" placeholder="请输入（紧急联系）"/>
			</view>
		</view>
		
		<u-button  @click="subinfo" class="self-btn" shape="circle" text="确定提交" color="linear-gradient(-30deg, #FD7028, #FC4231)"></u-button>
		
	</view>
</template>

<script>
	import tabbar from '@/components/footer/index.vue'
	export default {
		components:{
			tabbar
		},
		data() {
			return {
				userInfo:{}
			};
		},
		async onLoad() {
			this.userInfo = this.$store.state.userInfo.info
			console.log(this.$store.state.userInfo.info)
			if(!this.userInfo){
				uni.showToast({
					title:'请先登陆',
					icon:'none'
				})
				return
			}
		},
		
		methods: {
			subinfo(){
				let param = {
					idCard:this.userInfo.idCard,
					bankName:'',
					bankRealName:'',
					bankCard:'',
					alipay:this.userInfo.alipay,
					alipayRealName:this.userInfo.alipayRealName,
					wechat:this.userInfo.wechat,
					wechatQrcode:this.userInfo.wechatQrcode,
					alipayQrcode:this.userInfo.alipayQrcode
				}
				// if(!param.idCard){
				// 	uni.showToast({title:'请输入身份证号',icon:'none'}) ; return;
				// }
				if(!param.alipayRealName){
					uni.showToast({title:'请输入真实姓名',icon:'none'}) ; return;
				}
				if(!param.alipay){
					uni.showToast({title:'请输入支付宝账号',icon:'none'}) ; return;
				}
				
				if(!param.wechatQrcode){
					uni.showToast({title:'请上传微信收款二维码',icon:'none'}) ; return;
				}
				if(!param.alipayQrcode){
					uni.showToast({title:'请上传支付宝收款二维码',icon:'none'}) ; return;
				}
				
				this.$helper.httpPost(this.$api.edit_post,param)
				.then(async data => {
					if(data.code == 0){
						uni.showToast({
							title:'设置成功',
							icon:'none'
						})
					}else{
						uni.showToast({
							title:data.message,
							icon:'none'
						})
					}
					
				})
			},
			uploadImg(type){
				uni.chooseImage({
				    success:async (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						let token = await this.$helper._getCache('loginToken')
						uni.showLoading({
							title:'上传中'
						})
				        uni.uploadFile({
				            url: this.$api.upload_post, 
				            filePath: tempFilePaths[0],
				            name: 'file',
							header:{token},
				            success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								console.log(data.data.name)
								if(type == 'wx'){
									this.userInfo.wechatQrcode = data.data.name
									this.$store.state.userInfo.info.wechatQrcode = data.data.name
								}
								if(type == 'zfb'){
									this.userInfo.alipayQrcode = data.data.name
									this.$store.state.userInfo.info.alipayQrcode = data.data.name
								}
				               uni.hideLoading()
				            },
							fail:() => {
								uni.hideLoading()
								uni.showToast({
									title:'上传失败'
								})
							}
				        });
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-F4;
	
	}
	.contain{
		padding: 100rpx 40rpx 150rpx;
		& .block{
			background: #FFFFFF;
			border-radius: 30rpx;
			padding: 47rpx 42rpx;
			margin-bottom: 20rpx;
			& .title{
				display: flex;
				align-items: center;
				& text:nth-child(1){
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
				}
				& text:nth-child(2){
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FF3C3C;
				}
			}
			
			& .skm-list{
				display: flex;
				align-items: center;
				margin-top: 55rpx;
				padding-bottom: 47rpx;
				& .skm-item{
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;
					width: 50%;
					& .shang{
						display: flex;
						align-items: center;
						padding-bottom: 23rpx;
						& image{
							width: 32rpx;
							height: 32rpx;
						}
						& text{
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							padding-left: 10rpx;
						}
						& .wx{
							color: #3BC724;
						}
						& .zfb{
							color: #267DF4;
						}
					}	
					& .xia{
						width: 170rpx;
						height: 170rpx;
						& .uplaod{
							display: grid;
							justify-content: center;
							align-items: center;
							width: 170rpx;
							height: 170rpx;
							border: 3rpx solid #E8E8E8;
						}
						& .qrcode{
							width: 170rpx;
							height: 170rpx;
						}
						& .tip{
							padding-top: 13rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #BBBBBB;
							text-align: center;
						}
					}
				}
			}
			
			& .input-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				& text{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666;
				}
				& input{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999;
					text-align: right;
				}
				& .input-place{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999;
				}
				
			}
			& .bt-line{
				border-bottom: 1rpx solid #E7E7E7;
			}
		}
		
		& .self-btn{
			width: 80%;
			margin-top: 90rpx;
		}
	}
</style>
