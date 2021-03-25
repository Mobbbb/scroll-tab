<template>
    <div class="filter-component">
        <div class="filter-item"
             :class="activeItem === item.value || item.checked ? 'active-item' : ''"
             :style="item.style"
             v-for="(item, index) in filterList"
             @click="dropFilter(item.value, item.trackPoint)">
            <div class="overflow-ellipsis" :style="{maxWidth: item.titleMaxWidth}">
                {{item.checked ? item.selectName : item.label}}
            </div>
            <span class="drop-up-red" v-if="activeItem === item.value"></span>
            <span class="icon22 triangle drop-down-red" v-else-if="item.checked"></span>
            <span class="icon22 triangle drop-down-grey" v-else></span>
        </div>
        <div class="block-filter"></div>
        <div class="icon22 intellect-icon"
             :class="params.intellect === '' ? '' : 'selected-intellect-icon'"
             @click="dropFilter('intellect', 'sxmore')"></div>
        <ReportFilter :list="reportList"
                      v-model="params.report"
                      @on-confirm="searchHandle"
                      @on-cancel="emptySearch"
                      v-show="activeItem === 'report'"
                      ref="reportFilter">
        </ReportFilter>
        <IndustryFilter :list="industryList"
                        v-model="params.industry"
                        @on-confirm="searchHandle"
                        @on-cancel="emptySearch"
                        v-show="activeItem === 'industry'"
                        ref="industryFilter">
        </IndustryFilter>
        <PersonFilter :list="personList"
                      v-model="params.person"
                      @on-confirm="searchHandle"
                      @on-cancel="emptySearch"
                      v-show="activeItem === 'person'"
                      ref="personFilter">
        </PersonFilter>
        <OtherFilter :list="otherList"
                     v-model="params.other"
                     @on-confirm="searchHandle"
                     @on-cancel="emptySearch"
                     v-show="activeItem === 'other'"
                     ref="otherFilter">
        </OtherFilter>
        <IntellectFilter :list="intellectList"
                         v-model="params.intellect"
                         @on-select="searchHandle"
                         v-show="activeItem === 'intellect'">
        </IntellectFilter>
        <div class="filter-mask" v-show="activeItem !== ''" @click="resetFilter" @touchmove.prevent></div>
    </div>
</template>

<script>
import ReportFilter from './report-filter.vue';
import IndustryFilter from './industry-filter.vue';
import PersonFilter from './person-filter.vue';
import OtherFilter from './other-filter.vue';
import IntellectFilter from './intellect-filter.vue';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'filter-component',
    components: {
        ReportFilter,
        IndustryFilter,
        PersonFilter,
        OtherFilter,
        IntellectFilter
    },
    data() {
        return {
            activeItem: '',
        }
    },
    computed: {
        ...mapState('filterModule', [
            'filterList',
            'reportList',
            'industryList',
            'personList',
            'otherList',
            'params',
        ]),
        ...mapState('filterModule', {
            params: state => state.filterParams,
        }),
        ...mapGetters('filterModule', ['intellectList']),
    },
    mounted() {
        this.getFilterData();
        this.setCurrentReportFilter();
    },
    methods: {
        ...mapActions('filterModule', [
            'checkSelected',
            'getFilterData',
            'setCurrentReportFilter',
        ]),
        ...mapMutations('tabModule', [
            'setTabOverflowY',
        ]),
        searchHandle() { // 点击确定后的回调
            this.$refs.reportFilter.setValue();
            this.$refs.industryFilter.setValue();
            this.$refs.personFilter.setValue();
            this.$refs.otherFilter.setValue();

            this.checkSelected();
            this.closeFilter();
            this.$emit('on-search', this.params);
        },
        emptySearch() { // 点击恢复默认后的回调
            this.checkSelected();
            this.closeFilter();
            this.$emit('on-search', this.params);
        },
        dropFilter(value, trackPoint) { // 点击筛选标题展开/收起筛选面板
            if (this.activeItem === value) {
                this.resetFilter();
            } else {
                this.activeItem = value;
                this.setTabOverflowY('hidden');
            }
        },
        resetFilter() { // 重置勾选项至上一次的状态
            this.closeFilter();
            this.$refs.reportFilter.resetValue();
            this.$refs.industryFilter.resetValue();
            this.$refs.personFilter.resetValue();
            this.$refs.otherFilter.resetValue();
        },
        closeFilter() { // 关闭筛选面板
            this.setTabOverflowY('scroll');
            this.activeItem = '';
            this.$refs.personFilter.clearText();
        },
    }
};
</script>

<style scoped>
    .filter-component{
        height: 36px;
        line-height: 36px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        position: relative;
        background: #f5f5f5;
        z-index: 1;
    }
    .filter-item{
        color: #595959;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .block-filter{
        width: 20px;
        height: 20px;
    }
    .active-item{
        font-weight: bold;
        color: #262626;
    }
    .triangle{
        width: 8px;
        height: 5px;
        margin-left: 4PX;
    }
    .drop-down-grey{
        background-position: -60px -20px;
    }
    .drop-up-red{
        width: 8px;
        height: 5px;
        background-image: url("../../../assets/triangle-red-3x.png");
        background-size: 100% 100%;
        margin-left: 4PX;
    }
    .drop-down-red{
        background-position: -60px -30px;
    }
    .filter-mask{
        position: absolute;
        top: 36px;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 9;
        height: 2000px;
    }
    .intellect-icon{
        position: absolute;
        right: 10px;
        top: 8px;
        width: 20px;
        height: 20px;
        background-position: -90px -20px;
    }
    .selected-intellect-icon{
        background-position: -260px -20px;
    }
</style>
