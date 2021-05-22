import httpRequest from '../libs/request';

window.baseUrl = '/gateway';
window.filterUrl = '/filter';
window.historyUrl = '//history.com';
window.testUrl = '';

export const getChartData = (params) => {
    const url = testUrl + baseUrl + '/chart';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, params, config);
};

export const getOpinionData = (params) => {
    const url = testUrl + baseUrl + '/opinion';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, params, config);
};

export const getReportsData = (params) => {
    const url = testUrl + baseUrl + '/report';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, params, config);
};

export const getReportFilter = () => {
    const url = testUrl + filterUrl + '/filter/type';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, {}, config);
};

export const getIndustryFilter = () => {
    const url = testUrl + filterUrl + '/filter/category';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, {}, config);
};

export const getRecommendData = () => {
    const url = testUrl + filterUrl + '/recommend';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, {}, config);
};

export const getResearcherLenovo = (params) => {
    const url = testUrl + filterUrl + '/lenovo';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, params, config);
};

export const getReportsDetail = (params) => {
    const url = testUrl + filterUrl + '/detail';
    const config = { dataType: 'json', type: 'get' };
    return httpRequest(url, params, config);
};

export const getHistoryQuestion = () => {
    const url = historyUrl + '/history';
    const data = {
        queryType: 'index',
        dataType: 'history',
        isAll: 1,
    };
    const config = { dataType: 'jsonp', type: 'get' };
    return httpRequest(url, data, config);
};

export const clearHistoryQeustion = () => {
    const url = historyUrl + '/history/remove';
    const data = {
        queryType: '',
        query: '',
    };
    const config = { dataType: 'jsonp', type: 'get' };
    return httpRequest(url, data, config);
};

export const setHistoryQuestion = (query) => {
    const url = historyUrl + '/history/set';
    const data = {
        queryType: '',
        query,
    };
    const config = { dataType: 'jsonp', type: 'get' };
    return httpRequest(url, data, config);
};
