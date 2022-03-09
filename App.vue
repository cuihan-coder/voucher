<script>
export default {
	onLaunch: function(e) {
	},
	onShow: function(e) {
		//获取appconnfig
		this.$helper.httpGet(this.$api.config_get)
		.then((data) =>{
			this.$helper._setCache('appConfig',data.data)
			if(data.data.user.hasParent == false){
				uni.reLaunch({
					url:'pages/login/index'
				})
				return
			}
		})
		this.$helper._getCache('loginToken').then(token => {
			let notLoginRouter = ['pages/share/index','pages/share/appdown','pages/login/index']
			if(token == '' && notLoginRouter.indexOf(e.path) == -1){
				uni.reLaunch({
					url:'pages/login/index'
				})
				return
			}
		})
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
.status_bar{
	width: 100%;
	height: var(--status-bar-height);
}
</style>
