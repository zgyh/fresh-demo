<template>
	<view class="content">
		<!-- <view class="bg">
			<image src='https://gitee.com/YanHuZheng/asset/raw/master/gif/guangsu.gif'></image>
		</view> -->
		<!-- <view class="progress-container">
			<progress-bar :rate="50"></progress-bar>
		</view> -->
		<view class="progress-container">
			<count-down></count-down>
		</view>
	</view>
</template>

<script>
// import progressBar from "../../component/progress.vue"
import countDown from "../../component/count-down.vue"
export default {
	components: { countDown },
	data() {
		return {

		};
	},
	onLoad(query) {
		console.log(query);
		
	},
	methods: {
		
	}
};
</script>

<style scoped lang="less">
.content {
	width: 100vw;
	height: 100vh;
}

.progress-container {
	position: relative;
	top: 20vh;
	background-color: bisque;
	padding: 50px;
}

</style>
