<template>
    <div class="card-footer flex">
        <div v-if="params.publish_time">{{params.publish_time}}</div>
        <div v-if="params.author_org">{{params.author_org}}</div>
        <div class="card-name" @click="clickAuthor" v-if="hasAuthorName">{{params.author}}</div>
        <div class="card-action" v-if="params.buy_rating">{{params.buy_rating}}</div>
        <div v-if="params.page_size">{{params.page_size}}页</div>
    </div>
</template>

<script>
export default {
    name: 'card-footer',
    props: {
        params: {
            default: {},
            type: Object,
        },
        trackPointTab: {
            default: '',
            type: String,
        }
    },
    computed: {
        hasAuthorName() {
            let authorName = this.params.author || '';
            if (authorName === 'null') {
                return false;
            } else {
                return !!authorName;
            }
        }
    },
    methods: {
        clickAuthor() {
            this.$store.dispatch('filterModule/changePerson', this.params.author)
        }
    },
};
</script>

<style scoped>
    .card-footer{
        color: #595959;
        font-size: 12px;
        line-height: 16px;
    }
    .card-footer div{
        margin-right: 14px;
    }
    .card-footer div:last-of-type{
        margin-right: 0;
    }
</style>
