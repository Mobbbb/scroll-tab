import httpRequest from '../libs/request';

window.baseUrl = '/gateway/web/search/v1';
window.filterUrl = '/intell-stockpick/report';
window.historyUrl = '//history.com';
window.clearHistoryUrl = '//clear.com.cn';
window.testUrl = '';

export const getChartData = (params) => {
    const url = testUrl + baseUrl + '/report_image';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, params, config);
};

export const getOpinionData = (params) => {
    const url = testUrl + baseUrl + '/report_view';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, params, config);
};

export const getReportsData = (params) => {
    const url = testUrl + baseUrl + '/report';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, params, config);
};

export const getReportFilter = () => {
    const url = testUrl + filterUrl + '/attribute/type';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, {}, config);
};

export const getIndustryFilter = () => {
    const url = testUrl + filterUrl + '/attribute/category';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, {}, config);
};

export const getRecommendData = () => {
    const url = testUrl + filterUrl + '/recommend';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, {}, config);
};

export const getResearcherLenovo = (params) => {
    const url = testUrl + filterUrl + '/attribute/researcher';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, params, config);
};

export const getReportsDetail = (params) => {
    const url = testUrl + filterUrl + '/detail';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, params, config);
};

export const getHistoryQuestion = () => {
    const url = historyUrl + '/unifiedwap/suggest/V1/index/query-hint-list';
    const data = {
        queryType: 'index',
        dataType: 'history',
        isAll: 1,
    };
    const config = { dataType: 'jsonp', type: 'get' };
    return httpRequest(url, data, config);
};

export const clearHistoryQeustion = () => {
    const url = clearHistoryUrl + '/suggest/v1/index/removeHistory';
    const data = {
        queryType: '',
        query: '',
    };
    const config = { dataType: 'jsonp', type: 'get' };
    return httpRequest(url, data, config);
};

export const setHistoryQuestion = (query) => {
    const url = clearHistoryUrl + '/suggest/v1/index/setHistory';
    const data = {
        queryType: '',
        query,
    };
    const config = { dataType: 'jsonp', type: 'get' };
    return httpRequest(url, data, config);
};
