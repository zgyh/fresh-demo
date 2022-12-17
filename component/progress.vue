<template>
	<view class="progress">
		<view class="rate" :style="{ width: rate === 0 ? rate + '16px' : rate + '%' }">
			<view class="icon_speed"></view>
			<view class="nums">
				<image :src="productImg"></image>
				<view class="progress-text">{{`进度${rate}%`}}</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import { env } from "../difine.js"
	export default {
		props: {
			rate: {
				type: Number
			}
		},
		data() {
			return {
				productImg: `${env.resourcesUrl}/zh-CN/product.img_fresh_b.png`
			};
		}
	}
</script>

<style scoped lang="scss">
.progress {
	width: 100%;
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
	background-image: url('../static/icon_speed.of.progress.png');
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
	image {
		width: 42rpx;
		height: 38rpx;
	}
}

.progress-text {
	font-size: 20rpx;
	color: #381E15;
}
</style>
