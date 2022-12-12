<template>
	<view class="content">
		<view class="bg"><image src="../../static/background_c.png"></image></view>
		<canvas
			type="2d"
			:style="{ width: W + 'px', height: H + 'px' }"
			canvas-id="firstCanvas"
			id="firstCanvas"
			@touchstart="touchstart"
			@touchmove="touchmove"
			@touchend="touchend"
			@touchcancel="touchcancel"
		></canvas>
	</view>
</template>

<script>
import { rand, queryPtInPolygon, getDistance } from "../../util.js";
const INTERVAL_TIME = 900;
let XE_ID = 0;

const W = uni.getSystemInfoSync().windowWidth;
const H = uni.getSystemInfoSync().windowHeight;
const dpr = wx.getSystemInfoSync().pixelRatio;

const PZW = 136;
const PZH = 116;
const x = W / 2 - PZW / 2;
const y = H - PZH - 34;
const pingzi = {
	x: x,
	y: y,
	x1: x + PZW,
	y1: y,
	x2: x + PZW,
	y2: y + PZW,
	x3: x,
	y3: y + PZW,
	width: PZW,
	height: PZH
};

const StatusDefine = {
	IDLE: 0,
	DRAG_START: 1,
	DRAGING: 2
};

const canvasInfo = {
	status: StatusDefine.IDLE,
	dragTarget: {
		x: pingzi.x,
		y: pingzi.y
	},
	lastEvtPos: null,
	offsetPos: null
};

const getCanvasPosition = e => {
	return {
		x: e.touches[0].x,
		y: e.touches[0].y
	};
};

