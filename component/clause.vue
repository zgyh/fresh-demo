<template>
	<view class="clause">
		<view class="clause-content">
			<view class="title"><text class="title_x">活动条款及细则</text></view>
			<view class="text">
				<text class="row">
					这是您和Fresh F21C Hong Kong Limited （以下简称为Fresh）之间的协议。
				</text>
				<text class="row">
					请于参加「fresh红茶凝时抗老奇迹」（以下简称为「本小程序」）之间的协议前仔细阅读以下的所有协议内容。
				</text>
				<text class="row">
					您参加此活动须受以下的条款及细则（「条款及细则」）约束，并与Fresh构成具法律效力的协议（「协议」）。
				</text>
				<text class="row">
					您必须阅读本协议并接受所有条款及细则，参加此活动表示您确认您已经阅读并愿意遵守所有条款及细则，以及受本协议约束。
				</text>
				<text class="row">「本小程序」的活动条款及细则:</text>
				<text class="row">1.此活动由Fresh举办。</text>
				<text class="row">
					2.此活动将于fresh红茶凝时抗老奇迹微信小程序上举行。活动期由2023年1月1日00：00至2023年3月31日晚上11：59pm（香港时间「活动期」），活动期外提交的所有活动纪录均视作无效。
				</text>
				<text class="row">3.所有参加者必须年满18岁。 Fresh的员工均不可参与此活动。</text>
				<text class="row">
					4.参加者只需要在指定小程序内提交所需电话号码及完成寻找「红茶凝时面霜生成器」即可参加活动。无需消费及完成其他的特别步骤。
				</text>
				<text class="row">
					5.每位参加者於整个活动期間只可到Fresh免税专柜或快闪店领取活动礼品1次。领取活动礼品前必须出示「红茶凝时面霜生成器」完成页面核实。
				</text>
				<text class="row">
					6.是次活动的活动参与奖 （每人只可换领一次）-完成寻找火山茶小游戏即可到Fresh免税专柜或快闪店领取Fresh皇牌产品试用装一份（不包括中国、韩国免税），礼品数量有限，Fresh将保留不时更改礼物及不作另行通知之权利。每位参加者必须确保填写的登记资料均为正确，领取奖品时Fresh将会核对登记时所填写的个人资料。如有任何争议。 Fresh将拥有最终决定权。
				</text>
				<text class="row">
					7.完成「红茶凝时面霜生成器」参加者可于Globuy平台登记领取试用。礼品数量有限，Fresh将保留不时更改礼物及不作另行通知之权利。每位参加者必须确保填写的登记资料均为正确，领取奖品时Globuy将会核对登记时所填写的个人资料。
					如有任何争议。 Fresh将拥有最终决定权。
				</text>
				<text class="row">
					8.参加者需向Globuy提交产品反反馈方可额外获取30日产品体验套装。领取奖品时Globuy将会核对提交资料。如有任何争议。 Fresh将拥有最终决定权。
				</text>
				<text class="row">
					9.如因参加者或得奖者因违规或非法行为导致Fresh或第三方损失，有关参加者或得奖者须负上一切法律责任。
				</text>
				<text class="row">10.所有奖品不得转让、退换、兑换现金或任何其他产品。</text>
				<text class="row">
					11.本活动的参加者同意并授权主办方搜集、处理、储存及使用其个人资料作是次及日后宣传及推广之用。
				</text>
				<text class="row">
					12.本活动之主办单位、市场推广合作伙伴或任何相关人士或一方，均毋须对参加者如因参与此活动或得到任何奖品所引致之任何损失或损毁（非直接或引发性之损失）或人身伤害负伤任何责任。
				</text>
				<text class="row">
					13.如发现参加者以空号或假账户、插件或其他非正式途径参加此活动，或以任何程序扰乱或操控活动，本公司将取消该参加者之参加及换领资格，而不作另行通知。
				</text>
				<text class="row">
					14.若此活动因但不限于计算机病毒感染、蠕虫或木马程序、服务器入侵、篡改、未经授权的干预、欺诈、技术故障或任何其他主办单位控制以外的原因，而破坏或影响系统安全性、公平性、诚信及此活动的正常运作，Fresh有权取消有关参加者的资格，而无须发出事先通知。
				</text>
				<text class="row">15.一切有关此活动的数据均以Fresh记录为准。</text>
				<text class="row">
					16.Fresh对本条款及条件拥有绝对解释权。 如有任何争议，Fresh将拥有最终决定权。
				</text>
				<text class="row">17.参加者只要参加本活动，即表示同意遵守以上所有条款及细则。</text>
			</view>
		</view>
		<button class="queren" @click="onConfirm()">确 认</button>
	</view>
</template>

<script>
	export default {
		props: {
			confirm: Function
		},
		methods: {
			onConfirm() {
				this.$emit('confirm');
			}
		}
	}
</script>

<style scoped lang="scss">
.clause {
	position: relative;
	margin: 0 auto;
	background: -webkit-linear-gradient(180deg, #ffe1a0 0%, #e7b076 46.01%, #c58a57 100%);
	width: 90vw;
	height: 70vh;
	padding: 8rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.clause-content {
		position: relative;
		padding: 0 22rpx;
		height: 100%;
		background-color: #fff;
		
		&:after {
			content: "";
			position: absolute;
			bottom: 72rpx;
			width: calc(100% - 44rpx);
			height: 25px;
			background: -webkit-linear-gradient(rgba(255, 255, 255, 0.001), white); 
			pointer-events: none;
		}
		.title {
			position: relative;
			color: #3a1c00;
			font-size: 36rpx;
			height: 100rpx;
			text-align: center;
			&:after {
				content: "";
				position: absolute;
				left: 0;
				top: 100rpx;
				width: 100%;
				height: 25px;
				background: -webkit-linear-gradient(white, rgba(255, 255, 255, 0.1)); 
				pointer-events: none;
			}
			.title_x {
				position: relative;
				letter-spacing: 3.6px;
				line-height: 36px;
				&:after {
					position: absolute;
					left: 0;
					content: "";
					display: block;
					width: 100%;
					height: 2rpx;
					background: linear-gradient(63.52deg, #28130f 0%, #c58a57 48.94%, #2b140f 100%);
				}
			}
		}
		.text {
			position: relative;
			height: calc(100% - 172rpx);
			overflow-y: auto;
			.row {
				display: block;
				margin-bottom: 40rpx;
				color: #333333;
				font-size: 24rpx;
				// word-spacing:15px;
				letter-spacing: 0.6px;
				text-align: justify;
			}
		}
	}

	.queren {
		position: absolute;
		bottom: -48rpx;
		padding: 0;
		width: 368rpx;
		height: 96rpx;
		border: none;
		background: -webkit-linear-gradient(300.46deg, #d9a36e 0%, #f3c588 100%);
		color: $uni-text-color;
		font-size: 40rpx;
		line-height: 96rpx;
		border-radius: 0;
		z-index: 100;
	}
}
</style>
