<template>
    <div id="main">
        <div class="bar-wrap main-bar-wrap shrink">
            <header-bar></header-bar>
            <search-bar></search-bar>
            <hot-search></hot-search>
        </div>
        <content-tab></content-tab>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import HeaderBar from '../view/components/bar/header-bar.vue';
import SearchBar from '../view/components/bar/search-bar.vue';
import HotSearch from '../view/components/bar/hotsearch-bar.vue';
import ContentTab from '../view/components/content-tab/content-tab.vue';

export default {
    name: 'main',
    components: {
        HeaderBar,
        SearchBar,
        ContentTab,
        HotSearch,
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState('tabModule', ['tabScrollHeight']),
    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped>
    #main{
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
</style>
