<template>
    <div class="alert_dialog" v-if="isShow">
        <div class="dialog_content">{{content}}</div>
        <div class="dialog_footer_wrap flex">
            <div class="dialog_cancel" @click="onCancel">取消</div>
            <div class="dialog_confirm" @click="onConfirm">清空</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "alert-dialog",
    data: function () {
        return {
            isShow: false,
            content: '',
        }
    },
    methods: {
        onCancel() {
            this.cancelCallback && this.cancelCallback();
            this.isShow = false
        },
        onConfirm() {
            this.confirmCallback && this.confirmCallback();
            this.isShow = false
        }
    }
}
</script>

<style scoped>
    .alert_dialog{
        position: fixed;
        z-index: 21;
        top: 0;
        left: 0;
        bottom:0;
        right: 0;
        width: 270px;
        height: 104px;
        background: white;
        border-radius: 6px;
        margin: auto;
    }
    .dialog_content{
        height: 59px;
        line-height: 59px;
        text-align: center;
        font-size: 17px;
        font-weight: 700;
        color: #262626;
    }
    .dialog_footer_wrap{
        font-size: 17px;
        height: 44px;
        line-height: 44px;
        color: #0060de;
        border-top: 1PX solid #e6e6e6;
        text-align: center;
    }
    .dialog_cancel{
        height: 44px;
        width: 100%;
        border-right: 1PX solid #e6e6e6;
    }
    .dialog_confirm{
        height: 44px;
        width: 100%;
    }
</style>