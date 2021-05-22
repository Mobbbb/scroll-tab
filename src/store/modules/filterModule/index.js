import { includesOfObj } from '_a/libs/util';
var filterList = [],
    otherList = [],
    intellectList = [],
    chartReportsFilterList = [],
    opinionReportsFilterList = [];
import { getReportFilter, getIndustryFilter, getRecommendData, getResearcherLenovo } from '_a/api/api';

const filterModule = {
    namespaced: true,
    state: {
        filterList,
        dropList: [],
        latestInputTimeStamps: null,
        reportList: [],
        industryList: [],
        personList: [],
        otherList: otherList,
        emptyParams: {
            report: [],
            industry: [],
            person: { person: [], organization: [] },
            other: { level: [], page: '', time: '' },
            intellect: '',
        },
        filterParams: {
            report: [],
            industry: [],
            person: { person: [],  organization: [] },
            other: { level: [], page: '', time: '' },
            intellect: '',
        },
        reportReportsFilterList: [], // 研报tab下，研报类型的筛选项
        currentReportCheckedList: { // 各个tab研报类型目前的选中列表
            chart: [],
            opinion: [],
            reports: [],
        },
    },
    getters: {
        intellectList(state, getters, rootState) {
            const searchText = rootState.mainModule.searchText;

            if (searchText) {
                return intellectList;
            } else {
                return intellectList.slice(1);
            }
        },
    },
    mutations: {
        setFilterParams(state, params) {
            state.filterParams = params;
        },
        resetIntellectInFilter(state) {
            state.filterParams.intellect = '';
        },
        resetReportInFilter(state) {
            state.filterParams.report = [];
        },
        setReportInFilter(state, list) {
            state.filterParams.report = [...list];
        },
        setReportList(state, list) {
            state.reportList = list;
        },
        setIndustryList(state, list) {
            state.industryList = list;
        },
        setPersonList(state, list) {
            state.personList = list;
        },
        setDropList(state, list) {
            state.dropList = list;
        },
        updateLenovoRequestTime(state, timestamps) {
            state.latestInputTimeStamps = timestamps;
        },
        setReportReportsFilterList(state, list) {
            state.reportReportsFilterList = list;
        },
        setCurrentReportCheckedList(state, { key, value }) {
            state.currentReportCheckedList[key] = value;
        },
    },
    actions: {
        /**
         * @description 设置当前tab研报类型的选中项
         * @param state
         * @param rootState
         * @param commit
         */
        setCurrentReportCheckedList({ state, rootState, commit }) {
            let current = rootState.tabModule.current;
            let value = state.filterParams.report;
            if (current === 0) {
                // 图表列表
                commit('setCurrentReportCheckedList', { key: 'chart', value });
            } else if (current === 1) {
                // 观点列表
                commit('setCurrentReportCheckedList', { key: 'opinion', value });
            } else {
                // 研报列表
                commit('setCurrentReportCheckedList', { key: 'reports', value });
            }
        },
        getFilterData({ dispatch }) {
            dispatch('getReportFilter');
            dispatch('getIndustryFilter');
            dispatch('getPersonFilter');
        },
        /**
         * @description 设置当前tab的研报类型列表和选中的研报类型
         * @param rootState
         * @param state
         * @param commit
         * @param dispatch
         */
        setCurrentReportFilter({ rootState, state, commit, dispatch }) {
            let current = rootState.tabModule.current;
            if (current === 0) {
                // 图表列表
                commit('setReportList', chartReportsFilterList);
                commit('setReportInFilter', state.currentReportCheckedList.chart);
            } else if (current === 1) {
                // 观点列表
                commit('setReportList', opinionReportsFilterList);
                commit('setReportInFilter', state.currentReportCheckedList.opinion);
            } else {
                // 研报列表
                commit('setReportList', state.reportReportsFilterList);
                commit('setReportInFilter', state.currentReportCheckedList.reports);
            }

            dispatch('checkSelected');
        },
        getReportFilter({ commit }) {
            getReportFilter().then(data => {
                commit('setReportReportsFilterList', data || []);
            });
        },
        getIndustryFilter({ commit }) {
            getIndustryFilter().then(data => {
                commit('setIndustryList', data || []);
            });
        },
        getPersonFilter({ commit, dispatch }) {
            getRecommendData().then(data => {
                let $researcher = data && data.researcher || [];
                let $keyword = data && data.keyword || [];
                let researcher = [];
                let keyword = [];
                $researcher.forEach(item => {
                    researcher.push({ name: item });
                });
                $keyword.forEach(item => {
                    keyword.push({ title: item });
                });
                commit('setPersonList', researcher);
                dispatch('mainModule/getHotListData', keyword, { root: true });
            });
        },
        getResearcherLenovo({ state, commit }, name) {
            const latestTimeStamp = (new Date()).valueOf();

            // 更新最新的请求联想面板时间戳
            commit('updateLenovoRequestTime', latestTimeStamp);

            getResearcherLenovo({ keyword: name }).then(data => {
                // 判断本次请求是否是最新的一次请求，只有最新的请求才能渲染
                if (state.latestInputTimeStamps === latestTimeStamp) {
                    // 根据请求结果，决定是否渲染联想数据
                    commit('setDropList', data || []);
                }
            });
        },
        resetFilterParams({ state, commit, dispatch }) {
            commit('setFilterParams', JSON.parse(JSON.stringify(state.emptyParams)));
            dispatch('checkSelected');
        },
        emptyReportInFilter({ commit, dispatch }) {
            commit('resetReportInFilter');
            dispatch('checkSelected');
        },
        /**
         * @description 点击页卡中的分析师，立即触发筛选器数据改变，并重新搜索当前页
         * @param state
         * @param commit
         * @param dispatch
         * @param name
         */
        changePerson({ state, commit, dispatch }, name) {
            let params = state.filterParams;

            if (!includesOfObj(params.person.person, { name })) {
                params.person.person = [{ name }];
                commit('setFilterParams', params);
                dispatch('checkSelected');
                dispatch('mainModule/searchCurrentList', {}, { root: true });
            }
        },
        /**
         * @description 判断每一项筛选项是否有被选中的内容，若有便将其加粗
         * @param state
         * @param commit
         */
        checkSelected({ state, commit }) {
            let params = state.filterParams;
            // 遍历筛选参数
            Object.keys(params).forEach(key => {
                state.filterList.forEach(item => {
                    if (item.value === key) {
                        if (typeof params[key] === 'string') {
                            // TODO 最右侧的图标筛选参数
                        } else if (params[key] instanceof Array) {
                            // 研报类型和行业类型的参数
                            item.checked = params[key].length;
                            item.selectName = params[key].length ? params[key][0].name : ''
                        } else {
                            let personFlag = false;
                            let personLabel = '';
                            let otherFlag = false;
                            let otherLabel = '筛选';

                            // 分析师和筛选项的参数遍历
                            Object.keys(params[key]).forEach(cell => {
                                if (key === 'person') {
                                    // 分析师的数据遍历
                                    if (params[key][cell].length && !personFlag) { // 若有选中的分析师
                                        personFlag = true; // 将分析师的文字高亮
                                        personLabel = params[key][cell][0].name;
                                    }
                                    item.checked = personFlag;
                                    item.selectName = personLabel;
                                } else if (key === 'other') {
                                    // 筛选的数据遍历
                                    if (params[key].level.length || params[key].page !== '' || params[key].time !== '') {
                                        otherFlag = true; // 将筛选的文字高亮
                                    }

                                    // 若筛选面板的选中项超过一个，改变筛选文字为多选
                                    if (params[key].level.length > 1) {
                                        otherLabel = '多选';
                                    } else if (params[key].level.length === 1
                                        && (params[key].page !== '' || params[key].time !== '')) {
                                        otherLabel = '多选';
                                    } else if (!params[key].level.length
                                        && (params[key].page !== '' && params[key].time !== '')) {
                                        otherLabel = '多选';
                                    }
                                    item.checked = otherFlag;
                                    item.selectName = otherLabel;
                                }
                            });
                        }
                    }
                });
            });
            commit('setFilterParams', params);
        },
    },
};

export default filterModule;
