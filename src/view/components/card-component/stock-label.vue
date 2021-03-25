<template>
    <div class="stock-label" :class="size === 'small' ? 'stock-label-small' : ''">
        {{name}}
    </div>
</template>

<script>

export default {
    name: 'stock-slot',
    props: {
        name: {
            default: '',
            type: String,
        },
        code: {
            default: '',
            type: String,
        },
        size: {
            default: 'normal',
            type: String,
        },
        trackPointTab: {
            default: '',
            type: String,
        }
    },
    methods: {
        
    },
};
</script>

<style scoped>
    .stock-label{
        color: #0060de;
        background: rgba(0, 96, 222, 0.1);
        border-radius: 2px;
        padding: 0 12px;
        font-size: 14px;
        display: inline-block;
        margin-right: 6px;
        height: 22px;
        line-height: 22px;
    }
    .stock-label-small{
        height: auto;
        line-height: normal;
        border-radius: 3PX;
        padding: 2PX 12PX;
        font-size: 12px;
    }
</style>
