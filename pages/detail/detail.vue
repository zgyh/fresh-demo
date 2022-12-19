<template>
	<view class="detail">
		<view class="header-container">
			<view>
				<image class="logo" src="../../static/logo.png"></image>
			</view>
		 <view class="kanglao">28天抗老见证</view>
		 <view class="mianshui">
			 <text>-</text>
			 <text>免税专享</text>
			 <text>体验官招募</text>
			 <text>-</text>
		 </view>	 
		</view>
		
		<view class="page">
			<view class="item">
				<image :src="`${env.resourcesUrl}/zh-CN/details_ background.png`"></image>
			</view>
			<view class="footer-container">
				<view class="dengji">
					<view class="btn">
						<view class="icon"></view>
						<view class="text">登记成为体验官</view>
					</view>
					<view class="tips">（限首500名）</view>
				</view>
				<view class="jingxi">请亲临<text>fresh</text>免税店专柜发掘更多惊喜好礼!</view>
				<view class="side"></view>
				<view class="xiahua">下滑页面查看产品详情</view>
				<view class="tips_bot">*每人只限换领一次，数量有限，送完即止。只限于Fresh免稅店专柜</view>
			</view>
		</view>
		<view class="item">
			<image
				mode="widthFix"
				:src="`${env.resourcesUrl}/zh-CN/details_simplified.chinese.png`"
			></image>
		</view>
		<view class="banner">
			<view class="banner-content">
				<swiper class="swiper" :indicator-dots="false" :autoplay="false" :duration="500" @change="onChange">
					<block v-for="item in list" :key="this">
						<swiper-item>
							<view class="swiper-item">
								<view class="item-content">
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
				<text>*数据源于第三方实验室，经过29名受试者使用产品8周后，基于自我评估问卷中与初次使用对比得出的结果。仅供参考，实际效果因人而异</text>
				<text>*数据源于第三方实验室，经过30名受试者使用产品4周后，基于自我评估问卷中与初次使用对比得出的结果。仅供参考，实际效果因人而异1 经11名试用者通过仪器测试得出的结果。仅供参考，实际效果因人而异。</text>
				<text>2 数据源于临床试验，经22名受试者持续四周后得出的结果。仅供参考，实际效果因人而异。</text>
				<text>3 数据源于第三方实验室，经过33名中国受试者（27名女性，6名男性，43~60岁）,每天使用两次产品于面部与颈部8周后，基于自我评估中平滑、细纹、毛孔、弹嫩（饱满和弹性）和光采程度综合评价得出的结果。仅供参考，实际效果因人而异。</text>
				<text>4 经32名受试者持续使用产品4周后，通过自我评估得出的结果。用后肌肤即时提升。数据只供参考，实际效果因人而异。</text>
				<text>5 数据源于第三方实验室，经过30名受试者使用产品4周后，基于自我评估问卷中与初次使用对比得出的结果。仅供参考，实际效果因人而异</text>
				<text>6经32名试用者持续使用产品4周后，通过自我评估得出的结果。数据只供参考，实际效果因人而异。</text>
				<text>7 经32名受试者持续使用产品4周后，通过自我评估得出的结果。数据只供参考，实际效果因人而异。</text>
			</view>
		</view>
	</view>
</template>

<script>
import { env } from "../../difine.js";
import swiperDot from "@/component/swiperDot/swiperDot.vue"
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
			uni.redirectTo({
				url: '/pages/entry1/entry'
			})
		},
		onChange(e) {
			 this.current = e.detail.current;
		}
	}
};
</script>

<style scoped lang="scss">
.detail {
	position: relative;
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
		.logo {
			width: 300rpx;
			height: 124rpx;
		}
	 .kanglao {
		 margin-top: 50rpx;
		 font-size: 48rpx;
		 color: #461F00;
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
			bottom: 15px;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			justify-content: space-between;
			
			.dengji {
				width: 394rpx;
				height: 82rpx;
				background-image: url($IMG_URL+'/zh-CN/button_b.png');
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
					width: 31.78rpx;
					height: 38.22rpx;
					background-image: url('../../static/icon_register_b.png');
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
				background-image: url('../../static/icon_slide.png');
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
		background: linear-gradient(89.98deg, #f9ecb4 0%, #f3c186 48.94%, #da9e6b 100%);
		.banner-content {
			padding: 10rpx;
			width: 644rpx;
			background: transparent;
			border: 4rpx solid #fff;

			.swiper {
				height: 884rpx;
			}
			.item-content {
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
