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
		this.$globalData.model = systemInfo.model;
	},
	onShow: function() {
		console.log("App Show");
	},
	onHide: function() {
		console.log("App Hide");
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
button {
	position: relative;
	display: block;
	margin-left: auto;
	margin-right: auto;
	padding-left: 0px;
	padding-right: 0px;
	box-sizing: border-box;
	// font-size: 18px;
	text-align: center;
	text-decoration: none;
	// line-height: 1;
	line-height: 1.35;
	// border-radius: 5px;
	-webkit-tap-highlight-color: transparent;
	overflow: hidden;
	color: #000000;
	background-color: #fff;
	width: 100%;
	height: 100%;
	border-radius: 0;
	&:after {
		border: none;
	}
	
}

</style>
