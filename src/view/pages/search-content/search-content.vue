<template>
    <div class="search_content">
        <div class="search_top bar-wrap flex align-center">
            <div class="search_input_wrap">
                <form action="" @submit.prevent="() => {return false}">
                <input
                    ref="input"
                    type="text"
                    id="search_input"
                    placeholder="..."
                    v-model="searchText"
                    autocomplete="off"
                    @keyup.enter="onClickSearch">
                <div class="search-icon"></div>
                <div class="clear_text" @click="clearInput" v-if="searchText !== ''"></div>
                </form>
            </div>
            <div class="cancel_text shrink" @click="cancel" v-if="searchText === ''">取消</div>
            <div class="cancel_text shrink" @click="onClickSearch" v-else>搜索</div>
        </div>
        <div class="search_scroll_content" @touchmove.passive="touchMoveHandle">
            <div class="search_history_wrap" v-if="showHistoryData.length">
                <div class="flex justify-between">
                    <div class="search_history_title">历史搜索</div>
                    <div></div>
                </div>
                <div class="search_history_label"
                     v-for="(item, index) in showHistoryData"
                     @click="searchHistory(item.title, index)">
                    {{item.title}}
                </div>
            </div>
            <div class="hot_wrap" v-if="showHotListData.length">
                <div class="search_history_title" style="margin-bottom: 12px;">热门搜索</div>
                <div class="search_history_label"
                     v-for="(item, index) in showHotListData"
                     @click="searchHot(item, index)">
                    {{item.title}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
    name: 'search-content',
    data() {
        return {
            lenovoData: [],
            showResult: false,
        };
    },
    computed: {
        ...mapGetters('mainModule', [
            'showHistoryData',
            'showHotListData'
        ]),
        searchText: {
            get() {
                return this.$store.state.mainModule.searchText;
            },
            set(value) {
                if (value === 'Mobbbb') {
                    this.changeShowTestBtnStatus(true);
                }
                this.updateInputValue(value);
            },
        },
    },
    mounted() {
        $('#search_input').on('blur', () => {
            $(window).scrollTop(0);
        });
    },
    methods: {
        ...mapActions('mainModule', [
            'clearHistoryList',
            'showSearchContent',
            'searchCurrentList'
        ]),
        ...mapMutations('mainModule', [
            'updateInputValue',
            'changeShowTestBtnStatus',
        ]),
        touchMoveHandle() {
            $('#search_input').blur();
        },
        clearInput() {
            this.updateInputValue('');
            $('#search_input').focus().triggerHandler('click');
        },
        cancel() { // 关闭搜索落地页
            this.showSearchContent(false);
        },
        onClickSearch(e) { // 点击搜索按钮或回车
            this.searchHandle(this.searchText, 'input.ok');
            e.preventDefault();
        },
        searchHistory(query, index) { // 点击历史记录
            this.searchHandle(query, `history.${index}`);
        },
        searchHot(item, index) { // 点击热搜
            this.searchHandle(item.title, `hot.${index}`);
        },
        searchHandle(data, id) {
            this.showSearchContent(false);
            this.updateInputValue(data);
            // this.searchCurrentList();
        },
    },
}
</script>

<style scoped>
    .search_content{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f5f5f5;
        z-index: 10;
    }
    .search_scroll_content{
        position: absolute;
        top: 44px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 11;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .search_top{
        padding: 6px 10px;
    }
    .search_input_wrap{
        width: 100%;
        position: relative;
    }
    #search_input{
        height: 32px;
        line-height: 21px;
        border-radius: 16px;
        width: 100%;
        font-size: 16px;
        padding: 6px 46px 5px 42px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: white;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -moz-user-focus: unset;
        -webkit-appearance: none;
        outline: none;
        border: none;
        -webkit-user-select: text!important;
    }
    #search_input::-webkit-input-placeholder{
        color: #b3b3b3;
    }
    #search_input::-moz-placeholder{
        color: #b3b3b3;
    }
    #search_input:-moz-placeholder{
        color: #b3b3b3;
    }
    #search_input:-ms-input-placeholder{
        color: #b3b3b3;
    }
    .search-icon{
        position: absolute;
        top: 6px;
        left: 10px;
    }
    .clear_text{
        width: 16px;
        height: 16px;
        position: absolute;
        top: 8px;
        right: 10px;
        background-image: url('../../../assets/clear-icon3x.png');
        background-size: cover;
    }
    .cancel_text{
        width: 44px;
        height: 24px;
        text-align: right;
        line-height: 24px;
        color: #ffffff;
        font-size: 17px;
    }
    .search_history_wrap{
        padding: 12px 10px;
    }
    .search_history_title{
        font-size: 16px;
        font-weight: 700;
    }
    .search_history_label{
        max-width: 156px;
        line-height: 21px;
        padding: 6px 12px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 17px;
        background: white;
        display: inline-block;
        font-size: 16px;
        margin: 12px 12px 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .hot_wrap{
        padding: 12px 10px 14px 10px;
    }
    .hot_list_wrap{
        margin-top: 14px;
    }
    .hot_num{
        width: 20px;
        height: 22px;
        text-align: center;
        margin-right: 12px;
        font-size: 16px;
        color: #b2b2b2;
        font-weight: 600;
    }
    .hot_title{
        height: 23px;
        line-height: 23px;
        font-size: 17px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .hot_content{
        height: 20px;
        line-height: 20px;
        color: #b2b2b2;
        margin-top: 2px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .red_num{
        color: #e62c08;
    }
    .search_result_wrap{
        padding: 12px 10px;
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 12;
        background: white;
    }
    .search_value_wrap{
        font-size: 17px;
        color: #0060de;
        height: 23px;
        line-height: 23px;
    }
    .search_result_list{
        font-size: 17px;
        margin-top: 14px;
    }
    .search_result_list:first-of-type{
        margin-top: 12px;
    }
    .search_result_item{
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        line-height: normal;
    }
    .search_value{
        font-size: 17px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .search_value_right{
        line-height: normal;
    }
    .grey_search{
        margin-right: 8px;
        background-position: -20px -38px;
    }
</style>
