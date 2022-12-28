<template>
	<view class="content" :class="lang">
		<view class="bg">
			<image class="img-title" :src="imgtitle" mode="widthFix"></image>
			<image v-show="showShouYeGif && (rate >= 100)" @load="shouyeGifLoad" class="shouye-gif" :src="`${env.resourcesUrl}/zh-CN/home_a.gif`" mode="widthFix"></image>
		</view>
		<view v-if="rate < 100" class="loadding">
			<view class="ai-progress">
				<ai-progress :duration="100" :percentage="rate" :stroke-width="20" :bg-color="'-webkit-linear-gradient(72.31deg, #ffe2a1 0%, #e8bb68 100%)'"></ai-progress>
			</view>	
		</view>
		<view class="wanwa" v-if="goPlayShow">
			<view class="wanfa-title">
				<view class="wanfa-title-header"></view>
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
			<button class="zhidaole" v-if="showBtn" @click="goPlay()">{{i18n[lang].home.wanfaBtn}}</button>
		</view>
		<navigation-bar>
			<view class="lang-bar">
				<text v-for="lang in langBtns" :key="lang.value" @click="onLangChange(lang)">
					{{ lang.text }}
				</text>
			</view>
		</navigation-bar>

		<view class="footer-container">
			<view class="product">{{i18n[lang].home.productName}}</view>
			<view class="product1">{{i18n[lang].home.productSubTitle}}</view>
			<button class="start-game-btn" hover-class="press-style" open-type="getUserInfo" @click="start()">
				{{i18n[lang].home.buttonName}}
			</button>
			<view v-if="!noFirst" class="agreement-row">
				<view @click="onAgreementChange()">
					<image class="icon-agreement" v-show="!isAgree" src="../../static/choice_b.png"></image>
					<image class="icon-agreement" v-show="isAgree" src="../../static/choice_a.png"></image>
				</view>
				<text class="txt" @click="onAgreement()">{{i18n[lang].home.agreement}}</text>
			</view>
			<view class="btn-group" v-else>
				<view class="item" @click="dengji">
					<image src="../../static/icon_register.png"></image>
					<view>{{i18n[lang].home.tabbar1}}</view>
				</view>
				<view class="item" @click="goMain()">
					<image src="../../static/icon_buy.png"></image>
					<view>{{i18n[lang].home.tabbar2}}</view>
				</view>
			</view>
			<view class="ps">{{i18n[lang].home.ps}}</view>
		</view>
		<view v-show="confirmedOpen" class="clause-container">
			<clause :lang="lang" @confirm="onConfirm()"></clause>
		</view>
	</view>
</template>

<script>
import { env, langBtns, i18n } from "../../difine.js";
import NavigationBar from "../../component/navigation-bar.vue";
import AiProgress from "../../components/ai-progress/ai-progress.vue"
import clause from "../../component/clause.vue";
import { formatDate } from "../../util.js"
export default {
	components: { NavigationBar, clause, AiProgress },
	data() {
		return {
			env,
			i18n,
			langBtns,
			lang: langBtns[1].value,
			isAgree: false,
			confirmedOpen: false,
			goPlayShow: false,
			isSetp2: false,
			isSetp3: false,
			isSetp4: false,
			showBtn: false,
			noFirst: false,
			showShouYeGif: false,
			rate: 0,
			entryTime: ''
		};
	},
	computed: {
		imgtitle() {
			return `${env.resourcesUrl}/${this.lang}/img_title.png`;
		}
	},
	onLoad(query) {
		this.$globalData.channel = query.channel || 'CDFG';
		this.$globalData.lang = this.lang;
		this.entryTime = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
		let that = this;
		let timeout = null;
		setTimeout(function calle() {
			that.rate += 2;
			if(that.rate === 100) {
				clearTimeout(timeout);
				return;
			}
			timeout = setTimeout(calle, 60);
		},0)
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
	onUnload() {
		
	},
	methods: {
		shouyeGifLoad(e) {
			this.showShouYeGif = true;
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
			this.goPlayShow = false;
			uni.setStorage({
				key: "IsFirst",
				data: "No",
				success: function() {
					console.log("success");
				}
			});
			uni.navigateTo({
				url: "/pages/game/index",
				complete: ()=> {
					uni.request({
						url: env.apiUrl,
						method: 'POST',
						data: {
							"openid": this.$globalData.openid,
							"source": this.$globalData.channel,
							"name": "entry page",
							"type": "用户停留",
							"entryTime": this.entryTime,
							"leaveTime": formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
						}
					})
				}
			});
		},
		onLangChange(lang) {
			this.lang = lang.value;
			this.$globalData.lang = this.lang;
		},
		onAgreementChange() {
			this.isAgree = !this.isAgree;
		},
		onAgreement() {
			this.confirmedOpen = true;
		},
		onConfirm() {
			this.confirmedOpen = false;
		},
		dengji() {
			wx.navigateToMiniProgram({
				appId: "wxd8df280e2b1b5d13",
				path: 'pages/activity/general/detail/index?id=2&gio_link_id=nPNJbqaP',
				success(res) {
					console.info(res);
					// 打开成功
				}
			});
		},
		goMain() {
			wx.navigateToMiniProgram({
				appId: "wxd8df280e2b1b5d13",
				path: 'pages/home/index?weappShareInfo=/tabs/categoryBrand/freshIndex?zmsySubsiteId=1',
				success(res) {
					console.info(res);
					// 打开成功
				}
			});
		},
	}
};
</script>

<style scoped lang="scss">
@import url("../../animation.css");
.zh-CN {
	$lang: "/zh-CN/";
	.bg {}
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
.en-US {
	$lang: "/en-US/";
	.bg {
		.img-title {
			width: 57vw !important;
		}
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
.KR {
	$lang: "/KR/";
	.bg {
		.img-title {
			width: 57vw !important;
		}
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
			top: -29vw;
			color: #fff;
			font-size: 28rpx;
		}
		.product1 {
			position: absolute;
			top: -46vh;
			right: 13vw;
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
			color: #5D3810;
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
			width: 45vw;
			z-index: 99;
		}
		.shouye-gif {
			width: 100%;
			position: absolute;
			top: 22vh;
		}
	}
	.loadding {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-image: url('../../static/title_loading.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: 50%;
		z-index: 9999;
		background-color: rgba(0, 0, 0, 0.75);
		display: flex;
		align-items: center;
		justify-content: center;
		.ai-progress {
			position: relative;
			top: -20vw;
			width: 500rpx;
		}
		.progress {
			position: relative;
			top: -20vw;
			width: 400rpx;
			height: 12px;
			border-radius: 6px;
			position: relative;
			border: 1rpx solid #fff;
			background-color: #fff;
		}
		
		.rate {
			position: absolute;
			left: 0;
			top: 0;
			background: -webkit-linear-gradient(72.31deg, #ffe2a1 0%, #e8bb68 100%);
			height: 12px;
			border-radius: 6px;
			transition:width 0.35s;
		}
		
		.icon_speed {
			position: absolute;
			right: 0;
			top: -2px;
			width: 16px;
			height: 16px;
			background-image: url('../../static/icon_speed.of.progress.png');
			background-size: 100% 100%;
		}
		
		.nums {
			width: 100rpx;
			position: absolute;
			right: -36rpx;
			top: 42rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		
		.progress-text {
			font-size: 24rpx;
			color: #FFF;
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
				width: 80%;
				height: 200rpx;
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
