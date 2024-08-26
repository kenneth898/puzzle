<template>
	<div class="container-fluid">
		<div class="row">
			<div class="icon">
				<button @click="showExit">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
						class="bi bi-box-arrow-right" viewBox="0 0 16 16">
						<path fill-rule="evenodd"
							d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
						<path fill-rule="evenodd"
							d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
					</svg>
				</button>
				<div class="level">
					<h1>Level 1</h1>
				</div>
				<button @click="showPause">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
						class="bi bi-pause-fill" viewBox="0 0 16 16">
						<path
							d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
					</svg>
				</button>
			</div>
			<div class="countdownTime">
				<p>{{ formattedTime }} Remaining</p>
			</div>

			<div class="countdown">

				<div v-if="showPopup" class="overlay">
					<div class="popup">
						<h1>Time Up</h1>
						<button @click="closePopup">OK</button>
					</div>
				</div>
			</div>

			<div v-if="btnExit" class="overlay">
				<div class="ad-popup">
					<h1>Exit</h1>
					<h5>Do you really want to exit?</h5>
					<div class="popup_btn">
						<a href="#" @click="confirmExit">NO</a>
						<router-link class="nav-link" to="/">YES</router-link>
					</div>
				</div>
			</div>

			<div v-if="btnPause" class="overlay">
				<div class="ad-popup">
					<h1>Pause</h1>
					<div class="popup_btn">
						<a href="#" @click="continueCountdown">CONTINUE</a>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	name: 'Timer',
	data() {
		return {
			btnExit: false,
			btnPause: false,
			time: 30, // Initial countdown time (seconds)
			remainingTime: 30, // Remaining time (seconds)
			timer: null, // Timer reference
			showPopup: false // Control popup display
		};
	},
	computed: {
		// Format time as MM:SS
		formattedTime() {
			const minutes = Math.floor(this.remainingTime / 60);
			const seconds = this.remainingTime % 60;
			return `${this.pad(minutes)}:${this.pad(seconds)}`;
		}
	},
	methods: {
		showExit() {
			this.stopCountdown(); // Stop countdown on exit
			this.btnExit = true;
		},
		confirmExit() {
			this.btnExit = false;
			this.startCountdown(); // Resume countdown
		},
		showPause() {
			this.btnPause = true;
			this.pauseCountdown(); // Pause the countdown
		},
		pauseCountdown() {
			clearInterval(this.timer); // Stop the timer
			this.timer = null;
		},
		continueCountdown() {
			this.btnPause = false;
			this.startCountdown(); // Continue the countdown
		},
		pad(number) {
			return number.toString().padStart(2, '0');
		},
		startCountdown() {
			if (this.timer) clearInterval(this.timer); // Clear previous timer

			this.timer = setInterval(() => {
				if (this.remainingTime > 0) {
					this.remainingTime -= 1; // Decrease by 1 second
				} else {
					this.stopCountdown(); // Stop timer when time is up
					this.showPopup = true; // Show popup
				}
			}, 1000); // 1000 milliseconds (1 second)
		},
		stopCountdown() {
			clearInterval(this.timer); // Stop the timer
			this.timer = null;
		},
		closePopup() {
			this.showPopup = false; // Hide popup
		}
	},
	mounted() {
		// Start countdown immediately when the component is mounted
		this.startCountdown();
	}
};
</script>

<style scoped>
.icon {

	display: flex;
	place-content: space-between;
	padding: 10px;
	position: absolute;
}

.overlay {
	max-width: 540px;
	position: fixed;
	top: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	margin: 0 auto;

	overflow: visible;

}

.ad-popup {
	background-color: white;
	border: 1px solid #ccc;
	padding: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	text-align: center;
}

.ad-popup a {
	text-decoration: none;
	padding: 10px 20px;
	background-color: rgb(255, 4, 4);
	color: white;
	border-radius: 5px;
}

.popup_btn {
	display: flex;
	justify-content: center;
	gap: 0.5rem;
}

.countdown {
	position: absolute;
	left: 0;
	top: 0;
	transform: translate(-2%, 0%);
	text-align: center;

}

.countdownTime {
	text-align: center;
	right: 0;
	left: 0;
	top: 50px;
	position: absolute;
	/* z-index: 1; */
	transform: translate(0, 100%);
	text-align: center;
}

.countdownTime p {
	font-family: Montserrat;
	font-size: 16px;
	font-weight: 700;
	line-height: 19.5px;
	text-align: center;
	color: #FFFFFF;
}

.level {
	font-family: Montserrat;
	font-size: 20px;
	font-weight: 700;
	line-height: 24.38px;
	text-align: center;
	color: #FFFFFF;
}
</style>
