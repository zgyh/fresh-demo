<template>
	<view class="count-down" :style="{backgroundImage:'url('+img+')', lineHeight: lh}">
		<text>{{ `${second}S` }}</text>
	</view>
</template>
<script>
	const img1 = require('../static/clock_red.gif');
	const img = require('../static/icon_clock.png');
	let timeout = null;
	export default {
		props: {
			stop: {
				type: Function
			}
		},
		data() {
			return {
				second: 30,
				img: img, //'../static/icon_clock.png'
				lh: '88rpx'
			};
		},
		mounted() {
			this.startDown();
		},
		methods: {
			startDown() {
				const that = this;
				setTimeout(function calle() {
					that.second -= 1;
					 if(that.second === 5) {
						 that.img = img1
						 that.lh = '78rpx'
					 }
					if(that.second === 0) {
						that.$emit('stop');
						clearTimeout(timeout);
						return;
					}
					timeout = setTimeout(calle, 1000)
				},1000)
			},
			stopDown() {
				clearTimeout(timeout);
			},
			restart() {
				this.second = 30;
				this.lh = '88rpx';
				this.img = img;
				this.startDown();
			}
		}
	}
</script>

<style scoped lang="scss">
.count-down {
	width: 88rpx;
	height: 88rpx;
	line-height: 88rpx;
	background-image: url('../static/icon_clock.png');
	background-position: center;
	background-size: 100%;
	background-position: center;
	text-align: center;
	text {
		color: #fff;
		font-size: 26rpx;
	}
}
</style>
