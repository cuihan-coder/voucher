<!-- 领券选择商品界面 -->
<template>
	<view>
		<u-popup
		:show="show" 
		mode="bottom" 
		:round="20"
		@close="close"
		:closeable="true">
			<view class="goods-select">
				<view class="title">选择礼品</view>
				<view class="select-block">
					<!-- item-inactive  item-active-->
					<view @click="clickGood(index) " v-for="(item,index) in list" :key="index" :class="click_good == index ? 'item item-active' : 'item item-inactive' ">
						<image v-if="item.stock <= 0" class="qianguang" src="http://img.hls178.cn/static/image/voucher/qq_lp_yqg@2x.png"></image>
						<image  class="img" :src="item.imgURL"></image>
						<view class="name">
							<text>{{item.name}}</text>
							<!-- <text>(兑现金)</text> -->
						</view>
						<view :class="item.stock <= 0 ? 'price no-select-img' : 'price yes-select-img'">
							<text>¥ {{item.price}}</text>
							<text>选</text>
						</view>
					</view>
				</view>
				<u-button @click="choose" class="self-btn" shape="circle" text="确定选择" color="linear-gradient(-30deg, #FD7028, #FC4231)"></u-button>
			</view>
		</u-popup>
		<!-- 奖励详情 -->
		<goodsInfo :show="showGoods" :goodsInfo="goodsInfo"></goodsInfo>
	</view>
</template>

<script>
	import goodsInfo from '@/components/goodsSelect/info.vue'
	export default {
		name:'text-modal',
		components:{
			goodsInfo
		},
		data(){
			return {
				//点击的商品ID
				click_good:-1,
				goodsInfo:[],
				showGoods:false
			}
		},
		watch:{
			click_good(index){
				this.goodsInfo = this.list[index]
				this.showGoods = true
			}
		},
		
		mounted() {
			
			uni.$on('goodsInfoCloseEmit',(data) => {
				this.showGoods = data.data
			})
			uni.$on('startGetVoucherEmit',(data) => {
				this.showGoods = false
			})
			
		},
		props:{
			show:{
				type:Boolean,
				default:false
			},
			list:{
				type:Array,
				default:() => {
					return []
				}
			}
		},
		methods:{
			close(){
				uni.$emit('showGoodsSelectValueEmit',{data:false})
			},
			clickGood(index){
				if(index != 0){
					return
				}
				this.click_good = index
			},
			choose(){
				if(this.click_good == -1){
					uni.showToast({
						title:'请先选择礼品'
					})
					return
				}
				uni.$emit('startGetVoucherEmit')
			}
		}
	}
</script>

<style lang="scss">
	.goods-select{
		padding: 43rpx 40rpx ;
		& .title{
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			text-align: center;
		}
		
		& .select-block{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 50rpx;
			
			& .item{
				position: relative;
				margin-bottom: 20rpx;
				width: 29%;
				padding: 10rpx 10rpx 20rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				& .qianguang{
					position: absolute;
					left: 0;
					top: 0;
					height: 90rpx;
					width: 90rpx;
					z-index: 100;
				}
				& .img{
					width: 100%;
					height: 191rpx;
					border-radius: 20rpx;
				}
				& .name{
					& > text:nth-child(1){
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					& > text:nth-child(2){
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}
				& .price{
					display: flex;
					justify-content: space-between;
					margin-top: 12rpx;
					line-height: 42rpx;
					
					padding-left: 20rpx;
					
					& > text:nth-child(1){
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						padding-left: 16rpx;
					}
					& > text:nth-child(2){
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						padding-right: 16rpx;
					}
					
				}
				
				& .yes-select-img{
					background: url(http://img.hls178.cn/static/image/voucher/qq_lp_bg_s@2x.png) no-repeat;
					background-size: 100% 100%;
				}
				& .no-select-img{
					background: url(http://img.hls178.cn/static/image/voucher/qq_lp_bg_n@2x.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			
			& .item-active{
				border: 2rpx solid #FD612B;
			}
			& .item-inactive{
				border: 2rpx solid #DEDEDE;
			}
		}
		& .select-block:after{
			content: '';
			width: 30%;
		}
		& .self-btn{
			margin-top: 40rpx;
			width: 80%;
		}
	}
</style>
