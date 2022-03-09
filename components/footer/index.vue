<template>
	<view>
		<u-tabbar
			:value="value"
			@change="tabchange"
			:fixed="true"
			:placeholder="false"
			activeColor="#FC503B"
			inactiveColor="#000000"
			:safeAreaInsetBottom="false"
			zIndex="10000"
		>
			<u-tabbar-item text="首页">
				<image
					class="icon-style"
					slot="active-icon"
					src="http://img.hls178.cn/static/image/tab_home_s@2x.png"
				></image>
				<image
					class="icon-style"
					slot="inactive-icon"
					src="http://img.hls178.cn/static/image/tab_home_n@2x.png"
				></image>
			</u-tabbar-item>
			<u-tabbar-item text="优惠券"  >
				<image
					class="icon-style"
					slot="active-icon"
					src="http://img.hls178.cn/static/image/tab_yyh_s@2x.png"
				></image>
				<image
					class="icon-style"
					slot="inactive-icon"
					src="http://img.hls178.cn/static/image/tab_yyh_n@2x.png"
				></image>
			</u-tabbar-item>
			<u-tabbar-item text="收益" >
				<image
					class="icon-style"
					slot="active-icon"
					src="http://img.hls178.cn/static/image/tab_sy_s@2x.png"
				></image>
				<image
					class="icon-style"
					slot="inactive-icon"
					src="http://img.hls178.cn/static/image/tab_sy_n@2x.png"
				></image>
			</u-tabbar-item>
			<u-tabbar-item text="推广" >
				<image
					class="icon-style"
					slot="active-icon"
					src="http://img.hls178.cn/static/image/tab_tg_s@2x.png"
				></image>
				<image
					class="icon-style"
					slot="inactive-icon"
					src="http://img.hls178.cn/static/image/tab_tg_n@2x.png"
				></image>
			</u-tabbar-item>
			<u-tabbar-item text="我的"  >
				<image
					class="icon-style"
					slot="active-icon"
					src="http://img.hls178.cn/static/image/tab_me_s@2x.png"
				></image>
				<image
					class="icon-style"
					slot="inactive-icon"
					src="http://img.hls178.cn/static/image/tab_me_n@2x.png"
				></image>
			</u-tabbar-item>
			
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name:'tabbar',
		data:()=>({
			tabUrl:[
				'/pages/home/index',
				'/pages/voucher/index',
				'/pages/earning/index',
				'/pages/promote/index',
				'/pages/user/index',
			]
		}),
		props:{
			value:{
				type:Number,
				default:0
			}
		},
		methods:{
			tabchange(tabIndex){
				this.value = tabIndex
				console.log(tabIndex)
				uni.reLaunch({
					url:this.tabUrl[tabIndex]
				})
			}
		}
	}
	
</script>

<style lang="scss">
	.icon-style{
		width: 40rpx;
		height: 39rpx;
	}
	
</style>
