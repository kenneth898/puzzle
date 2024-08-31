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
			bgmSrc: '/Sound Effects KK8 Merdeka/Merdeka Puzzle BDM.mp3',
		};
	},
	computed: {
		...mapGetters(['isLoading', 'loadingProgress', 'volume1']),
	},
	mounted() {
		this.updateVolume1();
		this.$store.dispatch('loadAllAssets');
	},
	methods: {
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
