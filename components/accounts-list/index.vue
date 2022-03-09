<template>
	<!-- 点击切换抖音号 -->
	<u-popup :show="changeAcountShow" mode="bottom" :round="20" @close="changeAcountShow = false"
		:closeable="true">
		<view class="change-acount-block">
			<!-- 添加账户 -->
			<navigator url="../../pages/home/addaccount" class="add-acount">
				<image src="http://img.hls178.cn/static/image/wallet/qq_tj@2x.png"></image>
				<text>添加新抢券账号</text>
			</navigator>
			<!-- 添加账户 -->
			<!-- 账户列表 -->
			<!-- 无账户列表 -->
			<view v-if="list.length == 0" class="no-acount">
				<image src="http://img.hls178.cn/static/image/qs_wqq@2x.png"></image>
			</view>
			<!-- 无账户列表 v-if="item.status == 1 || item.status == 5"-->
			<view  @click="changeItem(item.id,index)"  :class="  item.id == active_account_id ? 'item-active acount-item': 'acount-item' " v-for="(item,index) in list"   :index="index">
				<view class="left">
					<image src="http://img.hls178.cn/static/image/wallet/hone_qq_dy@2x.png"></image>
					<image v-if="item.gender == 1" src="http://img.hls178.cn/static/image/wallet/qq_zh_nan@2x.png"></image>
					<image v-if="item.gender == 2" src="http://img.hls178.cn/static/image/wallet/qq_zh_nv@2x.png"></image>
				</view>
				<view class="right">
					<view>抖音号：{{item.name}}</view>
					<view v-if="item.status == 1" class="normal">正常可抢券</view>
					<view v-if="item.status == 2" class="shz">账户审核中</view>
					<view v-if="item.status == 3" class="ztqq">该号你已设置暂停抢券</view>
					<view v-if="item.status == 4" class="wgjy">该号因违规，已被禁用</view>
					<view v-if="item.status == 5" class="abnormal">
						<text>该号已抢券，请等待</text>
						<countdown :times="item.countDown"></countdown>
						<text>后再试</text>
					</view>
				</view>
			</view>
			<!-- 账户列表 -->
		</view>
	</u-popup>
	<!-- 点击切换抖音号 -->

</template>

<script>
	import countdown from '@/components/countdown/index.vue'
	
	export default {
		name: 'account-list',
		components:{
			countdown
		},
		props: {
			changeAcountShow: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				timeData: {},
				list:[],
				active_account_id:'',
				active_account_name:'',
				acounntIndex:0
			};
		},
		mounted() {
			this.getData()
		},
		onShow() {
			this.getData()
		},
		computed:{
			_changeAcountShow(){	
			      return this.changeAcountShow
			}
		},
		watch:{
			_changeAcountShow(newVal,old){
				if(newVal == true){
					this.getData()
				}
				uni.$emit('changeAcountShowEmit',{data:newVal})
			},
			active_account_id(newVal,old){
				uni.$emit('activeAccountIdEmit',{data:newVal})
			},
			active_account_name(newVal,old){
				uni.$emit('activeAccountNameEmit',{data:newVal})
			}
			
		},
		methods: {
			changeItem(id,index){
				if(this.list[index].status != '1'){
					uni.showToast({
						title:'当前账号无法使用',
						icon:'none'
					})
					return 
				}
				//检查是否完成所有信息
				if(this.list[index].isComplete == false){
					//未完成 过去则直接编辑当前的
					this.$store.commit('account/SET_ACCOUNT_INFO',this.list[index])
					uni.$emit('accountisCompleteEmit', {isComplete:this.list[index].isComplete})
				}
				
				this.active_account_id = id
				this.active_account_name = this.list[index].name
			},
			getData(){
				this.$helper.httpGet(this.$api.accounts_list_post,{category: 1})
				.then(data => {
					this.list =  data.data == null ? [] : data.data
					this.list.forEach((item,index) => {
						if(this.active_account_id == '' && item.status == 1){
							this.active_account_id = item.id
							this.active_account_name = item.name
						}
					})
				})
			},
			close(){
				uni.$emit('textModalClose', {})
			},
			timeOnChange(e) {
				this.timeData = e
			},
		}
	}
</script>

<style lang="scss">
	.change-acount-block {
		padding: 69rpx 42rpx;
		background: $color-F0;
		border-radius: 30rpx 30rpx 0px 0px;

		& .add-acount {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 29rpx 0;
			background: #FFFFFF;
			border-radius: 20rpx;

			& image {
				width: 40rpx;
				height: 40rpx;
			}

			& text {
				padding-left: 10rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-99;
			}

		}

		& .no-acount {
			& image {
				width: 100%;
			}
		}

		& .acount-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40rpx;
			margin-top: 20rpx;
			background: $color-ff;
			border-radius: 20px;

			& .left {
				position: relative;
				width: 100rpx;
				height: 100rpx;

				& image:nth-child(1) {
					position: absolute;
					width: 100%;
					height: 100%;
				}

				& image:nth-child(2) {
					position: absolute;
					right: 0;
					bottom: 0;
					width: 34rpx;
					height: 34rpx;
				}
			}

			& .right {
				width: 76%;
				display: flex;
				flex-direction: column;

				& view:nth-child(1) {
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-33;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					text-align: right;
				}

				& .normal {
					display: grid;
					align-self: flex-end;
					margin-top: 10rpx;
					background: $color-e8f8e7;
					border-radius: 22rpx;
					padding: 11rpx 25rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-14BC0B;
				}
				& .shz {
					display: grid;
					align-self: flex-end;
					margin-top: 10rpx;
					background: #E1EAFF;
					border-radius: 22rpx;
					padding: 11rpx 25rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #3271FF;
				}
				& .ztqq{
					display: grid;
					align-self: flex-end;
					margin-top: 10rpx;
					background: #8E8D8D;
					border-radius: 22rpx;
					padding: 11rpx 25rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #F6F6F6;
				}
				& .wgjy{
					display: grid;
					align-self: flex-end;
					margin-top: 10rpx;
					background: #8E8D8D;
					border-radius: 22rpx;
					padding: 11rpx 25rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFDDDD;
				}
				
				& .abnormal {
					display: flex;
					align-items: center;
					margin-top: 10rpx;
					background: #fed;
					border-radius: 22rpx;
					padding: 11rpx 25rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-FF6113;

					& .time {
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-FF6113;
					}
				}

			}
		}
		
		& .item-active{
			border: solid 2rpx #fd612b;
		}

	}
</style>
