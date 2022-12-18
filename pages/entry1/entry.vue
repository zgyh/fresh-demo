<template>
	<view class="content" :class="lang">
		<view class="bg">
			<!-- <image :src="bgImg" mode="heightFix"></image> -->
		</view>
		<view class="wanwa" v-if="goPlayShow">
			<image @click="goPlay" mode="widthFix" :src="`${env.resourcesUrl}/zh-CN/Game.play.png`"></image>
		</view>
		<navigation-bar>
			<view class="lang-bar">
				<text v-for="lang in langBtns" :key="lang.value" @click="onLangChange(lang)">
					{{ lang.text }}
				</text>
			</view>
		</navigation-bar>
		
		<view class="footer-container">
			<button class="start-game-btn" hover-class="press-style" @click="start()">开 始 游 戏</button>
			<view class="agreement-row">
				<view @click="onAgreementChange()">
					<image class="icon-agreement" v-show="!isAgree" src="../../static/choice_b.png"></image>
					<image class="icon-agreement" v-show="isAgree" src="../../static/choice_a.png"></image>
				</view>
				<text>授权同意隐私协议与用户手册</text>
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
import clause from '../../component/clause.vue';

export default {
	components: { NavigationBar, clause },
	data() {
		return {
			env,
			langBtns,
			lang: langBtns[1].value,
			isAgree: false,
			confirmedOpen: false,
			goPlayShow: false
		};
	},
	computed: {
		bgImg() {
			return `${this.env.resourcesUrl}/${this.lang}/background.png`
		}
	},
	onLoad(query) {
		console.log(query);
		console.log(this.$globalData);
	},
	methods: {
		start() {
			
			this.goPlayShow = true;
		},
		goPlay() {
			uni.redirectTo({
				url: '/pages/game/index'
			});
		},
		onLangChange(lang) {
			this.lang = lang.value;
		},
		onAgreementChange() {
			this.isAgree = !this.isAgree;
			if(this.isAgree) {
				this.confirmedOpen = true;
			}
		},
		onConfirm() {
			this.confirmedOpen = false;
		}
	}
};
</script>

<style scoped lang="scss">
.zh-CN {
	$lang: "/zh-CN/";
	.bg {
		background-image: url($IMG_URL+$lang+"background.png");
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
	background: -webkit-linear-gradient(300.46deg, #f3c588 0%, #d9a36e 100%);
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
		.start-game-btn {
			padding: 0;
			width: 368rpx;
			height: 96rpx;
			border: none;
			background: -webkit-linear-gradient(300.46deg, #d9a36e 0%, #f3c588 100%);
			color: $uni-text-color;
			font-size: 32rpx;
			line-height: 96rpx;
			border-radius: 0;
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
		min-height: 896px;
		background-size: 100% auto;
		// background-repeat: repeat;
		z-index: 1;
		image {
			width: 100vw;
			height: 100vh;
		}
	}
	
	.wanwa {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		image {
			width: 100%;
		}
	}
}
</style>
