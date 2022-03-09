
let host = {
	pro: 'http://api.hls178.cn:8080',
	local: 'http://101.34.123.95:8080'
}
let development = 'pro'

module.exports = {
	//获取app最新配置信息
	config_get: `${host[development]}/app/config`,
	//app 隐私协议
	privacy_get: `${host[development]}/app/privacy`, 
	//发送验证码
	captcha_send_get: `${host[development]}/captcha/send`, 
	//用户登陆
	login_post: `${host[development]}/user/login`, 
	//绑定邀请人
	bindParent_post: `${host[development]}/user/bindParent`, 
	//绑定第三方账号
	bindAccount_post: `${host[development]}/user/bindAccount`, 
	//第三方账号列表
	accounts_list_post: `${host[development]}/user/accounts`, 
	//第三方账号上下线
	accounts_active_post: `${host[development]}/user/account/active`, 
	//第三方账号更新
	accounts_update_post: `${host[development]}/user/account/update`, 
	//首页接口
	app_index_get: `${host[development]}/app/index`, 
	//用户信息
	user_info_get: `${host[development]}/user/info`,
	//我的团队
	user_infoAndSubs_get: `${host[development]}/user/infoAndSubs`,
	//上传文件
	upload_post: `${host[development]}/app/upload`,
	//用户编辑
	edit_post: `${host[development]}/user/edit`,
	//用户提现
	withdraw_post: `${host[development]}/user/cash`,
	//提现日志 todo
	cashLog_get: `${host[development]}/user/cashLog`,
	//收益记录历史 时间
	incomeMonths_get: `${host[development]}/user/incomeMonths`,
	//收益记录历史明细 
	incomeHistory_get: `${host[development]}/user/incomeHistory`,
	//用户收益
	income_get: `${host[development]}/user/income`,
	//抢单首页
	task_index_get: `${host[development]}/task/index`,
	//抢券接口
	task_get_get: `${host[development]}/task/get`,
	//文章列表
	articles_list_get: `${host[development]}/articles/category`,
	//文章详情
	articles_get: `${host[development]}/articles`,
	//反馈
	articles_post: `${host[development]}/feedback`,
	//订单列表
	order_list_get: `${host[development]}/order/list`,
	//订单详情
	order_detail_get: `${host[development]}/order/detail`,
	//消息列表
	messages_get: `${host[development]}/messages`,
	//消息已读反馈
	messages_read_post: `${host[development]}/messages/read`,
	//用户推广图片
	promoteImage_get: `${host[development]}/user/promoteImage`,
	//拒绝订单
	order_reject_post: `${host[development]}/order/reject`,
	//确认完成订单
	order_finish_post: `${host[development]}/order/finish`,
	//订单申诉
	order_appeal_post: `${host[development]}/order/appeal`,
	//海报邀请图
	promoteInfo_get: `${host[development]}/user/posts`,
	//我的徒弟
	user_children_get: `${host[development]}/user/children`,
	//我的徒孙
	user_grandChildren_get: `${host[development]}/user/grandChildren`,
	//我的团队
	user_team_get: `${host[development]}/user/team`,
	//检测ip是否安全
	ip_check_get: `${host[development]}/ip/check`,
	
}
