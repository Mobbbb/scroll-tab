/**
 * Created by viruser on 2019/9/21.
 */
import store from '_a/store/store';
export const rootValue = 25;

/**
 * @description
 * @param params
 * @param otherKey
 * @returns {{}}
 */
export const getFilterParams = (params, otherKey = {}) => {
    const {
        authorKey = 'author_name',
        reportKey = 'pre_report_type_code',
        filter = '',
    } = otherKey;
    let filterParams = {};

    // 研报类型参数
    // 图表、观点搜索字段是report_type_code  研报搜索字段是cat_id
    let arr = [];
    params.report.forEach(item => {
        if (reportKey === 'cat_id') { // 研报搜索
            arr.push(item.code + '*');
        } else {
            arr.push(item.code);
        }
    });
    if (arr.length) filterParams[reportKey] = arr.join(',');

    // 行业类型参数
    arr = [];
    params.industry.forEach(item => {
        arr.push(item.id);
    });
    if (arr.length) filterParams.second_industry_type = arr.join(',');

    // 分析师参数
    // 图表、观点搜索字段是author_name  研报搜索字段是author
    arr = [];
    params.person.person.forEach(item => {
        arr.push(item.name);
    });
    if (arr.length) filterParams[authorKey] = arr.join(',');

    // 评级参数
    if (params.other.level.length) {
        filterParams.buy_rating = params.other.level.join(',');
    }

    // 页数参数
    if (params.other.page === '1') { // 20页以上
        filterParams.start_page_size = 21;
        filterParams.end_page_size = 100000;
    } else if (params.other.page === '2') { // 8-20页
        filterParams.start_page_size = 8;
        filterParams.end_page_size = 20;
    } else if (params.other.page === '3') { // 8页以下
        filterParams.start_page_size = 0;
        filterParams.end_page_size = 7;
    }

    // 时间参数
    if (filter === '') { // 图表、观点的时间参数
        if (params.other.time === '1') { // 7天内
            filterParams.end_time = parseInt(Date.now() / 1000);
            filterParams.start_time = parseInt(Date.now() / 1000) - 7*24*60*60;
        } else if (params.other.time === '2') { // 30天内
            filterParams.end_time = parseInt(Date.now() / 1000);
            filterParams.start_time = parseInt(Date.now() / 1000) - 30*24*60*60;
        } else if (params.other.time === '3') { // 90天内
            filterParams.end_time = parseInt(Date.now() / 1000);
            filterParams.start_time = parseInt(Date.now() / 1000) - 90*24*60*60;
        }
    } else { // 研报的时间参数
        if (params.other.time === '1') { // 7天内
            filterParams.filter = 'publish_day:[' + getFilterDate(7) + ' TO ' + getFilterDate(0) + ']';
        } else if (params.other.time === '2') { // 30天内
            filterParams.filter = 'publish_day:[' + getFilterDate(30) + ' TO ' + getFilterDate(0) + ']';
        } else if (params.other.time === '3') { // 90天内
            filterParams.filter = 'publish_day:[' + getFilterDate(90) + ' TO ' + getFilterDate(0) + ']';
        }
    }

    // 智能排序
    if (params.intellect !== '') {
        filterParams.sort = params.intellect;
    }

    // 搜索关键字
    filterParams.query = store.state.mainModule.searchText;
    if (!filterParams.query) {
        filterParams.query = '*:*';
    }

    filterParams.query_source = 'mobile_user';

    return filterParams;
};

const getFilterDate = (num) => {
    const timestamp = parseInt(Date.now() / 1000) - num*24*60*60;
    return Math.floor((timestamp + 8*3600)/3600/24);
};

/**
 * @description 判断数组里是否包含该对象
 * @param arr
 * @param item
 * @param key
 * @returns {boolean}
 */
export const includesOfObj = (arr, item, key = 'name') => {
    let flag = false;
    arr.forEach(cell => {
        if (cell[key] === item[key]) {
            flag = true;
        }
    });

    return flag;
};

/**
 * @description 为item list添加空白div，以保证每行都有lineNum的个数
 * @param lineNum
 * @param arr
 */
