<template>
    <div class="report-detail">
        <div class="bar-wrap detail-bar-wrap">
            <header-bar></header-bar>
        </div>
        <div class="report-content-wrap" :style="{height: height + 'px'}">
            <tempate v-if="!noData">
                <div class="detail-loading-wrap" v-if="isLoading">
                    <RequestLoading class="detail-loading"></RequestLoading>
                </div>
                <div v-else>
                    <div class="detail-title">{{params.title}}</div>
                    <div class="detail-message flex">
                        <div v-if="params.pubtime">{{params.pubtime}}</div>
                        <div class="card-name" v-if="params.organize">{{params.organize}}</div>
                        <div class="card-name" v-if="params.researcher">{{params.researcher}}</div>
                        <div class="card-action" v-if="params.level">{{params.level}}</div>
                        <div v-if="params.pages">{{params.pages}}页</div>
                    </div>
                    <div class="detail-content-title">研究摘要：</div>
                    <div class="detail-content" v-html="params.content"></div>
                    <div class="original-content" v-if="params.site_url">
                        <div class="original-content-title overflow-ellipsis">PDF原文：{{params.title}}</div>
                        <div class="link-btn-wrap flex justify-between">
                            <div class="size-text">{{fileSize}}</div>
                            <div class="link-btn"></div>
                        </div>
                        <div class="icon22 pdf-icon"></div>
                    </div>
                    <PageFooter></PageFooter>
                </div>
            </tempate>
            <tempate v-else>
                <div class="no_data_wrap">
                    <div class="no_data_text">暂无数据~</div>
                </div>
            </tempate>
        </div>
    </div>
</template>

<script>
import HeaderBar from '_a/view/components/bar/header-bar.vue';
import PageFooter from '_a/view/components/card-component/page-footer.vue';
import RequestLoading from '_a/view/components/card-component/request-loading.vue';
import { getReportsDetail } from '_a/api/api';
import { timestampToTime, getCookie } from '_a/libs/util';

export default {
    name: 'report-detail',
    components: {
        HeaderBar,
        PageFooter,
        RequestLoading,
    },
    data() {
        return {
            height: 0,
            params: {},
            isLoading: true,
            noData: false,
        }
    },
    computed: {
        fileSize() {
            const bSize = parseInt(this.params.attsize);

            if (typeof bSize === 'number' && !window.isNaN(bSize)) {
                const kbSize = parseInt(bSize / 1024);
                if (kbSize < 1000) {
                    return kbSize + 'KB';
                } else {
                    return (kbSize / 1024).toFixed(2) + 'MB';
                }
            } else {
                return null;
            }
        },
    },
    activated() {
        this.getReportsDetail();
    },
    mounted() {
        this.initHeight();
    },
    methods: {
        getReportsDetail() {
            this.isLoading = true;
            this.noData = false;
            getReportsDetail({duid: this.$route.query.id}).then(res => {
                if (res === null) {
                    this.noData = true;
                }
                this.params = res || {};
                this.isLoading = false;
                if (this.params.content) {
                    this.params.content = this.params.content.trim();
                    let arr = this.params.content.split('　　');
                    this.params.content = arr.join('<br><br>');
                }
                this.params.pubtime = timestampToTime(this.params.pubtime, 'yyyy-mm-dd');
            });
        },
        initHeight() {
            this.height = window.windowHeight - $('.detail-bar-wrap').height();
        },
    }
};
</script>

<style scoped>
    .report-detail{
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .report-content-wrap{
        padding: 0 16px;
        background: white;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
    }
    .detail-title{
        font-size: 18px;
        font-weight: bold;
        padding-top: 12px;
    }
    .detail-message{
        padding: 12px 0 24px 0;
    }
    .detail-message div{
        margin-right: 14px;
        color: #595959;
        font-size: 12px;
        line-height: 16px;
    }
    .detail-message .card-action{
        color: #e62c08;
    }
    .detail-content-title{
        font-size: 17px;
        font-weight: bold;
        line-height: 1.7;
    }
    .detail-content{
        font-size: 17px;
        line-height: 1.7;
        padding-bottom: 14px;
    }
    .original-content{
        width: 100%;
        padding: 12px 12px 12px 30px;
        box-sizing: border-box;
        background: #f5f5f5;
        border-radius: 3px;
        position: relative;
        overflow: hidden;
        margin-bottom: 14px;
    }
    .original-content-title{
        font-weight: 500;
    }
    .link-btn-wrap{
        margin-top: 4px;
    }
    .link-btn{
        color: #0060de;
        text-align: right;
    }
    .pdf-icon{
        width: 30px;
        height: 30px;
        background-position: -210px -20px;
        position: absolute;
        left: 0;
        top: 0;
    }
    .size-text{
        color: #b2b2b2;
    }
    .detail-loading-wrap{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .detail-loading{
        padding-top: 0;
        padding-bottom: 120px;
    }
    .no_data_wrap{
        padding-top: 140px;
        width: 100%;
    }
    .no_data_text{
        margin-top: 20px;
        text-align: center;
        color: #b2b2b2;
    }
</style>
