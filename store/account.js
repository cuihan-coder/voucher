const account = {
	namespaced: true,
	state:()=>({
		accountInfo: ''
	}),
	mutations:{
		//设置登陆注册手机号码
		SET_ACCOUNT_INFO(state,val){
			state.accountInfo = val
		}
	}
}
export default account
