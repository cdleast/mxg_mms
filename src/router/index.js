import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决 点击同一路由，控制台报错问题，适用所有UI框架
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
	{ path: '/login', name: 'login', component: () => import('@/views/login') },
	{
		path: '/', name: 'layout', redirect: '/home', component: () => import('@/components/Layout'), children: [
			{ path: '/home', meta: { title: '首页' }, name: 'home', component: () => import('@/views/home') }
		]
	},
	{
		path: '/member', component: () => import('@/components/Layout'), children: [
			{ path: '/', meta: { title: '会员管理' }, name: 'member', component: () => import('@/views/member') }
		]
	},
	{
		path: '/supplier', component: () => import('@/components/Layout'), children: [
			{ path: '/', meta: { title: '供应商管理' }, name: 'supplier', component: () => import('@/views/supplier') }
		]
	},
	{
		path: '/goods', component: () => import('@/components/Layout'), children: [
			{ path: '/', meta: { title: '商品管理' }, name: 'goods', component: () => import('@/views/goods') }
		]
	},
	{
		path: '/staff', component: () => import('@/components/Layout'), children: [
			{ path: '/', meta: { title: '员工管理' }, name: 'staff', component: () => import('@/views/staff') }
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
