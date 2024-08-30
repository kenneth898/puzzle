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

	if (to.name === 'Level') {
		next({ name: 'Home' }); // Redirect any attempt to access Level to Home
	} else {
		if (token) {
			// User is logged in
			if (to.name === 'Login') {
				next({ name: 'Home' }); // Redirect to Home if logged in and trying to access Login
			} else {
				next(); // Allow navigation
			}
		} else {
			if (to.name !== 'Login') {
				next({ name: 'Login' }); // Redirect to Login if not logged in and trying to access other pages
			} else {
				next(); // Allow access to Login page
			}
		}
	}
});

export default router;
