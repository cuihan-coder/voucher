<template>
	<view>
		<u-navbar title="添加抢券号" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
		</u-navbar>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<view class="contain">
			<view class="layout-picker" @click="accountPicker = !accountPicker">
				<text class="left">账号类型</text>
				<view class="right-picker">
					<text>{{accountTypeList[0][accountTypeIndex]['label']}}</text>
					<image src="http://img.hls178.cn/static/image/jt.png"></image>
				</view>
			</view>
			<view class="layout-picker">
				<text class="left">抢券账号</text>
				<view class="right-input">
					<input :disabled="this.btnType ==2 ? true : false" v-model="formData.name" placeholder-class="input-placeholder" placeholder="请输入账号" />
				</view>
			</view>
			<view v-if="userIsRookie == false" class="layout-picker" @click="ageListSelelct = !ageListSelelct">
				<text class="left">年龄</text>
				<view class="right-picker">
					<text>{{ageList[0][ageListIndex]}}</text>
					<image src="http://img.hls178.cn/static/image/jt.png"></image>
				</view>
			</view>
			<view v-if="userIsRookie == false" class="layout-picker">
				<text class="left">性别</text>
				<view class="right-check">
					<u-subsection :list="sexlist" :current="sexCurrent" @change="setSexCurrent"></u-subsection>
				</view>
			</view>

			<view v-if="userIsRookie == false" class="receive-address">
				<view class="title">
					<text>收货信息</text>
					<text>（请确保收获地址正确，否则收不到商品）</text>
				</view>
				<view class="name-phone">
					<view class="input-item">
						<text>姓名</text>
						<input v-model="formData.consignee" />
					</view>
					<view class="input-item">
						<text>电话</text>
						<input type="number" maxlength="11"  v-model="formData.contact" />
					</view>
				</view>
				<view class="area-city">
					<pca-picker-cc class="pickers" v-on:getAddressResultObj="getAddressResultObj" :addressList.sync="opendbCityChina">
						<view class="uni-input">{{ addressList.join('/') ? addressList.join('/') : '城市/区域' }}</view>
					</pca-picker-cc>
					<image src="http://img.hls178.cn/static/image/jt.png"></image>
				</view>
				<view class="layout-input">
					<input v-model="formData.address" placeholder-class="input-placeholder" placeholder="详情地址" />
				</view>
			</view>

			<!-- <view class="upload-img">
				<view class="title">
					<text>账号截图</text>
					<text>查看示例图</text>
				</view>
				<view class="upload-com">
					<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="1" uploadIcon="plus"
						multiple :maxCount="10"></u-upload>
				</view>
			</view>
 -->
			<u-button  v-if="btnType == 1" @click="subInfo" class="self-btn" shape="circle" text="确定提交" color="linear-gradient(-30deg, #FD7028, #FC4231)">
			</u-button>
			<u-button v-if="btnType == 2" @click="subUpdate" class="self-btn" shape="circle" text="确定提交" color="linear-gradient(-30deg, #FD7028, #FC4231)">
			</u-button>

			<!-- 账号类型 -->
			<u-picker :defaultIndex="[accountTypeIndex]"  @cancel="accountPicker = false" @confirm="changeAcountType" :show="accountPicker"
				:columns="accountTypeList" keyName="label"></u-picker>
			<!-- 账号类型 -->
			<!-- 年龄 -->
			<u-picker :defaultIndex="[ageListIndex]" @cancel="ageListSelelct = false" @confirm="changeAge" :show="ageListSelelct"
				:columns="ageList"  keyName="label"></u-picker>
			<!-- 年龄 -->
		</view>

	</view>

</template>

