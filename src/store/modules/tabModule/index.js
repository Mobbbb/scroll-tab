import { getQueryParmas } from '_a/libs/util';

const TAB_CONFIG = [
    { name: 'Tab一', trackPoint: 'tubiao' },
    { name: 'Tab二', trackPoint: 'guandian' },
    { name: 'Tab三', trackPoint: 'report' }
];
const TAB_SCROLL = {
    chartComponent: 0,
    opinionComponent: 0,
    reportsComponent: 0,
};

const tabModule = {
    namespaced: true,
    state: {
        current: 0,
        titleArr: [],
        tabScrollHeight: TAB_SCROLL,
        activeOpinion: null,
        initOnceStatus: true, // 保证初始化只进行一次
        topHeight: 0,
        tabOverflowY: 'scroll',
    },
    mutations: {
        setCurrent(state, current) {
            state.current = current;
        },
        setTabTitle(state, arr) {
            state.titleArr = arr;
        },
        setActiveOpinion(state, opinion) {
            state.activeOpinion = opinion;
        },
        setInitOnceStatus(state, status) {
            state.initOnceStatus = status;
        },
        setTabScrollHeight(state, item) {
            state.tabScrollHeight[item.name] = item.scrollHeight;
        },
        setTabOverflowY(state, tabOverflowY) {
            state.tabOverflowY = tabOverflowY;
        },
        testValueSet(state, topHeight) {
            state.topHeight = topHeight;
        },
    },
    actions: {
        initContentTab({ state, commit, dispatch }) {
            if (state.initOnceStatus) {
                commit('setTabTitle', TAB_CONFIG);
                commit('setCurrent', parseInt(getQueryParmas('tab')) || 0);
                commit('setInitOnceStatus', false);
                // dispatch('mainModule/getCurrentTabFirstPageList', {}, { root: true });
            }
        },
    },
};

export default tabModule;
