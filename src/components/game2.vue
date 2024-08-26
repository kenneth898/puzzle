<template>
	<div class="puzzle-game">
		<div class="puzzle-col">
			<div class="puzzle-wrap drag-text">

				<div id="my-puzzle"></div>
				<img :src="imageSrc" class="puzzle-solved" ref="solvedImage">
				<p style="margin-top:10px ;">Drag The Puzzle into the Picture</p>

			</div>

		</div>
		<div class="view">
			<button @click="showView" style="border: none; background: none;">
				<p>Click to view full image</p>
				<img width="20%" src="/image/nasi-lemak.png" style="border-radius: 15px;" alt="Full Image">
			</button>
		</div>
	</div>

	<!-- Full Image Popup -->
	<div v-if="showPopup" class="overlay" @click.self="hidePopup">
		<div class="ad-popup">
			<div class="close">
				<a href="#" @click.prevent="hidePopup">
					<img width="100%" src="/image/close-btn.png" alt="Close">
				</a>
			</div>
			<img src="/image/nasi-lemak.png" style="border-radius: 15px;" class="full-image">

		</div>

	</div>

	<!-- Level 2 Popup -->
	<div v-if="showCongrats" class="overlay" @click.self="hideshowCongratsPopup">
		<div class="ad-popup">
			<img width="100%" src="/public/image/Group 1000005998.png">
			<router-link class="nav-link" to="/level">
				NEXT LEVEL
			</router-link>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Puzzle2',
	data() {
		return {
			time: 30,
			remainingTime: 30,
			timer: null,
			bgmTimeup: null,
			bgmCountdown: null,
			showPopup: false,
			showCongrats: false,
			initialWidth: 500,
			initialHeight: 500,
			imageSrc: '/image/nasi-lemak.png',
			autogen: null,
			pieceConnections: {},
		};
	},
	mounted() {
		this.initializePuzzle();
		window.addEventListener('resize', this.onResize);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResize);
	},
	methods: {
		showView() {
			this.showPopup = true;
		},
		hidePopup() {
			this.showPopup = false;
		},
		hideCongratsPopup() {
			this.showCongrats = false;
		},
		initializePuzzle() {
			const xul = new Image();
			xul.src = this.imageSrc;

			xul.onload = () => {
				const container = document.getElementById('my-puzzle');
				const pieceContainer = document.getElementById('my-puzzle');
				this.autogen = new headbreaker.Canvas('my-puzzle', {
					width: 530,
					height: container.offsetHeight,
					pieceSize: 50,
					proximity: 20,
					borderFill: 12,
					outline: new headbreaker.outline.Rounded(),
					strokeWidth: 5,
					strokeColor: '#000000',
					lineSoftness: 0,
					preventOffstageDrag: true,
					image: xul,
				});

				this.autogen.adjustImagesToPuzzleHeight();
				this.autogen.autogenerate({
					horizontalPiecesCount: 2,
					verticalPiecesCount: 2,
				});
				this.autogen.shuffleGrid();
				this.autogen.resize(container.offsetWidth, container.offsetHeight);
				this.autogen.scale(1);
				this.autogen.draw();
				this.autogen.attachSolvedValidator();
				this.autogen.onValid(() => {
					setTimeout(() => {
						const solvedImage = this.$refs.solvedImage;
						gsap.to(solvedImage, {
							opacity: 1,
							visibility: 'visible',
							duration: 0.5,
						});
						gsap.to(container, {
							autoAlpha: 0,
						});

						this.showCongrats = true;
					}, 500);
				});


				const pieces = document.querySelectorAll('my-puzzle');
				pieces.forEach(piece => {
					piece.addEventListener('mouseup', () => this.snapToGrid(piece));
					piece.addEventListener('touchend', () => this.snapToGrid(piece));
				});
			};
		},

		checkAndConnectPieces(pieceIndex, x, y) {
			const container = document.getElementById('my-puzzle');
			const pieces = document.querySelectorAll('#my-puzzle .puzzle-piece');
			const pieceSize = 80;

			pieces.forEach((otherPiece, otherIndex) => {
				if (pieceIndex !== otherIndex) {
					const otherRect = otherPiece.getBoundingClientRect();
					const containerRect = container.getBoundingClientRect();
					const otherX = Math.round((otherRect.left - containerRect.left) / pieceSize) * pieceSize;
					const otherY = Math.round((otherRect.top - containerRect.top) / pieceSize) * pieceSize;


					if (Math.abs(x - otherX) <= pieceSize && Math.abs(y - otherY) <= pieceSize) {
						this.pieceConnections[pieceIndex].push(otherIndex);
						this.pieceConnections[otherIndex].push(pieceIndex);
					}
				}
			});


			this.updateConnectedPiecesPosition(pieceIndex, x, y);
		},

		updateConnectedPiecesPosition(pieceIndex, x, y) {
			const container = document.getElementById('my-puzzle');
			const connectedPieces = this.pieceConnections[pieceIndex];

			connectedPieces.forEach(index => {
				if (index !== pieceIndex) {
					const piece = container.children[index];
					const offsetX = x - parseInt(piece.style.left || '0px');
					const offsetY = y - parseInt(piece.style.top || '0px');

					piece.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
				}
			});
		},
		onResize() {
			if (this.autogen) {
				const container = document.getElementById('my-puzzle');
				this.autogen.resize(container.offsetWidth, container.offsetHeight);
				this.autogen.scale(container.offsetWidth / this.initialWidth);
				this.autogen.redraw();
			}
		},
	},
	computed: {


		formattedTime() {
			const minutes = Math.floor(this.remainingTime / 60);
			const seconds = this.remainingTime % 60;
			return `${this.pad(minutes)}:${this.pad(seconds)}`;
		}
	},
};
</script>

<style scoped>
.puzzle-game {
	height: 520px;
	transform: translate(0, 25%);
	text-align: -webkit-center;
}

.puzzle-col {
	height: 80%;
	width: 90%;
	margin-bottom: 10px;
}

.puzzle-wrap {
	position: relative;
	width: 100%;
	height: 90%;
	justify-content: center;
	background-color: #ffffff;
}

#my-puzzle {
	width: 100%;
	height: 100%;
	display: flex;
}

.drag-text {
	color: white;
	font-weight: bold;
	position: relative;
	text-align: center;
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

.view {
	display: flex;
	justify-content: center;
}

.view button {
	color: white;
	font-weight: 500;
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
}

.ad-popup {
	position: relative;
	padding: 20px;
	border-radius: 15px;
	text-align: center;
}

.close {
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
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

@keyframes pulse {
	0% {
		transform: scale(1);
		opacity: 1;
	}

	50% {
		transform: scale(1.1);
		opacity: 0.8;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}

.view button {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	border: 2px solid white;
	padding: 5px;
	border-radius: 15px;
	gap: 1.0rem;
}

.view button img {
	animation: pulse 2s infinite;
	border-radius: 15px;
	border: 10px solid white;
}

.puzzle-place {
	height: 300px;
	background-color: black;
}

.countdownTime {
	text-align: center;
	right: 0;
	left: 0;
	top: 30px;
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
</style>
