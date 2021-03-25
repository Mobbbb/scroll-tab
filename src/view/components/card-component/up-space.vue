<template>
    <div class="space-label" :class="size === 'small' ? 'space-label-small' : ''" v-if="upSpace">
        <span class="label-left">上涨空间</span>
        <span class="red-percent">{{upSpace}}%</span>
    </div>
</template>

<script>

export default {
    name: 'stock-slot',
    props: {
        risingUp: {
            default: 0,
            type: Number,
        },
        risingDown: {
            default: 0,
            type: Number,
        },
        size: {
            default: 'normal',
            type: String,
        }
    },
    computed: {
        upSpace() {
            const risingUp = parseInt(this.risingUp);
            const risingDown = parseInt(this.risingDown);

            if (this.judgeNaN(risingUp) && this.judgeNaN(risingDown) && risingUp && risingDown) {
                let result = (risingUp - risingDown) / risingDown;
                return result.toFixed(2);
            } else {
                return false;
            }
        }
    },
    methods: {
        judgeNaN(value) {
            const number = parseFloat(value);
            if (typeof number === 'number') {
                return !window.isNaN(number);
            }
            return false;
        },
    },
};
</script>

<style scoped>
    .space-label{
        display: inline-block;
        border-radius: 2px;
        padding: 0 12px;
        background: #f5f5f5;
        height: 22px;
        line-height: 22px;
    }
    .space-label .label-left{
        margin-right: 6px;
        color: #595959;
    }
    .red-percent{
        color: #e62c08;
    }
    .space-label-small{
        height: auto;
        line-height: normal;
        display: inline-block;
        padding: 2PX 8PX;
        background: #f5f5f5;
        font-size: 12px;
    }
</style>
