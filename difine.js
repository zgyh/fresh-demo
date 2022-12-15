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
	'HR': 'HR'
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
