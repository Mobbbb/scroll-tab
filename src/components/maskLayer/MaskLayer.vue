<template>
    <div class="mask_layer" :style="{backgroundColor}" v-show="isShow" @click="onClose" @touchmove.prevent>
        <div v-if="data" class="mask_content" v-html="data" @touchmove.stop></div>
        <div v-else-if="popUpData" v-html="popUpData" class="mask_popup_content" @touchmove.stop></div>
    </div>
</template>

<script>
    export default {
        name: "mask-layer",
        data: function () {
            return {
                isShow: false
            }
        },
        methods: {
            onClose(event) {
                if (event.target.nodeName === 'A' && event.target.getAttribute('href')) {
                    return
                }
                this.callback && this.callback();
                !this.retain && (this.isShow = false)
            }
        }
    }
</script>

<style scoped>
    .mask_layer{
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        bottom:0;
        width: 100%;
        height: 100%;
        display: table;
        -webkit-transition: opacity .3s ease;
        transition: opacity .3s ease;
    }
    /* JGY.showIndexDesc 方法钩子触发的全屏展示结果页指标详细内容的样式
     */
    .mask_content {
        position: absolute;
        font-size:16px;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        width: 88%;
        max-height: 80%;
        box-sizing: border-box;
        padding: 12px;
        border-radius: 7px;
        z-index: 21;
        overflow: auto;
        background: #fff;
        color: #838383;
    }
    /*richText双击全屏展示时的弹层样式*/
    .mask_popup_content {
        position: absolute;
        font-size: 26px;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        width: 82%;
        max-height: 92%;
        box-sizing: border-box;
        z-index: 21;
        overflow: auto;
        background: #EDEDED;
        color: #262626;
    }
</style>