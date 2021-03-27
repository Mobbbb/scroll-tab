<template>
    <div id="main">
        <scroll-tab :tabNum="tabConfig.length" height="100%" :cardWidth="cardWidth" v-model="current">
            <template v-slot:static-top>
                <div class="bar-wrap main-bar-wrap shrink">
                    <header-bar></header-bar>
                    <search-bar></search-bar>
                    <hot-search></hot-search>
                    <tab-title v-model="current" :titleArr="tabConfig"></tab-title>
                </div>
            </template>
            
            <ul :slot="`card-pane-${index}`" 
                :key="item.trackPoint"
                class="scroll-tab-ul" 
                v-for="(item, index) in tabConfig">
                <li v-for="(cell, _index) in 50" :key="_index">
                    Tab{{index}} - 内容{{_index}}
                </li>
            </ul>
        </scroll-tab>
    </div>
</template>

<script>
import HeaderBar from '../view/components/bar/header-bar.vue';
import SearchBar from '../view/components/bar/search-bar.vue';
import HotSearch from '../view/components/bar/hotsearch-bar.vue';
import TabTitle from '../view/components/content-tab/tab-title.vue';
import ScrollTab from '../components/card-swipe/scroll-tab.vue';

export default {
    name: 'main',
    components: {
        ScrollTab,
        HeaderBar,
        SearchBar,
        HotSearch,
        TabTitle,
    },
    data() {
        return {
            current: 0,
            cardWidth: 0,
            tabConfig: [
                { name: 'Tab一', trackPoint: 'a' },
                { name: 'Tab二', trackPoint: 'b' },
                { name: 'Tab三', trackPoint: 'c' },
            ],
        }
    },
    mounted() {
        this.cardWidth = window.windowWidth;
    },
    methods: {

    }
};
</script>

<style scoped>
    #main{
        height: 100%;
    }
    .scroll-tab-ul li{
        padding: 4px 12px;
    }
</style>
