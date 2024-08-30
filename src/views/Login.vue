<template>
	<div class="fix-mobile-size">
		<div class="title">
			<div class="btn_col">
				<!-- Button to toggle popup -->
				<button @click="showSettingsPopup = true" style="border: none; background: none;">
					<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 33 33" fill="none">
						<path
							d="M13.3571 0L12.6083 4.125C11.8802 4.35384 11.1753 4.64912 10.5089 4.99668L7.04688 2.61498L2.60268 7.05918L4.99667 10.5089C4.64762 11.1772 4.35455 11.8779 4.125 12.6083L0 13.3571V19.6429L4.125 20.3917C4.35514 21.1239 4.65874 21.8214 5.00893 22.4911L2.60268 25.9409L7.04688 30.3851L10.4967 28.0034C11.1659 28.3532 11.8767 28.6451 12.6083 28.875L13.3571 33H19.6429L20.3917 28.875C21.122 28.6454 21.8228 28.3524 22.4911 28.0034L25.9408 30.3851L30.3851 25.9409L27.9911 22.4911C28.3386 21.8258 28.6335 21.1309 28.8627 20.404L33 19.6429V13.3571L28.8627 12.6083C28.6347 11.8828 28.3493 11.1855 28.0033 10.5212L30.3851 7.05918L25.9408 2.61498L22.4911 4.99668C21.8228 4.64766 21.1221 4.35459 20.3917 4.125L19.6429 0H13.3571ZM16.5 9.42857C20.4055 9.42857 23.5714 12.5945 23.5714 16.5C23.5714 20.4055 20.4055 23.5715 16.5 23.5715C12.5946 23.5715 9.42857 20.4055 9.42857 16.5C9.42857 12.5945 12.5946 9.42857 16.5 9.42857Z"
							fill="url(#paint0_linear_334_2192)" />
						<defs>
							<linearGradient id="paint0_linear_334_2192" x1="6.67857" y1="0.392857" x2="29.8571"
								y2="41.0536" gradientUnits="userSpaceOnUse">
								<stop stop-color="#FEF0A3" />
								<stop offset="1" stop-color="#F08B5A" />
							</linearGradient>
						</defs>
					</svg>
				</button>
			</div>



			<div class="login-col">
				<div class="title2">
					<h1 style="margin:0;">Puzzle</h1>
					<h1 style="margin:0;">Challenge</h1>
				</div>
				<div class="login">
					<img width="20%" src="/image/username.webp">
					<input type="text" class="form-control" id="username" placeholder="USERNAME">
				</div>
				<br>
				<div class="uid">
					<img width="20%" src="/image/uid.webp">
					<input type="text" class="form-control" id="uid" v-model="uid" placeholder="UID" />
				</div>
				<div class="register">
					<p style="padding-bottom: 150px;text-align">Don't have an account? <a
							href="https://kk8.my/register">Register</a></p>
				</div>
				<br>
				<div class="login-btn">
					<button @click="validateLogin" class="nav-link">Login</button>
				</div>
			</div>




			<!-- Popup for validation -->
			<div v-if="showPopup" class="popup-overlay">
				<div class="popup-content">
					<h3>Invalid</h3>
					<p>{{ popupMessage }}</p>
					<div class="close">
						<a @click="closePopup">Close</a>
					</div>
				</div>
			</div>

			<!-- Setting Popup -->
			<div v-if="showSettingsPopup" class="popup-overlay">
				<div class="popup-content2">
					<div class="close2">
						<a href="#" @click="closeSettingsPopup">
							<img width="100%" src="/image/close-btn.webp">
						</a>
					</div>
					<div class="setting">
						<h3>SETTING</h3>
						<div class="musicbar">
							<svg width="40" height="40" viewBox="0 0 28 30" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M27.8987 1.70642C27.8986 0.796874 27.1068 0.0899758 26.2031 0.192674L7.47878 2.32046C6.70887 2.40795 6.12726 3.05939 6.12726 3.83426V18.5821C6.12726 18.9956 5.75904 19.309 5.34558 19.309C2.39798 19.309 0 21.7069 0 24.6544C0 27.602 2.39798 30 5.34558 30C8.23849 30 10.6004 27.6895 10.6869 24.8172C10.6869 24.8163 10.6876 24.8156 10.6885 24.8156C10.6894 24.8156 10.6901 24.8149 10.6901 24.814V10.2249C10.6901 9.45006 11.2717 8.79862 12.0416 8.71113L21.6402 7.62031C22.5439 7.5176 23.3358 8.22453 23.3358 9.1341V16.6125C23.3358 17.0271 22.9664 17.3413 22.5518 17.3413C19.6042 17.3413 17.2063 19.7392 17.2063 22.6867C17.2063 25.6343 19.6042 28.0323 22.5518 28.0323C25.4412 28.0323 27.8399 25.7309 27.8994 22.8601L27.8987 1.70642Z"
									fill="url(#paint0_linear_87_2591)" />
								<defs>
									<linearGradient id="paint0_linear_87_2591" x1="2.74943" y1="-0.427843" x2="30.5592"
										y2="38.5058" gradientUnits="userSpaceOnUse">
										<stop stop-color="#FEF0A3" />
										<stop offset="1" stop-color="#F08B5A" />
									</linearGradient>
								</defs>
							</svg>

							<div class="volume">
								<input type="range" min="0" max="1" step="0.01" v-model="volume1" @input="updateVolume1"
									class="volume-slider-1" />
							</div>
						</div>
						<br>
						<div class="musicbar">
							<svg width="40" height="40" viewBox="0 0 34 26" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M17.2231 23.202C17.2231 23.7785 16.8872 24.3023 16.3615 24.5468C16.1583 24.6421 15.9405 24.6882 15.7241 24.6882C15.3815 24.6882 15.0421 24.5714 14.7679 24.3459L6.57516 17.6129H2.21172C1.38422 17.6136 0.713135 16.9477 0.713135 16.127V10.2055C0.713135 9.38448 1.38422 8.71892 2.21172 8.71892H6.57551L14.7682 1.9859C15.2159 1.61794 15.8366 1.53949 16.3619 1.78573C16.8872 2.03022 17.2234 2.55437 17.2234 3.13058L17.2231 23.202ZM22.9822 20.8795C22.9457 20.882 22.9106 20.8834 22.8744 20.8834C22.4786 20.8834 22.0969 20.7283 21.8149 20.4482L21.6145 20.2488C21.0889 19.7285 21.0272 18.9043 21.4698 18.3126C22.5921 16.8119 23.1844 15.033 23.1844 13.1668C23.1844 11.1596 22.5119 9.27684 21.2393 7.72198C20.7548 7.131 20.7994 6.27266 21.3425 5.73444L21.5425 5.53569C21.8419 5.23878 22.243 5.07697 22.6772 5.10265C23.1 5.12375 23.4948 5.3211 23.7629 5.64614C25.5282 7.78847 26.4607 10.3895 26.4607 13.1671C26.4607 15.7541 25.636 18.2166 24.0754 20.2871C23.8147 20.6322 23.416 20.8489 22.9822 20.8795ZM29.178 25.4727C28.907 25.7903 28.5151 25.981 28.0955 25.9986C28.0749 25.9993 28.054 26 28.0327 26C27.6358 26 27.2549 25.8445 26.9729 25.5648L26.776 25.3696C26.2259 24.8244 26.1887 23.9523 26.6888 23.362C29.1057 20.5112 30.4372 16.8907 30.4372 13.1668C30.4372 9.29337 29.0117 5.56453 26.4242 2.66729C25.8996 2.07912 25.9262 1.18877 26.4845 0.632959L26.681 0.437723C26.9725 0.147154 27.3513 -0.0129043 27.7858 0.00081501C28.1984 0.0124237 28.5885 0.193237 28.8627 0.499284C31.9904 3.99173 33.7131 8.49097 33.7131 13.1668C33.7138 17.6657 32.1032 22.0362 29.178 25.4727Z"
									fill="url(#paint0_linear_87_2593)" />
								<defs>
									<linearGradient id="paint0_linear_87_2593" x1="4.13138" y1="5.71342" x2="29.1038"
										y2="34.7337" gradientUnits="userSpaceOnUse">
										<stop stop-color="#FEF0A3" />
										<stop offset="1" stop-color="#F08B5A" />
									</linearGradient>
								</defs>
							</svg>

							<div class="volume">
								<input type="range" min="0" max="1" step="0.01" v-model="volume2" @input="updateVolume2"
									class="volume-slider-2" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<audio ref="clickSound" src="/Sound Effects KK8 Merdeka/Menu Alert.mp3"></audio>
			<!-- Background Music -->
			<!-- <audio ref="bgm" :src="bgmSrc" loop></audio> -->
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
	name: 'Login',
	data() {
		return {
			uid: '',
			showPopup: false,
			showSettingsPopup: false, // Correct state name for the settings popup
			popupMessage: '',
			volume1: this.$store.getters.volume1,
			volume2: this.$store.getters.volume2,
			bgmSrc: '/Sound Effects KK8 Merdeka/Merdeka Puzzle BDM.mp3', // Update this with your BGM file path
		};
	},
	computed: {
		...mapGetters(['volume1', 'volume2']),
	},
	mounted() {
		this.playBGM();
		this.updateVolume1();
		this.updateVolume2();
	},
	methods: {
		async validateLogin() {
			if (this.uid.trim() === '') {
				this.popupMessage = 'Please enter your UID';
				this.showPopup = true;
			} else {
				try {
					const response = await axios.post('https://kk8board.mobileapplab.online/api/game/puzzle/login', {
						uid: this.uid
					});

					if (response.status === 200) {
						const uidResponse = response.data.uid;
						const tokenResponse = response.data.token;

						Cookies.set('uid', uidResponse, { expires: 365 * 100 });
						Cookies.set('token', tokenResponse, { expires: 365 * 100 });

						this.$router.push('/home');
					} else {
						throw new Error('Non-200 response status');
					}
				} catch (error) {
					console.error('There was a problem with the axios operation:', error);

					// Translate and show the error message directly in the catch block
					this.popupMessage = (error.response && error.response.data && error.response.data.msg) ?
						(function (msg) {
							switch (msg) {
								case 'Invalid UID':
									return 'Invalid UID. Please try again.';
								case 'User not found':
									return 'Invalid UID. Please sign up for an account.';
								default:
									return 'System error, please try again later.';
							}
						})(error.response.data.msg) :
						'System error, please try again later.';

					this.showPopup = true;
				}
			}
		},


		closePopup() {
			this.showPopup = false;
		},
		closeSettingsPopup() {
			this.showSettingsPopup = false;
		},
		playBGM() {
			const bgm = this.$refs.bgm;
			if (bgm) {
				bgm.play().catch(error => {
					console.error("Autoplay was prevented:", error);
				});
			}
		},
		playClickSound() {
			const clickSound = this.$refs.clickSound;
			if (clickSound) {
				clickSound.currentTime = 0;
				clickSound.play();
			}
		},
		...mapActions(['setVolume1', 'setVolume2']),
		...mapMutations(['SET_VOLUME1', 'SET_VOLUME2']),
		updateVolume1() {
			this.setVolume1(this.volume1);
			this.$root.$refs.bgm.volume = this.volume1;
			document.documentElement.style.setProperty('--value1', this.volume1);
		},

		updateVolume2() {
			const clickSound = this.$refs.clickSound;
			if (clickSound) {
				this.setVolume2(this.volume2);
				clickSound.volume = this.volume2;
				document.documentElement.style.setProperty('--value2', this.volume2);
			}
		},
	},
	watch: {
		volume1(newValue) {
			this.updateVolume1();
		},
		volume2(newValue) {
			this.updateVolume2('volume-slider-2', newValue);
		}
	},
}
</script>

