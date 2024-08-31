import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Game from '../views/Game.vue';
import level from '@/views/level.vue';
const routes = [
	// {
	// 	path: '/',
	// 	name: 'Login',
	// 	component: Login
	// },
	{
		path: '/',
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
		component: level,
		beforeEnter: (to, from, next) => {
			// Check if the previous page was '/game'
			if (from.name !== 'Game') {
				// If not, redirect to '/home'
				next({ name: 'Home' });
			} else {
				// Otherwise, allow access to the '/level' page
				next();
			}
		}
	}
];


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});
// router.beforeEach((to, from, next) => {
// 	const token = Cookies.get('token'); // Get token from Cookies

// 	if (to.name === 'Level') {
// 		// Check if the user is coming from the Game page
// 		const fromGame = from.name === 'Game';
// 		const accessedFromGame = localStorage.getItem('accessedFromGame') === 'true';

// 		if (fromGame) {
// 			// If coming from Game page, allow access and set flag in localStorage
// 			localStorage.setItem('accessedFromGame', 'true');
// 			next();
// 		} else if (accessedFromGame) {
// 			// If they previously accessed the level from the game, allow access
// 			next();
// 		} else {
// 			// Otherwise, redirect to Home page
// 			next({ name: 'Home' });
// 		}
// 	} else if (token) {
// 		// User is logged in
// 		if (to.name === 'Login') {
// 			next({ name: 'Home' }); // Redirect to Home if logged in and trying to access Login
// 		} else {
// 			next(); // Allow navigation
// 		}
// 	} else {
// 		if (to.name !== 'Login') {
// 			next({ name: 'Login' }); // Redirect to Login if not logged in and trying to access other pages
// 		} else {
// 			next(); // Allow access to Login page
// 		}
// 	}
// });
export default router;
