import { createRouter, createWebHistory } from 'vue-router';
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
	if (localStorage.getItem('reload')) {
		localStorage.removeItem('reload');
		next('/home');
	} else {
		next();
	}
});


export default router;