<style scoped>
.fix-mobile-size {
	max-width: 540px;
	width: 100%;
	height: 100vh;
	background-image: url('/image/bg_login.webp');
	background-size: cover;
	background-repeat: round;
	position: relative;
	margin: 0 auto;
}

/* .fix-mobile-size::before {
	content: '';
	background: rgba(48, 0, 98, 0.70);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(5px);
} */
.bg2 {
	position: absolute;
	top: 0;
}

.bg2 img {
	width: 100%;
}

.title {
	color: white;
	position: relative;

}

.title h1 {
	color: #F7FEFF;
	text-align: center;
	text-shadow: 0px 7px 21.4px #0068E6;
	font-family: Mitr;
	font-size: 35px;
	font-style: normal;
	font-weight: bold;
	line-height: 92%;
	/* 32.2px */
	letter-spacing: 1.75px;
	text-transform: uppercase;
	margin-bottom: 30px;
}

/* .bg3 {
	position: relative;
	text-align: center;
}

.bg3::before {
	height: 100%;
	backdrop-filter: blur(5px);
} */

.login-col {
	background-image: url('/image/Glow.webp');
	background-size: cover;
	background-repeat: round;
	margin-left: 12px;
	position: absolute;
	transform: translate(8%, 35%);
	width: 85%;
}

