const environment = {
	'test': {
		apiUrl: 'http://58.32.41.42:3020/track',
		resourcesUrl: 'https://wanzhuan-activity.oss-cn-hangzhou.aliyuncs.com/assets'
	},
	'production': {
		apiUrl: 'https://www.xuanzhen-tech.com/api/track',
		resourcesUrl: 'https://wanzhuan-activity.oss-cn-hangzhou.aliyuncs.com/assets'
	}
}

export const env = environment['production'];

export const language = {
	'zh-CN': 'zh-CN',
	'zh-HK': 'zh-HK',
	'en-US': 'en-US',
	'KR': 'KR'
}

export const langBtns = [{
		text: 'EN',
		value: language['en-US']
	},
	{
		text: '简',
		value: language['zh-CN']
	},
	{
		text: '繁',
		value: language['zh-HK']
	}, {
		text: '한국어',
		value: language['KR']
	}
];


export const i18n = {
	'zh-CN': {
		home: {
			productName: '红茶凝时焕活面霜',
			productSubTitle: '全新上市!',
			buttonName: '探 秘 赢 好 礼',
			agreement: '授权同意隐私协议与用户手册',
			ps: '*源自第三方实验室数据，经检测产品不含视黄醇',
			tabbar1: '登记成为体验官',
			tabbar2: '点击购买',
			wanfaBtn: '我知道了'
		},
		game: {
			progress: '进度',
			tips1: '左 右 移 动 瓶 身',
			tips2: '接 住 正 确 的成 分 气 泡',
			again: '再试一次',
			hclt: '红茶立体抗衰老成分',
			jsw: '角鲨烷',
			ysj: '艳山姜',
			sjxa: '神经酰胺NP',
			shanghai: '-伤害皮肤因子'
		},
		detail: {
			productName: '红茶凝时焕活面霜',
			jingxi: '请亲临fresh免税店专柜领取精美礼品一份!*',
			haoli1: '请亲临fresh免税店专柜',
			haoli2: '发掘更多惊喜好礼!*',
			more: '下滑页面查看产品详情',
			ps: '*每人只限换领一次，数量有限，送完即止。只限于Fresh免稅店专柜',
			btn: '免费申领',
			back: '返回主页',
			slide: '左右滑动寻找更多',
			shop: '立即购买'
		}
	},
	'zh-HK': {
		home: {
			productName: '紅茶凝時煥活面霜',
			productSubTitle: '全新上市!',
			buttonName: '探秘贏好禮',
			agreement: '授權同意隱私協定與用戶手冊',
			ps: '*源自協力廠商實驗室數據，經檢測產品不含視黃醇',
			tabbar1: '登记成为体验官',
			tabbar2: '瞭解更多',
			wanfaBtn: '我知道了'
		},
		game: {
			progress: '進度',
			tips1: '左 右 移 動 瓶 身',
			tips2: '接 住 正 確 的 成 分 氣 泡',
			again: '再試一次',
			hclt: '紅茶立體抗老成分',
			jsw: '角鯊烷',
			ysj: '艷山姜',
			sjxa: '神經醯胺NP',
			shanghai: '-傷害皮膚因子'
		},
		detail: {
			productName: '紅茶凝時煥活面霜',
			jingxi: '請親臨fresh免稅店專櫃領取精美禮品一份！*',
			haoli1: '請親臨fresh免稅店專櫃',
			haoli2: '發掘更多驚喜好禮!*',
			more: '下滑頁面查看產品詳情',
			ps: '*每人只限換領一次，數量有限，送完即止。只限於Fresh免稅店專櫃',
			btn: '免費申領',
			back: '返回主頁',
			slide: '左右滑動尋找更多',
			shop: '立即購買'
		}
	},
	'en-US': {
		home: {
			productName: '',
			productSubTitle: 'NEW!',
			buttonName: 'Explore Now',
			agreement: 'Campaign Terms and Conditions',
			ps: '*ex vivo studies on BT Matrix™ ingredients; this product does not contain retinol',
			tabbar1: 'Try It Now',
			tabbar2: 'Learn more',
			wanfaBtn: `I'm Ready`
		},
		game: {
			progress: 'progress',
			tips1: 'Slide the jar to collect the',
			tips2: 'ingre dient bubbles',
			again: 'Try Again',
			hclt: 'BT Matrix TM',
			jsw: 'Squalane',
			ysj: 'Pink porcelain lily',
			sjxa: 'Ceramide NP',
			shanghai: '-Skin damaging factor'
		},
		detail: {
			productName: '',
			jingxi: 'Visit any Fresh travel retail counters to receive a complimentary experiential kit!*',
			haoli1: 'Visit any Fresh travel retail',
			haoli2: 'counters to unveil more surprises!*',
			more: 'Discover more',
			ps: '*While stock lasts, limited to Fresh travel retail counters only',
			btn: 'Join Now',
			back: 'Back to Home',
			slide: 'Slide to discover more',
			shop: 'Shop Now'
		}
	},
	'KR': {
		home: {
			productName: '블랙티 어드밴스드 에이지 리뉴얼 크림',
			productSubTitle: '신상품 출시!',
			buttonName: '시작하기',
			agreement: '개인정보보호약관 및 사용자 안내문',
			ps: '* BT MatrixTM 성분 연구에 따르면, 본 제품은 레티놀 성분을 포함하고 있지 않습니다.',
			tabbar1: '지금 시도',
			tabbar2: '클릭하여 구매',
			wanfaBtn: '준비 완료'
		},
		game: {
			progress: '진행률',
			tips1: '크림 공병을 좌우로 움직여',
			tips2: '성분이 그려진 버블을 수집하세요.',
			again: '再試一次',
			hclt: 'BT Matrix TM',
			jsw: '스쿠알란',
			ysj: '핑크 포슬린 릴리',
			sjxa: '세라마이드 NP',
			shanghai: '-피부 손상 인자'
		},
		detail: {
			productName: '블랙티 어드밴스드 에이지 리뉴얼 크림',
			jingxi: 'Fresh 여행 소매점 방문 무료 체험 키트 제공!*',
			haoli1: '프레쉬 면세점 매장을 직접 방문하여',
			haoli2: '더 많은 놀라움을 직접 경험해 보세요!*',
			more: '자세한 내용 알아보기',
			ps: '*프레쉬 면세점 매장에 한하며, 재고 소진 시 행사가 조기 종료될 수 있습니다.',
			btn: '자세히 알아보기',
			back: '홈 페이지로 돌아가기',
			slide: '자세한 내용을 보려면 슬라이딩',
			shop: '구매하기'
		}
	},
}

 