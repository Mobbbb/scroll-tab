<template>
    <div class="content_tab">
        
    </div>
</template>
<script>

import { mapActions, mapState, mapMutations } from 'vuex';
import { throttle } from '_a/libs/util';

export default {
    name: 'content-tab',
    components: {

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
