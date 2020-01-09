import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决 点击同一路由，控制台报错问题，适用所有UI框架
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
	// { path: '/', redirect: '/login' },
	{ path: '/login', name: 'login', component: () => import('@/views/login') },
	{ path: '/', name: 'layout', component: () => import('@/components/Layout') },
	{ path: '/member', name: 'member', component: () => import('@/views/member') },
	{ path: '/supplier', name: 'supplier', component: () => import('@/views/supplier') },
	{ path: '/goods', name: 'goods', component: () => import('@/views/goods') },
	{ path: '/staff', name: 'staff', component: () => import('@/views/staff') },
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
