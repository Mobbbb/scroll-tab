<template>
    <div class="tab-card-wrap" :style="{width: cardWidth + 'px', overflowY}" @transitionend.stop @scroll="scrollHandle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'card-pane',
    props: {
        overflowY: {
            default: 'scroll',
            type: String
        }
    },
    data() {
        return {

        };
    },
    computed: {
        cardWidth() {
            return this.$parent.cardWidth;
        },
    },
    methods: {
        /**
         * @description 配合scroll-tab组件新增的方法，单独使用card-swip组件时去除
         */
        scrollHandle(e) {
            this.$parent.$parent.setStaticTopPos(e.target.scrollTop);
            this.$parent.$parent.syncScrollHeight(this, e.target.scrollTop);
        },
    },
}
</script>

<style>
    .tab-card-wrap{
        box-sizing: border-box;
        display: inline-block;
        -webkit-overflow-scrolling: touch;
        vertical-align: top;
        height: 100%;
    }
</style>
