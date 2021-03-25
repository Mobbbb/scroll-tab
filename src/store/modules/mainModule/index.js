import { getHistoryQuestion, clearHistoryQeustion, setHistoryQuestion } from '_a/api/api';

const DEFAULT_HOT_SEARCH = [
    { title: '新闻一' },
    { title: '新闻二' },
    { title: '新闻三' },
    { title: '新闻四' },
];

const mainModule = {
    namespaced: true,
    state: {
        searchContentStatus: false, // 是否展示搜索组件
        searchText: '',
        historyData: [], // 搜索历史
        hotListData: [], // 热门搜索
        showTestBtn: false,
        staticDomHeight: 0,
        searchFlag: false, // 触发搜索的信号
    },
    getters: {
        showHistoryData(state, getters, rootState) {
            return state.historyData.slice(0, 10);
        },
        showHotListData(state, getters, rootState) {
            let hotListData = state.hotListData.slice(0, 4);
            if (hotListData.length) {
                return state.hotListData.slice(0, 4);
            } else {
                return DEFAULT_HOT_SEARCH;
            }
        },
    },
    mutations: {
        setSearchContentStatus(state, status) {
            state.searchContentStatus = status;
        },
        changeShowTestBtnStatus(state, status) {
            state.showTestBtn = status;
        },
        updateInputValue(state, value) {
            state.searchText = value.trim();
        },
        setStaticDomHeight(state, height) {
            state.staticDomHeight = height;
        },
        setHotListData(state, list) {
            state.hotListData = list;
        },
        setHistoryData(state, list) {
            state.historyData = list;
        },
        changeSearchFlag(state) {
            state.searchFlag = !state.searchFlag;
        },
    },
    actions: {
        /**
         * @description 重置所有页卡的请求状态，并搜索当前页卡数据
         * @param state
         * @param rootState
         * @param commit
         * @param dispatch
         */
        searchCurrentList({ state, rootState, commit, dispatch }) {
            commit('changeSearchFlag');
            if (state.searchText === '' && rootState.filterModule.filterParams.intellect === 'relevance') {
                commit('filterModule/resetIntellectInFilter', {}, { root: true });
            }
            commit('chartModule/setChartRequestStatus', false, { root: true });
            commit('opinionModule/setOpinionRequestStatus', false, { root: true });
            commit('reportsModule/setReportsRequestStatus', false, { root: true });
            dispatch('getCurrentTabFirstPageList');

            if (state.searchText !== '') {
                // 新增历史记录
                dispatch('setHistoryList', state.searchText);
            }
        },
        /**
         * @description 请求当前tab首页数据，只适用于首次请求
         * @param rootState
         * @param dispatch
         */
        getCurrentTabFirstPageList({ rootState, dispatch }) {
            if (rootState.tabModule.current === 0 && !rootState.chartModule.chartConfig.hasRequested) {
                dispatch('chartModule/getChartFirstPageList', {}, { root: true });
            } else if (rootState.tabModule.current === 1 && !rootState.opinionModule.opinionConfig.hasRequested) {
                dispatch('opinionModule/getOpinionFirstPageList', {}, { root: true });
            } else if (rootState.tabModule.current === 2 && !rootState.reportsModule.reportsConfig.hasRequested) {
                dispatch('reportsModule/getReportsFirstPageList', {}, { root: true });
            }
        },
        /**
         * @description 当前tab翻页请求数据
         * @param rootState
         * @param dispatch
         */
        getCurrentTabChangePageList({ rootState, dispatch }) {
            const chartList = rootState.chartModule.chartList;
            const chartTotal = rootState.chartModule.pageParams.total;

            const opinionList = rootState.opinionModule.opinionList;
            const opinionTotal = rootState.opinionModule.pageParams.total;

            const reportsList = rootState.reportsModule.reportsList;
            const reportsTotal = rootState.reportsModule.pageParams.total;

            if (rootState.tabModule.current === 0 && chartList.length < chartTotal) {
                dispatch('chartModule/getChartChangePageList', {}, { root: true });
            } else if (rootState.tabModule.current === 1 && opinionList.length < opinionTotal) {
                dispatch('opinionModule/getOpinionChangePageList', {}, { root: true });
            } else if (rootState.tabModule.current === 2 && reportsList.length < reportsTotal) {
                dispatch('reportsModule/getReportsChangePageList', {}, { root: true });
            }
        },
        getHistoryList({ commit }) {
            getHistoryQuestion().then(res => {
                let data = res && res.docs || [];
                commit('setHistoryData', data);
            })
        },
        clearHistoryList({ commit }) {
            clearHistoryQeustion().then(res => {
                if (res) commit('setHistoryData', []);
            });
        },
        setHistoryList({ commit }, query) {
            setHistoryQuestion(query).then(res => {
                let data = res && res.docs || [];
                if (data.length) {
                    commit('setHistoryData', data);
                }
            })
        },
        getHotListData({ commit }, list) {
            commit('setHotListData', list);
        },
        showSearchContent({ commit, dispatch }, status) {
            commit('setSearchContentStatus', status);
            if (status) {
                dispatch('getHistoryList');
                Vue.nextTick(() => {
                    $('#search_input').focus().triggerHandler('click');
                });
            }
            $('.search_scroll_content').scrollTop(0);
        },
    },
};

export default mainModule;
