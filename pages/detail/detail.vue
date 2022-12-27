<template>
	<view class="detail">
		<view class="header-container">
			<image
				class="logg"
				:src="`${env.resourcesUrl}/zh-CN/img_title_2.png`"
				mode="widthFix"
			></image>
			<image @click="goMain()" class="buy" src="../../static/icon_float_buy.png" mode="widthFix"></image>
		</view>
		<view class="page">
			<view class="item1">
				<image
					class="marker_500"
					:src="`${env.resourcesUrl}/zh-CN/icon_corner.marker_500.png`"
					mode="widthFix"
				></image>
				<image :src="`${env.resourcesUrl}/zh-CN/version_img.png`" mode="widthFix"></image>
				<view class="product-name">红茶凝时焕活面霜</view>
			</view>
			<view class="footer-container">
				<view class="dengji">
					<view class="btn">
						<view class="icon"></view>
						<view class="text">免费申领</view>
					</view>
				</view>
				<!-- <view class="jingxi">请亲临<text>fresh</text>免税店专柜领取精美礼品一份！*</view> -->
				<view class="side"></view>
				<view class="xiahua">下滑页面查看产品详情</view>
				<!-- <view class="tips_bot">*每人只限换领一次，数量有限，送完即止。只限于Fresh免稅店专柜</view> -->
			</view>
		</view>
		<view class="item">
			<image mode="widthFix" :src="`${env.resourcesUrl}/zh-CN/img_details_a.png`"></image>
		</view>
		<view style="font-size: 0;">
			<video
				style="width: 100%; height: 240px;"
				src="https://wanzhuan-activity.oss-cn-hangzhou.aliyuncs.com/assets/zh-CN/fresh_detailA.mp4"
				:controls="false"
				autoplay
				loop
				object-fit="cover"
			></video>
		</view>
		<view class="item">
			<image mode="widthFix" :src="`${env.resourcesUrl}/zh-CN/img_details_b.png`"></image>
		</view>
		<view style="font-size: 0;">
			<video
				style="width: 100%; height: 240px;"
				src="https://wanzhuan-activity.oss-cn-hangzhou.aliyuncs.com/assets/zh-CN/fresh_detailB.mp4"
				:controls="false"
				autoplay
				loop
				object-fit="cover"
			></video>
		</view>
		<view class="item">
			<image mode="widthFix" :src="`${env.resourcesUrl}/zh-CN/img_details_c.png`"></image>
		</view>
		<view class="banner">
			<view class="banner-content">
				<swiper
					class="swiper"
					:indicator-dots="false"
					:autoplay="false"
					:duration="500"
					@change="onChange"
				>
					<block v-for="(item, index) in list" :key="index">
						<swiper-item>
							<view class="swiper-item">
								<view class="item-content">
									<view class="btn" @click="toDetailPage(index)"></view>
									<view class="btn1" @click="toDetailPage(index)">立即购买</view>
									<image mode="widthFix" :src="`${env.resourcesUrl}/zh-CN/${item}.png`"></image>
								</view>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<swiper-dot class="dot" :current="current" :list="list"></swiper-dot>
			<view class="more">左右滑动寻找更多</view>
			<view class="back"><button @click="backHome">返回主页</button></view>
			<view class="ps">
				<text>
					*数据源于第三方实验室，经过29名受试者使用产品8周后，基于自我评估问卷中与初次使用对比得出的结果。仅供参考，实际效果因人而异
				</text>
				<text>
					*数据源于第三方实验室，经过30名受试者使用产品4周后，基于自我评估问卷中与初次使用对比得出的结果。仅供参考，实际效果因人而异
				</text>
				<text>1 经11名试用者通过仪器测试得出的结果。仅供参考，实际效果因人而异。</text>
				<text>
					2 数据源于临床试验，经22名受试者持续四周后得出的结果。仅供参考，实际效果因人而异。
				</text>
				<text>
					3
					数据源于第三方实验室，经过33名中国受试者（27名女性，6名男性，43~60岁）,每天使用两次产品于面部与颈部8周后，基于自我评估中平滑、细纹、毛孔、弹嫩（饱满和弹性）和光采程度综合评价得出的结果。仅供参考，实际效果因人而异。
				</text>
				<text>
					4
					经32名受试者持续使用产品4周后，通过自我评估得出的结果。用后肌肤即时提升。数据只供参考，实际效果因人而异。
				</text>
				<text>
					5
					数据源于第三方实验室，经过30名受试者使用产品4周后，基于自我评估问卷中与初次使用对比得出的结果。仅供参考，实际效果因人而异
				</text>
				<text>
					6 经32名试用者持续使用产品4周后，通过自我评估得出的结果。数据只供参考，实际效果因人而异。
				</text>
				<text>
					7 经32名受试者持续使用产品4周后，通过自我评估得出的结果。数据只供参考，实际效果因人而异。
				</text>
			</view>
		</view>
	</view>
</template>

