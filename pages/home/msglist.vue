<template>
	<view class="contain">
		<u-navbar title="消息列表" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
		</u-navbar>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<navigator @click="readmsg(item.id)" class="msg-item" v-for="(item,index) in list" :key="index">
			<view class="up">
				<text :class="isRead == true ? 'read-ok' : 'read-no' ">系统通知</text>
				<text>{{item.createTime}}</text>
			</view>
			<view class="cont">{{item.content}}</view>
		</navigator>
		<!-- 无数据 -->
		<empty :show="list.length > 0 ? false : true"></empty>
	</view>
</template>

<script>
	import empty from '@/components/empty/index.vue'
	
	export default {
		components:{
			empty
		},
		data() {
			return {
				list: [],
			};
		},
		async onLoad() {
			this.getData()
		},
		
		methods: {
			getData(){
				this.$helper.httpGet(this.$api.messages_get)
				.then(res => {
					this.list = res.data
				})
			},
			readmsg(id){
				this.$helper.httpPost(this.$api.messages_read_post,{id})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-F4;
	}
	.contain{
		padding-top: 100rpx;
		padding: 110rpx 30rpx ;
		
		& .msg-item{
			background: #FFFFFF;
			border-radius: 30rpx;
			padding: 40rpx ;
			margin-bottom: 20rpx;
			
			& .up{
				display: flex;
				justify-content: space-between;
				align-items: center;
				& .read-ok, .read-no{
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-weight: 400;
					color: #666666;
				}
				& .read-ok:before{
					content: '';
					display: inline-block;
					margin-right: 10rpx;
					width: 10rpx;
					height: 10rpx;
					background: #FF3F3F;
					border-radius: 50%;
				}
				
				& text:nth-child(2){
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
				}
			}
		}
		& .cont{
			padding-top: 10rpx;
			font-size: 30rpx;
			font-weight: 400;
			color: #333333;
		}
	}
</style>
