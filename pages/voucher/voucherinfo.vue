<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<u-navbar title="详情" leftText="返回" :closeOnClickAction="closeOnClickAction" :fixed="true"
			@rightClick="kefushow = !kefushow" @leftClick="leftClick">
			<view class="u-nav-slot" slot="right">
				<image src="http://img.hls178.cn/static/image/voucher/ty_kf@2x.png"></image>
			</view>
		</u-navbar>
		<view class="notify">
			<u-notice-bar bgColor="#fff6ed" color="#ff8a0c " text="有任何问题，请点击右上角联系平台客服，都能及时解决！恶意骚扰商家，将有封号风险！">
			</u-notice-bar>
		</view>

		<view class="contain">
			<view class="voucher-first">
				<view class="voucher-name">
					<image src="http://img.hls178.cn/static/image/wallet/hone_qq_dy@2x.png"></image>
					<text v-if="orderInfo.category == 1" class="name">指定商品{{orderInfo.task.goodsMoney}}元抵扣券</text>
					<text v-if="orderInfo.category == 2" class="name">好评返利券</text>
					<text v-if="orderInfo.status == 20 && orderInfo.issueStatus == 0" class="tag dsy">待使用</text>
					<text v-if="orderInfo.status == 21 && orderInfo.issueStatus == 0" class="tag dhq">待核券</text>
					<text v-if="orderInfo.status == 30 && orderInfo.issueStatus == 0" class="tag dfl">待返利</text>
					<text v-if="orderInfo.status == 40 && orderInfo.issueStatus == 0" class="tag ywc">已完成</text>
					<text v-if="[31,33].indexOf(orderInfo.status) != -1 && orderInfo.issueStatus == 0" class="tag hqsb">核券失败</text>
					<text v-if="[23,24].indexOf(orderInfo.status) != -1 && orderInfo.issueStatus == 0"
						class="tag ysx">已失效</text>
					<text v-if="orderInfo.issueStatus == 1" class="tag ssz">申诉中</text>
					<text v-if="orderInfo.issueStatus == 2" class="tag sscg">申诉成功</text>
					<text v-if="orderInfo.issueStatus == 3" class="tag sssb">申诉失败</text>
				</view>
				<view class="fanli">
					<text v-if="orderInfo.category == 1">核券后全返+{{orderInfo.money}}金币</text>
					<text v-if="orderInfo.category == 2">核券后+{{orderInfo.money}}金币</text>
				</view>
				<view class="dyh-info">
					<text>抢券抖音号：{{orderInfo.account ? orderInfo.account.name : ''}}</text>
					<text>券编号：{{orderInfo.id}}</text>
				</view>
				<view class="dyh-djs">
					<view v-if="[20].indexOf(orderInfo.status) != -1 ">
						<text>到期时间还剩：</text>
						<countdown :times="orderInfo.finishExpireCountDown"
							:_style="{fontSize: '24rpx',color:'#FB3A3A'}"></countdown>
					</view>
					<view v-if="[20].indexOf(orderInfo.status) == -1 ">
						<text>抢券时间：{{orderInfo.createTime}}</text>
					</view>
					<text v-if="orderInfo.category == 1">需消费金额：{{orderInfo.task.goodsMoney}}元</text>
				</view>
			</view>

			<!-- 申诉情况下 展示 -->
			<view v-if="orderInfo.issueStatus > 0" class="voucher-second">
				<view class="title">
					<view>
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<text>申诉详情</text>
					</view>
				</view>
				<view class="qianse">申诉内容：{{orderInfo.issueReason}}</view>
				<view class="shense" v-if="orderInfo.issueStatus > 1">申诉结果：{{orderInfo.issueRemark}}</view>
				<view class="qianse">申诉时间：{{orderInfo.issueSubmitTime}}</view>
				<view class="qianse" v-if="orderInfo.issueStatus > 1">处理时间：{{orderInfo.issueHandleTime}}</view>
			</view>
			<!-- 申诉情况下 展示 -->
			<view class="status" v-if="[21,24,30,40,31].indexOf(orderInfo.status) != -1">
				<!-- 失效提示 -->
				<view v-if="orderInfo.status == 24" class="invalid">因超时未提交核券，优惠券已失效</view>
				<!-- 失效提示 -->
				<view class="info" v-if="[21,30,40,31].indexOf(orderInfo.status) != -1">
					<!-- 待核券 -->
					<view v-if="orderInfo.status == 21" class="dhq">商家核券中，若 <countdown
							:times="orderInfo.approveExpireCountDown"></countdown> 后未审核，将自动通过</view>
					<!-- 待核券 -->
					<!-- 待返利 -->
					<view v-if="orderInfo.status == 30" class="dfl">商家返利中，若 <countdown
							:times="orderInfo.transferExpireCountDown"></countdown> 后未返利，请联系客服</view>
					<!-- 待返利 -->
					<!-- 已完成 、 申诉中 、 申诉成功-->
					<!-- 好评使用<view v-if="orderInfo.status == 40" class="ywc">核券成功，已返利</view> -->
					<view v-if="orderInfo.status == 40 && orderInfo.category == 1" class="ywc">已返利，若金额不合，请及时人工申诉</view>

					<view v-if="orderInfo.status == 40 && orderInfo.category == 2" class="ywc">核券成功，已返利</view>
					<!-- 已完成 -->
					<!-- 核销失败 -->
					<view v-if="orderInfo.status == 31" class="hxsb">
						{{orderInfo.approveRejectReason}},{{orderInfo.approveRejectRemark}}
					</view>
					<!-- 核销失败 -->
					<view class="other" v-if="orderInfo.status > 20">第三方订单：{{orderInfo.thirdOrderID}}
						<image @click="copy(orderInfo.thirdOrderID)" class="copy"
							src="http://img.hls178.cn/static/image/voucher/copy.png"></image>
					</view>
					<view v-if="orderInfo.status != 20" class="other">提交时间：{{orderInfo.finishTime}}</view>
					<!-- 核销券后显示 -->
					<view v-if="[30,40,31].indexOf(orderInfo.status) != -1" class="other">核券时间：{{orderInfo.approveTime}}
					</view>
					<view v-if="orderInfo.status != 20" class="other">
						<text v-if="orderInfo.category == 1">实付金额：{{orderInfo.realMoney}}元</text>
						<view
							v-if="orderInfo.task.transferType == 2 && orderInfo.transferType == 2 && orderInfo.status == 40"
							class="flqd-wx">
							<image src="http://img.hls178.cn/static/image/voucher/yyq_he_fkwx@2x.png"></image>
							<text>已返利至微信</text>
						</view>
						<view
							v-if="orderInfo.task.transferType == 2 && orderInfo.transferType == 1 && orderInfo.status == 40"
							class="flqd-zfb">
							<image src="http://img.hls178.cn/static/image/voucher/yyq_he_fkzfb@2x.png"></image>
							<text>已返利至支付宝</text>
						</view>
						<view v-if="orderInfo.task.transferType == 1 && orderInfo.status == 40" class="flqd-qb">
							<image src="http://img.hls178.cn/static/image/yyq_he_fkqb@2x.png"></image>
							<text>已返利到钱包</text>
						</view>
					</view>
				</view>
			</view>


			<view>

			</view>
			<!-- 搜索直播间- 第一步 - 购买 -->
			<view class="voucher-search-zbj" v-if="orderTaskInfo.category == 1 && orderInfo.category == 1">
				<view class="title">
					<view>
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<text>第一步·搜索直播间</text>
					</view>

				</view>
				<view class="copy-btn">
					<view @click="copy(orderTaskInfo.link)">
						<image src="http://img.hls178.cn/static/image/voucher/yyq_hq_fz@2x.png"></image>
						<text>复制链接</text>
					</view>
					<view>请复制后到抖音中搜索</view>
				</view>
			</view>
			<!-- 搜索直播间 -->
			<!-- 视频链接- 第一步 - 购买 -->
			<view class="voucher-search-zbj" v-if="orderTaskInfo.category == 2 && orderInfo.category == 1">
				<view class="title">
					<view>
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<text>第一步·搜索视频链接</text>
					</view>
				</view>
				<view class="copy-btn">
					<view @click="copy(orderTaskInfo.link)">
						<image src="http://img.hls178.cn/static/image/voucher/yyq_hq_fz@2x.png"></image>
						<text>复制链接</text>
					</view>
					<view>请复制后到抖音中搜索</view>
				</view>
			</view>
			<!-- 视频链接 -->
			<!-- 搜索店铺- 第一步 - 购买 -->
			<view class="voucher-search-keyword" v-if="orderTaskInfo.category == 3 && orderInfo.category == 1">
				<view class="title">
					<view>
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<text>第一步·搜索店铺</text>
					</view>
					<navigator>查看教程</navigator>
				</view>
				<view class="images">
					<view class="left" @click="previewImg(orderTaskInfo.imgURL)">
						<view class="pos-view">
							<image :src="orderTaskInfo.imgURL"></image>
							<view>商家截图</view>
						</view>
					</view>
					<view class="right">
						<view @click="copy(orderTaskInfo.name)">
							<image src="http://img.hls178.cn/static/image/voucher/yyq_hq_fz@2x.png"></image>
							<text>复制关键字</text>
						</view>
						<view>请复制后到抖音中搜索</view>
					</view>
				</view>
			</view>
			<!-- 店铺 -->
			<!-- 搜索口令- 第一步 - 购买 -->
			<view class="voucher-search-zbj" v-if="orderTaskInfo.category == 4 && orderInfo.category == 1">
				<view class="title">
					<view>
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<text>第一步·搜索口令</text>
					</view>

				</view>
				<view class="copy-btn">
					<view @click="copy(orderTaskInfo.keyword)">
						<image src="http://img.hls178.cn/static/image/voucher/yyq_hq_fz@2x.png"></image>
						<text>复制口令</text>
					</view>
					<view>请复制后到抖音中搜索</view>
				</view>
			</view>
			<!-- 搜索口令 -->
			<!-- 搜索关键字- 第一步 - 购买 -->
			<view class="voucher-search-keyword" v-if="orderTaskInfo.category == 5 && orderInfo.category == 1">
				<view class="title">
					<view>
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<text>第一步·搜索关键字</text>
					</view>
					<navigator>查看教程</navigator>
				</view>
				<view class="images">
					<view class="left" @click="previewImg(orderTaskInfo.imgURL)">
						<view class="pos-view">
							<image :src="orderTaskInfo.imgURL"></image>
							<view>商家截图</view>
						</view>
					</view>
					<view class="right">
						<view @click="copy(orderTaskInfo.keyword)">
							<image src="http://img.hls178.cn/static/image/voucher/yyq_hq_fz@2x.png"></image>
							<text>复制关键字</text>
						</view>
						<view>请复制后到抖音中搜索</view>
					</view>
				</view>
			</view>
			<!-- 搜索关键字- 第一步 - 购买 -->


			<!-- 第二步  - 购买-->
			<view class="voucher-second" v-if="orderInfo.category == 1">
				<view class="title">
					<view>
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<text>第二步·选择以下商品</text>
					</view>
				</view>
				<view class="shop-name">抖店: {{orderInfo.task.shop.name}}</view>
				<!-- 多个商品提示合并使用 -->
				<view class="tips" v-if="orderInfo.task.goods.length > 1 ">该券需以下商品合并付款使用，请一起购买后再核券</view>
				<view class="goods-item" v-for="(good , index) in orderInfo.task.goods" :key="index">
					<image :src="good.imgURL"></image>
					<view class="right">
						<view>{{good.name}}</view>
						<view>数量：{{good.number}}</view>
						<view>金额：{{(good.number * good.prize).toFixed(2)}}元</view>
					</view>
				</view>
				<view v-if="orderInfo.task.remark" class="bus-note">商家备注：{{orderInfo.task.remark}}</view>
			</view>
			<!-- 第二步 - 购买 -->

			<!-- 好评券的展示 -->
			<view class="voucher-second" v-if="orderInfo.category == 2">
				<view class="title">
					<view>
						<image src="http://img.hls178.cn/static/image/home_bj@2x.png"></image>
						<text>选择以下商品五星好评</text>
					</view>
				</view>
				<view class="shop-name">抖店: {{orderInfo.task.shop.name}}</view>
				<view class="tips">该券需以下商品合并使用，请一起好评截图后再核券</view>

				<view class="goods-item2" v-for="(item,index) in orderInfo.comments">
					<view class="images">
						<image :src="item.goods.imgURL"></image>
						<text>{{item.goods.name}}</text>
					</view>
					<view class="view-yang">
						<text>请使用以下素材对该商品五星好评后截图上传</text>
						<text>查看示例图</text>
					</view>
					<view class="uplaod-block">
						<view class="left">
							<view class="btn">
								<view @click="copy(item.content.words)">
									<image src="http://img.hls178.cn/static/image/voucher/yyq_hq_fz@2x.png"></image>
									<text>复制文本</text>
								</view>
								<view @click="downlaod(index)">
									<image src="http://img.hls178.cn/static/image/voucher/yyq_hpq_xz@2x.png"></image>
									<text>下载素材</text>
								</view>
							</view>
							<view class="miaoshu">{{item.content.words}}</view>
						</view>
						<view class="right" @click="uploadImg(index)">
							<view>
								<!-- 未上传 -->
								<image v-if="item.screenshot == ''" class="no-up"
									src="http://img.hls178.cn/static/image/voucher/yyq_hpq_sc@2x.png"></image>
								<!-- 上传完成 -->
								<view class="up-ok" v-if="item.screenshot != '' ">
									<image :src="item.screenshot"></image>
									<view class="again-up">
										<image src="http://img.hls178.cn/static/image/voucher/yyq_hpq_sc2@2x.png">
										</image>
										<text>重新上传</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="screen-img">
						<image v-for="(cont,index) in item.content.resources"
							:src="cont.type == 'video' ? 'http://img.hls178.cn/static/image/video.png' : cont.url">
						</image>

					</view>
				</view>
			</view>
			<!-- 好评券的展示 -->

			<!-- 底部操作 -->
			<!-- 操作按钮 -->

			<view v-if="orderInfo.status == 20" class="footer-btn">
				<view @click="rejectShow = true" class="del">拒绝优惠券</view>
				<view class="tjhq" @click="subhequan()">
					<view class="max">提交核券</view>
					<countdown before="(" after="后到期)" :times="orderInfo.finishExpireCountDown"
						:_style="{fontSize: '24rpx',color:'#ffffff'}"></countdown>
				</view>
			</view>

			<view @click="kefushow = !kefushow" v-if="orderInfo.status == 30 && orderInfo.transferExpireCountDown <= 0"
				class="footer-btn-two">
				<view class="rgss">
					<text class="max">联系客服</text>
				</view>
			</view>

			<!--已经提交 0次-->
			<view @click="subhequan()" v-if="orderInfo.status == 21 && orderInfo.canFinishAgain == true"
				class="footer-btn-two">
				<view class="ytj">
					<text class="max">已提交</text>
					<text class="min">（可修改一次)</text>
				</view>
			</view>



			<!--已经提交 1次-->
			<!-- <view v-if="orderInfo.status == 21 && orderInfo.finishCount == 1" class="footer-btn-two">
					<view  class="ytj">
						<text class="max">重新提交</text>
						<text class="min">（可修改一次)</text>
					</view>
				</view> -->

			<!--人工申诉 - 状态下-->
			<!-- 核卷成功 status=30 返款成功 status=40 倒计时 issueExpireCountDown
				
				核卷失败 status=31  
				canFinishAgain=true 倒计时 finishExpireCountDown
				canFinishAgain=false 倒计时 issueExpireCountDown 
				issueStatus !=  0 说明用户已提交申诉了  
				issueExpireCountDown == 0 说明失效了
				-->
			<view v-if="orderInfo.status == 31 && orderInfo.canFinishAgain == true  && orderInfo.issueStatus == 0"
				class="footer-btn-two">
				<view @click="shensuShow = true" v-if="orderInfo.finishExpireCountDown  > 0" class="rgss">
					<text class="max">人工申诉</text>
					<text class="min">
						<countdown before="(" after="后到期)" :times="orderInfo.finishExpireCountDown"
							:_style="{fontSize: '24rpx',color:'#ffffff'}"></countdown>
					</text>
				</view>
				<!-- 无法申诉 时间过期 -->
				<view v-if="orderInfo.finishExpireCountDown  <= 0" class="lxkf">
					<text>超时未申诉，已失效</text>
				</view>
			</view>

			<view v-if="orderInfo.status == 31 && orderInfo.canFinishAgain == false  && orderInfo.issueStatus == 0"
				class="footer-btn-two">
				<view @click="shensuShow = true" v-if="orderInfo.issueExpireCountDown  > 0" class="rgss">
					<text class="max">人工申诉</text>
					<text class="min">
						<countdown before="(" after="后到期)" :times="orderInfo.issueExpireCountDown"
							:_style="{fontSize: '24rpx',color:'#ffffff'}"></countdown>
					</text>
				</view>
				<!-- 无法申诉 时间过期 -->
				<view v-if="orderInfo.issueExpireCountDown  <= 0" class="lxkf">
					<text>超时未申诉，已失效</text>
				</view>
			</view>

			<!-- 完成下面的 申诉 -->
			<view
				v-if="(orderInfo.status == 40 || orderInfo.status == 30 || orderInfo.status == 33) && orderInfo.category == 1 && orderInfo.issueStatus == 0"
				class="footer-btn-two">
				<view @click="shensuShow = true" v-if="orderInfo.issueExpireCountDown  > 0" class="rgss">
					<text class="max">人工申诉</text>
					<text class="min">
						<countdown before="(" after="后到期)" :times="orderInfo.issueExpireCountDown"
							:_style="{fontSize: '24rpx',color:'#ffffff'}"></countdown>
					</text>
				</view>
				<!-- 无法申诉 时间过期 -->
				<view v-if="orderInfo.issueExpireCountDown  <= 0" class="lxkf">
					<text>超时未申诉，已失效</text>
				</view>
			</view>


			<!-- 	2-0-4
				第一次
				approveExpireCountDown 倒计时   
				status=21 finishCount=0
				
				第二次
				approveExpireCountDown  倒计时  
				status=21 finishCount=1
				
				2-0-5
				transferExpireCountDown 倒计时 
				status=30
				
				2-0-6
				issueExpireCountDown 倒计时 
				status=30
				
				2-0-7
				thirdFinishExpireCountDown 倒计时 
				status=31 
				finishCount<2 控制文字
				
				2-0-9
				issueExpireCountDown 倒计时 
				status=31 
				finishCount=2 控制文字 -->
			<!-- 审核失败 重新进入审核 -->
			<view v-if="orderInfo.status == 31 && orderInfo.canFinishAgain == true" class="footer-btn">
				<view @click="rejectShow = true" v-if="orderInfo.thirdFinishExpireCountDown > 0" class="del">拒绝优惠券
				</view>
				<view v-if="orderInfo.thirdFinishExpireCountDown > 0" class="tjhq" @click="subhequan()">
					<view class="max">重新提交</view>
					<countdown before="(" after="后到期)" :times="orderInfo.thirdFinishExpireCountDown"
						:_style="{fontSize: '24rpx',color:'#ffffff'}"></countdown>
				</view>
				<!-- 无法重置 时间过期 -->
				<view v-if="orderInfo.thirdFinishExpireCountDown <= 0" class="lxkf">
					<text>超时未提交，已失效</text>
				</view>
			</view>
			<!-- 底部操作 -->

			<!-- 提交核券弹窗 -->
			<u-modal :show="hequanShow" @confirm="hequanFormshow = true , hequanShow = false"
				@cancel="hequanShow = false" title="提示" content='您是否已前往抖音中购买,请购买后再回本页面进行提交核券' cancelText="还未购买"
				confirmText="已购买,去核券" confirmColor="#2586FF" cancelColor="#FF3131" :showCancelButton="showCancelButton">
			</u-modal>
			<!-- 提交核券弹窗 -->

			<!-- 好评提交确认弹窗 -->
			<u-modal :show="haopingshow" @confirm="hpSub" @cancel="haopingshow = false" title="提示"
				content='是否确定已完成该商品的好评？' cancelText="否" confirmText="确定" confirmColor="#2586FF" cancelColor="#FF3131"
				:showCancelButton="showCancelButton"></u-modal>
			<!-- 好评提交确认弹窗 -->

			<!-- 提交核券信息 -->
		</view>

		<!-- 提交拒绝订单 -->
		<u-modal @confirm="reject(orderInfo.id)" @cancel="rejectShow = false" :showCancelButton="showCancelButton"
			:show="rejectShow" title="提示" content='您确定拒绝优惠券吗？'></u-modal>

		<!-- 提交核券 -->
		<NuclearVoucher :show="hequanFormshow" value1="" value2=""></NuclearVoucher>
		<!-- 提交申诉 -->
		<TextModal :show="shensuShow"></TextModal>
		<!-- 聊天引导 -->
		<u-action-sheet :actions="kefulist" round="20" @select="kefured" :closeOnClickAction="closeOnClickAction"
			cancelText="取消" @close="kefushow = !kefushow" :show="kefushow"></u-action-sheet>

	</view>

