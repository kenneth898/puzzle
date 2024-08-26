<template>
	<div class="bg" v-if="isLoading">
		<div class="ad">
			<img width="80%" src="/public/image/image 78.webp">
			<p>Merdeka Mini Game</p>
		</div>

		<div class="loading">
			<p>Loading game... {{ loadingProgress }}%</p>
			<div class="progress">
				<div class="progress-bar" :style="{ width: loadingProgress + '%' }" :aria-valuenow="loadingProgress"
					aria-valuemin="0" aria-valuemax="100"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['isLoading', 'loadingProgress']),
	},
};
</script>


<style scoped>
.bg {
	background: var(--Main-Linear, linear-gradient(180deg, #FFD384 0%, #C868D5 49%, #7B00FF 100%));
	max-width: 540px;
	width: 100%;
	height: 100vh;
	position: relative;
	margin: 0 auto;
}

.ad {
	position: absolute;
	transform: translate(0, 50%);
	text-align-last: center;
}

.ad img {
	border-radius: 15px;
}

.ad p {
	color: #FFF;
	text-align: center;
	font-family: Montserrat;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-top: 20px;
}

.progress {
	background-color: #3a3a3a;
	border-radius: 20px;
	overflow: hidden;
	height: 35px;
	align-self: center;
	margin-left: 5px;
}

.progress-bar {
	background: linear-gradient(180deg, #FEF0A3 0%, #F08B5A 100%);
	box-shadow: 0px 4px 10px 0px #000;
	height: 70%;
	border-radius: 20px;
	align-self: center;
	margin-inline: 10px;
}

.loading {
	position: absolute;
	width: 80%;
	bottom: 65px;
	transform: translate(13%, 30%);
	text-align: center;
}

.loading p {
	color: #FFF;
	text-align: center;
	font-family: Montserrat;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}
</style>
