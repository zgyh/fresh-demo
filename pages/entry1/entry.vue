<template>
	<view class="content" :class="lang">
		<view class="bg">
			<image class="img-title" :src="imgtitle" mode="widthFix"></image>
			<image class="shouye-gif" :src="`${env.resourcesUrl}/gif/shouye.gif`" mode="widthFix"></image>
		</view>
		<view class="wanwa" v-if="goPlayShow">
			<view class="wanfa-title">
				<view class="wanfa-title-header"></view>
				<view class="wanfa-title_content">
					<text>收集红茶凝时焕活面霜的</text>
					<text>四种核心成分气泡,</text>
					<text>合成馥蕾诗的天然抗老奇迹。</text>
				</view>
			</view>
			<view class="wanfa-content">
				<view class="row">
					<view class="setp setp1"><view class="setp setp1-a"></view></view>
					<view class="setp" :class="{ setp2: isSetp2 }"><view class="setp setp2-a"></view></view>
				</view>
				<view class="row1">
					<view class="row1-contnet">
						<view class="setp" :class="{ 'setp3-a': isSetp3 }"></view>
						<view class="setp" :class="{ setp3: isSetp3 }"></view>
					</view>
				</view>
				<view class="row2"><view class="setp" :class="{ setp4: isSetp4 }"></view></view>
			</view>
			<button class="zhidaole" v-if="showBtn" @click="goPlay()">我知道了</button>
		</view>
		<navigation-bar>
			<view class="lang-bar">
				<text v-for="lang in langBtns" :key="lang.value" @click="onLangChange(lang)">
					{{ lang.text }}
				</text>
			</view>
		</navigation-bar>

		<view class="footer-container">
			<view class="product">红茶凝时焕活面霜</view>
			<view class="product1">全新上市!</view>
			<button class="start-game-btn" hover-class="press-style" open-type="getUserInfo" @click="start()">
				探 秘 赢 好 礼
			</button>
			<view v-if="!noFirst" class="agreement-row">
				<view @click="onAgreementChange()">
					<image class="icon-agreement" v-show="!isAgree" src="../../static/choice_b.png"></image>
					<image class="icon-agreement" v-show="isAgree" src="../../static/choice_a.png"></image>
				</view>
				<text class="txt" @click="onAgreement()">授权同意隐私协议与用户手册</text>
			</view>
			<view class="btn-group" v-else>
				<view class="item">
					<image src="../../static/icon_register.png"></image>
					<view>登记成为体验官</view>
				</view>
				<view class="item">
					<image src="../../static/icon_ buy.png"></image>
					<view>点击购买</view>
				</view>
			</view>
			<view class="ps">*源自第三方实验室数据，经检测产品不含视黄醇</view>
		</view>
		<view v-show="confirmedOpen" class="clause-container">
			<clause @confirm="onConfirm()"></clause>
		</view>
	</view>
</template>

<script>
import { env, langBtns } from "../../difine.js";
import NavigationBar from "../../component/navigation-bar.vue";
import clause from "../../component/clause.vue";
// const vas = require(env.resourcesUrl+'/gif/synthesis_animation.png')
export default {
	components: { NavigationBar, clause },
	data() {
		return {
			env,
			langBtns,
			lang: langBtns[1].value,
			isAgree: false,
			confirmedOpen: false,
			goPlayShow: false,
			isSetp2: false,
			isSetp3: false,
			isSetp4: false,
			showBtn: false,
			imgtitle: `${env.resourcesUrl}/zh-CN/img_title.png`,
			noFirst: false
		};
	},
	computed: {
		bgImg() {
			return `${this.env.resourcesUrl}/${this.lang}/background.png`;
		}
	},
	onLoad(query) {
		this.noFirst = uni.getStorageSync("IsFirst") === "No";
		console.log(query);
		console.log(this.$globalData);
		wx.cloud.init();
		wx.cloud.callFunction({
			name: "getOpenId",
			complete: res => {
				console.log(res);
				//你想要完成的功能，比如存储openid到全局
				this.$globalData.openid = res.result.openid;
			}
		});
	},
	methods: {
		getUserProfile (e) {
			wx.getUserProfile({
				desc: "获取您的微信个人信息",
				success: res => {
					console.log(res.userInfo);
					var app = getApp();
					app.globalData.userInfo = res.userInfo; // 将用户信息存到globalData里面
				},
				fail: function(e) {
					wx.showToast({
						title: "你选择了取消",
						icon: "none",
						duration: 1500,
						mask: true
					});
				}
			});
		},
		start() {
			if (this.noFirst) {
				this.goPlay();
				return;
			}
			if (this.isAgree && !this.noFirst) {
				this.goPlayShow = true;
				setTimeout(() => {
					this.isSetp2 = true;
					setTimeout(() => {
						this.isSetp3 = true;
						setTimeout(() => {
							this.isSetp4 = true;
							setTimeout(() => {
								this.showBtn = true;
							}, 1000);
						}, 1000);
					}, 1000);
				}, 1000);
			} else {
				uni.showToast({
					title: "请勾选知情同意书~",
					icon: "none"
				});
			}
		},
		goPlay() {
			uni.setStorage({
				key: "IsFirst",
				data: "No",
				success: function() {
					console.log("success");
				}
			});
			uni.redirectTo({
				url: "/pages/game/index"
			});
		},
		onLangChange(lang) {
			this.lang = lang.value;
		},
		onAgreementChange() {
			this.isAgree = !this.isAgree;
		},
		onAgreement() {
			this.confirmedOpen = true;
		},
		onConfirm() {
			this.confirmedOpen = false;
		}
	}
};
</script>

