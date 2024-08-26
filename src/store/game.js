// store/index.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
	state: {
		time: 0,
		image: ,

	},
	mutations: {
		Time(state, volume) {
			state.volume1 = volume;
		},
		SET_VOLUME2(state, volume) {
			state.volume2 = volume;
		},
	},
	actions: {
		setVolume1({ commit }, volume) {
			commit('SET_VOLUME1', volume);
		},
		setVolume2({ commit }, volume) {
			commit('SET_VOLUME2', volume);
		},
	},
	getters: {
		volume1: (state) => state.volume1,
		volume2: (state) => state.volume2,
	},
	plugins: [
		createPersistedState({
			key: 'vuex',
			paths: ['volume1', 'volume2'],
		}),
	],
});
