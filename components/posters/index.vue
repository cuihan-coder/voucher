<!-- 领券选择商品界面 -->
<template>
	<u-overlay :show="show">
		<view class="block">
			<swiper class="swiper"  @change="currentChange"	 :autoplay="false" >
				<swiper-item   v-for="(item,index) in list"  :key="0" class="swiper-item">
					<view class="cont">
						<image @click="closePoster()" class="cha" src="http://img.hls178.cn/static/image/ty_gb@2x.png"></image>
						<image mode="widthFix" class="poster-img" :src="item.imgURL" ></image>
						<!-- <image mode="widthFix" class="poster-img" src="http://img.hls178.cn/d98f25c4529db9996b4946fdfe6f319dpng" ></image> -->
						<u-button @click="download(item.imgURL)" class="self-btn" shape="circle" text="保存到相册"
							color="linear-gradient(-30deg, #FD7028, #FC4231)"></u-button>
						<view @click="copy(item.url)" class="copy" >复制推广链接</view>
						<!-- <view @click="copy('aaa')" class="copy" >复制推广链接</view> -->
					</view>
				</swiper-item>
				
			</swiper>
			<canvas id="test" width="530" height="750" style="width: 530px;height: 750px;border: 1px solid red"></canvas>

		</view>
	</u-overlay>
</template>

<script>
	// #ifdef H5
		import DZMH5Download from 'dzm-dl-h5'
	// #endif
	
	export default {
		name: 'poster',
		data() {
			return {
				list3: [
					'http://img.hls178.cn/static/image/home_hd@2x.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				cu_index:0,
				class:'swiper-item'
			};
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			list:{
				type:[Array,Object],
				default:() => {
					return []
				}
			}
		},
		
		methods: {
			getClass(index){
				return 'swiper-item'
				if(index == this.cu_index){
					return 'swiper-item'
				}
				//右侧小
				if(index > this.cu_index){
					return 'swiper-item not-active-right'
				}
				//左侧小
				if(index < this.cu_index){
					return 'swiper-item not-active-left'
				}
				
			},
			currentChange(e){
				this.cu_index = e.detail.current
				console.log(e.detail.current,this.cu_index)
			},
			closePoster() {
				uni.$emit('posterCloseEmit', {data:false})
			},
			download(url){
				// #ifdef H5
					DZMH5Download.DOWLOAD_FILE(url)
				// #endif
				
				// #ifdef APP-PLUS
				uni.showLoading({
					title:'保存中'
				})
				uni.downloadFile({
				    url: url, 
				    success: (res) => {
				        if (res.statusCode === 200) {
				           uni.saveImageToPhotosAlbum({
							   filePath: res.tempFilePath,
							   success: function () {
								   uni.showToast({
										title:'保存成功',
										icon:'none'
								   })
								   
								   uni.hideLoading()
							   },fail(e) {
								   uni.showToast({
										title:'保存失败',
										icon:'none'
								   })
							   }
						   });
				        }
				    }
				});
				// #endif
			
			},
			copy(val){
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
		}
	}
</script>

<style lang="scss">
	.block {
		width: 100%;
		height: 100%;
		margin: auto 0;
		.cha {
			position: absolute;
			right: 40rpx;
			top: 170rpx;
			width: 66rpx;
			height: 66rpx;
			z-index: 1000 !important;
		}
		& .swiper {
			width: 100%;
			height: 100%;
			& .swiper-item {
				width: 90% !important;
				margin-left: 5%;
				height: 100%;
				& .cont{
					width: calc(100% - 100rpx) !important;
					margin: 0 auto;
					margin-top: 30%;
					padding: 40rpx;
					background: #fff;
					border-radius: 20rpx;
					z-index: 100;
					& .poster-img{
						width: 100%;
					}
					
					& .self-btn{
						margin-top: 55rpx;
						width: 60%;
					}
					
					& .copy{
						margin-top: 33rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FC4F2E;
						text-align: center;
					}
				}
				
				
			}

			& .not-active-right{
				width: 70% !important;
				height: 90% !important;
				margin-top: 10%;
				margin-left: 25%;
			}
			& .not-active-left{
				width: 70% !important;
				height: 90% !important;
				margin-top: 10%;
				margin-left: 17%;
			}
		}


	}
</style>
