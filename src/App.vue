<template>
    <div id="app">
        <keep-alive>
            <router-view/>
        </keep-alive>
        <!--搜索落地页-->
        <SearchContent v-if="searchContentStatus"></SearchContent>
        <!--测试按钮-->
        <test-btn v-if="showTestBtn"></test-btn>
    </div>
</template>

<script>
import SearchContent from './view/pages/search-content/search-content.vue';
import TestBtn from './components/test-btn.vue';
import { mapState } from 'vuex';

export default {
    name: 'App',
    components: {
        SearchContent,
        TestBtn,
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState('mainModule', {
            searchContentStatus: state => state.searchContentStatus,
            showTestBtn: state => state.showTestBtn,
        }),
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style scoped>
    #app{
        height: 100%;
    }
</style>
