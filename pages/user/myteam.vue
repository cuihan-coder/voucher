<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<u-navbar title="我的团队" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
		</u-navbar>
		<view class="contain">
			
			<!-- <view class="title">我的团队</view> -->
			<view class="xiangqing">
				<view class="info-item">
					<image class="hover" src="http://img.hls178.cn/static/image/user/me_td_jb@2x.png"></image>
					<view class="title">推广总收益(金币)</view>
					<view class="num">{{info.totalMoney ? info.totalMoney : 0}}</view>
					<view class="mingxi">
						<view>
							<view>分润总收益</view>
							<view>{{info.totalTaskMoney ? info.totalTaskMoney : 0}}</view>
						</view>
						<view>
							<view>推荐总收益</view>
							<view>{{info.totalPromoteMoney ? info.totalPromoteMoney : 0}}</view>
						</view>
					</view>
				</view>
				<view class="info-item">
					<image class="hover" src="http://img.hls178.cn/static/image/user/me_td_td@2x.png"></image>
					<view class="title">我的团队(人)</view>
					<view class="num"> {{info.teamNumber ? info.teamNumber : 0}}</view>
					<view class="mingxi">
						<view>
							<view>直属徒弟</view>
							<view> {{info.childrenNumber ? info.childrenNumber : 0}}</view>
						</view>
						<view>
							<view>间接徒孙</view>
							<view>{{info.grandChildrenNumber  ? info.grandChildrenNumber : 0}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="list">
				<view class="titles">
					<view class="left">
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<view>
							<text>我的徒弟</text>
							<text>（已毕业{{info.childrenGraduatedNumber ? info.childrenGraduatedNumber : 0}}人）</text>
						</view>
					</view>
					<view  class="right" @click="tudiShow = !tudiShow">
						<text>{{info.childrenNumber ? info.childrenNumber  : 0}}人</text>
						<u-icon v-if="tudiShow == true" size="10" color="#999999" name="arrow-down"></u-icon>
						<u-icon v-if="tudiShow == false" size="10" color="#999999" name="arrow-up"></u-icon>
					</view>
				</view>
				
				<view v-if="tudiShow == true"  class="list-item" v-for="(item,index) in childrenList" :key="index">
					<view class="left">
						<image v-if="item.sex == 0 || item.sex == 1" src="http://img.hls178.cn/static/image/user/me_img_nan@2x.png"></image>
						<image v-if="item.sex == 2" src="http://img.hls178.cn/static/image/user/me_img_nv@2x.png"></image>
						<text>ID:{{item.hashID}}</text>
					</view>
					<view class="right">{{item.nickname}}</view>
				</view>
				<empty :show="childrenList.length > 0 ? false : true"></empty>
				<view class="load-more" @click="getChildren()" v-if="childrenList.length / ((this.childrenPage - 1) * 10) >= 1">点击加载更多</view>
			</view>
			
			<view class="list">
				<view class="titles">
					<view class="left">
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<view>
							<text>我的徒孙</text>
						</view>
					</view>
					<view  class="right" @click="tusunShow = !tusunShow">
						<text>{{info.grandChildrenNumber? info.grandChildrenNumber : 0}}人</text>
						<u-icon v-if="tusunShow == true" size="10" color="#999999" name="arrow-down"></u-icon>
						<u-icon v-if="tusunShow == false"  size="10" color="#999999" name="arrow-up"></u-icon>
					</view>
				</view>
				
				<view v-if="tusunShow == true"  class="list-item"  v-for="(item,index) in grandChildrenList" :key="index">
					<view class="left">
						<image v-if="item.sex == 0 || item.sex == 1" src="http://img.hls178.cn/static/image/user/me_img_nan@2x.png"></image>
						<image v-if="item.sex == 2" src="http://img.hls178.cn/static/image/user/me_img_nv@2x.png"></image>
						<text>ID:{{item.hashID}}</text>
					</view>
					<view class="right">{{item.nickname}}</view>
				</view>
				<empty :show="grandChildrenList.length > 0 ? false : true"></empty>
				<view class="load-more" @click="grandChildren()" v-if="grandChildrenList.length / ((this.grandChildrenPage - 1) * 10) >= 1">点击加载更多</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import tabbar from '@/components/footer/index.vue'
	import empty from '@/components/empty/index.vue'
	export default {
		components:{
			tabbar,
			empty
		},
		data() {
			return {
				info:[],
				childrenPage:1,
				childrenList:[],
				grandChildrenPage:1,
				grandChildrenList:[],
				tusunShow:true,
				tudiShow:true
			};
		},
		async onLoad() {
			this.getData()
		},
		
		methods: {
			
			getData(){
				//我的团队数据
				this.$helper.httpGet(this.$api.user_team_get)
				.then(data => {
					this.info = data.data
				})
				//我的徒弟数据
				this.$helper.httpGet(this.$api.user_children_get,{page:this.childrenPage})
				.then(data => {
					
					this.childrenList = data.data
					
					this.childrenPage++
				})
				//我的徒孙数据
				this.$helper.httpGet(this.$api.user_grandChildren_get,{page:this.grandChildrenPage})
				.then(data => {
					this.grandChildrenList = data.data
					this.grandChildrenPage++
				})
				
			},
			getChildren(){
				this.$helper.httpGet(this.$api.user_children_get,{page:this.childrenPage})
				.then(data => {
					data.data = data.data == null ? [] : data.data
					if(data.data.length == 0){
						uni.showToast({
							title:'到底了',
							icon:'none'
						})
						return
					}
					let list = this.childrenList
					list.concat( data.data)
					this.childrenPage++
				})
			},
			grandChildren(){
				this.$helper.httpGet(this.$api.user_grandChildren_get,{page:this.grandChildrenPage})
				.then(data => {
					data.data = data.data == null ? [] : data.data
					if(data.data.length == 0){
						uni.showToast({
							title:'到底了',
							icon:'none'
						})
						return
					}
					let list = this.grandChildrenList
					list.concat(data.data)
					this.grandChildrenPage++
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-F4;
		background-image: url(http://img.hls178.cn/static/image/user/me_bg@2x.png);
		background-size:contain ;
		background-repeat: no-repeat;
	}
	.status_bar{
		width: 100%;
		height: var(--status-bar-height);
	}
	.contain{
		padding: 100rpx 30rpx 150rpx;
		min-height: 500rpx;
		& > .title{
			padding-top: 38rpx;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
		}
		
		& .xiangqing{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 65rpx;
			
			& .info-item{
				width: calc(48% - 70rpx);
				padding: 72rpx 35rpx 35rpx;
				background: #FFFFFF;
				border-radius: 30rpx;
				position: relative;
				& .hover{
					position: absolute;
					left: 0;
					top: 0;
					width: 94rpx;
					height: 94rpx;
				}
				& .title{
					padding-top: 22rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 20rpx;
					text-align: center;
				}
				& .num{
					padding-top: 20rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 20rpx;
					text-align: center;
				}
				& .mingxi{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 45rpx;
					& > view{
						text-align: center;
						& view:nth-child(1){
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							line-height: 20rpx;
						}
						& view:nth-child(2){
							margin-top: 20rpx;
							font-size: 25rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
							line-height: 20rpx;
						}
					}
				}
			}
			
		}
		
		& .list{
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 40rpx 30rpx;
			margin-top: 20rpx;
			& .titles{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 30rpx;
				& .left{
					display: flex;
					align-items: center;
					& image{
						width: 20rpx;
						height: 20rpx;
					}
					& > view{
						padding-left: 10rpx;
						& >text:nth-child(1){
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333333;
						}
						& >text:nth-child(2){
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FF1E1E;
						}
					}
				}
				
				& .right{
					display: flex;
					align-items: center;
					& >text{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
						padding-right: 10rpx;
					}
				}
			}
		
			& .list-item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10rpx 20rpx;
				& .left{
					display: flex;
					align-items: center;
					& image{
						width: 54rpx;
						height: 54rpx;
					}
					& text{
						padding-left: 24rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}
				
				& .right{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		
			& .load-more{
				margin-top: 27rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #2E55FC;
				text-align: center;
			}
		}
	}
	
</style>
