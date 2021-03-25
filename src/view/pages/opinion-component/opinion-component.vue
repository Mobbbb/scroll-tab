<template>
    <div class="opinion-component">
        <RequestLoading v-if="opinionConfig.firstLoading"></RequestLoading>
        <div v-else>
            <div v-for="(item, index) in opinionList">
                <OpinionCard :params="item"
                             @on-click-content="clickContent(item)"
                             v-if="item.type === 2 || item.type === 3">
                </OpinionCard>
                <OpinionCard2 :params="item"
                              :current="index"
                              @on-click-content="clickContent(item)"
                              @on-click-original="onClickOriginal(item)"
                              v-if="item.type === 1">
                </OpinionCard2>
            </div>
            <NotFoundCard :content="searchText" v-if="!opinionList.length"></NotFoundCard>
            <Loading :isLoading="opinionList.length < pageParams.total" v-else></Loading>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OpinionCard from './opinion-card.vue';
import OpinionCard2 from './opinion-card2.vue';
import Loading from '_a/view/components/bar/loading-bar.vue';
import NotFoundCard from '_a/view/components/card-component/not-found-card.vue';
import RequestLoading from '_a/view/components/card-component/request-loading.vue';

export default {
    name: 'opinion-component',
    components: {
        OpinionCard,
        OpinionCard2,
        Loading,
        NotFoundCard,
        RequestLoading,
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState('opinionModule', {
            opinionList: state => state.opinionList,
            opinionConfig: state => state.opinionConfig,
            pageParams: state => state.pageParams,
        }),
        ...mapState('mainModule', {
            searchText: state => state.searchText,
        }),
    },
    mounted() {

    },
    methods: {
        onClickOriginal(item) { // 点击论据弹窗的查看原文
            this.linkTo(item);
        },
        clickContent(item) { // 点击观点查看原文
            this.linkTo(item);
        },
        linkTo(item) {
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
    .opinion-component {
        padding: 0 10px;
        /**
        * ios中的offsetTop要获取相对opinion-component的高度，需要显式的带上该属性
        **/
        position: relative;
    }
</style>