</template>
<script>
	// #ifdef H5
	import DZMH5Download from 'dzm-dl-h5'
	// #endif
	
	import tabbar from '@/components/footer/index.vue'
	import NuclearVoucher from '@/components/nuclear-voucher/modal.vue'
	import TextModal from '@/components/nuclear-voucher/textModal.vue'
	import countdown from '@/components/countdown/index.vue'

	export default {
		components: {
			tabbar,
			NuclearVoucher,
			TextModal,
			countdown
		},
		data() {
			return {
				showCancelButton: true,
				closeOnClickAction: true,
				timeData: {},
				//提交和券弹出
				hequanShow: false,
				hequanFormshow: false,
				haopingshow: false,
				orderInfo: {},
				orderTaskInfo: {},
				orderId: '',
				kefushow: false, //客服选择
				kefulist: [{
						name: '人工客服',
						subname: '在线时间：09:30-19:00(周一至周六)'
					},
					{
						name: '常见问题',
						subname: '更多问题可自行查看'
					}
				],
				rejectShow: false, //拒绝优惠券提示
				shensuShow: false, //申诉弹窗

			};
		},
		async onLoad(option) {

			this.orderId = option.id
			this.getData(this.orderId)
			//核销提交弹窗
			uni.$on('numclearModalClose', () => {
				this.hequanFormshow = false
			})
			//申诉弹窗
			uni.$on('textModalClose', () => {
				this.shensuShow = false
			})
			//申诉提交
			uni.$on('textModalSubEmit', (option) => {
				let param = {
					id: this.orderInfo.id,
					contact: '',
					reason: option.reson
				}
				this.$helper.httpPost(this.$api.order_appeal_post, param)
					.then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: '提交成功',
								icon: 'none'
							})
							this.shensuShow = false
							let timerid = setInterval(() => {
								clearInterval(timerid)
								uni.redirectTo({
									url: '/pages/voucher/voucherinfo?id=' + this.orderId
								})
							}, 1500)

						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					})
			})
			//核券提交
			uni.$on('numclearModalSub', (option) => {
				this.finish(this.orderInfo.id, option.value1, option.value2)
			})


		},
		onUnload() {
			uni.$off('numclearModalClose')
			uni.$off('textModalClose')
			uni.$off('textModalSubEmit')
			uni.$off('numclearModalSub')
		},
		methods: {
			//点就和券按钮
			subhequan() {
				//判断是否完善相关信息
				if (this.orderInfo.task.transferType == 2 && this.orderInfo.account.isComplete == false) {
					uni.showModal({
						title: '提示',
						content: '请完善账号信息',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "../user/getvoucheraccount"
								})
							}
						}
					});

					return
				}

				if (this.orderInfo.task.transferType == 2 && this.orderInfo.user.cashInfoIsComplete == false) {
					uni.showModal({
						title: '提示',
						content: '请完善收款信息',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "../user/collection"
								})
							}
						}
					});

					return
				}
				if (this.orderInfo.category == 1) {
					this.hequanShow = true
				}
				if (this.orderInfo.category == 2) {
					this.haopingshow = true
				}
			},
			//好评券提交
			hpSub() {
				this.finish(this.orderInfo.id, '', 0)
			},
			getData(id) {
				this.$helper.httpGet(this.$api.order_detail_get, {
						id
					})
					.then(res => {
						this.orderInfo = res.data
						if (this.orderInfo.task.info) {
							this.orderTaskInfo = this.orderInfo.task.info
						}
						console.log(this.orderInfo)
						let comments = []
						if (this.orderInfo.category == 2) {
							this.orderInfo.comments.forEach((item, index) => {
								comments = comments.concat([{
									id: item.id,
									screenshot: item.screenshot
								}])
							})
						}
					})
			},
			kefured(index) {
				this.kefushow = false
				if (index.name == '人工客服') {
					// #ifdef APP-PLUS
					uni.navigateTo({
						url:'../home/webview?url=https://www.huolieyun.com/chat/cf07ef0dd2fef8d8'
					})
					// #endif
					
					// #ifdef H5
						location.href="https://www.huolieyun.com/chat/cf07ef0dd2fef8d8"
					// #endif
				}
				if (index.name == '常见问题') {
					uni.navigateTo({
						url: '../user/help'
					})
				}
			},
			reject(id) {
				this.rejectShow = false
				this.$helper.httpPost(this.$api.order_reject_post, {
					id,
					reason: ''
				}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '提交成功',
							icon: 'none'
						})
						let timerid = setInterval(() => {
							clearInterval(timerid)
							uni.redirectTo({
								url: '/pages/voucher/voucherinfo?id=' + this.orderId
							})
						}, 1500)
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}

				})
			},
			finish(id, thirdOrderID, realMoney) {
				this.hequanShow = false


				let formData = {
					id
				}

				if (this.orderInfo.category == 1) {
					if (!realMoney || !thirdOrderID) {
						uni.showToast({
							title: '请填写完整再提交',
							icon: 'none'
						})
						return
					}
					formData.thirdOrderId = thirdOrderID
					formData.realMoney = realMoney
				}

				let comments = []
				if (this.orderInfo.category == 2) {
					let lenI = this.orderInfo.comments.length
					for (var i = 0; i < lenI; i++) {
						if (this.orderInfo.comments[i].screenshot == '') {
							uni.showToast({
								title: '请上传所有截图再提交',
								icon: 'none'
							})
							this.haopingshow = false
							return
						}
						comments = comments.concat([{
							id: this.orderInfo.comments[i].id,
							screenshot: this.orderInfo.comments[i].screenshot
						}])
					}

					formData.comments = JSON.stringify(comments)
				}

				this.$helper.httpPost(this.$api.order_finish_post, formData).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '提交成功',
							icon: 'none'
						})
						this.hequanFormshow = false
						let timerid = setInterval(() => {
							clearInterval(timerid)
							uni.redirectTo({
								url: '/pages/voucher/voucherinfo?id=' + this.orderId
							})
						}, 1500)
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}

				})
			},
			timeOnChange(e) {
				this.timeData = e
			},
			previewImg(imgurl){
				uni.previewImage({
							urls:[imgurl],
							longPressActions: {
								success: function(data) {
								},
								fail: function(err) {
									uni.showToast({
										title:'预览失败'
									})
								}
							}
						});
			},
			timespaceSeconde(time1) {
				let remainingSeconds = new Date(time1).getTime() - new Date().getTime()
				let seconds = parseInt(remainingSeconds / 1000)
				return seconds < 0 ? 0 : seconds;
			},
			copy(val) {
				uni.setClipboardData({
					data: val.toString(),
					success: function(data) {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
					},
					fail: function(err) {
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						})
					},
					complete: function(res) {}
				})
			},
			uploadImg(index) {
				uni.chooseImage({
					success: async (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						let token = await this.$helper._getCache('loginToken')
						if (this.orderInfo.status == 40) {
							uni.showToast({
								title: '已经完成无法上传',
								icon: 'none'
							})
							return
						}
						uni.uploadFile({
							url: this.$api.upload_post,
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								token
							},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								this.orderInfo.comments[index].screenshot = data.data.name
							}
						});
					}
				});
			},
			downlaod(index) {
				uni.showLoading({
					title: '保存中'
				})
				// #ifdef H5
				this.orderInfo.comments[index].content.resources.forEach((item, index) => {
					DZMH5Download.DOWLOAD_FILE(item.url)
				})
				// #endif

				// #ifdef APP-PLUS

				this.orderInfo.comments[index].content.resources.forEach((item, index) => {
					uni.downloadFile({
						url: item.url,
						success: (res) => {
							if (res.statusCode === 200) {
								if (item.type == 'video') {
									uni.saveVideoToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function() {
											uni.showToast({
												title: '已保存到手机相册',
												icon: 'none'
											})
											uni.hideLoading()
										},
										fail(e) {
											uni.showToast({
												title: '保存失败',
												icon: 'none'
											})
										}
									})
								} else {
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function() {
											uni.showToast({
												title: '保存成功',
												icon: 'none'
											})
											uni.hideLoading()
										},
										fail(e) {
											uni.showToast({
												title: '保存失败',
												icon: 'none'
											})
										}
									});
								}

							}
						}
					});
				})

				// #endif

				let id = setInterval(() => {
					clearInterval(id)
					uni.hideLoading()
				}, 2000)

			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: $color-F4;
	}

	.notify {
		margin-top: 82rpx;
	}

	.u-nav-slot {
		& image {
			width: 44rpx;
			height: 44rpx;
		}
	}

	.contain {
		padding: 20rpx 30rpx 150rpx;

		& .tag {
			margin-left: 10rpx;
			width: 100rpx;
			line-height: 36rpx;
			border-radius: 20rpx 0px 20rpx 0px;
			z-index: 10;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: $color-ff;
			text-align: center;
		}

		// 待使用
		& .dsy {
			background: $color-FD7028;
		}

		//待核券
		& .dhq {
			background: $color-A42EFF;
		}

		& .dfl {
			background: $color-08D726;
		}

		& .ywc {
			background: $color-047EF0;
		}

		& .hqsb {
			width: 120rpx !important;
			background: $color-FF4A3A;
		}

		& .ysx {
			background: $color-AFAFAF;
		}

		& .ssz {
			background: #A42EFF;
		}

		& .sscg {
			width: 120rpx !important;
			background: #3682FF;
		}

		& .sssb {
			width: 120rpx !important;
			background: #FF5959;
		}

		& .voucher-first {
			padding: 30rpx 32rpx;
			background: $color-ff;
			border-radius: 20rpx;

			& .voucher-name {
				display: flex;
				align-items: center;

				& image {
					width: 54rpx;
					height: 54rpx;
					border-radius: 50%;
				}

				& .name {
					padding-left: 15rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-00;
				}

			}

			& .fanli {
				padding-left: 70rpx;

				& text {
					padding: 0 28rpx;
					line-height: 38rpx;
					background: linear-gradient(90deg, #FFC9A1, #FFEEDA);
					border-radius: 19rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-CB7636;
				}
			}

		}

		& .status {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 30rpx;
			margin-top: 20rpx;
			background: $color-ff;
			border-radius: 20rpx;

			& .invalid {
				width: 100%;
				line-height: 64rpx;
				background: rgba(175, 175, 175, 0.15);
				border-radius: 10rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-9B;
				text-align: center;
			}

			& .info {
				width: 100%;

				& .dhq {
					display: flex;
					justify-content: center;
					width: 100%;
					line-height: 64rpx;
					background: rgba(164, 46, 255, 0.15);
					border-radius: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-A42EFF;
					text-align: center;
				}

				& .dfl {
					display: flex;
					justify-content: center;
					width: 100%;
					line-height: 64rpx;
					background: rgba(8, 215, 38, 0.15);
					border-radius: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-14BC0B;
					text-align: center;
				}

				& .ywc {
					width: 100%;
					line-height: 64rpx;
					background: rgba(54, 130, 255, 0.15);
					border-radius: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-2A78F8;
					text-align: center;
				}

				& .hxsb {
					width: 100%;
					line-height: 64rpx;
					background: rgba(255, 80, 80, 0.15);
					border-radius: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-E84538;
					text-align: center;
				}

				& .other {
					display: flex;
					align-items: center;
					padding-top: 18rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-99;
					line-height: 32rpx;

					& .copy {
						width: 20rpx;
						height: 20rpx;
						margin-left: 10rpx;
					}

					& .flqd-wx {
						display: flex;
						align-items: center;
						padding-left: 30rpx;

						& image {
							width: 24rpx;
							height: 24rpx;
						}

						& text {
							padding-left: 8rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: $color-07C322;
						}
					}

					& .flqd-zfb {
						display: flex;
						align-items: center;
						padding-left: 30rpx;

						& image {
							width: 24rpx;
							height: 24rpx;
						}

						& text {
							padding-left: 8rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: $color-3275FD;
						}
					}

					& .flqd-qb {
						display: flex;
						align-items: center;
						padding-left: 30rpx;

						& image {
							width: 24rpx;
							height: 24rpx;
						}

						& text {
							padding-left: 8rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FD602B;
						}
					}
				}

			}

		}

		& .dyh-info {
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;

			& text {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $color-99;
			}

			&>text:nth-child(2) {
				width: 35%;
			}
		}

		& .dyh-djs {
			display: flex;
			justify-content: space-between;
			margin-top: 10rpx;

			&>view {
				display: flex;
				align-items: center;

				& .time__item {
					color: $color-FF4A3A;
				}

				& text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-99;
				}

			}

			&>text {
				width: 35%;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $color-99;
			}

		}

		& .voucher-search-keyword,
		.voucher-search-zbj,
		.voucher-second {
			padding: 30rpx 32rpx;
			background: $color-ff;
			border-radius: 20rpx;
			margin-top: 20rpx;

			& .title {
				display: flex;
				justify-content: space-between;
				align-items: center;

				& view {
					display: flex;
					align-items: center;

					& image {
						width: 20rpx;
						height: 20rpx;
					}

					& text {
						padding-left: 5rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: $color-33;
					}
				}

				& navigator {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-047EF0;
				}
			}

			& .images {

				display: flex;
				align-items: center;
				justify-content: flex-start;
				margin-top: 20rpx;

				& .left {
					& .pos-view {
						width: 100%;
						position: relative;

						& image {
							top: 0;
							width: 190rpx;
							height: 190rpx;
							border-radius: 10rpx;
						}

						& view {
							position: absolute;
							bottom: 10rpx;
							left: calc((100% - 130rpx)/2);
							width: 130rpx;
							line-height: 36rpx;
							background: linear-gradient(-65deg, #FD7028, #FC4231);
							border-radius: 10rpx 10rpx 0rpx 0rpx;
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: $color-ff;
							text-align: center;
							z-index: 4;
						}
					}


				}

				& .right {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 75rpx;

					& view:nth-child(1) {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 320rpx;
						height: 64rpx;
						background: $color-3480FF;
						border-radius: 32rpx;

						& image {
							width: 24rpx;
							height: 23rpx;
						}

						& text {
							padding-left: 10rpx;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: $color-ff;
						}

					}

					& view:nth-child(2) {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-99;
						text-align: center;
					}
				}
			}

			& .qianse {
				padding-bottom: 14rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}

			& .shense {
				padding-bottom: 14rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3682FF;
			}
		}

		& .voucher-search-zbj {

			& .copy-btn {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-top: 70rpx;

				& view:nth-child(1) {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 320rpx;
					height: 64rpx;
					background: $color-3480FF;
					border-radius: 32rpx;

					& image {
						width: 24rpx;
						height: 23rpx;
					}

					& text {
						padding-left: 10rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-ff;
					}

				}

				& view:nth-child(2) {
					padding-top: 20rpx;
					padding-bottom: 50rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-99;
					text-align: center;
				}
			}

		}

		& .voucher-second {
			& .shop-name {
				padding-left: 22rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $color-88;
				line-height: 20px;
			}

			& .tips {
				margin-top: 22rpx;
				line-height: 64rpx;
				background: linear-gradient(-8deg, #FD7028, #FC4231);
				border-radius: 10rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-ff;
				text-align: center;
			}

			& .goods-item {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding: 20rpx 0;
				border-bottom: 1rpx solid $color-F0;

				& image {
					width: 190rpx;
					height: 190rpx;
					border-radius: 10rpx;
					flex-shrink: 0;
				}

				& .right {
					padding-left: 30rpx;

					& view:nth-child(1) {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $color-33;
					}

					& view:nth-child(2),
					view:nth-child(3) {
						padding-top: 14rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-33;
					}
				}

			}

			& .bus-note {
				padding: 27rpx 39rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-99;
				background: rgba(188, 188, 188, 0.15);
				border-radius: 10px;
			}

			& .goods-item2 {

				& .images {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;

					& image {
						width: 190rpx;
						height: 190rpx;
						border-radius: 10rpx;
						flex-shrink: 0;
					}

					& text {
						margin-top: 20rpx;
						padding-left: 30rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}

				}

				& .view-yang {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 30rpx;

					& text:nth-child(1) {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FC542D;
					}

					& text:nth-child(2) {
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #047EF0;
					}
				}

				& .uplaod-block {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 19rpx;

					& .left {
						width: 75%;

						& .btn {
							display: flex;

							&>view {
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 20rpx;
								width: 144rpx;
								height: 44rpx;
								background: #2366FE;
								border-radius: 22rpx;

								& image {
									width: 20rpx;
									height: 20rpx;
								}

								& text {
									padding-left: 6rpx;
									font-size: 20rpx;
									font-family: PingFang SC;
									font-weight: 400;
									color: #F5F8FF;
								}
							}
						}

						& .miaoshu {
							margin-top: 10rpx;
							padding: 15rpx 20rpx;
							background: #F4F4F4;
							border-radius: 10rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #666666;
						}

					}

					& .right {
						width: 120rpx;
						height: 158rpx;

						& .no-up {
							width: 120rpx;
							height: 158rpx;

							& image {
								width: 100%;
								height: 100%;
							}
						}

						& .up-ok {
							position: relative;
							width: 120rpx;
							height: 158rpx;

							&>image {
								position: absolute;
								left: 0;
								top: 0;
								width: 100%;
								height: 100%;
							}

							& .again-up {
								position: absolute;
								left: 0;
								top: 0;
								width: 120rpx;
								height: 158rpx;
								background: rgba(0, 0, 0, 0.6);
								border-radius: 10rpx;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;

								& image {
									width: 38rpx;
									height: 38rpx;
								}

								& text {
									padding-top: 10rpx;
									font-size: 20rpx;
									font-family: PingFang SC;
									font-weight: 400;
									color: #FFFFFF;
								}
							}


						}

					}
				}

				& .screen-img {
					display: flex;
					justify-content: space-between;
					margin-top: 20rpx;
					padding-bottom: 30rpx;
					border-bottom: 1rpx solid #F0F0F0;

					& image {
						width: 118rpx;
						height: 118rpx;
					}
				}
			}
		}

		& .footer-btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
			left: 0;
			width: calc(100% - 76rpx);
			padding: 17rpx 38rpx;
			background: $color-ff;
			box-shadow: 0px 1rpx 0px 0px rgba(219, 214, 214, 0.34);

			& .del {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 0.6);
			}

			// 提交核券
			& .tjhq {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 70%;
				height: 74rpx;
				border-radius: 37rpx;
				background: $color-fc503b;

				& .max {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-ff;
				}

				& .time__item {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-ff;
				}

			}
		}

		& .footer-btn-two {
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			bottom: 0;
			left: 0;
			width: calc(100% - 76rpx);
			padding: 17rpx 38rpx;
			background: $color-ff;
			box-shadow: 0px 1rpx 0px 0px rgba(219, 214, 214, 0.34);

			& .ytj {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 74rpx;
				background: rgba(42, 112, 255, 0.15);
				border-radius: 37rpx;

				& .max {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #2970FF;
				}

				& .min {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #2970FF;
				}
			}

			& .lxkf {
				width: 100%;
				line-height: 74rpx;
				background: #9f9f9f;
				border-radius: 37rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-ff;
				text-align: center;
			}

			& .rgss {
				width: 100%;
				height: 74rpx;
				background: #FC503B;
				border-radius: 37rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				& .max {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}

				& .min {
					& .time__item {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
