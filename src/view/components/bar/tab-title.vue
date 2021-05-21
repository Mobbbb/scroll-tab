<template>
    <div class="tab-title-wrap flex align-center">
        <div class="tab-title-item"
             :class="value === index ? 'active-title' : ''"
             @click="clickTitle(index)"
             v-for="(item, index) in titleArr" :key="index">
            <span>{{item.name}}</span>
        </div>
        <div class="red-bottom-bar" :style="{ left: position + 'px' }"></div>
    </div>
</template>

<script>
export default {
    name: 'content-tab',
    props: ['value', 'titleArr'],
    data() {
        return {

        };
    },
    computed: {
        blockWidth() {
            const bottomBarWidth = 50;
            return (window.windowWidth / 3 - bottomBarWidth * window.getRem()) / 2;
        },
        position() {
            return this.blockWidth + this.value * window.windowWidth / 3;
        }
    },
    methods: {
        clickTitle(index) {
            this.$emit('input', index);
        }
    },
}
</script>

<style scoped>
    .tab-title-wrap{
        height: 44px;
        justify-content: space-around;
        background: white;
        position: relative;
    }
    .tab-title-item{
        font-size: 16px;
        color: #595959;
        font-weight: 500;
    }
    .active-title{
        color: #e62c08;
    }
    .red-bottom-bar{
        width: 50px;
        height: 2PX;
        border-radius: 1PX;
        background: #e62c08;
        position: absolute;
        bottom: 0;
        transition: 300ms ease;
        z-index: 1;
    }
</style>