<script>
	import tabbar from '@/components/footer/index.vue'
	import opendbCityChina from '@/common/json/pca-code.json'

	export default {
		components: {
			tabbar
		},
		data() {
			return {
				//账号筛选picker
				accountPicker: false,
				//账号类型数据
				accountTypeList: [
					[{
						label: '抖音',
						id: 1
					}]
				],
				accountTypeIndex: 0,
				//年龄
				ageList: [
					[]
				],
				ageListIndex: 0,
				ageListSelelct:false,
				sexlist: ['男', '女'],
				sexCurrent: 0,
				addressList: [],
				fileList: [],
				formData: {
					name: '',
					category: '',
					gender: '',
					age: '',
					consignee: '',
					contact: '',
					province: '',
					city: '',
					district: '',
					address: ''
				},
				//1 添加账号 2 编辑账号
				btnType:1,
				//是否是新手用户
				userIsRookie:false
			};
		},
		async onLoad(option) {
			
			if(option.userIsRookie == 'true'){
				this.userIsRookie = true
			}else{
				this.userIsRookie = false
			}
			let len = 72
			for(let i = 18; i<= 80; i++){
				this.ageList[0].push(i)
			}
			let accountInfo = this.$store.state.account.accountInfo
			if(accountInfo){
				this.btnType = 2
				this.$store.commit('account/SET_ACCOUNT_INFO','')
				if(accountInfo.province || accountInfo.city || accountInfo.district){
					this.addressList = [accountInfo.province,accountInfo.city,accountInfo.district]
				}
				
				this.sexCurrent = accountInfo.gender == 1 ? 0 : 1
				this.ageList[0].forEach((val,index) => {
					if(val == accountInfo.age){
						console.log(index)
						this.ageListIndex = index
					}
				})
				this.accountTypeList[0].forEach((val,index) => {
					if(val.id == accountInfo.category){
						this.accountTypeIndex = index
					}
				})
				this.formData.name = accountInfo.name
				this.formData.consignee = accountInfo.consignee
				this.formData.address = accountInfo.address
				this.formData.contact = accountInfo.contact
				this.formData.id  = accountInfo.id
			}
			console.log(accountInfo)
		},

		methods: {
			getAddressResultObj(e) {
				this.addressList = [e.province.name, e.city.name, e.county.name]
				//获取详细的 省/市/区 对象信息,更新时被动调,主动调用请自行设置ref值,方法一致
				console.log(e.province.name + '/' + e.county.name + '/' + e.city.name)
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].thumb)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			setSexCurrent(index){
				this.sexCurrent = index
			},
			changeAcountType(current){
				if(this.btnType == 2){
					uni.showToast({
						title:'不能修改账号类型',
						icon:'none'
					})
					return 
				}
				this.sexCurrent = current.indexs[0]
				this.accountPicker = false
			},
			changeAge(current){
				this.ageListIndex = current.indexs[0]
				this.ageListSelelct = false
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: this.$api.upload_post, // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			subInfo(){
				
				if(this.checkParam() == false){
					return
				}
				
				this.formData.age = this.ageList[0][this.ageListIndex]
				this.formData.category = this.accountTypeList[0][this.accountTypeIndex].id
				this.formData.gender = this.sexCurrent + 1
				
				let query = this.$helper.objToQuery(this.formData)
				uni.showLoading({
					title:'提交中'
				})
				this.$helper.httpPost(this.$api.bindAccount_post + query)
				.then(data => {
					
					if(data.code == 0){
						uni.showToast({title:'添加成功',icon:'none'})
						let timerId = setInterval(() => {
							clearInterval(timerId)
							uni.hideLoading()
							if(this.userIsRookie == true){
								uni.reLaunch({
									url:'./getvoucher'
								})
							}else{
								uni.redirectTo({
									url:'../user/getvoucheraccount'
								})
							}
							
						},2000)
					}else{
						uni.hideLoading()
						uni.showToast({
							title:'添加失败',
							icon:'none'
						})
					}
				})
				
			},
			subUpdate(){
				if(this.checkParam() == false){
					return
				}
				
				this.formData.age = this.ageList[0][this.ageListIndex]
				this.formData.category = this.accountTypeList[0][this.accountTypeIndex].id
				this.formData.gender = this.sexCurrent + 1
				
				let query = this.$helper.objToQuery(this.formData)
				this.$helper.httpPost(this.$api.accounts_update_post + query)
				.then(data => {
					uni.showToast({title:data.message,icon:'none'})
					if(data.code == 0){
						let timerId = setInterval(() => {
							clearInterval(timerId)	
							uni.reLaunch({
								url:'../user/getvoucheraccount'
							})
						},2000)
					}
				})
			},
			checkParam(){
				if(this.formData.name == ''){
					uni.showToast({title:'请输入抢券账号',icon:'none'})
					return false
				}
				//不是新手校验
				if(this.userIsRookie == false){
					if(this.formData.consignee == ''){
						uni.showToast({title:'请输入姓名',icon:'none'})
						return false
					}
					if(this.formData.contact == '' || this.formData.contact.length != 11){
						uni.showToast({title:'请输入有效电话',icon:'none'})
						return false
					}
					if(this.addressList.length == 0){
						uni.showToast({title:'请输入省市区',icon:'none'})
						return false
					}else{
						this.formData.province = this.addressList[0]
						this.formData.city = this.addressList[1]
						this.formData.district = this.addressList[2]
					}
					if(this.formData.address == ''){
						uni.showToast({title:'请输入详细地址',icon:'none'})
						return false
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $color-F4;
	}

	.contain {
		padding: 90rpx 30rpx 0;

		.layout-picker {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;
			padding: 47rpx 41rpx;
			background: $color-ff;
			border-radius: 30rpx;

			& .left {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $color-00;
			}

			& .right-picker {
				display: flex;
				align-items: center;

				& text {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-33;
				}
				& image{
					width: 20rpx;
					height: 20rpx;
				}
			}

			& .right-input {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-99;
				text-align: right;
			}

			& .right-check {
				width: 40%;
			}
		}

		& .receive-address {
			margin-top: 20rpx;
			padding: 47rpx 41rpx;
			background: $color-ff;
			border-radius: 30rpx;

			& .title {
				& text:nth-child(1){
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-00;
				}
				
				& text:nth-child(2){
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FF3C3C;
				}
			}

			& .name-phone {
				display: flex;
				align-items: center;
				padding: 40rpx 0 30rpx;
				border-bottom: 2rpx solid #E7E7E7;

				& .input-item {
					display: flex;
					align-items: center;

					& text {
						flex-shrink: 0;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-99;
					}

					& input {
						padding-left: 20rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: $color-99;
					}

				}
			}

			& .area-city {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				border-bottom: 2rpx solid #E7E7E7;

				& .uni-input {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: $color-99;
				}
				& image{
					width: 20rpx;
					height: 20rpx;
				}
			}

		}

		& .layout-input {
			padding: 30rpx 0 0;

			& input {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: $color-99;
			}

		}

		& .input-placeholder {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: $color-99;
		}

		& .upload-img {
			margin-top: 20rpx;
			padding: 47rpx 41rpx;
			background: $color-ff;
			border-radius: 30rpx;

			& .title {
				display: flex;
				justify-content: space-between;
				align-items: center;

				text:nth-child(1) {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-00;
				}

				text:nth-child(2) {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: $color-047EF0;
				}
			}

			& .upload-com {
				margin-top: 33rpx;
			}
		}

		& .self-btn {
			width: 80%;
			height: 94rpx;
			margin: 60rpx auto;
		}
	}
	.pickers{
		width: 90%;
	}
</style>