const ifInPingZi = pos => {
	let polygon = [
		{ x: pingzi.x, y: pingzi.y },
		{ x: pingzi.x1, y: pingzi.y1 },
		{ x: pingzi.x2, y: pingzi.y2 },
		{ x: pingzi.x3, y: pingzi.y3 }
	];
	console.log(queryPtInPolygon(pos, polygon));
	if (queryPtInPolygon(pos, polygon)) {
		return true;
	}

	return false;
};
export default {
	data() {
		return {
			W,
			H,
			ctx: null,
			pzList: []
		};
	},
	onLoad() {
		const that = this;
		const query = uni.createSelectorQuery();
		query
			.select("#firstCanvas")
			.fields({ node: true, size: true })
			.exec(res => {
				console.log(res);
				const canvas = res[0].node;

				canvas.width = res[0].width * dpr;
				canvas.height = res[0].height * dpr;

				this.ctx = canvas.getContext("2d");
				this.ctx.scale(dpr, dpr);
				const chengfenImagesUrl = [
					"./../../static/icon_component_hong.png",
					"./../../static/icon_component_jiao.png",
					"./../../static/icon_component_shen.png",
					"./../../static/icon_component_yan.png",
					"./../../static/icon_harmful_factor.a.png",
					"./../../static/icon_harmful_factor.b.png",
					"./../../static/icon_harmful_factor.c.png"
				];
				let images = [];
				chengfenImagesUrl.forEach(e => {
					//可以是本地，也可以是网络图片
					let pic = canvas.createImage();
					pic.src = e;
					images.push(pic);
					pic.onload = () => {
						//不要用官方示例的图片路径，包括网上在这之前所有的文档/示例里是地址链接的都不要看了，要用image对象！
						// this.ctx.beginPath();
						//this.ctx.drawImage(pic, 120, H - 80, 40, 40);
						// this.ctx.closePath();
						// this.ctx.drawImage(pic, 180, 600, 40, 40);
					};
				});
				
				// let pic = canvas.createImage();
				// pic.src = "./../../static/icon_component_hong.png";
				let pic1 = canvas.createImage();
				pic1.src = "./../../static/product.img_fresh.png";
				
				let categorizes = [];
				let categorize = null;

				setInterval(() => {
					categorize = that.createCategorize(rand(40, W - 75), 0, 40, 40, images[rand(0,6)]);
					categorizes.push(categorize);
				}, INTERVAL_TIME);
				let ii = 0;
				function startLoop() {
					that.ctx.clearRect(0, 0, W, H);
					canvas.requestAnimationFrame(startLoop);
					categorizes.forEach((s, i) => {
						s.update();
						s.draw();

						if (s.y >= H) {
							//大于屏幕高度的就从数组里去掉
							categorizes.splice(i, 1);
						}
					});
					// that.ctx.setFontSize(20);
					that.pzList.forEach((e, i) => {
						// that.ctx.globalAlpha = e.textAlpha - 0.5;
						e.textAlpha -= 0.0012
						that.ctx.font = `${13}px Verdana`;
						that.ctx.fillStyle = `rgb(56, 30, 21, ${e.textAlpha})`;
						that.ctx.fillText(`+红茶立体抗衰老成分`, pingzi.x + PZW / 2, pingzi.y - 5 - 20 * i);
						that.ctx.textAlign = "center";
					
						// if (!e.showText) {
						// 	let list = that.pzList.filter(s => !s.showText);
						// 	list.forEach((l, k) => {
						// 		that.ctx.font = `${13}px Verdana`;
						// 		that.ctx.fillStyle = "#381E15";
						// 		that.ctx.fillText(`+红茶立体抗衰老成分`, pingzi.x + PZW / 2, pingzi.y - 5 - 17 * k);
						// 		that.ctx.textAlign = "center";
						// 		setTimeout(function() {
						// 			that.pzList[i].showText = true;
						// 		}, 3000);
						// 	});
						// }
					});
					

					that.ctx.drawImage(pic1, pingzi.x, pingzi.y, pingzi.width, pingzi.height);
				}
				setTimeout(function calle() {
					if(that.pzList.length >= 1) {
						that.pzList.splice(0, that.pzList.length > 6 ? 2 : 1);
					}
					setTimeout(calle, 1200);
				}, 1200)
				startLoop();
			});
	},
	methods: {
		touchstart(e) {
			const canvasPos = getCanvasPosition(e);
			if (ifInPingZi(canvasPos)) {
				canvasInfo.status = StatusDefine.DRAG_START;
				canvasInfo.lastEvtPos = canvasPos;
				canvasInfo.offsetPos = canvasPos;
			}
		},
		touchmove(e) {
			const canvasPos = getCanvasPosition(e);
			if (
				canvasInfo.status === StatusDefine.DRAG_START &&
				getDistance(canvasPos, canvasInfo.lastEvtPos) > 5
			) {
				canvasInfo.status = StatusDefine.DRAGING;
				canvasInfo.offsetPos = canvasPos;
			} else if (canvasInfo.status === StatusDefine.DRAGING) {
				if (pingzi.x > 0 && pingzi.x < W - PZW) {
					let x = canvasPos.x - canvasInfo.offsetPos.x;
					pingzi.x += x;
					pingzi.x1 += x + PZW;
					pingzi.x2 += x + PZW;
					pingzi.x3 += x;
				} else if (pingzi.x <= 0) {
					pingzi.x = 1;
					pingzi.x1 = 1 + PZW;
					pingzi.x2 = 1 + PZW;
					pingzi.x3 = 1;
				} else if (pingzi.x >= W - PZW) {
					let width = PZW + 1;
					pingzi.x = W - width;
					pingzi.x1 = W - width + PZW;
					pingzi.x2 = W - width + PZW;
					pingzi.x3 = W - width;
				}
				canvasInfo.offsetPos = canvasPos;
			}
		},
		touchend(e) {
			// console.log(e);
			if (canvasInfo.status === StatusDefine.DRAGING) {
				canvasInfo.status = StatusDefine.IDLE;
			}
		},
		touchcancel(e) {
			// console.log(e);
			if (canvasInfo.status === StatusDefine.DRAGING) {
				canvasInfo.status = StatusDefine.IDLE;
			}
		},

		createCategorize(x, y, width, height, image) {
			const that = this;
			function Categorize(x, y, width, height, image) {
				this.id = XE_ID++;
				this.x = x;
				this.y = y;
				this.width = rand(40, 75);
				this.height = this.width;
				this.image = image;
				this.textAlpha = 1;
			}

			Categorize.prototype.update = function() {
				this.y += 1;
				let xfanweinei = false;
				if (pingzi.x - this.x === 0) {
					xfanweinei = true;
				}
				let right = pingzi.x - this.x > 0; //right
				if (right) {
					xfanweinei = pingzi.x - this.x <= this.width;
				}

				if (!right) {
					xfanweinei = pingzi.x - this.x >= -PZW;
				}

				if (xfanweinei && this.y === pingzi.y) {
					// console.log(`${this.id}:碰撞了。。。`);
					that.pzList.push(this);
					this.y = 10000;
				}
			};

			Categorize.prototype.draw = function() {
				that.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			};

			return new Categorize(x, y, width, height, image);
		}
	}
};
</script>

<style lang="less">
.content {
	position: relative;
	height: 100vh;
	.bg {
		height: 100vh;
		width: 100%;
		image {
			height: 100vh;
			width: 100%;
		}
	}
	#firstCanvas {
		position: fixed;
		top: 0;
		z-index: 1000;
	}
}
</style>
