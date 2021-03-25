import { getFilterParams, timestampToTime } from '_a/libs/util';
import { getReportsData } from '_a/api/api';

const mainModule = {
    namespaced: true,
    state: {
        pageParams: {
            offset: 0,
            size: 15,
            total: 0,
        },
        reportsList: [],
        reportsConfig: {
            firstLoading: true,
            hasRequested: false,
        },
    },
    mutations: {
        setReportsList(state, list) {
            state.reportsList = list;
        },
        setReportsFirstLoading(state, status) {
            state.reportsConfig.firstLoading = status;
        },
        setReportsRequestStatus(state, status) {
            state.reportsConfig.hasRequested = status;
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
        async getReportsFirstPageList({ commit, dispatch }) {
            commit('resetPageInfo');
            commit('setReportsFirstLoading', true);

            let reportsList = await dispatch('requestReportsList');

            commit('setReportsFirstLoading', false);
            commit('setReportsRequestStatus', true);

            commit('setReportsList', reportsList);
        },
        async getReportsChangePageList({ state, commit, dispatch }) {
            commit('addPageNum');

            let reportsList = await dispatch('requestReportsList');

            commit('setReportsList', [...state.reportsList, ...reportsList]);
        },
        async requestReportsList({ state, rootState, commit }) {
            const filterParams = getFilterParams(rootState.filterModule.filterParams, {
                authorKey: 'author',
                reportKey: 'cat_id',
                filter: 'filter'
            });
            let params = $.extend({}, filterParams, state.pageParams);

            let data = await getReportsData(params) || {};

            let reportsList = data.results || [];
            reportsList.forEach(item => {
                item.author_org = item.organization;
                item.publish_time = timestampToTime(item.publish_time, 'yyyy-mm-dd');
                item.stock_name = item.stock && item.stock.name || '';
                item.stock_code = item.stock && item.stock.code || '';
            });
            commit('setPageTotal', data.total || 0);

            return reportsList;
        }
    },
};

export default mainModule;
