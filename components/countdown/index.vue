<!-- 倒计时 -->
<template>
	<u-count-down  :time="times * 1000" :format="format" @change="onChange">
		<view class="times">
			<text  :style="_style">{{before}}</text>
			<text v-if="timeData.days > 0"  :style="_style">{{ timeData.days > 0 ? timeData.days:timeData.days}}天</text>
			<text  :style="_style">{{ timeData.hours >= 10 ? timeData.hours:'0'+timeData.hours}}:</text>
			<text  :style="_style">{{ timeData.minutes >= 10 ? timeData.minutes:'0'+timeData.minutes }}:</text>
			<text  :style="_style">{{ timeData.seconds >= 10 ? timeData.seconds:'0'+timeData.seconds }}</text>
			<text  :style="_style">{{after}}</text>
		</view>
	</u-count-down>
</template>

<script>
	export default {
		name: 'countdown',
		props: {
			times: {
				type: [String, Number],
				default: 0
			},
			before: {
				type: [String, Number],
				default: ''
			},
			after: {
				type: [String, Number],
				default: ''
			},
			format: {
				type: String,
				default: 'DD HH:mm:ss'
			},
			_style: {
				type: Object,
				default: () => {
					return {}
				}
			}


		},
		data() {
			return {
				timeData: {
					days:'',
					hours:'',
					minutes:'',
					seconds:''
				},
			}
		},
		methods: {
			onChange(e) {
				this.timeData = e
			}
		}
	}
</script>

<style lang="scss">
	.times{
		display: flex;
		align-items: center;
	}
</style>
