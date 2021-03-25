import { getFilterParams, timestampToTime } from '_a/libs/util';
import { getChartData } from '_a/api/api';

const mainModule = {
    namespaced: true,
    state: {
        pageParams: {
            offset: 0,
            size: 15,
            total: 0,
        },
        chartList: [],
        imageList: [],
        chartConfig: {
            firstLoading: true,
            hasRequested: false,
        },
    },
    mutations: {
        setChartList(state, list) {
            state.chartList = list;
        },
        setImageList(state, list) {
            state.imageList = list;
        },
        setChartFirstLoading(state, status) {
            state.chartConfig.firstLoading = status;
        },
        setChartRequestStatus(state, status) {
            state.chartConfig.hasRequested = status;
        },
        setPageTotal(state, total) {
            state.pageParams.total = total;
        },
        resetPageInfo(state) {
            state.pageParams = {
                offset: 0,
                size: 15,
                total: 0,
            };
        },
        addPageNum(state) {
            state.pageParams.offset += state.pageParams.size;
        },
    },
    actions: {
        async getChartFirstPageList({ commit, dispatch }) {
            commit('resetPageInfo');
            commit('setChartFirstLoading', true);

            let {
                imageList,
                chartList
            } = await dispatch('requestChartList');

            commit('setChartFirstLoading', false);
            commit('setChartRequestStatus', true);

            commit('setChartList', chartList);
            commit('setImageList', imageList);
        },
        async getChartChangePageList({ state, commit, dispatch }) {
            commit('addPageNum');

            let {
                imageList,
                chartList
            } = await dispatch('requestChartList');

            commit('setChartList', [...state.chartList, ...chartList]);
            commit('setImageList', [...state.imageList, ...imageList]);
        },
        async requestChartList({ state, rootState, commit }) {
            const filterParams = getFilterParams(rootState.filterModule.filterParams);
            let params = $.extend({}, filterParams, state.pageParams);

            let data = await getChartData(params) || {};

            let imageList = [];
            let chartList = data.results || [];
            chartList.forEach(item => {
                item.publish_time = timestampToTime(item.publish_time, 'yyyy-mm-dd');
                imageList.push({
                    imageUrl: item.image_url || '',
                    sourceUrl: item.image_url || ''
                });
            });
            commit('setPageTotal', data.total || 0);
            return {
                imageList,
                chartList
            };
        }
    },
};

export default mainModule;
