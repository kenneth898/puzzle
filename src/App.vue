<template>
	<div id="app">
		<loading v-if="isLoading" />
		<router-view v-else />
		<audio ref="bgm" :src="bgmSrc" loop></audio>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from './components/loading.vue';

export default {
	components: {
		Loading,
	},
	data() {
		return {
			bgmSrc: '/Sound Effects KK8 Merdeka/Merdeka Puzzle BDM.mp3', // Path to your BGM file
		};
	},
	computed: {
		...mapGetters(['volume1']),
	},
	mounted() {
		this.$router.beforeEach((to, from, next) => {
			if (to.name === 'Login' || to.name === 'Home') {
				this.playBGM();
			} else {
				this.stopBGM();
			}
			next();
		});
		this.updateVolume1();
	},
	methods: {
		playBGM() {
			const bgm = this.$refs.bgm;
			if (bgm && bgm.paused) {
				bgm.play().catch((error) => {
					console.error("Autoplay was prevented:", error);
				});
			}
		},
		stopBGM() {
			const bgm = this.$refs.bgm;
			if (bgm) {
				bgm.pause();
				bgm.currentTime = 0;
			}
		},
		updateVolume1() {
			const bgm = this.$refs.bgm;
			if (bgm) {
				bgm.volume = this.volume1;
			}
		},
	},
	watch: {
		volume1(newValue) {
			this.updateVolume1();
		},
	},
};
</script>

<style>
/* Global styles */
</style>
