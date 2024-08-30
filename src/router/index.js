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

			next({ name: 'Home' });
		} else if (to.name !== 'Home') {

			next({ name: 'Home' });
		} else {

			next();
		}
	} else {

		if (to.name !== 'Login') {

			next({ name: 'Login' });
		} else {
			next();
		}
	}
});

export default router;
