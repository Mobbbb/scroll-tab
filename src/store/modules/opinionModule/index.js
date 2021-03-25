import { getFilterParams, timestampToTime } from '_a/libs/util';
import { getOpinionData } from '_a/api/api';

const mainModule = {
    namespaced: true,
    state: {
        pageParams: {
            offset: 0,
            size: 15,
            total: 0,
        },
        opinionList: [],
        opinionConfig: {
            firstLoading: true,
            hasRequested: false,
        },
    },
    mutations: {
        setOpinionList(state, list) {
            let arr = [...list];
            state.opinionList = list;

            Vue.nextTick(() => {
                $('.get-opinion-height').forEach((dom, index) => {
                    if (dom.scrollHeight > $(dom).height()) {
                        arr[index].isEllipsis = true;
                    }
                    state.opinionList = arr;
                });
            });
        },
        setOpinionFirstLoading(state, status) {
            state.opinionConfig.firstLoading = status;
        },
        setOpinionRequestStatus(state, status) {
            state.opinionConfig.hasRequested = status;
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
        async getOpinionFirstPageList({ commit, dispatch }) {
            commit('resetPageInfo');
            commit('setOpinionFirstLoading', true);

            let opinionList = await dispatch('requestOpinionList');

            commit('setOpinionFirstLoading', false);
            commit('setOpinionRequestStatus', true);

            commit('setOpinionList', opinionList);
        },
        async getOpinionChangePageList({ state, commit, dispatch }) {
            commit('addPageNum');

            let opinionList = await dispatch('requestOpinionList');

            commit('setOpinionList', [...state.opinionList, ...opinionList]);
        },
        async requestOpinionList({ state, rootState, commit }) {
            const filterParams = getFilterParams(rootState.filterModule.filterParams);
            let params = $.extend({}, filterParams, state.pageParams);

            let data = await getOpinionData(params) || {};

            let type = data.statis && data.statis.type || '';
            let opinionList = [];
            if (type !== '') {
                opinionList = data.results || [];
                opinionList.forEach(item => {
                    item.type = type;
                    item.author= item.author_name;
                    item.publish_time = timestampToTime(item.publish_time, 'yyyy-mm-dd');
                    item.isEllipsis = false;
                });
            }

            commit('setPageTotal', data.total || 0);
            return opinionList;
        }
    },
};

export default mainModule;
