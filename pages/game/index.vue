<template>
	<view class="content">
		<view v-if="showMask" class="mask-again"> 
			<button class="again-btn" @click="onAgain()">{{ again }}</button>
		</view>
		<view class="mask-pass" v-show="passMask">
			<view class="pass-content">
				<image class="guangsu" :src="hechengImg"></image>
				<!-- <image class="product" mode="widthFix" :src="`${env.resourcesUrl}/zh-CN/product.img_fresh_b.png`"></image> -->
				<!-- <image class="lizi" mode="widthFix" :src="`${env.resourcesUrl}/gif/lizi.gif`"></image> -->
			</view>
		</view>
		<view class="bg"></view>
		<view class="container">
			<view class="header-container">
				<view>
					<image class="logo" mode="widthFix" src="../../static/logo.png"></image>
				</view>
				<view class="progress">
					<progress-bar :rate="rate"></progress-bar>
				</view>
				<view class="count-down-container">
					<count-down ref="countDownor" @stop="onCountDownStop()"></count-down>
				</view>
			</view>
			<canvas
				type="2d"
				:style="{ width: W + 'px', height: H + 'px' }"
				canvas-id="firstCanvas"
				id="firstCanvas"
				@touchstart="touchstart"
				@touchmove="touchmove"
				@touchend="touchend"
				@touchcancel="touchcancel"
			>
			</canvas>
		</view>
	</view>
</template>

<script>
import { env, i18n } from "../../difine.js"
import progressBar from "../../component/progress.vue";
import countDown from "../../component/count-down.vue";
import { rand, queryPtInPolygon, getDistance, formatDate } from "../../util.js";
const INTERVAL_TIME = 900;
let XE_ID = 0;

const W = uni.getSystemInfoSync().windowWidth;
const top = uni.getSystemInfoSync().windowHeight * 0.23;
const H = uni.getSystemInfoSync().windowHeight - top;
const dpr = wx.getSystemInfoSync().pixelRatio;

const PZW = 40.3 * dpr;
const PZH = 33.6 * dpr;
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
	height: PZH,
	img: null
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
let canvas = null;
let elementGenretor = null;
let pzList = [];
let reqId = null;
let ctx = null;
let leftTipImg = null;
let rightTipImg = null;

