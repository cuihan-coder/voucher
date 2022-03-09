<template>
	<view class="contain">
		
		<u-navbar title="使用帮助" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
		</u-navbar>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<navigator :url="'./artinfo?id='+ item.id" class="block" v-for="(item,index) in list">
			<view class="select" >
				<text class="left">{{item.title}}</text>
				<view class="right">
					<image src="http://img.hls178.cn/static/image/earnings/fl_jt_n@2x.png"></image>
				</view>
			</view>
		</navigator>
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
				list:[]
			};
		},
		async onLoad() {
			this.getData()
		},
		
		methods: {
			getData(){
				this.$helper.httpGet(this.$api.articles_list_get,{id:2})
				.then(data => {
					this.list = data.data
				})
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
			
			& .select{
				display: flex;
				align-items: center;
				justify-content: space-between;
				& .left{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
				}
				& .right{
					display: flex;
					align-items: center;
					& >text{
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
						padding-right: 20rpx;
					}
					& image{
						width: 10rpx;
						height: 16rpx;
					}
				}
				
			}
			
		
		}
		
	}
</style>
