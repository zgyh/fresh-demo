<template>
	<view class="nav-bar" :style="{height:`${navBarHeight}px`}"><slot></slot></view>
</template>

<script>
	export default {
		data() {
			return {
				navBarHeight: this.$globalData.navBarHeight
			}
		}
	}
</script>

<style scoped>
.nav-bar {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 9999;
}
</style>
