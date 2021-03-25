<template>
    <div class="search_bar">
        <div id="search_bar_input">
            <div class="search-icon"></div>
            <div class="search_title" v-if="searchText === ''">...</div>
            <div class="search-content overflow-ellipsis" v-else>{{searchText}}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'search-bar',
    data() {
        return {

        };
    },
    computed: {
        searchText() {
            return this.$store.state.mainModule.searchText;
        },
    },
    mounted() {
        document.getElementById('search_bar_input').addEventListener('click', () => {
            this.$store.dispatch('mainModule/showSearchContent', true);
        });
    },
    methods: {

    },
};
</script>

<style scoped>
    .search_bar{
        width: 100%;
        box-sizing: border-box;
        padding: 6px 10px;
        position: relative;
        min-height: 32px;
    }
    #search_bar_input{
        height: 32px;
        background: white;
        border-radius: 16px;
        display: flex;
        align-items: center;
        font-size: 16px;
    }
    .search-icon{
        min-width: 22px;
        margin: 0 10px;
    }
    .search-content{
        padding-right: 10px;
    }
    .search_title{
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #b3b3b3;
    }
</style>
