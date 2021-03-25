export const filterList = [
    {
        label: '研报类型',
        value: 'report',
        checked: false,
        selectName: '',
        style: {
            width: '3.2rem',
            marginRight: '0.4rem'
        },
        titleMaxWidth: '2.04rem',
        trackPoint: 'yblx'
    },
    {
        label: '行业类型',
        value: 'industry',
        checked: false,
        selectName: '',
        style: {
            width: '3.2rem',
            marginRight: '0.4rem'
        },
        titleMaxWidth: '2.04rem',
        trackPoint: 'hyfl'
    },
    {
        label: '分析师',
        value: 'person',
        checked: false,
        selectName: '',
        style: {
            width: '2.8rem',
            marginRight: '0.4rem'
        },
        titleMaxWidth: '2.64rem',
        trackPoint: 'fxs'
    },
    {
        label: '筛选',
        value: 'other',
        checked: false,
        selectName: '',
        style: {
            width: '2rem',
            marginRight: '0'
        },
        titleMaxWidth: 'unset',
        trackPoint: 'sx'
    },
];

export const filterTypeMap = {
    person: '分析师',
    organization: '机构'
};

export const otherList = [
    {
        name: '评级',
        value: 'level',
        trackPoint: 'sx.pj',
        children: [
            {
                name: '买入/推荐',
                id: '1',
            },
            {
                name: '增持/谨慎推荐',
                id: '2',
            },
            {
                name: '中性',
                id: '3',
            },
            {
                name: '减持/回避',
                id: '4',
            },
            {
                name: '卖出',
                id: '5',
            },
            {
                name: '不评级',
                id: '6',
            }
        ]
    },
    {
        name: '页数',
        value: 'page',
        trackPoint: 'sx.page',
        children: [
            {
                name: '20页以上',
                id: '1',
            },
            {
                name: '8-20页',
                id: '2',
            },
            {
                name: '8页以下',
                id: '3',
                children: null,
            },
        ]
    },
    {
        name: '时间',
        value: 'time',
        trackPoint: 'sx.time',
        children: [
            {
                name: '过去一周',
                id: '1',
            },
            {
                name: '过去一月',
                id: '2',
            },
            {
                name: '过去三月',
                id: '3',
            },
        ]
    },
];

export const intellectList = [
    {
        name: '按相关性排序',
        value: 'relevance',
        trackPoint: 'sxmore.xgx'
    },
    {
        name: '按时间从近到远',
        value: 'time',
        trackPoint: 'sxmore.shijian'
    },
    {
        name: '按页数从多到少',
        value: 'pages',
        trackPoint: 'sxmore.yeshu'
    },
];

// 图表页卡的研报类型
export const chartReportsFilterList = [
    { "code": "001", "name": "个股研究" },
    { "code": "002", "name": "行业研究" },
    { "code": "005", "name": "基金报告"},
    { "code": "006", "name": "投资策略"},
    { "code": "007", "name": "债券研究"},
    { "code": "008", "name": "衍生品"},
    { "code": "009", "name": "港股研究"},
    { "code": "012", "name": "金融工程"},
    { "code": "013", "name": "理财类研究报告"},
    { "code": "014", "name": "新三板其他研究"},
    { "code": "015", "name": "美股研究"},
    { "code": "099", "name": "深层分类"},
];

// 观点页卡的研报类型
export const opinionReportsFilterList = [
    { "code": "001", "name": "个股研究" },
    { "code": "009", "name": "港股研究" },
    { "code": "015", "name": "美股研究" },
];
