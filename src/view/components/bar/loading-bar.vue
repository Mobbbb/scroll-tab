<template>
    <div>
        <div class="loading-bar flex">
            <div class="loading-line" v-if="!isLoading"></div>
            <div class="loading-text">{{isLoading ? '加载中...' : '没有更多了哦'}}</div>
            <div class="loading-line" v-if="!isLoading"></div>
        </div>
        <PageFooter v-if="!isLoading"></PageFooter>
    </div>
</template>

<script>
import PageFooter from '_a/view/components/card-component/page-footer.vue';

export default {
    name: 'header-bar',
    components: {
        PageFooter
    },
    props: {
        isLoading: {
            default: true,
            type: Boolean
        }
    },
    data() {
        return {

        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped>
    .loading-bar{
        justify-content: center;
        align-items: center;
        color: #b2b2b2;
        font-size: 12px;
        margin: 16px 0 14px 0;
    }
    .loading-line{
        width: 30px;
        height: 1PX;
        background: rgba(178, 178, 178, 0.6);
    }
    .loading-text{
        margin: 0 12px;
    }
</style>
