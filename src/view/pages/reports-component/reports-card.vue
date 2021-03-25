<template>
    <div class="card-wrap">
        <div @click="clickContent">
            <div class="card-title" v-html="params.title"></div>
            <div class="card-content-title" v-html="params.summary"></div>
        </div>
        <LabelWrap :params="params" trackPointTab="report"></LabelWrap>
        <CardFooter :params="params" trackPointTab="report"></CardFooter>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CardFooter from '_a/view/components/card-component/card-footer.vue';
import LabelWrap from '_a/view/components/card-component/label-wrap.vue';

export default {
    name: 'report-card',
    components: {
        CardFooter,
        LabelWrap,
    },
    props: ['params'],
    data() {
        return {

        };
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        clickContent() {
            this.$emit('on-click-content');
        }
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
    .card-content-title{
        white-space: normal;
        font-size: 16px;
        margin: 12px 0;
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
    .card-footer{
        margin-top: 12px;
    }
    .card-wrap >>> em{
        color: #e62c08;
    }
    .card-title >>> em{
        font-weight: bold;
    }
</style>
