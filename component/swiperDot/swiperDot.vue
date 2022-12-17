<template>
	<view class="dot-main">
		<view
			:class="['dot-item', current == index ? 'active' : '']"
			v-for="(item, index) in list"
			:key="index"
		></view>
	</view>
</template>
<style>
.dot-main {
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
}
.dot-item {
	width: 16rpx;
	height: 16rpx;
	background: #f9c99c;
	margin: 0 6upx;
	box-sizing: border-box;
	border-radius: 8rpx;
}
.active {
	background: #a5662e;
}
</style>
<script>
export default {
	props: ["list", "current"],
	data() {
		return {};
	}
};
</script>
