<template>
    <div class="hot-search">
        <div class="icon22 hot-search-title"></div>
        <div class="hot-list-wrap">
            <div :key="index"
                 class="hot-item"
                 v-for="(item, index) in showHotListData"
                 @click="clickHotSearch(item, index)">
                {{item.title}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
    name: 'hot-search',
    data() {
        return {

        }
    },
    computed: {
        ...mapState('mainModule', ['searchText']),
        ...mapGetters('mainModule', ['showHotListData']),
    },
    mounted() {

    },
    methods: {
        ...mapMutations('mainModule', ['updateInputValue']),
        ...mapActions('mainModule', ['searchCurrentList']),
        ...mapActions('filterModule', ['resetFilterParams']),
        clickHotSearch(item, index) {
            this.resetFilterParams();
            this.updateInputValue(item.title);
            // this.searchCurrentList();
        }
    }
};
</script>

<style scoped>
    .hot-search{
        min-height: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        padding-bottom: 4px;
        box-sizing: border-box;
    }
    .hot-search-title{
        width: 32px;
        height: 14px;
        min-width: 32px;
        margin-right: 10px;
        background-position: -20px -70px;
    }
    .hot-list-wrap{
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
    }
    .hot-item{
        padding: 1px 8px 0 8px;
        height: 20px;
        line-height: 20px;
        margin-right: 6px;
        color: white;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.2);
        display: inline-block;
    }
</style>
