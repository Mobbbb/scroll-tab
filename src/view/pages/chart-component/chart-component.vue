<template>
    <div class="chart-component">
        <RequestLoading v-if="chartConfig.firstLoading"></RequestLoading>
        <div v-else>
            <ChartCard :params="item"
                       v-for="(item, index) in chartList"
                       :key="index"
                       @on-click-image="clickImage(item, index)"
                       @on-click-content="clickContent(item)">
            </ChartCard>
            <NotFoundCard :content="searchText" v-if="!chartList.length"></NotFoundCard>
            <Loading :isLoading="chartList.length < pageParams.total" v-else></Loading>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ChartCard from './chart-card.vue';
import Loading from '_a/view/components/bar/loading-bar.vue';
import NotFoundCard from '_a/view/components/card-component/not-found-card.vue';
import RequestLoading from '_a/view/components/card-component/request-loading.vue';

export default {
    name: 'chart-component',
    components: {
        ChartCard,
        Loading,
        NotFoundCard,
        RequestLoading,
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState('chartModule', {
            chartList: state => state.chartList,
            imageList: state => state.imageList,
            chartConfig: state => state.chartConfig,
            pageParams: state => state.pageParams,
        }),
        ...mapState('mainModule', {
            searchText: state => state.searchText,
        }),
    },
    mounted() {

    },
    methods: {
        clickImage(item, index) {
            this.$photoSwipe.open({ // 打开大图预览页面
                datas: this.imageList,
                currentIndex: index,
                closeFun: () => {
                    console.log('关闭图片')
                },
                jumpFun: () => { // 查看原文
                    this.linkToDetail(item);
                },
                showTitle: true,
                showContext: false,
                showCheckSource: true,
            });
        },
        clickContent(item) {
            this.linkToDetail(item);
        },
        linkToDetail(item) {
            this.$router.push({
                name: 'detail',
                query: {
                    id: item.uid
                }
            });
        }
    },
};
</script>

<style scoped>
    .chart-component {
        padding: 0 10px;
    }
</style>
