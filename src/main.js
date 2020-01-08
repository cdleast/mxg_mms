import Vue from 'vue'
import ElementUI from 'element-ui' // ElementUI 组件库
import 'element-ui/lib/theme-chalk/index.css' // ElementUI 样式
import axios from 'axios' // axios
import App from './App.vue'
import router from './router'
import store from './store'


// 全局使用
Vue.use(ElementUI)
Vue.prototype.$axios = axios


// 开发(false)/生产(true)环境动态切换
Vue.config.productionTip = process.env.NODE_ENV === 'production'
// console.log(process.env.NODE_ENV) // 开发换号 development，生产环境 production


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
