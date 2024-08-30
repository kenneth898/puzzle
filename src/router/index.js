import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Game from '../views/Game.vue';
import level from '@/views/level.vue';
const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login
	},
	{
		path: '/home',
		name: 'Home',
		component: Home
	},
	{
		path: '/game',
		name: 'Game',
		component: Game
	},
	{
		path: '/level',
		name: 'level',
		component: level
	}

];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next) => {
	const token = Cookies.get('token'); // 从 Cookies 获取 token

	if (token) {
		// 已登录用户
		if (to.name === 'Login') {
			// 如果用户已登录并访问登录页，重定向到 Home
			next({ name: 'Home' });
		} else {
			// 允许访问其他受保护的页面
			next();
		}
	} else {
		// 未登录用户
		if (to.name !== 'Login') {
			// 如果未登录并试图访问除登录页之外的页面，重定向到 Login
			next({ name: 'Login' });
		} else {
			// 允许访问登录页面
			next();
		}
	}
});

export default router;
