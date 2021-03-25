<template>
    <div class="not-found-card">
        <div class="not-found-top flex" v-if="content">
            <span class="not-found-left">没有找到与“</span>
            <span class="red-text">{{content}}</span>
            <span class="not-found-right">”相关的内容</span>
        </div>
        <div class="not-found-top" v-else>暂无相关数据</div>
    </div>
</template>

<script>
export default {
    name: 'card-footer',
    props: {
        content: {
            default: '',
            type: String,
        }
    },
    methods: {

    },
};
</script>

<style scoped>
    .not-found-card{
        font-size: 17px;
        color: #595959;
        padding-top: 12px;
    }
    .not-found-top{
        color: #262626;
        font-weight: 500;
    }
    .red-text{
        color: #e62c08;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .not-found-title{
        margin: 24px 0 12px 0;
    }
    .suggest-wrap{
        list-style: disc;
    }
    .suggest-wrap li {
        display: flex;
        align-items: center;
        font-size: 16px;
    }
    .suggest-circle{
        width: 4px;
        height: 4px;
        border-radius: 4px;
        background: #b2b2b2;
        margin-right: 8px;
    }
</style>