.big {
	background: rgba(219, 236, 255, 0.25);
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(5px);
	width: 100%;
	height: 100%;
}

.login {
	display: flex;
	padding-top: 50px;
	margin-left: 30px;
	margin-right: 33px;
	padding-right: 15px;
	place-content: center;

}

.username label {
	color: #FFF;
	font-family: Montserrat;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}

.uid {
	margin-inline: 30px;
	padding-right: 15px;
	display: flex;
	place-content: center;
}

.uid label {
	color: #FFF;
	font-family: Montserrat;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}


.login-btn button {
	font-family: Montserrat;
	font-size: 27px;
	font-weight: 700;
	line-height: 32.27px;
	background: linear-gradient(0deg, #CF8403 0%, #BC4F01 55.59%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.login-btn {
	background-image: url('/image/start_bg.webp');
	padding: 20px 15px;
	background-repeat: round;
	background-size: cover;
	text-align: -webkit-center;
	position: absolute;
	bottom: 0;
	width: 50%;
	transform: translate(49%, -25%);
}

.register a {

	color: #FFF;
	font-weight: 700;
}

.register {
	text-align: center;
	padding-top: 15px;
}

.register p {
	font-size: 12px;
}

/* Popup Styles */
.popup-overlay {
	max-width: 540px;
	position: fixed;
	top: 0;

	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.popup-content {
	background-image: url('/image/pause-bg.webp');
	padding: 20px;
	border-radius: 10px;
	text-align: center;
	background-repeat: round;
	background-size: cover;
	color: white;
	height: 350px;
	width: 350px;
	text-align: center;
	align-content: center;
	position: relative;
}


.popup-content p {
	margin-bottom: 20px;
}

.close {
	padding: 10px 20px;
	border: none;
	background-image: url('/image/quit_bg.webp');
	border-radius: 5px;
	background-repeat: round;
	background-size: cover;
	padding: 25px 0px;
	width: 65%;
	position: absolute;
	bottom: 0;
	transform: translate(20%, 18%);
}

.close a {
	font-family: Montserrat;
	font-size: 27px;
	font-weight: 700;
	line-height: 32.27px;
	background: linear-gradient(0deg, #FFFFFF 0%, #FFE6E3 75.5%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.btn_col {
	position: absolute;
	top: 20px;
	left: 20px;

}

.popup-content2 {
	background-image: url('/image/pause-bg.webp');
	background-size: cover;
	background-repeat: round;
	height: 350px;
	width: 350px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	text-align: center;
	align-content: center;
	position: relative;
}

.close2 {
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(13%, 60%);
}

.musicbar {
	place-content: center;
	gap: 1.5rem;
	display: flex;
	align-items: center;
}

.volume {
	background: #313249;
	padding: 3px 5px 3px 5px;
	border-radius: 50px;
	width: 50%;
}

.musicbar input {
	background: #313249;

}

.volume-slider-1 {
	-webkit-appearance: none;
	width: 100%;
	height: 100%;
	background: var(--loading-gradient, linear-gradient(180deg, #FEF0A3 0%, #F08B5A 100%));
	border-radius: 20px;
	outline: none;
	cursor: pointer;
	position: relative;
}

.volume-slider-1::-webkit-slider-thumb {
	-webkit-appearance: none;
	width: 20px;
	height: 20px;
	background: rgba(0, 0, 0, 0);
	border: none;
	cursor: pointer;
	position: relative;
	opacity: 0;
}

.volume-slider-1::before {
	content: '';
	position: absolute;
	top: 3px;
	height: 100%;
	background: var(--loading-gradient, linear-gradient(180deg, #FEF0A3 0%, #F08B5A 100%));
	border-radius: 20px;
	width: calc(var(--value1) * 100%);
}

.volume-slider-1 {
	--value: 1.0;
}

.volume-slider-2 {
	--value: 1.0;
}

.volume-slider-2 {
	-webkit-appearance: none;
	width: 100%;
	height: 100%;
	background: var(--loading-gradient, linear-gradient(180deg, #FEF0A3 0%, #F08B5A 100%));
	border-radius: 20px;
	outline: none;
	cursor: pointer;
	position: relative;
}

.volume-slider-2::-webkit-slider-thumb {
	-webkit-appearance: none;
	width: 20px;
	height: 20px;
	background: rgba(0, 0, 0, 0);
	border: none;
	cursor: pointer;
	position: relative;
	opacity: 0;
}

.volume-slider-2::before {
	content: '';
	position: absolute;
	top: 3px;
	height: 100%;
	background: var(--loading-gradient, linear-gradient(180deg, #FEF0A3 0%, #F08B5A 100%));
	border-radius: 20px;
	width: calc(var(--value2) * 100%);
}

.setting h3 {
	color: #FFF;
	text-align: center;
	font-family: Montserrat;
	font-size: 30px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-bottom: 30px;
}

.form-control {
	color: #626262;
	font-family: Montserrat;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;

	width: 70%;
}

/* @media screen and () */

.title2 {
	transform: translate(0, -25%);
	color: #F7FEFF;
	text-align: center;
	text-shadow: 0px 7px 21.4px #0068E6;
	font-family: Mitr;
	font-size: 35px;
	font-style: normal;
	font-weight: bold;
	line-height: 92%;
	/* 32.2px */
	letter-spacing: 1.75px;
	text-transform: uppercase;
}

.big {
	position: relative;
}

@media screen {}
</style>
