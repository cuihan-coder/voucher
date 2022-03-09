import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import login from './login.js'
import account from './account.js'
import userInfo from './userInfo.js'

const store = new Vuex.Store({
	state: {
		VERSION_NO:100,
		VERSION:'1.0.0',
		is_close_update:false,
	},
	mutations: {
		//用户选择了 暂时不更新
		SET_IS_CLOSE_UPDATE(state,val){
			state.is_close_update = val
		},
	},
	actions: {
		
	},
	modules: {
		login,
		account,
		userInfo
	}
})
export default store
