<template>
	<view class="content" :class="lang">
		<view class="bg"></view>
		<view class="lang-bar">
			<text v-for="lang in langBtns" :key="lang.value" @click="onLangChange(lang)">
				{{ lang.text }}
			</text>
		</view>
		<view class="start-game-container">
			<button class="start-game-btn" hover-class="press-style" @click="start()">开 始 游 戏</button>
		</view>
	</view>
</template>

<script>
import { langBtns } from "../../difine.js";

export default {
	data() {
		return {
			langBtns,
			lang: langBtns[1].value
		};
	},
	onLoad(query) {
		console.log(query);
	},
	methods: {
		start() {
			uni.navigateTo({
				url: '/pages/game/index'
			});
		},
		onLangChange(lang) {
			this.lang = lang.value;
		}
	}
};
</script>

<style lang="scss">
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
	min-height: 896px;
	background: -webkit-linear-gradient(300.46deg, #f3c588 0%, #d9a36e 100%);
	.lang-bar {
		position: fixed;
		top: 7.5vh;
		width: 100%;
		display: flex;
		justify-content: center;
		color: $uni-text-color;
		z-index: 10;
		text {
			font-size: $uni-font-size-lg;
			padding: 14rpx 28rpx;
			text-align: center;
		}
	}

	.start-game-container {
		position: fixed;
		top: 80vh;
		width: 100%;
		display: flex;
		justify-content: center;
		z-index: 10;
		.start-game-btn {
			padding: 0;
			width: 368rpx;
			height: 96rpx;
			border: none;
			background: -webkit-linear-gradient(300.46deg, #d9a36e 0%, #f3c588 100%);
			color: #714515;
			font-size: 32rpx;
			line-height: 96rpx;
		}
		.press-style {
			box-shadow: 0 0 16rpx rgba(195, 228, 212, 0.767);
		}
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
	}
}
</style>
