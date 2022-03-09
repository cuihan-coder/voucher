<template>
	<view class="contain">
		<u-navbar
			title="详情"
			leftText="返回"
			:fixed="true"
			@rightClick="rightClick"
			@leftClick="leftClick"
		>
		</u-navbar>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<view class="title">{{data.title}}</view>
		<u-parse :content="data.content"></u-parse>
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
				data:{}
			};
		},
		async onLoad(option) {
			let artId = option.id
			this.getData(artId)
		},
		
		methods: {
			getData(id){
				this.$helper.httpGet(this.$api.articles_get,{id})
				.then(data => {
					this.data = data.data
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-ff;
	
	}
	.contain{
		padding: 100rpx 40rpx 150rpx;
		.title{
			margin-top: 50rpx;
			margin-bottom: 58rpx;
			padding-bottom: 40rpx;
			font-size: 36rpx;
			font-weight: 500;
			color: #333333;
			border-bottom: solid 2rpx #F0F0F0;
		}
	}
</style>
