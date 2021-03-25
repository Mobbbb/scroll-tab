<template>
    <div class="card-wrap">
        <div @click="clickContent">
            <div class="card-title" v-html="view"></div>
            <div class="card-content-title get-opinion-height" :class="isExpand ? '' : 'line-clamp'" v-html="argument"></div>
        </div>
        <div class="expand-btn" @click="expand" v-if="params.isEllipsis">{{isExpand ? '收起' : '展开'}}</div>
        <LabelWrap :params="params" trackPointTab="guandian" class="opinion-label-wrap"></LabelWrap>
        <div class="content-title-wrap" @click="clickOriginal">
            <div class="content-title">
                原文：{{params.stock_name}}（{{params.stock_code}}）{{params.title}}
            </div>
        </div>
        <CardFooter :params="params" trackPointTab="guandian"></CardFooter>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CardFooter from '_a/view/components/card-component/card-footer.vue';
import LabelWrap from '_a/view/components/card-component/label-wrap.vue';

export default {
    name: 'opinion-card',
    components: {
        CardFooter,
        LabelWrap
    },
    props: ['params'],
    data() {
        return {
            isExpand: false,
        };
    },
    computed: {
        argument() {
            const view = this.params.view_arguments[0].view;
            const argument = this.params.view_arguments[0].argument;
            return view ? '论据：' + argument : argument;
        },
        view() {
            const view = this.params.view_arguments[0].view;
            return view ? '观点：' + view : '研报_投资建议:';
        },
    },
    mounted() {

    },
    methods: {
        expand() {
            this.isExpand = !this.isExpand;
        },
        clickOriginal() {
            this.$emit('on-click-content');
        },
        clickContent() {
            if (this.params.isEllipsis) {
                if (this.isExpand) {
                    this.$emit('on-click-content');
                } else {
                    this.isExpand = !this.isExpand;
                }
            } else {
                this.$emit('on-click-content');
            }
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
        -webkit-box-orient: vertical;
        -ms-box-orient: vertical;
        -moz-box-orient: vertical;
    }
    .line-clamp{
        overflow: hidden;
        -webkit-line-clamp: 5;
        -moz-line-clamp: 5;
        -ms-line-clamp: 5;
    }
    .card-footer{
        margin-top: 12px;
    }
    .expand-btn{
        color: #0060de;
        font-size: 16px;
        padding-bottom: 12px;
    }
    .content-title-wrap{
        padding: 4px 12px;
        background: rgba(245, 245, 245, 0.5);
        margin-bottom: 12px;
        border-radius: 2px;
    }
    .content-title{
        color: #595959;
        white-space: normal;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -moz-line-clamp: 2;
        -ms-line-clamp: 2;
        -webkit-box-orient: vertical;
        -ms-box-orient: vertical;
        -moz-box-orient: vertical;
    }
    .card-wrap >>> em{
        color: #e62c08;
    }
    .card-title >>> em{
        font-weight: bold;
    }
    .opinion-label-wrap{
        margin-bottom: 12px;
    }
</style>
