<template>

	<audio ref="bgm" :src="bgmSrc" loop autoplay></audio>
	<div class="fix-mobile-size">
		<div v-if="showOriginalImg" class="overlay">
			<div class="Startpopup">
				<h3>Original Image</h3>
				<p>Are you ready to start?</p>
				<img :src="imageSrc" style="border-radius: 15px;" alt="Full Image">
				<div class="start-btn" @click="closeOriginalImg">
					<a href="#">Start</a>
				</div>

			</div>
		</div>
		<div v-if="showCountdownOverlay" class="overlay">
			<div class="countdown">
				<p>{{ countdownValue }}</p>
			</div>
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="icon">
					<div class="level">
						<h3>Level 1</h3>
					</div>
					<button @click="showPause" style="border: none; background: none;">
						<svg width="30" height="30" viewBox="0 0 19 21" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" style="stop-color:#FEF0A3; stop-opacity:1" />
									<stop offset="100%" style="stop-color:#F08B5A; stop-opacity:1" />
								</linearGradient>
							</defs>
							<path
								d="M5.31982 0H2.69472C1.25163 0 0.0700073 1.182 0.0700073 2.6251V18.3749C0.0700073 19.818 1.25163 21 2.69472 21H5.31982C6.76291 21 7.94491 19.818 7.94491 18.3749V2.6251C7.94491 1.182 6.76291 0 5.31982 0Z"
								fill="url(#gradient1)" />
							<path
								d="M15.8198 0H13.1947C11.7516 0 10.5696 1.182 10.5696 2.6251V18.3749C10.5696 19.818 11.7516 21 13.1947 21H15.8198C17.2629 21 18.4445 19.818 18.4445 18.3749V2.6251C18.4445 1.182 17.2629 0 15.8198 0Z"
								fill="url(#gradient1)" />
						</svg>
					</button>
				</div>

				<div class="countdownTime">
					<p>{{ formattedTime }} Remaining</p>
				</div>

				<div class="puzzle-game">
					<div class="puzzle-col">
						<div ref="puzzleContainer" class="puzzle-wrap ">
							<!-- Canvas container that is flexed in place -->
							<div id="my-puzzle"></div>
						</div>
						<img :src="imageSrc" class="puzzle-solved" ref="solvedImage">


						<p class="drag-text" style="margin-top: 10px;">Drag The Puzzle into the Picture</p>
					</div>
				</div>

				<div class="view">
					<button @click="showView" style="border: none; background: none;">
						<p>Click to view full image</p>
						<img :src="imageSrc" style="border-radius: 15px;" alt="Full Image">
					</button>
				</div>
				<audio ref="clickSound" src="/Sound Effects KK8 Merdeka/Menu Alert.mp3"></audio>

				<!-- Full Image Popup -->
				<div v-if="showPopupImage" class="overlay" @click.self="hidePopupImage">
					<div class="viewimg">
						<div class="close">
							<a href="#" @click.prevent="hidePopupImage">
								<img width="100%" src="/image/close-btn.webp" alt="Close">
							</a>
						</div>
						<img width="100%" :src="imageSrc" style="border-radius: 15px;" alt="Full Image">
						<div class="countdownView">
							<p>{{ formattedTime }} Remaining</p>
						</div>
					</div>
				</div>

				<!-- Level 2 Popup -->
				<div v-if="showPopupLevel2" class="overlay">
					<div class="adpopup">
						<img width="90%" src="/image/Group 1000005998.webp">
						<div class="nextlevel" @click="nextLevel">
							<a href="#">NEXT LEVEL</a>
						</div>

					</div>
				</div>

				<!-- Time Up Overlay -->
				<div v-if="showPopupTimeUp" class="overlay">
					<div class="time-up">
						<div class="time-logo">
							<img src="/image/timeup.webp">
						</div>
						<h3>Time’s Up!</h3>
						<p>Please try again</p>
						<div class="timeup-ok" @click="TimeupOk">
							<a href="#">
								OK
							</a>
						</div>
					</div>
				</div>

				<!-- Pause Overlay -->
				<div v-if="showPopupPause" class="overlay">
					<div class="ad-popup">
						<div class="Pauseclose">
							<a href="#" @click="continueCountdown">
								<img width="100%" src="/image/close-btn.webp">
							</a>
						</div>
						<div class="pause-content">
							<h3>Paused!</h3>
							<div class="musicbar">
								<svg width="40" height="40" viewBox="0 0 28 30" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M27.8987 1.70642C27.8986 0.796874 27.1068 0.0899758 26.2031 0.192674L7.47878 2.32046C6.70887 2.40795 6.12726 3.05939 6.12726 3.83426V18.5821C6.12726 18.9956 5.75904 19.309 5.34558 19.309C2.39798 19.309 0 21.7069 0 24.6544C0 27.602 2.39798 30 5.34558 30C8.23849 30 10.6004 27.6895 10.6869 24.8172C10.6869 24.8163 10.6876 24.8156 10.6885 24.8156C10.6894 24.8156 10.6901 24.8149 10.6901 24.814V10.2249C10.6901 9.45006 11.2717 8.79862 12.0416 8.71113L21.6402 7.62031C22.5439 7.5176 23.3358 8.22453 23.3358 9.1341V16.6125C23.3358 17.0271 22.9664 17.3413 22.5518 17.3413C19.6042 17.3413 17.2063 19.7392 17.2063 22.6867C17.2063 25.6343 19.6042 28.0323 22.5518 28.0323C25.4412 28.0323 27.8399 25.7309 27.8994 22.8601L27.8987 1.70642Z"
										fill="url(#paint0_linear_87_2591)" />
									<defs>
										<linearGradient id="paint0_linear_87_2591" x1="2.74943" y1="-0.427843"
											x2="30.5592" y2="38.5058" gradientUnits="userSpaceOnUse">
											<stop stop-color="#FEF0A3" />
											<stop offset="1" stop-color="#F08B5A" />
										</linearGradient>
									</defs>
								</svg>
								<div class="volume">
									<input type="range" min="0" max="1" step="0.01" v-model="volume1"
										@input="updateVolume1" class="volume-slider-1" />
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
										<linearGradient id="paint0_linear_87_2593" x1="4.13138" y1="5.71342"
											x2="29.1038" y2="34.7337" gradientUnits="userSpaceOnUse">
											<stop stop-color="#FEF0A3" />
											<stop offset="1" stop-color="#F08B5A" />
										</linearGradient>
									</defs>
								</svg>
								<div class="volume">
									<input type="range" min="0" max="1" step="0.01" v-model="volume2"
										@input="updateVolume2" class="volume-slider-2" />
								</div>
							</div>
							<div class="home-continue-btn">
								<router-link class="nav-link" to="/home">
									<img src="/image/home.webp">
								</router-link>
								<a href="#" @click="continueCountdown">
									<img width="100%" src="/image/continue.webp">
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
	name: 'Level',

	data() {
		return {
			btnExit: false,
			btnPause: false,
			time: 30,
			remainingTime: 30,
			timer: null,
			showPopupImage: false,
			showPopupLevel2: false,
			showPopupTimeUp: false,
			showPopupPause: false,
			volume1: this.$store.getters.volume1,
			volume2: this.$store.getters.volume2,
			bgmTimeup: null,
			bgmCountdown: null,
			bgmlast: null,
			initialWidth: 10,
			initialHeight: 10,
			imagePaths: [
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
				'/puzzle-img/nasilemak.webp',
				'/puzzle-img/roti canai.webp',
				'/puzzle-img/stay.webp',
			],
			imageSrc: '',
			autogen: null,
			pieceConnections: {},
			level2BGM: null,
			level2BGM: null,
			startPopup: true,
			showOriginalImg: false,
			countdownValue: null,
			showCountdownOverlay: false,
			puzzlePickedAudio: null,
			countdownStart: null,
			countdownLast: null,
			countdownLastPlayed: false,
			countdownLastPauseTime: 0,
		};
	},
	created() {
		window.addEventListener('beforeunload', this.setReloadFlag);
		window.addEventListener('unload', this.handleUnload);
		this.initBGMTimeup(); // Initialize Time Up BGM
		this.selectRandomImage();
		this.initCountdownStart();
		this.initCountdownLast();
	},
	beforeUnmount() {
		window.removeEventListener('beforeunload', this.setReloadFlag);
		window.removeEventListener('unload', this.handleUnload);
		this.stopCountdown();
		this.stopBGMTimeup();
		this.stopBGMCountdown();
	},
	computed: {
		...mapGetters([
			'volume1',
			'volume2'
		]),
		formattedTime() {
			const totalSeconds = Math.max(Math.floor(this.remainingTime), 0);
			const minutes = Math.floor(totalSeconds / 60);
			const seconds = totalSeconds % 60;
			return `${this.pad(minutes)}:${this.pad(seconds)}`;
		}
	},
	methods: {
		playClickSound() {
			const clickSound = this.$refs.clickSound;
			if (clickSound) {
				clickSound.currentTime = 0;
				clickSound.play();
			}
		},
		nextLevel() {
			this.playClickSound();
			setTimeout(() => {
				this.$router.push('/level');
			}, 500);
		},
		TimeupOk() {
			this.playClickSound();
			setTimeout(() => {
				this.$router.push('/home');
			}, 500);
		},
		selectRandomImage() {
			const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
			this.imageSrc = this.imagePaths[randomIndex];
		},
		stopAllSounds() {

			if (this.$refs.bgm) {
				this.$refs.bgm.pause();   // Pause the BGM
				this.$refs.bgm.currentTime = 0; // Reset the BGM to the start
			}
			this.stopBGMCountdown();      // Stop any countdown BGM
			this.stopBGMTimeup();         // Stop any time-up BGM
			// Add any other sounds you need to stop here
		},
		closeOriginalImg() {
			this.playClickSound();
			this.showOriginalImg = false;  // Hide the initial popup
			this.startPreGameCountdown();  // Start the 3, 2, 1 countdown

		},
		startPreGameCountdown() {
			this.playCountdownStart();
			this.countdownValue = 3;
			this.showCountdownOverlay = true;  // Show overlay for countdown


			const countdownInterval = setInterval(() => {
				if (this.countdownValue > 1) {
					this.countdownValue--;

				} else {
					clearInterval(countdownInterval);
					this.startGame();
				}
			}, 1000);  // Update every second
		},
		startGame() {
			this.showCountdownOverlay = false;
			this.startCountdown();
			this.initializePuzzle();

			setTimeout(() => {
				this.initializePuzzle();
			}, 100);
			setTimeout(() => {
				this.initializePuzzle();
			}, 200);
			setTimeout(() => {
				this.initializePuzzle();
			}, 300);

			if (this.$refs.bgm) {
				this.$refs.bgm.play();  // Resume BGM
			}
		},
		closeModal() {

			this.showAd = false;

			document.body.style.overflow = 'auto';
		},

		initLevel2BGM() {
			this.level2BGM = new Audio('/Sound Effects KK8 Merdeka/New Level.wav'); // Update with the correct path to your Level 2 BGM
			this.level2BGM.loop = false;
		},

		playLevel2BGM() {
			this.pauseCountdown();
			this.stopBGMTimeup();
			if (this.level2BGM) {
				this.level2BGM.volume = this.volume1;
				this.level2BGM.play();
				this.level2BGM.onended = () => {
					this.stopLevel2BGM();
				};
			}
		},
		// Stop the Level 2 BGM
		stopLevel2BGM() {
			if (this.level2BGM) {
				this.level2BGM.pause();
				this.level2BGM.currentTime = 0;
			}
		},
		hidePopupLevel2() {
			this.showPopupLevel2 = false;
			this.stopLevel2BGM(); // Stop Level 2 BGM when popup is closed
		},
		initBGMTimeup() {
			this.bgmTimeup = new Audio('/Sound Effects KK8 Merdeka/Timeout.wav');
			this.bgmTimeup.loop = true;
		},
		playBGMTimeup() {
			if (this.bgmTimeup) {
				this.bgmTimeup.volume = this.volume1;
				this.bgmTimeup.play();
			}
		},
		stopBGMTimeup() {
			if (this.bgmTimeup) {
				this.bgmTimeup.pause();
				this.bgmTimeup.currentTime = 0;
				this.bgmTimeup.volume = 0; // 确保停止播放后音量为0
			}
		},
		initBGMCountdown() {
			this.bgmCountdown = new Audio('/Sound Effects KK8 Merdeka/Game Ticking20.wav');
			this.bgmCountdown.loop = false;
		},
		playBGMCountdown() {
			if (this.bgmCountdown) {
				this.bgmCountdown.volume = this.volume1;
				this.bgmCountdown.play();
			}
		},
		stopBGMCountdown() {
			if (this.bgmCountdown) {
				this.bgmCountdown.pause();
				this.bgmCountdown.currentTime = 0;
			}
		},

		initBGMPiece() {
			this.bgmPiece = new Audio('/Sound Effects KK8 Merdeka/Puzzle Picked.wav');
			this.bgmPiece.loop = false;
		},
		playBGMPiece() {
			if (this.bgmPiece) {
				this.bgmPiece.volume = this.volume2;
				this.bgmPiece.play();
			}
		},
		stopBGMPiece() {
			if (this.bgmPiece) {
				this.bgmPiece.pause();
				this.bgmPiece.currentTime = 0;
			}
		},
		initCountdownStart() {
			this.CountdownStart = new Audio('/Sound Effects KK8 Merdeka/3 2 1 0 Countdown With Sound Effect _ No Copyright _ Ready To Use [ ezmp3.cc ].mp3');
			this.CountdownStart.loop = false;
		},
		playCountdownStart() {
			if (this.CountdownStart) {
				this.CountdownStart.volume = this.volume1;
				this.CountdownStart.play();
			}
		},
		stopCountdownStart() {
			if (this.CountdownStart) {
				this.CountdownStart.pause();
				this.CountdownStart.currentTime = 0;
			}
		},
		initCountdownLast() {
			this.countdownLast = new Audio('/Sound Effects KK8 Merdeka/mix_10s.mp3');
			this.countdownLast.loop = false;
		},
		playCountdownLast() {
			if (this.countdownLast) {
				this.countdownLast.volume = this.volume1;
				this.countdownLast.currentTime = this.countdownLastPauseTime; // Resume from paused time
				this.countdownLast.play();
				this.countdownLastPlayed = true;
			}
		},
		stopCountdownLast() {
			if (this.countdownLast) {
				this.countdownLastPauseTime = this.countdownLast.currentTime; // Save current time
				this.countdownLast.pause();
			}
		},
		stopAllSounds() {
			this.stopBGMCountdown();
			this.stopBGMTimeup();
			this.$refs.bgm.pause();
			this.$refs.bgm.currentTime = 0;
		},
		...mapActions([
			'setVolume1',
			'setVolume2'
		]),
		...mapMutations([
			'SET_VOLUME1',
			'SET_VOLUME2'
		]),
		updateVolume1() {
			const bgm = this.$refs.bgm;
			if (bgm) {
				this.setVolume1(this.volume1);
				bgm.volume = this.volume1;
				if (this.bgmTimeup) {
					this.bgmTimeup.volume = this.volume1;
				}
			}
		},
		updateVolume2() {
			const clickSound = this.$refs.clickSound;
			if (clickSound) {
				this.setVolume2(this.volume2);
				clickSound.volume = this.volume2;
			}
		},
		updateVolumeDisplay(sliderClass, value) {
			const slider = document.querySelector(`.${sliderClass}`);
			if (slider) {
				slider.style.setProperty('--value', value);
			}
		},
		setReloadFlag(event) {
			localStorage.setItem('reload', 'true');
		},
		handleUnload(event) {
			localStorage.setItem('reload', 'true');
		},
		showExit() {
			this.stopCountdown();
			this.btnExit = true;
		},
		confirmExit() {
			this.btnExit = false;
			this.startCountdown();
		},
		showPause() {
			this.showPopupPause = true;
			this.pauseCountdown();

			// Pause the background music and store the current time
			if (this.$refs.bgm) {
				this.$refs.bgm.pause();
				this.bgmCurrentTime = this.$refs.bgm.currentTime;
			}

			this.stopBGMTimeup();
			this.stopCountdownLast();

			this.$nextTick(() => {
				this.updateVolumeDisplay('volume-slider-1', this.volume1);
				this.updateVolumeDisplay('volume-slider-2', this.volume2);
			});
		},
		pauseCountdown() {
			clearInterval(this.timer);
			this.timer = null;
			if (this.bgmCountdown && this.bgmCountdown.currentTime > 0) {
				this.bgmCountdownTime = this.bgmCountdown.currentTime;
				this.bgmCountdown.pause();
			}
			if (this.countdownLast && this.countdownLast.currentTime > 0) {
				this.countdownLastTime = this.countdownLast.currentTime;
				this.countdownLast.pause();
			}
			if (this.$refs.bgm) {
				this.bgmTime = this.$refs.bgm.currentTime;
				this.$refs.bgm.pause();
			}
		},
		continueCountdown() {
			this.showPopupPause = false;
			this.startCountdown();

			if (this.bgmCountdown && this.bgmCountdownTime > 0) {
				this.bgmCountdown.currentTime = this.bgmCountdownTime;
				this.bgmCountdown.play();
			}
			if (this.countdownLast && this.countdownLastTime > 0) {
				this.countdownLast.currentTime = this.countdownLastTime;
				this.countdownLast.play();
			}
			if (this.$refs.bgm) {
				this.$refs.bgm.currentTime = this.bgmTime;
				this.$refs.bgm.play();
			}
		},
		formattedTime() {
			const totalSeconds = Math.floor(this.remainingTime);
			const minutes = Math.floor(totalSeconds / 60);
			const seconds = totalSeconds % 60;
			return `${this.pad(minutes)}:${this.pad(seconds)}`;
		},
		pad(number) {
			return number.toString().padStart(2, '0');
		},
		startCountdown() {
			if (this.timer) clearInterval(this.timer);

			this.timer = setInterval(() => {
				if (this.remainingTime > 0.7) {
					this.remainingTime -= 0.1;

					if (Math.floor(this.remainingTime) > 10) {
						this.playBGMCountdown();
					} else if (Math.floor(this.remainingTime) === 10 && !this.countdownLastPlayed) {
						this.stopBGMCountdown();
						this.playCountdownLast();
					}
				} else {
					this.remainingTime = 0.7;
					clearInterval(this.timer);
					this.showPopupTimeUp = true;
					this.stopAllSounds();
				}
			}, 100);
		},
		pauseCountdown() {
			clearInterval(this.timer);
			this.timer = null;
			this.stopBGMCountdown();
			this.stopCountdownLast(); // Stop the last 10-second music if it's playing
		},
		continueCountdown() {
			this.showPopupPause = false;
			this.startCountdown();

			if (Math.floor(this.remainingTime) <= 10) {
				this.playCountdownLast();
			} else {
				this.playBGMCountdown();
			}
		},


		stopCountdown() {
			clearInterval(this.timer);
			this.timer = null;
			this.stopBGMCountdown();
		},
		closePopup() {
			this.showPopupTimeUp = false;
			this.stopBGMTimeup();
		},
		initializePuzzle() {
			const initialWidth = this.$refs.puzzleContainer.offsetWidth;
			const initialHeight = this.$refs.puzzleContainer.offsetHeight;
			const pieceSize = Math.min(initialWidth, initialHeight) * 0.98 / 2;
			this.initBGMPiece();


			let dali = new Image();
			dali.src = this.imageSrc;
			dali.onload = () => {
				const randomized = new headbreaker.Canvas('my-puzzle', {
					width: initialWidth,
					height: initialHeight,
					pieceSize: pieceSize,
					proximity: 10,
					borderFill: 1,
					strokeWidth: 1,
					strokeColor: '#FFFFFF',
					lineSoftness: 1,
					image: dali,
					fixed: true,
					outline: new headbreaker.outline.Rounded(),
					preventOffstageDrag: true,
				});

				randomized.adjustImagesToPuzzleHeight();
				randomized.autogenerate({
					horizontalPiecesCount: 2,
					verticalPiecesCount: 2,
				});

				randomized.shuffle(0.8);

				randomized.draw();



				randomized.onConnect((it) => {
					this.bgmPiece.volume = this.volume2;
					this.bgmPiece.play();
				});

				randomized.onDisconnect((it) => {
					this.bgmPiece.volume = this.volume2;
					this.bgmPiece.play();
				});



				['resize', 'DOMContentLoaded'].forEach((event) => {
					window.addEventListener(event, () => {
						const container = this.$refs.puzzleContainer;
						randomized.resize(container.offsetWidth, container.offsetHeight);
						randomized.scale(container.offsetWidth / initialWidth);
						randomized.redraw();
					});
				});

				randomized.attachSolvedValidator();
				randomized.onValid(() => {
					setTimeout(() => {
						this.showPopupLevel2 = true;
					}, 100);
				});
			};
		},

		showView() {
			this.showPopupImage = true;
		},
		hidePopupImage() {
			this.showPopupImage = false;
		},
		hidePopupLevel2() {
			this.showPopupLevel2 = false;
		},
		handlePieceClick() {
			this.playClickSound();
			setTimeout(() => {
				// Any additional actions after the click sound
			}, 500);
		},
		playClickSound() {
			const clickSound = this.$refs.clickSound;
			if (clickSound) {
				clickSound.currentTime = 0;
				clickSound.play();
			}
		},
	},
	watch: {
		showOriginalImg(newValue) {
			if (newValue) {
				// Pause all ongoing activities
				this.stopCountdown();      // Stop the countdown
				this.stopAllSounds();      // Stop all sounds including BGM
			}
		},
		showPopupLevel2(newValue) {
			if (newValue) {
				this.stopBGMCountdown();// Stop the countdown BGM
				this.playLevel2BGM(); // Play Level 2 BGM when the popup is shown
			} else {
				this.stopLevel2BGM(); // Stop Level 2 BGM when popup is hidden
			}
		},
		showPopupTimeUp(newValue) {
			if (newValue) {
				this.stopAllSounds();
				this.playBGMTimeup(); // Time Up时播放BGM
			} else {
				this.stopBGMTimeup();
			}
		},
		volume1(newValue) {
			this.updateVolumeDisplay('volume-slider-1', newValue);
		},
		volume2(newValue) {
			this.updateVolumeDisplay('volume-slider-2', newValue);
		}
	},
	mounted() {
		this.selectRandomImage();
		this.initializePuzzle();
		setTimeout(() => {
			this.initializePuzzle();
		}, 100);
		setTimeout(() => {
			this.initializePuzzle();
		}, 200);
		setTimeout(() => {
			this.initializePuzzle();
		}, 300);
		window.addEventListener('resize', this.onResize);
		if (localStorage.getItem('reload')) {
			localStorage.removeItem('reload');
			this.$router.push('/');
		} else {
			this.startCountdown();
		}
		this.initBGMTimeup();
		this.initBGMCountdown();
		this.updateVolume1();
		this.updateVolume2();
		this.initLevel2BGM();
		this.initCountdownStart();
		this.initCountdownLast();
		this.showOriginalImg = true;
	},
	beforeRouteLeave(to, from, next) {
		this.setVolume1(this.volume1);
		this.setVolume2(this.volume2);
		next();
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResize);
	},

};
</script>




