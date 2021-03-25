<template>
    <div class="card-wrap">
        <div class="card-content-title" :class="isExpand ? '' : 'line-clamp'">
            <span class="opinion-item" v-for="(item, index) in params.view_arguments" v-if="index < showNum">
                <span @click="popOpinionDetail($event, item, index)"
                      :style="activeOpinion === current + '_' + index ? 'background: rgba(0, 96, 222, 0.2)' : ''">
                    <span class="text-circle" v-if="index < 10">{{indexArr[index]}}</span>
                    <span v-else class="opinion-circle">{{index + 1}}</span>
                    <span v-html="item.view" class="opinion-item-text"></span>
                </span>
            </span>
        </div>
        <div class="expand-btn" @click="expand" v-if="params.view_arguments.length > 3">{{isExpand ? '收起' : '展开'}}</div>
        <LabelWrap :params="params" trackPointTab="guandian" class="opinion-label-wrap"></LabelWrap>
        <div class="content-title-wrap" @click="clickContent">
            <div class="content-title">
                原文：{{params.stock_name}}（{{params.stock_code}}）{{params.title}}
            </div>
        </div>
        <CardFooter :params="params" trackPointTab="guandian"></CardFooter>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import CardFooter from '_a/view/components/card-component/card-footer.vue';
import LabelWrap from '_a/view/components/card-component/label-wrap.vue';

export default {
    name: 'opinion-card',
    components: {
        CardFooter,
        LabelWrap,
    },
    props: ['params', 'current'],
    data() {
        return {
            indexArr: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'],
            isExpand: false,
            prevTotalHeight: 0,
            showNum: 3
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
        ...mapState('mainModule', {
            staticDomHeight: state => state.staticDomHeight,
        }),
        ...mapState('tabModule', {
            activeOpinion: state => state.activeOpinion,
        }),
    },
    mounted() {

    },
    methods: {
        ...mapMutations('tabModule', [
            'setActiveOpinion',
            'testValueSet'
        ]),
        expand() {
            if (this.isExpand) {
                this.isExpand = false;
                this.showNum = 3;
            } else {
                this.isExpand = true;
                this.showNum = this.params.view_arguments.length;
            }
        },
        clickContent() {
            this.$emit('on-click-content');
        },
        popOpinionDetail(e, item, index) {
            let topHeight = e.target.offsetTop - $('.tab_card_wrap')[1].scrollTop + this.staticDomHeight;
            if (topHeight * 2 + $(e.target).height() < window.windowHeight) { // 元素在上半屏
                topHeight += $(e.target).height();
                topHeight = -topHeight;
            }
            this.testValueSet(topHeight);
            this.$mask.show({
                retain: false,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                onClose: () => {
                    this.$textLayer.hide();
                    this.setActiveOpinion(null);
                }
            });
            this.$textLayer.show({
                content: item.argument,
                position: topHeight,
                turnTo: () => {
                    this.$mask.hide();
                    this.setActiveOpinion(null);
                    this.$emit('on-click-original');
                },
                onClose: () => {
                    this.$mask.hide();
                    this.setActiveOpinion(null);
                }
            });
            this.setActiveOpinion(this.current + '_' + index);
        },
    },
};
</script>

<style scoped>
    .card-content-title{
        white-space: normal;
        font-size: 16px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -ms-box-orient: vertical;
        -moz-box-orient: vertical;
    }
    .opinion-circle{
        display: inline-block;
        height: 18px;
        line-height: 18px;
        min-width: 18px;
        border-radius: 18px;
        border: 1PX solid #262626;
        text-align: center;
        font-size: 16px;
        margin-right: 3px;
        box-sizing: border-box;
        transform: scale(0.8);
    }
    .text-circle{
        margin-right: 3px;
    }
    .line-clamp{
        overflow: hidden;
        -webkit-line-clamp: 5;
        -moz-line-clamp: 5;
        -ms-line-clamp: 5;
    }
    .opinion-item{
        margin-bottom: 12px;
        display: block;
    }
    .opinion-item-text{
        vertical-align: middle;
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
    .opinion-label-wrap{
        margin-bottom: 12px;
    }
</style>
