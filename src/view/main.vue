<template>
    <div id="main">
        <tab-title v-model="current" :titleArr="tabConfig" class="fixed-tab-title" :style="showFixedTabTitle"></tab-title>

        <scroll-tab v-model="current" 
                    height="100%" 
                    :tabNum="tabConfig.length" 
                    :cardWidth="cardWidth" 
                    :staticTopOffset="staticTopOffset" 
                    @on-scroll="scrollHandle">
            <template v-slot:static-top>
                <div class="bar-wrap main-bar-wrap shrink">
                    <header-bar></header-bar>
                    <search-bar></search-bar>
                    <hot-search></hot-search>
                    <tab-title v-model="current" :titleArr="tabConfig"></tab-title>
                </div>
            </template>
            
            <ul slot="card-pane-0" class="scroll-tab-ul">
                <li v-for="(cell, index) in 50" :key="index">
                    Tab0 - 内容{{index}}
                </li>
            </ul>
            <ul slot="card-pane-1" class="scroll-tab-ul">
                <li v-for="(cell, index) in 50" :key="index">
                    Tab1 - 内容{{index}}
                </li>
            </ul>
            <ul slot="card-pane-2" class="scroll-tab-ul">
                <li v-for="(cell, index) in 50" :key="index">
                    Tab2 - 内容{{index}}
                </li>
            </ul>
        </scroll-tab>
    </div>
</template>

<script>
import HeaderBar from '../view/components/bar/header-bar.vue';
import SearchBar from '../view/components/bar/search-bar.vue';
import HotSearch from '../view/components/bar/hotsearch-bar.vue';
import TabTitle from '../view/components/bar/tab-title.vue';
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
            showFixedTabTitle: {
                zIndex: -1,
            },
            staticTopOffset: 44,
        }
    },
    mounted() {
        this.cardWidth = window.windowWidth;
    },
    methods: {
        scrollHandle({scrollTop, staticTopHeight}) {
            if (scrollTop >= staticTopHeight) {
                this.showFixedTabTitle.zIndex = 2;
            } else {
                this.showFixedTabTitle.zIndex = -1;
            }
        },
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
    .fixed-tab-title{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
</style>