<style scoped>
.fix-mobile-size {
	max-width: 540px;
	width: 100%;
	overflow: visible;
	height: 100vh;
	background-image: url('/image/bg_home.webp');
	background-size: cover;
	background-repeat: round;
	position: relative;
	margin: 0 auto;
}

.fix-mobile-size::before {
	content: '';
	background: rgba(48, 0, 98, 0.70);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-repeat: no-repeat;
	backdrop-filter: blur(5px);
}

.icon {
	display: flex;
	justify-content: center;
	padding-top: 20px;
	position: absolute;
	top: 10px;

}

.level {
	flex: 1;
	text-align: center;
}

.level h3 {
	color: #ffffff;
	text-align: center;
	font-family: Montserrat;
	font-size: 25px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}

.icon button {
	margin-left: auto;
	border: none;
	background: none;
	position: absolute;
	right: 22px;
	top: 15px;
}

.overlay {
	max-width: 540px;
	position: fixed;
	top: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 1.0);
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	overflow: visible;
	z-index: 999;
}

.ad-popup {
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

.ad-popup h1 {
	color: #ffffff;
	font-family: Montserrat;
	font-size: 24px;
	font-weight: 700;
	line-height: 29.26px;
	text-align: center;
	padding-bottom: 20px;
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
	top: 70px;
	position: absolute;
	transform: translate(0, 100%);
	text-align: center;
}

.countdownTime p {
	color: #FFF;
	text-align: center;
	font-family: Montserrat;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}

.countdownView {
	text-align: center;
	right: 0;
	left: 0;
	position: absolute;
	transform: translate(0, 100%);
	text-align: center;
}

.countdownView p {
	color: #FFF;
	text-align: center;
	font-family: Montserrat;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
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
	width: calc(var(--value) * 100%);
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
	background: linear-gradient(180deg, #FEF0A3 0%, #F08B5A 100%);
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
	width: calc(var(--value) * 100%);
}

.close {
	position: absolute;
	top: 0;
	right: 0;

}

.Pauseclose {
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(13%, 60%);
}

.time-logo {
	position: absolute;
	top: -26px;
	right: 0;
}

.time-logo img {
	width: 30%;
}


.home-continue-btn {
	display: flex;
	position: absolute;
	bottom: 0;
}

.home-continue-btn .nav-link,
.home-continue-btn a {
	display: inline-block;
	width: auto;
	padding: 0;
}

.home-continue-btn {
	display: flex;
	position: absolute;
	bottom: -10px;
	width: 100%;
	padding: 0 20px;
	justify-content: center;
	gap: 2rem;
}

.home-continue-btn img {
	width: 70px;
}

.timeup-congra {
	text-align: center;
	text-decoration: none;
	background-size: cover;
	background-repeat: round;
	background-image: url('/image/start_bg.webp');
	padding: 20px;
}

.time-up {
	background-image: url('/image/time-up.webp');
	background-size: cover;
	background-repeat: round;
	width: 300px;
	height: 259px;
	flex-shrink: 0;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	text-align: center;
	align-content: center;
	position: relative;
}

.time-up h3 {
	color: #FFF;
	text-align: center;
	font-family: Montserrat;
	font-size: 26px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-top: 35px;
}

.pause-content h3 {
	color: #FFF;
	text-align: center;
	font-family: Montserrat;
	font-size: 30px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-bottom: 30px;
}

.time-up p {
	color: #FFF;
	text-align: center;
	font-family: Montserrat;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
}

@media screen and (min-width: 375px) {

	.time-up h3 {
		font-size: 28px;
	}

	.time-up {
		width: 325px;
	}

	.time-logo img {
		width: 35%;
	}
}

.timeup-ok {
	text-align: center;
	position: absolute;
	bottom: -18px;
	width: 50%;
	background-image: url('/image/start_bg.webp');
	background-size: cover;
	background-repeat: round;
	padding: 15px;
	transform: translate(50%, 0);
}



.timeup-ok a {
	font-family: Montserrat;
	font-size: 27px;
	font-weight: 700;
	line-height: 32.27px;
	background: linear-gradient(0deg, #CF8403 0%, #BC4F01 55.59%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.puzzle-game {
	height: 520px;
	transform: translate(0, 32%);
	text-align: -webkit-center;
}

.puzzle-col {
	height: 80%;
	width: 90%;
	margin-bottom: 10px;
	overflow: hidden;
}

.puzzle-wrap {
	position: relative;
	width: 100%;
	height: 90%;
	align-items: flex-end;

}

#my-puzzle {
	width: 100%;
	height: 100%;
	display: block;
	background: #ffffffb6;
}

.drag-text {
	color: white;
	font-weight: bold;
	position: relative;
	text-align: center;
	font-size: 14px;
}

@media screen and (min-width: 425px) {
	.drag-text {
		font-size: 18px;
	}

	.view p {
		font-size: 16px;
	}

	.countdownTime p {
		font-size: 18px;

	}
}


.pieces-container {
	display: flex;
	justify-content: center;
	margin-top: 10px;
}

#pieces {
	display: flex;
	flex-wrap: wrap;
	width: 320px;
	justify-content: center;
}

@keyframes pulse {
	0% {
		transform: scale(1);
		opacity: 1;
	}

	50% {
		transform: scale(1.1);
		opacity: 1;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}

.view {
	position: absolute;
	bottom: 25px;
	right: 10px;
}

.view p {
	color: white;
	text-align: center;
	font-family: Montserrat;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}

.view button {
	display: flex;
	align-items: center;
	justify-content: end;
	padding-right: 5px;
	border-radius: 15px;
	gap: 1.0rem;
}

.view button img {
	animation: pulse 2s infinite;
	border-radius: 15px;
	border: 5px solid white;
}

.full-image {
	max-width: 100%;
	max-height: 80vh;
	object-fit: contain;
}

.puzzle-solved {
	width: 35%;
	position: absolute;
	top: 37%;
	left: 50%;
	z-index: 2;
	transform: translate(-50%, -50%);
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.5s ease, visibility 0s linear 0.5s;
}

.adpopup {
	position: relative;
	padding: 10px;
	text-align: center;
}

.viewimg {
	position: relative;
	padding: 10px;
	text-align: center;
}

.view img {
	width: 25%;
}

@media screen and (min-width:548px) {
	.view img {
		width: 20%;
	}
}

.nextlevel a {
	font-family: Montserrat;
	font-size: 22px;
	font-weight: 700;
	line-height: 32.27px;
	background: linear-gradient(0deg, #CF8403 0%, #BC4F01 55.59%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.nextlevel {
	background-image: url('/image/start_bg.webp');
	text-decoration: none;
	background-size: cover;
	background-repeat: round;
	width: 50%;
	height: 20%;
	align-content: center;
	position: absolute;
	bottom: -30%;
	transform: translate(45%, 0);
}

.Startpopup {
	color: #ffffff;
	text-align: -webkit-center;
	font-weight: 700;
	font-family: Montserrat;
}

.Startpopup img {
	width: 80%;
}

@media screen and (min-width: 375px) {
	.Startpopup img {
		width: 100%;
	}

	.Startpopup h3 {
		font-size: 30px;
	}

	.Startpopup p {
		font-size: 16px;
	}
}

.Startpopup h3 {
	font-size: 28px;
}

.Startpopup p {
	font-size: 14px;
}


.start-btn {
	background-image: url('/image/start_bg.webp');
	margin-top: 25px;
	text-align: center;
	text-decoration: none;
	background-size: cover;
	background-repeat: round;
	padding: 12px 0px;
	width: 55%;
}

@media screen and (min-width: 375px) {
	.start-btn {
		width: 70%;
		padding: 20px 0px;
	}
}

.start-btn a {
	font-family: Montserrat;
	font-size: 27px;
	font-weight: 700;
	line-height: 32.27px;
	background: linear-gradient(0deg, #CF8403 0%, #BC4F01 55.59%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.countdown p {
	text-align: center;
	font-family: Montserrat;
	font-size: 100px;
	font-weight: 700;
	color: #ffffff;
}

.countdown {
	position: relative;
}
</style>
