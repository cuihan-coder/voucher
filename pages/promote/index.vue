<template>
	<view>
		<view class="contain">
			<image mode="widthFix" src="http://img.hls178.cn/static/image/promote/tg_bg@2x.png"></image>
			
			<navigator class="btn" @click="posterShow = !posterShow">
				<text>分享专属海报</text>
				
				<image src="http://img.hls178.cn/static/image/jrjt.png"></image>
				<!-- <u-icon size="13" color="#ffffff"  name="arrow-right"></u-icon> -->
			</navigator>
			
			
		</view>
		<posters 
		:show="posterShow"
		:list="list"
		></posters>
		<!-- 底部菜单 -->
		<tabbar :value="3">asdssadasdsad</tabbar>
	</view>
	
</template>

<script>
	import tabbar from '@/components/footer/index.vue'
	import posters from '@/components/posters/index.vue'
	export default {
		components:{
			tabbar,
			posters
		},
		data() {
			return {
				posterShow:false,
				list:[]
			};
		},
		onUnload(){
			uni.$off('posterCloseEmit')
		},
		async onLoad() {
			this.getData()
			uni.$on('posterCloseEmit',(data) => {
				this.posterShow = data.data
			})
		},
		
		methods: {
			getData(){
				this.$helper.httpGet(this.$api.promoteInfo_get)
				.then(res => {
					this.list = res.data
				})
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
	.contain{
		width: 100%;
		height: 100%;
		& image{
			display: block;
			width: 100%;
		}
		& .btn{
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 1200rpx;
			left: calc(50% - 467rpx / 2);
			width: 467rpx;
			height: 92rpx;
			background: linear-gradient(0deg, #FD7028 0%, #FC4231 100%);
			border-radius: 46rpx;
			& image{
				width: 30rpx;
				height: 30rpx;
				z-index: 100;
			}
			
			& text{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
