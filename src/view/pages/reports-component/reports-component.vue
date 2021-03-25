<template>
    <div class="reports-component">
        <RequestLoading v-if="reportsConfig.firstLoading"></RequestLoading>
        <div v-else>
            <ReportsCard :params="item"
                         v-for="(item, index) in reportsList"
                         :key="index"
                         @on-click-content="clickContent(item)">
            </ReportsCard>
            <NotFoundCard :content="searchText" v-if="!reportsList.length"></NotFoundCard>
            <Loading :isLoading="reportsList.length < pageParams.total" v-else></Loading>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ReportsCard from './reports-card.vue';
import Loading from '_a/view/components/bar/loading-bar.vue';
import NotFoundCard from '_a/view/components/card-component/not-found-card.vue';
import RequestLoading from '_a/view/components/card-component/request-loading.vue';

export default {
    name: 'reports-component',
    components: {
        ReportsCard,
        Loading,
        NotFoundCard,
        RequestLoading,
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState('reportsModule', {
            reportsList: state => state.reportsList,
            reportsConfig: state => state.reportsConfig,
            pageParams: state => state.pageParams,
        }),
        ...mapState('mainModule', {
            searchText: state => state.searchText,
        }),
    },
    mounted() {

    },
    methods: {
        clickContent(item) {
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
    .reports-component {
        padding: 0 10px;
    }
</style>
