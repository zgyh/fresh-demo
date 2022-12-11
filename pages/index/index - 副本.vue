<template>
	<view class="content">
		<view class="xe" :id='`xe${xe.id}`' v-for="xe in xelist" :key="xe.id" :style="{left: xe.x + 'px', top: xe.top}"></view>
		<movable-area class="pingzi">
			<movable-view id="view" direction="horizontal" :x="x" :y="y" @change="onChange" class="aa">
				text
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
import { randomX } from '../../util.js'
const INTERVAL_TIME = 10;
const XE_ID = 0;
const XE_W = 20;
const XE_H = 20;
export default {
	data() {
		return {
			body: {
				width: 0,
				height: 0
			},
			title: "Hello",
			x: 0,
			y: 0,
			xelist: []
		};
	},
	onLoad() {
		const query_content = uni.createSelectorQuery().in(this);
		query_content
			.select(".content")
			.boundingClientRect(data => {
				this.body.width = data.width;
				this.body.height = data.height;
				const x = randomX(20, this.body.width - 20);
				let xe = this.createXe(x, 0);
				this.xelist.push(xe);
				let i = 0;
				let xe1 = this.xelist[0];
				this.runMove(xe1);
				// setInterval(() => {
				// 	const x = randomX(20, this.body.width - 20);
				// 	let xe = this.createXe(x, 0);
				// 	this.xelist.push(xe);
				// 	i+=1;
				// 	this.runMove(this.xelist[i]);
				// }, 2000);
			})
			.exec();
	},
	methods: {
		createXe(x, y) {
			let id = XE_ID + 1;
			return {
				id,
				x: x,
				y: y,
				top: '',
				width: XE_W,
				height: XE_H
			};
		},
		runMove(xe) {
			 let interval = setInterval(() => {
				xe.y += 1;
				xe.top = xe.y + "px";
				const query = uni.createSelectorQuery().in(this);
				query
					.select(`#xe${xe.id}`)
					.boundingClientRect(data => {
						// console.log(data);
						if (data.top === 653 - 20) {
							// clearInterval(interval);
							console.log(`${xe.id}--碰撞了。。。。`);
						}
					})
					.exec();
			}, INTERVAL_TIME);
		},
		onChange(e) {
			const query = uni.createSelectorQuery().in(this);
			query
				.select("#view")
				.boundingClientRect(data => {
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
				})
				.exec();
		}
	}
};
</script>

<style lang="less">
.content {
	position: relative;
	height: 100vh;
}
.pingzi {
	position: absolute;
	bottom: 40px;
	left: 0;
	width: 100vw;
	height: 60px;
	.aa {
		background-color: red;
		width: 50px;
		height: 60px;
	}
}

.xe {
	position: absolute;
	width: 20px;
	height: 20px;
	background-color: blue;
}
</style>
