<template>
	<view>
		<view class="container">
			<image src="https://qiniu-image.qtshe.com/merry_001.jpg" mode="widthFix" />
			<image src="https://qiniu-image.qtshe.com/merry_02.jpg" mode="widthFix" />
			<image src="https://qiniu-image.qtshe.com/merry_03.jpg" mode="widthFix" />
			<image src="https://qiniu-image.qtshe.com/merry_04.jpg" mode="widthFix" />
			<image src="https://qiniu-image.qtshe.com/merry_05.jpg" mode="widthFix" />
			<image src="https://qiniu-image.qtshe.com/merry_06.jpg" mode="widthFix" />
			<image src="https://qiniu-image.qtshe.com/merry_07.jpg" mode="widthFix" />
		</view>
		<canvas canvas-id="myCanvas" id="myCanvas" />
	</view>

</template>

<script>
//获取应用实例
const app = getApp();
console.log(app);
// 存储所有的星星
const stars = [];
// 下落的加速度
const G = 0.01;
const stime = 60;

// 速度上限，避免速度过快
const SPEED_LIMIT_X = 1;
const SPEED_LIMIT_Y = 1;

const W = uni.getSystemInfoSync().windowWidth;
const H = uni.getSystemInfoSync().windowHeight;
const starImage = "https://qiniu-image.qtshe.com/WechatIMG470.png";
export default {
	onLoad() {
		//this.setAudioPlay();
		this.createStar()
	},
	onReady() {
		// console.log(22222);
		
	},
	methods: {
		createStar() {
			let starCount = 350; //星星总的数量
			let starNum = 0; //当前生成星星数
			let deltaTime = 0;
			let ctx = uni.createCanvasContext("myCanvas");
			let requestAnimationFrame = (() => {
				return callback => {
					setTimeout(callback, 1000 / stime);
				};
			})();
			starLoop();

			function starLoop() {
				requestAnimationFrame(starLoop);
				ctx.clearRect(0, 0, W, H);
				deltaTime = 20; //每次增加的星星数量
				starNum += deltaTime;
				if (starNum > starCount) {
					stars.push(new Star(Math.random() * W, 0, Math.random() * 5 + 5));
					starNum %= starCount;
				}
				stars.map((s, i) => {
					//重复绘制
					s.update();
					s.draw();
					if (s.y >= H) {
						//大于屏幕高度的就从数组里去掉
						stars.splice(i, 1);
					}
				});
				ctx.draw();
			}

			function Star(x, y, radius) {
				this.x = x;
				this.y = y;
				this.sx = 0;
				this.sy = 0;
				this.deg = 0;
				this.radius = radius;
				this.ax = Math.random() < 0.5 ? 0.005 : -0.005;
			}

			Star.prototype.update = function() {
				const deltaDeg = Math.random() * 0.6 + 0.2;
				// console.log(deltaDeg);
				this.sx += this.ax;
				if (this.sx >= SPEED_LIMIT_X || this.sx <= -SPEED_LIMIT_X) {
					this.ax *= -1;
				}

				if (this.sy < SPEED_LIMIT_Y) {
					this.sy += G;
				}

				this.deg += deltaDeg;
				this.x += this.sx;
				this.y += this.sy;
			};

			Star.prototype.draw = function() {
				const radius = this.radius;
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.rotate((this.deg * Math.PI) / 180);
				ctx.drawImage(starImage, -radius, -radius * 1.8, radius * 2, radius * 2);
				ctx.restore();
			};
		},
		setAudioPlay() {
			const adctx = uni.createInnerAudioContext();
			adctx.autoplay = true;
			adctx.loop = true;
			adctx.src = "https://dn-qtshe.qbox.me/Jingle%20Bells.mp3";
			adctx.onPlay(() => {
				console.log("开始播放");
				adctx.play();
			});
		}
	}
};
</script>

<style>
.container {
	height: 100%;
	box-sizing: border-box;
	min-height: 100vh;
}

image {
	width: 100%;
	display: block;
	margin-top: -2rpx; //不会切图造的孽
}

canvas {
	width: 100%;
	min-height: 100vh;
	position: fixed;
	top: 0;
	z-index: 1000;
}
</style>
