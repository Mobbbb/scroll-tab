<template>
    <div class="text_layer_wrap" v-show="isShow" :style="{top: contentPosition}">
        <div class="text_layer">
            <div class="flex justify-between">
                <div class="text_content_title">观点论据</div>
                <div class="icon22 close_layer" @click="close"></div>
            </div>
            <div class="text_content_wrap">{{content}}</div>
            <div class="text_footer" @click="linkToDetail">查看原文</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'text-layer',
    props: {
        // 文字浮层内容
        content: String,
        position: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            isShow: false,
            contentPosition: 0,
        };
    },
    watch: {
        position() {
            this.$nextTick(() => {
                if (this.position > 0) {
                    this.contentPosition = this.position - $('.text_layer_wrap').height() - 10 * window.getRem() + 'px';
                } else {
                    this.contentPosition = - this.position + 10 * window.getRem() + 'px';
                }
            });
        }
    },
    mounted() {

    },
    methods: {
        close() {
            this.callback && this.callback();
            this.isShow = false;
        },
        linkToDetail() {
            this.turnto && this.turnto();
            this.isShow = false;
        }
    },
};
</script>

<style scoped>
    .text_layer_wrap{
        position: fixed;
        z-index: 21;
        left: 10px;
        right: 10px;
        margin: auto;
    }
    .text_layer{
        background: white;
        border-radius: 6px;
        padding: 12px 12px 0 12px;
    }
    .text_content_title{
        font-weight: bold;
        font-size: 17px;
    }
    .text_content_wrap{
        text-align: left;
        font-size: 16px;
        margin: 12px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -ms-box-orient: vertical;
        -moz-box-orient: vertical;
        -webkit-line-clamp: 5;
        -moz-line-clamp: 5;
        -ms-line-clamp: 5;
    }
    .text_footer{
        text-align: center;
        font-size: 17px;
        color: #0060de;
        padding-bottom: 14px;
    }
    .close_layer{
        background-position: -70px -70px;
    }
</style>
