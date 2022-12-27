const environment = {
	'test': {
		apiUrl: '',
		resourcesUrl: 'https://wanzhuan-activity.oss-cn-hangzhou.aliyuncs.com/assets'
	},
	'production': {
		apiUrl: '',
		resourcesUrl: 'https://wanzhuan-activity.oss-cn-hangzhou.aliyuncs.com/assets'
	}
}

export const env = environment['test'];

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
			tabbar2: '点击购买'
		}
	},
	'zh-HK': {
		home: {
			productName: '紅茶凝時煥活面霜',
			productSubTitle: '全新上市!',
			buttonName: '探秘贏好禮',
			agreement: '授權同意隱私協定與用戶手冊',
			ps: '*源自協力廠商實驗室數據，經檢測產品不含視',
			tabbar1: '登记成为体验官',
			tabbar2: '瞭解更多'
		}
	},
	'en-US': {
		home: {
			productName: '',
			productSubTitle: 'NEW!',
			buttonName: 'Explore Now',
			agreement: 'Campaign Terms and Conditions',
			ps: '*ex vivo studies on BT MatrixTM ingredients; this products does not contain retinol',
			tabbar1: 'Try It Now',
			tabbar2: 'Learn more'
		}
	},
	'KR': {
		home: {
			productName: '블랙티 어드밴스드 에이지 리뉴얼 크림',
			productSubTitle: '신상품 출시!',
			buttonName: '시작하기',
			agreement: '개인정보보호약관 및 사용자 안내문',
			ps: '* BT MatrixTM 성분 연구에',
			tabbar1: '지금 시도',
			tabbar2: '클릭하여 구매'
		}
	},
}