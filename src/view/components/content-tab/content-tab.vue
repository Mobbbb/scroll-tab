<template>
    <div class="content_tab">
        <div class="content-tab-top">
            <TabTitle v-model="current" :titleArr="tabConfig"></TabTitle>
            <!-- <FilterComponent ref="filterComponent" @on-search="filterHandle"></FilterComponent> -->
        </div>
        <CardSwipe @on-change-end="swipeChangeEnd"
                   v-model="current"
                   :height="tabWrapHeight + 'px'"
                   :cardWidth="cardWidth">
            <CardPane :overflowY="tabOverflowY" @scroll.native.passive="scroll($event, 'chartComponent')">
                <ChartComponent ref="chartComponent"></ChartComponent>
            </CardPane>
            <CardPane :overflowY="tabOverflowY" @scroll.native.passive="scroll($event, 'opinionComponent')">
                <OpinionComponent ref="opinionComponent"></OpinionComponent>
            </CardPane>
            <CardPane :overflowY="tabOverflowY" @scroll.native.passive="scroll($event, 'reportsComponent')">
                <ReportsComponent ref="reportsComponent"></ReportsComponent>
            </CardPane>
        </CardSwipe>
    </div>
</template>
<script>

import { mapActions, mapState, mapMutations } from 'vuex';
import { throttle } from '_a/libs/util';
import TabTitle from './tab-title.vue';
import FilterComponent from '../filter-component/filter-component.vue';
import CardSwipe from '_a/components/card-swipe/card-swipe.vue';
import CardPane from '_a/components/card-swipe/card-pane.vue';
import OpinionComponent from '../../pages/opinion-component/opinion-component.vue';
import ChartComponent from '../../pages/chart-component/chart-component.vue';
import ReportsComponent from '../../pages/reports-component/reports-component.vue';

export default {
    name: 'content-tab',
    components: {
        TabTitle,
        FilterComponent,
        CardSwipe,
        CardPane,
        ChartComponent,
        OpinionComponent,
        ReportsComponent,
    },
    data() {
        return {
            tabWrapHeight: 0,
            cardWidth: 0,
            throttleScroll: null,
        };
    },
    computed: {
        ...mapState('tabModule', [
            'tabConfig',
            'tabScrollHeight',
            'tabOverflowY'
        ]),
        ...mapState('mainModule', ['searchFlag']),
        current: {
            get() {
                return this.$store.state.tabModule.current;
            },
            set(value) {
                this.setCurrent(value);
            },
        },
    },
    watch: {
        searchFlag() {
            this.$refs.filterComponent.resetFilter();
        }
    },
    activated() {
        Object.keys(this.tabScrollHeight).forEach((key, index) => {
            const tabItem = $('.tab_card_wrap')[index];
            $(tabItem).scrollTop(this.tabScrollHeight[key]);
        });
    },
    mounted() {
        this.initContentTab();
        this.initDimensions();
        this.throttleScroll = throttle((e, name) => {
            this.scrollHandle(e, name);
        }, 80, 300);
    },
    methods: {
        ...mapMutations('tabModule', [
            'setCurrent',
            'setTabScrollHeight',
        ]),
        ...mapActions('tabModule', [
            'initContentTab',
            'onSwitchEnd',
        ]),
        ...mapActions('filterModule', [
            'setCurrentReportFilter',
            'emptyReportInFilter',
            'setCurrentReportCheckedList',
        ]),
        ...mapMutations('mainModule', ['setStaticDomHeight']),
        ...mapActions('mainModule', [
            'getCurrentTabFirstPageList',
            'getCurrentTabChangePageList',
            'searchCurrentList',
        ]),
        initDimensions() {
            const outsideHeight = $('.main-bar-wrap').height() + $('.content-tab-top').height();
            this.tabWrapHeight = window.windowHeight - outsideHeight;
            this.cardWidth = window.windowWidth;
            this.setStaticDomHeight(outsideHeight);
        },
        filterHandle() {
            this.searchCurrentList();
            this.setCurrentReportCheckedList();
        },
        swipeChangeEnd() {
            // this.setCurrentReportFilter();
            // this.getCurrentTabFirstPageList();
        },
        scroll(e, name) {
            this.throttleScroll(e, name);
        },
        scrollHandle(e, name) {
            let totalHeight = this.$refs[name].$el.clientHeight;
            let scrollHeight = e.target.scrollTop;
            this.setTabScrollHeight({ name, scrollHeight });
            if (scrollHeight + this.tabWrapHeight >= totalHeight) {
                this.getCurrentTabChangePageList();
            }
        }
    },
}
</script>

<style scoped>
    .content_tab{
        background: #f5f5f5;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