<style scoped lang="scss">
@import url("../../animation.css");
.zh-CN {
	$lang: "/zh-CN/";
	.bg {
		// background-image: url($IMG_URL+$lang+"background.png");
	}
	.wanfa-title-header {
		background-image: url($IMG_URL+$lang+"game_title.png");
	}
	.setp1 {
		background-image: url($IMG_URL+$lang+"step_a.png");
	}
	.setp2 {
		background-image: url($IMG_URL+$lang+"step_b.png");
	}
	.setp3 {
		background-image: url($IMG_URL+$lang+"step_c.png");
	}
	.setp4 {
		background-image: url($IMG_URL+$lang+"step_d.png");
	}
}
.zh-HK {
	$lang: "/zh-HK/";
	.bg {
		background-image: url($IMG_URL+$lang+"background_f.png");
	}
}
.en-US {
	$lang: "/en-US/";
	.bg {
		background-image: url($IMG_URL+$lang+"background_en.png");
	}
}
.content {
	position: relative;
	width: 100vw;
	min-height: 100vh;
	background: linear-gradient(90deg, #f9ecb4 0%, #f3c186 35%, #da9e6b 100%);
	.lang-bar {
		position: absolute;
		bottom: 10rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		color: $uni-text-color;
		text {
			font-size: $uni-font-size-lg;
			padding: 14rpx 28rpx;
			text-align: center;
		}
	}

	.footer-container {
		position: fixed;
		top: 80vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 10;
		.product {
			position: absolute;
			top: -9vh;
			color: #fff;
			font-size: 36rpx;
		}
		.product1 {
			position: absolute;
			top: -36vh;
			right: 3vw;
			color: #fff;
			font-size: 24rpx;
		}
		.start-game-btn {
			padding: 0;
			width: 368rpx;
			height: 96rpx;
			border: none;
			// background: -webkit-linear-gradient(300.46deg, #d9a36e 0%, #f3c588 100%);
			color: $uni-text-color;
			font-size: 32rpx;
			line-height: 96rpx;
			border-radius: 0;
			background-image: url($IMG_URL+"/gif/Button.gif");
			background-size: 100% 100%;
		}
		.press-style {
			box-shadow: 0 0 16rpx rgba(195, 228, 212, 0.767);
		}

		.agreement-row {
			line-height: 0;
			margin-top: 48rpx;
			display: flex;
			align-items: center;
			color: $uni-text-color;
			font-size: $uni-font-size-sm;
			.icon-agreement {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
			.txt {
				border-bottom: 1rpx solid $uni-text-color;
				line-height: 32rpx;
			}
		}
		.btn-group {
			margin-top: 30rpx;
			width: 368rpx;
			display: flex;
			justify-content: space-between;
			color: #fff;
			font-size: 24rpx;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			image {
				margin-bottom: 10rpx;
				width: 44rpx;
				height: 44rpx;
			}
		}
		.ps {
			margin-top: 20rpx;
			color: $uni-text-color;
			font-size: 18rpx;
		}
	}

	.clause-container {
		padding-top: 12vh;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 100;
	}

	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 1;
		.img-title {
			position: absolute;
			top: 12vh;
			width: 50vw;
			z-index: 99;
		}
		.shouye-gif {
			width: 100%;
			position: absolute;
			top: 25vh;
		}
	}

	.wanwa {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		background-color: rgba(0, 0, 0, 0.85);
		display: flex;
		flex-direction: column;
		align-items: center;
		.wanfa-title {
			width: 100%;
			height: 26vh;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			padding-bottom: 3vh;
			.wanfa-title-header {
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				width: 320rpx;
				height: 150rpx;
			}
			.wanfa-title_content {
				font-size: 24rpx;
				letter-spacing: 0.2rpx;
				text-align: center;
				color: #fff;
				text {
					display: block;
					line-height: 44rpx;
				}
			}
		}
		.wanfa-content {
			width: 90vw;
			.row {
				position: relative;
				display: flex;
				justify-content: space-between;
			}
			.row1 {
				position: relative;
				top: 180rpx;
				display: flex;
				justify-content: center;
				.row1-contnet {
					display: flex;
					position: relative;
					left: 80rpx;
					top: -80rpx;
				}
			}
			.row2 {
				position: relative;
				left: 50rpx;
			}
			.setp {
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
			}
			.setp1 {
				position: relative;
				width: 20vh;
				height: 17vh;
				animation-name: example;
				animation-duration: 2s;
				.setp1-a {
					position: absolute;
					right: -150rpx;
					width: 200rpx;
					height: 100rpx;
					background-image: url("../../static/arrow_a.png");
				}
			}
			.setp2 {
				position: relative;
				top: 80rpx;
				animation-name: example1;
				animation-duration: 2s;
				width: 20vh;
				height: 17vh;
				.setp2-a {
					position: absolute;
					bottom: -180rpx;
					right: 100rpx;
					width: 60rpx;
					height: 240rpx;
					background-image: url("../../static/arrow_b.png");
				}
			}
			.setp3-a {
				animation-name: example1;
				animation-duration: 2s;
				position: relative;
				top: 50rpx;
				width: 100rpx;
				height: 200rpx;
				background-image: url("../../static/arrow_c.png");
			}
			.setp3 {
				animation-name: example1;
				animation-duration: 2s;
				width: 14vh;
				height: 17vh;
			}
			.setp4 {
				animation-name: example;
				animation-duration: 2s;
				width: 20vh;
				height: 17vh;
			}
		}
		.zhidaole {
			margin-top: 40rpx;
			width: 368rpx;
			height: 88rpx;
			line-height: 88rpx;
			background: transparent;
			border: 2rpx solid #fff;
			color: #fff;
		}
	}
}
</style>
