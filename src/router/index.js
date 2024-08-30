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
	const token = Cookies.get('token'); // Get token from Cookies

	if (token) {
		// User is logged in
		if (to.name === 'Login') {
			// If the user is already logged in and tries to access the Login page, redirect to Home
			next({ name: 'Home' });
		} else {
			// Allow access to other protected pages
			next();
		}
	} else {
		// User is not logged in
		if (to.name !== 'Login') {
			// If not logged in and trying to access any page other than Login, redirect to Login
			next({ name: 'Login' });
		} else {
			// Allow access to the Login page
			next();
		}
	}
});

export default router;
