<template>
    <div class="industry-label" :class="size === 'small' ? 'industry-label-small' : ''">
        {{name}}
    </div>
</template>

<script>

export default {
    name: 'industry-label',
    props: {
        name: {
            default: '',
            type: String,
        },
        size: {
            default: 'normal',
            type: String,
        },
    },
    methods: {

    },
};
</script>

<style scoped>
    .industry-label{
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
    .industry-label-small{
        height: auto;
        line-height: normal;
        border-radius: 3PX;
        padding: 2PX 12PX;
        font-size: 12px;
    }
</style>
