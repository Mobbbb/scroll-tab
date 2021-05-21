<template>
    <div class="header-bar">
        <div class="back-icon" @click="goBack"></div>
        <div class="header-title">title</div>
    </div>
</template>

<script>

export default {
    name: 'header-bar',
    mounted() {
        this.$emit('input', $('.header-bar').height());
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
    .header-bar{
        position: relative;
        height: 44px;
        min-height: 44px;
    }
    .back-icon{
        height: 22px;
        width: 22px;
        position: absolute;
        left: 12px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        background: url('../../../assets/back_icon.png');
        background-size: 100% 100%;
    }
    .header-title{
        line-height: 44px;
        text-align: center;
        color: white;
        font-weight: 500;
        font-size: 18px;
    }
</style>
