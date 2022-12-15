<script>
export default {
	onLaunch: function() {
		console.log("App Launch");
		// 获取系统信息
		const systemInfo = uni.getSystemInfoSync();
		// 胶囊按钮位置信息
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		// 导航栏高度 = 状态栏高度 + 44
		this.$globalData.navBarHeight = systemInfo.statusBarHeight + 44;
		this.$globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
		this.$globalData.menuTop = menuButtonInfo.top;
		this.$globalData.menuHeight = menuButtonInfo.height;
	},
	onShow: function() {
		console.log("App Show");
	},
	onHide: function() {
		console.log("App Hide");
	}
};
</script>

<style>
/*每个页面公共css */
</style>
