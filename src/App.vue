<template>
	<div id="app">
		<loading v-if="isLoading" />
		<router-view v-else />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from './components/loading.vue';

export default {
	components: {
		Loading,
	},
	computed: {
		...mapGetters(['isLoading']),
	},
	async created() {
		await this.$store.dispatch('loadAllAssets');
	},
};
</script>
