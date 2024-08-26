import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
	state: {
		volume1: 1.0,
		volume2: 1.0,
		isLoading: true, // Add the isLoading state
		loadingProgress: 0, // Add the loadingProgress state
	},
	mutations: {
		SET_VOLUME1(state, volume) {
			state.volume1 = volume;
		},
		SET_VOLUME2(state, volume) {
			state.volume2 = volume;
		},
		SET_LOADING(state, isLoading) {
			state.isLoading = isLoading;
		},
		SET_LOADING_PROGRESS(state, progress) {
			state.loadingProgress = progress;
		},
	},
	actions: {
		setVolume1({ commit }, volume) {
			commit('SET_VOLUME1', volume);
		},
		setVolume2({ commit }, volume) {
			commit('SET_VOLUME2', volume);
		},
		async loadAllAssets({ commit }) {
			commit('SET_LOADING', true);
			commit('SET_LOADING_PROGRESS', 0);

			const assets = [
				// List all assets needed for the application
				'/image/bg_home.webp',
				'/image/close-btn.webp',
				'/image/congrats.webp',
				'/image/continue.webp',
				'/image/Group 1000005998.webp',
				'/image/home.webp',
				'/image/image 78.webp',
				'/image/menubar.svg',
				'/image/merdeka.webp',
				'/image/minigame.webp',
				'/image/pause-bg.webp',
				'/image/pause.svg',
				'/image/puzzle.webp',
				'/image/quit_bg.webp',
				'/image/Rectangle 508.webp',
				'/image/speaker.svg',
				'/image/start_bg.webp',
				'/image/time-up.webp',
				'/image/timeup.webp',
				'/image/vector.svg',
				'/image/volume-mute-fill.svg',
				'/image/volume-up-fill.svg',
				'/puzzle-img/abc.webp',
				'/puzzle-img/ikanbakar.webp',
				'/puzzle-img/ketupat.webp',
				'/puzzle-img/kuih.webp',
				'/puzzle-img/laksa.webp',
				'/puzzle-img/mansaf al quzi.webp',
				'/puzzle-img/mee.webp',
				'/puzzle-img/nasi-lemak-malay-fragrant-rice-dish-cooked-coconut-milk-pandan-leaf-served-with-various-sid 2.webp',
				'/puzzle-img/nasi-lemak-malay-fragrant-rice-dish-cooked-coconut-milk-pandan-leaf-served-with-various-sid 3.webp',
				'/puzzle-img/nasi-lemak.webp',
				'/puzzle-img/nasi.webp',
				'/puzzle-img/nasigoreng.webp',
				'/puzzle-img/roti canai.webp',
				'/puzzle-img/stay.webp',
				'/Sound Effects KK8 Merdeka/Correct.mp3',
				'/Sound Effects KK8 Merdeka/Game Ticking.wav',
				'/Sound Effects KK8 Merdeka/Main App Loading BGM.mp3',
				'/Sound Effects KK8 Merdeka/Menu Alert.mp3',
				'/Sound Effects KK8 Merdeka/Merdeka Puzzle BDM.mp3',
				'/Sound Effects KK8 Merdeka/New Level.wav',
				'/Sound Effects KK8 Merdeka/Puzzle Picked.wav',
				'/Sound Effects KK8 Merdeka/Timeout.wav',
				'/Sound Effects KK8 Merdeka/Wrong.wav',
			];

			let progress = 0;
			const increment = 100 / assets.length;

			const interval = setInterval(() => {
				if (progress < 100) {
					progress += increment;
					commit('SET_LOADING_PROGRESS', Math.min(progress, 100));
				}
			}, 100); // Adjust the timing as needed

			for (let i = 0; i < assets.length; i++) {
				await loadAsset(assets[i]);
			}

			clearInterval(interval);
			commit('SET_LOADING_PROGRESS', 100);
			setTimeout(() => {
				commit('SET_LOADING', false);
			}, 1000); // Small delay to ensure 100% is shown before hiding
		},
	},
	getters: {
		volume1: (state) => state.volume1,
		volume2: (state) => state.volume2,
		isLoading: (state) => state.isLoading,
		loadingProgress: (state) => state.loadingProgress,
	},
	plugins: [
		createPersistedState({
			key: 'vuex',
			paths: ['volume1', 'volume2'],
		}),
	],
});

function loadAsset(url) {
	return new Promise((resolve) => {
		const img = new Image();
		img.src = url;
		img.onload = resolve;
		img.onerror = resolve; // Handle errors gracefully
	});
}
