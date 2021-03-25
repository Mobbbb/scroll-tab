<template>
    <div class="tab-card-wrap" :style="{width: cardWidth + 'px', overflowY}" @transitionend.stop>
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