<script>
import { env } from "../../difine.js";
import swiperDot from "@/component/swiperDot/swiperDot.vue";
export default {
	components: { swiperDot },
	data() {
		return {
			env,
			list: [
				"introduce_01",
				"introduce_02",
				"introduce_03",
				"introduce_04",
				"introduce_05",
				"introduce_06",
				"introduce_07"
			],
			current: 0
		};
	},
	onLoad() {},
	methods: {
		backHome() {
			uni.navigateBack();
		},
		onChange(e) {
			this.current = e.detail.current;
		},
		goMain() {
			wx.navigateToMiniProgram({
				appId: "wxd8df280e2b1b5d13",
				path: 'pages/home/index?weappShareInfo=/tabs/categoryBrand/freshIndex?zmsySubsiteId=1',
				success(res) {
					console.info(res);
					// 打开成功
				}
			});
		},
		toDetailPage(i) {
			let arr = [
				"pages/home/index?weappShareInfo=/tabs/index/productInfo&productId=550253&goodsId=671046",
				"pages/home/index?weappShareInfo=/tabs/index/productInfo&productId=401293&goodsId=525465",
				"pages/home/index?weappShareInfo=/tabs/index/productInfo&productId=601460&goodsId=722255",
				"pages/home/index?weappShareInfo=/tabs/index/productInfo&productId=467991&goodsId=592583",
				"pages/home/index?weappShareInfo=/tabs/categoryBrand/freshIndex?zmsySubsiteId=1",
				'pages/home/index?weappShareInfo=/tabs/index/productInfo&productId=288511&goodsId=517824',
				"pages/home/index?weappShareInfo=/tabs/index/productInfo&productId=287240&goodsId=516996"
			];
			if(arr[i]) {
				wx.navigateToMiniProgram({
					appId: "wxd8df280e2b1b5d13",
					path: arr[i],
					success(res) {
						console.info(res);
						// 打开成功
					}
				});
			}
		
		}
	}
};
</script>

<style scoped lang="scss">
.detail {
	position: relative;
	background: linear-gradient(90deg, #f9ecb4 0%, #f3c186 35%, #da9e6b 100%);
	.header-container {
		position: absolute;
		padding-top: 8vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		justify-content: space-between;
		z-index: 1;
		.logg {
			width: 80vw;
		}
		.buy {
			position: absolute;
			top: 12vh;
			right: 0;
			width: 100rpx;
		}
		.logo {
			width: 300rpx;
			height: 124rpx;
		}
		.kanglao {
			margin-top: 50rpx;
			font-size: 48rpx;
			color: #461f00;
			letter-spacing: 8rpx;
		}
		.mianshui {
			margin-top: 50rpx;
			font-size: 40rpx;
			letter-spacing: 0.2rpx;
			text-align: center;
			color: #391c00;
			display: flex;
			justify-content: space-around;
			width: 520rpx;
			height: 56rpx;
			background: rgba(255, 255, 255, 0.45);
		}
	}

	.page {
		position: relative;
		width: 100vw;
		height: 100vh;

		.footer-container {
			position: absolute;
			width: 100%;
			bottom: 30px;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			justify-content: space-between;

			.dengji {
				width: 394rpx;
				height: 82rpx;
				background-image: url($IMG_URL+"/zh-CN/button_b.png");
				background-size: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.btn {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.icon {
					width: 36.78rpx;
					height: 36.22rpx;
					background-image: url("../../static/icon_register_b.png");
					background-repeat: no-repeat;
					background-position: center;
					background-size: 100%;
					margin-right: 14rpx;
				}
				.text {
					font-size: 32rpx;
					letter-spacing: 0.1rpx;
					text-align: center;
					color: #fff;
				}
				.tips {
					font-size: 16rpx;
					text-align: center;
					color: #fff;
				}
			}

			.jingxi {
				margin-top: 32rpx;
				font-size: 28rpx;
				letter-spacing: 0.2rpx;
				text-align: center;
				color: #371b00;
			}

			.side {
				margin-top: 40rpx;
				width: 60rpx;
				height: 48rpx;
				background-image: url("../../static/icon_slide.png");
				background-position: center;
				background-size: contain;
				background-repeat: no-repeat;
			}

			.xiahua {
				font-size: 20rpx;
				letter-spacing: 0.2rpx;
				text-align: center;
				color: #371b00;
			}

			.tips_bot {
				margin-top: 32rpx;
				font-size: 20rpx;
				text-align: center;
				color: #371b00;
			}
		}
	}
	.item1 {
		width: 100%;
		position: absolute;
		top: 32vh;

		image {
			width: 100%;
		}
		.marker_500 {
			width: 140rpx;
			position: absolute;
			right: 12vw;
			top: 15vw;
		}
		.product-name {
			position: absolute;
			top: 85vw;
			color: #fff;
			font-size: 28rpx;
			width: 100%;
			text-align: center;
		}
	}
	.item {
		height: 100%;
		font-size: 0;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.banner {
		position: relative;
		top: -1px;
		padding: 5vh 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.banner-content {
			padding: 10rpx;
			width: 644rpx;
			background: transparent;
			border: 4rpx solid #fff;

			.swiper {
				height: 884rpx;
			}
			.item-content {
				position: relative;

				.btn {
					position: absolute;
					right: 10%;
					top: 5vw;
					width: 80%;
					height: 80rpx;
					background-color: transparent;
				}
				.btn1 {
					position: absolute;
					right: 3vw;
					bottom: 7vw;
					width: 160rpx;
					height: 55rpx;
					background: linear-gradient(270deg, #b93b29 0%, #a22e1e 100%);
					color: #fff;
					font-size: 28rpx;
					line-height: 55rpx;
					text-align: center;
				}
				image {
					width: 100%;
				}
			}
		}
		.dot {
			margin-top: 54rpx;
		}
		.more {
			margin-top: 28rpx;
			font-size: 32rpx;
			letter-spacing: 0.2rpx;
			line-height: 44rpx;
			text-align: center;
			color: #371b00;
		}
		.back {
			margin: 54rpx 0;
			button {
				width: 283.48rpx;
				height: 84rpx;
				line-height: 84rpx;
				background: linear-gradient(300.46deg, #d9a36e 0%, #f3c588 100%);
				font-size: 40rpx;
				letter-spacing: 0.2rpx;
				color: #714515;
			}
		}
		.ps {
			width: 644rpx;
			text {
				display: block;
				font-size: 24rpx;
				letter-spacing: 0.2rpx;
				line-height: 40rpx;
				text-align: left;
				color: #fff;
			}
		}
	}
}
</style>