let entryTime = '';
export default {
	components: { progressBar, countDown },
	data() {
		return {
			env,
			top,
			W,
			H,
			bgImg: `${env.resourcesUrl}/zh-CN/game_img.png`,
			images: [],
			rate: 0,
			rate1: 0,
			showMask: false,
			passMask: false,
			lang: '',
			again: '',
			hechengImg: ''
		};
	},
	onShow() {
		entryTime = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
		if(this.pageHide) {
			this.startGame();
		}
	},
	onHide() {
		clearTimeout(elementGenretor);
		canvas.cancelAnimationFrame(reqId);
		this.pageHide = true;
		uni.request({
			url: env.apiUrl,
			method: 'POST',
			data: {
				"openid": this.$globalData.openid,
				"source": this.$globalData.channel,
				"device": this.$globalData.model,
				"name": "game page",
				"type": "用户停留",
				"entryTime": entryTime,
				"leaveTime": formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
			}
		})
	},
	onLoad() {
		uni.showShareMenu({
		     withShareTicket: true,
					  menus:['shareAppMessage','shareTimeline']
		   })
		this.lang = this.$globalData.lang;
		this.again = i18n[this.lang].game.again;
		this.hechengImg = `${env.resourcesUrl}/${this.lang}/synthesis_a.gif`
		const that = this;
		const query = uni.createSelectorQuery();
		query
			.select("#firstCanvas")
			.fields({ node: true, size: true })
			.exec(res => {
				// console.log(res);
				
				canvas = res[0].node;
				canvas = canvas;
				canvas.width = res[0].width * dpr;
				canvas.height = res[0].height * dpr;
				ctx = canvas.getContext("2d");
				ctx.scale(dpr, dpr);
				const chengfenImagesUrl = [
					{
						valid: true,
						img: './../../static/icon_component_hong.png',
						text: i18n[this.lang].game.hclt
					},
					{
						valid: true,
						img: './../../static/icon_component_jiao.png',
						text: i18n[this.lang].game.jsw
					},
					{
						valid: true,
						img: './../../static/icon_component_shen.png',
						text: i18n[this.lang].game.sjxa
					},
					{
						valid: true,
						img: './../../static/icon_component_yan.png',
						text: i18n[this.lang].game.ysj
					},
					{
						valid: true,
						img: './../../static/icon_component_hong.png',
						text: i18n[this.lang].game.hclt
					},
					{
						valid: true,
						img: './../../static/icon_component_jiao.png',
						text: i18n[this.lang].game.jsw
					},
					{
						valid: true,
						img: './../../static/icon_component_shen.png',
						text: i18n[this.lang].game.sjxa
					},
					{
						valid: true,
						img: './../../static/icon_component_yan.png',
						text: i18n[this.lang].game.ysj
					},
					{
						valid: false,
						img: './../../static/icon_harmful_factor.a.png'
					},
					{
						valid: false,
						img: './../../static/icon_harmful_factor.b.png'
					},
					{
						valid: false,
						img: './../../static/icon_harmful_factor.c.png'
					}
				];
				
				chengfenImagesUrl.forEach(e => {
					//可以是本地，也可以是网络图片
					let pic = canvas.createImage();
					pic.src = e.img;
					e.img = pic
					this.images.push(e);
					pic.onload = () => {
						//不要用官方示例的图片路径，包括网上在这之前所有的文档/示例里是地址链接的都不要看了，要用image对象！
						// ctx.drawImage(pic, 180, 600, 40, 40);
					};
				});
				leftTipImg = canvas.createImage();
				leftTipImg.src = '../../static/icon_move_left.png';
				leftTipImg.onload = () => {
				}
				rightTipImg = canvas.createImage();
				rightTipImg.src = '../../static/icon_move_right.png';
				rightTipImg.onload = () => {
				}
				
				pingzi.img = canvas.createImage();
				pingzi.img.src = "./../../static/product.img_fresh.png";
				pingzi.img.onload = () => {
					ctx.drawImage(pingzi.img, pingzi.x, pingzi.y, pingzi.width, pingzi.height);
					this.startGame();
				}
				
			});
	},
	methods: {
		showGameTip() {
			ctx.drawImage(leftTipImg, pingzi.x - 100, pingzi.y + pingzi.height / 2.5, 100, 40);
			ctx.drawImage(rightTipImg, pingzi.x + pingzi.width, pingzi.y + pingzi.height / 2.5, 100, 40);
			ctx.font = '12px Georgia';
			ctx.textAlign = "center";
			ctx.fillStyle = '#fff';
			ctx.fillText(i18n[this.lang].game.tips1, pingzi.x + PZW / 2, pingzi.y - 5 - 40);
			ctx.fillText(i18n[this.lang].game.tips2, pingzi.x + PZW / 2, pingzi.y - 5 - 20);
		},
		startGame() {
			setTimeout(() => {
				this.startTime = 3;
			}, 3000);
			const that = this;
			let categorizes = [];
			let categorize = null;
			let msg = ''
			setTimeout(function calle() {
				categorize = that.createCategorize(rand(40, W - 75), 0, that.images[rand(0,10)]);
				categorizes.push(categorize);
				elementGenretor = setTimeout(calle, INTERVAL_TIME)
			}, 0);
		 
			
			const startLoop = () => {
				ctx.clearRect(0, 0, W, H);
				reqId = canvas.requestAnimationFrame(startLoop);
				categorizes.forEach((s, i) => {
					s.update();
					s.draw();
			
					if (s.y >= H) {
						//大于屏幕高度的就从数组里去掉
						categorizes.splice(i, 1);
					}
				});
				ctx.drawImage(pingzi.img, pingzi.x, pingzi.y, pingzi.width, pingzi.height);
				pzList.forEach((e, i) => {
					setTimeout(function calle() {
						if(e.timeout && e.textAlpha <= 0) {
							pzList.splice(0, pzList.length > 4 ? 2 : 1);
							clearTimeout(e.timeout);
							return;
						}
						e.textAlpha -= 0.005;
						if(!e['timeout']) {
							e['timeout'] = setTimeout(calle, 200);
						}
						
					},0);
					ctx.font = `${13}px`;
					ctx.fillStyle = `rgba(56, 30, 21, ${e.textAlpha})`;
					if (e.image.valid) {
						msg = '+'+e.image.text;
					} else {
						msg = i18n[this.lang].game.shanghai
					}
					
					ctx.fillText(msg, pingzi.x + PZW / 2, pingzi.y - 5 - 20 * i);
					ctx.textAlign = "center";
				});
				
				if(this.startTime !== 3) {
					this.showGameTip();
				}
			}
			startLoop();
		},
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
			if (canvasInfo.status === StatusDefine.DRAGING) {
				canvasInfo.status = StatusDefine.IDLE;
			}
		},
		touchcancel(e) {
			if (canvasInfo.status === StatusDefine.DRAGING) {
				canvasInfo.status = StatusDefine.IDLE;
			}
		},
		createCategorize(x, y, image) {
			const that = this;
			function Categorize(x, y, image) {
				this.id = XE_ID++;
				this.x = x;
				this.y = y;
				this.width = 17 * dpr //rand(13.3, 20) * dpr;
				this.height = this.width;
				this.image = image;
				this.textAlpha = 1;
			}

			Categorize.prototype.update = function() {
				this.y += 1.2 * dpr;
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
				if (xfanweinei && (this.y - pingzi.y) > 0 && (this.y - pingzi.y) < 5) {
					pzList.push(this);
					if(!this.image.valid) {
						that.$refs.countDownor.downnOneSecond();
					}
					if(this.image.valid && that.rate < 100) {
						that.rate1 += 100 / 12;
						that.rate = Math.round(that.rate1);
					}
				  if (that.rate >= 100) {
						that.$refs.countDownor.stopDown();
						canvas.cancelAnimationFrame(reqId);
						setTimeout(() => {
							ctx.clearRect(0, 0, W, H);
							that.passMask = true;
							pzList = [];
							that.$refs.countDownor.stopDown();
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/detail/detail',
									complete: () => {
										
									}
								})
							},3000);
						}, 200);
						
					}
					
					this.y = 10000;
				}
			};

			Categorize.prototype.draw = function() {
				ctx.drawImage(this.image.img, this.x, this.y, this.width, this.height);
			};

			return new Categorize(x, y, image);
		},
		onCountDownStop() {
			canvas.cancelAnimationFrame(reqId);
			clearTimeout(elementGenretor);
			setTimeout(() => {
				ctx.clearRect(0, 0, W, H);
				this.showMask = true;
			}, 200)
			
		},
		onAgain() {
			this.restore();
			this.startGame();
		},
		restore() {
			pzList = [];
			this.rate = 0;
			this.rate1 = 0;
			this.showMask = false;
			this.$refs.countDownor.restart();
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	position: relative;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(90deg, #f9ecb4 0%, #f3c186 35%, #da9e6b 100%);
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100%;
		background-image: url($IMG_URL+'/zh-CN/game_img.png');
		background-position: bottom;
		background-repeat: no-repeat;
		background-size: contain;
	}
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		.header-container {
			position: relative;
			padding-top: 8vh;
			height: 23%;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			justify-content: space-between;
			.logo {
				width: 200rpx;
			}
			.progress {
				width: 80%;
			}
			.count-down-container {
				position: absolute;
				right: 40rpx;
				top: 50%;
			}
		}
		
		#firstCanvas {
			// position: fixed;
			// top: 0;
			z-index: 1000;
			// flex: 0.8;
			// width: 100%;
			// height: 80%;
		}
	}
	.mask-again {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		background-color: rgba(45, 21, 0, 0.75);
		.again-btn {
			position: absolute;
			top: 50%;
			bottom: 50%;
			left: 0;
			right: 0;
			width: 368rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			color: #fff;
			border:1px solid;
			border-image: linear-gradient(93.46deg, #ffecba 0%, #fff 48.94%, #ffecba 100%) 2 2 2 2;
			background-color: rgba(255, 242, 217, 0.27);
		}
	}
	
	.mask-pass {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		background-color: rgba(45, 21, 0, 0.75);
		.pass-content {
			position: relative;
			width: 100%;
			height: 100%;
			.guangsu {
				width: 100%;
				height: 100%;
			}
			.product {
				position: absolute;
				bottom: -10rpx;
				width: 469.22rpx;
				height: auto;

			}
			.lizi {
				position: absolute;
				bottom: 0;
				width: 469.22rpx;
				height: auto;
			}
		}
	}
}

</style>