export const fillIntoRestByBlock = (lineNum, arr) => {
    let rest = lineNum - arr.length % lineNum;
    if (lineNum !== rest) {
        for (let i = 0; i < rest; i++) {
            arr.push({
                name: '',
                id: '',
            });
        }
    }
};

/**
 * @description 添加不同的项 或 移除相同的项
 * @param array
 * @param value
 * @param key
 * @param valueKey
 * @returns {[*]}
 */
export const addDiffRemoveSame = (array, value, key = '', valueKey = '') => {
    let arr = [...array];
    let flag = false;
    for (let i = 0; i < arr.length; i++) {
        let outsideValue = value;
        let inlineValue = arr[i];
        if (key !== '') {
            inlineValue = arr[i][key];
        }
        if (valueKey !== '') {
            outsideValue = value[valueKey];
        }
        if (inlineValue === outsideValue) {
            arr.splice(i, 1);
            flag = true;
        }
    }
    if (!flag) arr.push(value);
    return arr;
};

/**
 * @description 时间戳转日期格式(支持10位13位数字和字符串)
 * @param timestamp
 * @param type
 * @returns {string}
 */
export const timestampToTime = (timestamp, type = '') => {
    timestamp = String(timestamp);
    let length = timestamp.length;
    let d = null;
    let date = '';
    if (length === 10) d = new Date(timestamp * 1000);
    else if (length === 13) d = new Date(timestamp);
    else return null;

    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (type === '') {
        date = (d.getFullYear()) + "-" +
            month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    } else if (type === 'hh:mm') {
        date = hours + ":" + minutes;
    } else if (type === 'yyyy-mm-dd') {
        date = (d.getFullYear()) + "-" + month + "-" + day
    }

    return date;
};

/**
 * @description 获取cookie
 * @param b
 * @returns {*}
 */
export const getCookie = (b) => {
    let a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
    if (!!a) {
        return a[2];
    }
    return null;
};

/**
 * @description 设置cookie
 * @param a
 * @param b
 * @param c
 */
export function setCookie(a, b, c) {
    if (!c) {
        c = 30 * 24 * 60 * 60 * 1000;
    }
    let d = new Date();
    d.setTime(d.getTime() + c);
    document.cookie = a + "=" + b + ";expires=" + d.toGMTString() + ";path=/";
}

/**
 * @description 获取URL参数
 * @param parmas
 * @returns {*}
 */
export const getQueryParmas = (parmas) => {
    let query = window.location.search.substr(1);
    let vars = query.split("&");
    for(let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if(pair[0] === parmas) {
            return pair[1];
        }
    }
    return null;
};

/**
 * @description 正则校验
 * @param value
 * @param type
 */
export function regText(value, type) {
    // 4字汉字 或 20字符英文、允许空格
    let nameReg = /^([\u4e00-\u9fa5]{1,4}|[a-zA-Z\.\s]{1,20})$/;

    if (type === 'name') {
        return nameReg.test(value);
    } else {
        return false;
    }
}

/**
 * @description 节流函数
 * @param fn
 * @param delay
 * @param mustRunDelay
 * @returns {*}
 */
export function throttle (fn, delay, mustRunDelay = 0) {
    if (delay == null) return fn;
    /* istanbul ignore next */
    const timestampProvider =
        typeof performance === 'object' ? performance : Date;
    let timer = null;
    let tStart;
    return function () {
        const tCurr = timestampProvider.now();
        if (timer != null) clearTimeout(timer);
        if (!tStart) {
            tStart = tCurr;
        }
        if (mustRunDelay !== 0 && tCurr - tStart >= mustRunDelay) {
            fn.apply(this, arguments);
            tStart = tCurr;
        } else {
            const context = this;
            const args = [...arguments];
            timer = setTimeout(function () {
                timer = null;
                return fn.apply(context, args);
            }, delay);
        }
    };
}

export const getRem = () => {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let fontSize = htmlWidth / 15;

    return fontSize / rootValue;
};

export const setRem = () => {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlDom = document.getElementsByTagName('html')[0];

    htmlDom.style.fontSize = htmlWidth / 15 + 'px';
};
