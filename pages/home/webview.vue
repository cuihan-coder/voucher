<template>
	<view>
		<web-view  class="webview" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(option) {
			this.url = option.url
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	
</style>
