<template>
    <div class="card-wrap">
        <div class="card-title" @click="clickImage" v-html="params.title"></div>
        <div class="card-content-wrap flex justify-between">
            <div class="card-img-wrap">
                <img :src="params.image_url" class="card-img" @click="clickImage">
            </div>
            <div class="card-content flex box-tb justify-between">
                <div class="card-content-title" @click="toReportDetail" v-html="reportContent"></div>
                <LabelWrap :params="params" trackPointTab="tubiao" size="small"></LabelWrap>
            </div>
        </div>
        <CardFooter :params="params" trackPointTab="tubiao"></CardFooter>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CardFooter from '_a/view/components/card-component/card-footer.vue';
import LabelWrap from '_a/view/components/card-component/label-wrap.vue';

export default {
    name: 'chart-card',
    components: {
        LabelWrap,
        CardFooter,
    },
    props: ['params'],
    data() {
        return {

        };
    },
    computed: {
        reportContent() {
            return `原文：${this.params.report_title}`;
        }
    },
    mounted() {

    },
    methods: {
        clickImage() {
            this.$emit('on-click-image');
        },
        toReportDetail() {
            this.$emit('on-click-content');
        },
    },
};
</script>

<style scoped>
    .card-title{
        white-space: normal;
        font-size: 17px;
        font-weight: bold;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -moz-line-clamp: 2;
        -ms-line-clamp: 2;
        -webkit-box-orient: vertical;
        -ms-box-orient: vertical;
        -moz-box-orient: vertical;
        overflow: hidden;
    }
    .card-content-wrap{
        padding: 12px 0;
    }
    .card-img-wrap{
        width: 128px;
        min-width: 128px;
        height: 84px;
        border-radius: 4px;
        border: 1PX solid #f0f0f0;
        background: rgba(240, 240, 240, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
    }
    .card-img{
        max-width: 100%;
        max-height: 100%;
    }
    .card-content-title{
        color: #595959;
        white-space: normal;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -moz-line-clamp: 3;
        -ms-line-clamp: 3;
        -webkit-box-orient: vertical;
        -ms-box-orient: vertical;
        -moz-box-orient: vertical;
        overflow: hidden;
    }
    .card-wrap >>> em{
        color: #e62c08;
    }
    .card-title >>> em{
        font-weight: bold;
    }
</style>
