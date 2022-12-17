<template>
	<view class="count-down">
		<text>{{ `${second}S` }}</text>
	</view>
</template>

<script>
	let timeout = null;
	export default {
		props: {
			stop: {
				type: Function
			}
		},
		data() {
			return {
				second: 30
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
				this.startDown();
			}
		}
	}
</script>

<style scoped lang="scss">
.count-down {
	width: 68rpx;
	height: 68rpx;
	line-height: 68rpx;
	background-image: url('../static/icon_clock.png');
	background-position: center;
	background-size: 100%;
	text-align: center;
	text {
		color: #fff;
		font-size: 26rpx;
	}
}
</style>
