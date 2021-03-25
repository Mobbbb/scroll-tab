<!--机构/分析师-->
<template>
    <div class="person-filter filter-content-wrap">
        <div class="filter-content">
            <div class="drop-input-wrap">
                <DropInput :placeholder="'搜索' + filterTypeLabel"
                           @input="inputText"
                           v-model="searchText"
                           :dropList="dropList"
                           @on-click="selectDropItem">
                </DropInput>
                <div class="add-btn" :class="isAddable ? '' : 'disable-add-btn'" @click="addInputItem">添加</div>
            </div>
            <div class="item-title mine-title">我选择的{{filterTypeLabel}}</div>
            <div class="item-cell-wrap flex" :style="showSelected.length ? {marginTop: '4px'} : {}">
                <div v-for="(item, index) in showSelected"
                     class="selected-item"
                     v-if="item.name">
                    <div class="item-text overflow-ellipsis">{{item.name}}</div>
                    <div class="close-icon" @click="addAndCancelItem(item)"></div>
                </div>
                <div class="block-item-cell" v-else></div>
            </div>
            <div class="item-title hot-title">热门{{filterTypeLabel}}</div>
            <div class="item-cell-wrap flex">
                <div class="item-cell overflow-ellipsis"
                     @click="addAndCancelItem(item)"
                     v-for="item in showTotalList"
                     v-if="item.name">
                    {{item.name}}
                </div>
                <div class="block-item-cell" v-else></div>
            </div>
            <div style="height: 2.84rem;"></div>
        </div>
        <div class="filter-btn-wrap flex justify-between" :class="clickAble ? 'active-btn-wrap' : ''">
            <div class="filter-btn cancel-btn" @click="cancel">恢复默认</div>
            <div class="btn-line"></div>
            <div class="filter-btn confirm-btn" @click="confirm">确定</div>
        </div>
    </div>
</template>

<script>
import { fillIntoRestByBlock, addDiffRemoveSame, includesOfObj, throttle, regText } from '_a/libs/util';
import { filterTypeMap, dropList } from './config';
import { mapState, mapActions } from 'vuex';
import DropInput from '_a/components/drop-input/drop-input.vue';

export default {
    name: 'person-filter',
    components: {
        DropInput,
    },
    props: {
        value: {
            default: () => {
                return {};
            },
            type: Object
        },
        list: {
            default: () => {
                return [];
            },
            type: Array
        }
    },
    data() {
        return {
            newSelected: {},
            emptyObj: {
                person: [],
                organization: []
            },
            filterType: 'person',
            searchText: '',
            throttleInput: null,
            numOfRow: 4 // 一行的个数
        }
    },
    watch: {
        value: {
            handler: function() {
                this.resetValue();
            },
            immediate: true,
            deep: true
        },
    },
    computed: {
        filterTypeLabel() {
            return filterTypeMap[this.filterType];
        },
        showSelected() {
            let arr = [...this.newSelected[this.filterType]];
            fillIntoRestByBlock(this.numOfRow, arr);
            return arr;
        },
        clickAble() {
            let flag = false;
            let temp = false;
            Object.keys(this.value).forEach(key => {
                if (this.value[key].length) flag = true;
            });
            Object.keys(this.newSelected).forEach(key => {
                if (this.newSelected[key].length) temp = true;
            });

            return flag || temp;
        },
        showTotalList() {
            let arr = [];
            this.list.forEach((item) => {
                let flag = true;
                this.newSelected[this.filterType].forEach((cell) => {
                    if (item.name === cell.name) {
                        flag = false;
                    }
                });
                if (flag) arr.push(item);
            });
            fillIntoRestByBlock(this.numOfRow, arr);
            return arr;
        },
        isAddable() {
            return regText(this.searchText, 'name');
        },
        ...mapState('filterModule', {
            dropList: state => state.dropList,
        }),
    },
    mounted() {
        this.throttleInput = throttle((e) => {
            this.inputHandle(e);
        }, 500, 500);
    },
    methods: {
        ...mapActions('filterModule', ['getResearcherLenovo']),
        inputHandle(e) {
            if (this.searchText !== '') {
                this.getResearcherLenovo(this.searchText);
            }
        },
        inputText(e) {
            this.throttleInput(e);
        },
        clearText() {
            this.searchText = '';
        },
        cancel() {
            if (this.clickAble) {
                this.newSelected = JSON.parse(JSON.stringify(this.emptyObj));
                this.$emit('input', this.newSelected);
                this.$emit('on-cancel', this.newSelected);
            }
        },
        addInputItem() { // 将输入框的内容添加至选中项
            this.searchText = this.searchText.trim();
            if (this.isAddable) {
                this.selectDropItem({ name: this.searchText });
                this.searchText = '';
            }
        },
        confirm() {
            if (this.clickAble) {
                this.$emit('on-confirm', this.newSelected);
            }
            this.setValue();
        },
        setValue() {
            if (this.clickAble) {
                this.$emit('input', this.newSelected);
            }
        },
        addAndCancelItem(item) {
            const arr = [...this.newSelected[this.filterType]];
            this.newSelected[this.filterType] = addDiffRemoveSame(arr, item, 'name', 'name');
        },
        resetValue() {
            this.newSelected = JSON.parse(JSON.stringify(this.value));
        },
        selectDropItem(item) {
            let arr = [...this.newSelected[this.filterType]];
            if (!includesOfObj(arr, item)) {
                arr.push(item);
                this.newSelected[this.filterType] = [...arr];
            }
        },
    }
};
</script>

<style scoped>
    .person-filter{
        height: 375px;
    }
    .filter-content{
        padding: 0 16px;
    }
    .item-title{
        font-weight: bold;
        font-size: 16px;
        line-height: normal;
    }
    .mine-title{
        margin-top: 18px;
    }
    .hot-title{
        margin-top: 24px;
        padding-bottom: 4px;
    }
    .item-cell-wrap{
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .item-cell{
        width: 79px;
        height: 30px;
        line-height: 30px;
        background: #f5f5f5;
        text-align: center;
        border-radius: 3px;
        margin-top: 8px;
        border: 1PX solid #f5f5f5;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .block-item-cell{
        width: 79px;
        height: 30px;
        margin-top: 8px;
    }
    .selected-item{
        width: 79px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 3px;
        margin-top: 12px;
        box-sizing: border-box;
        border: 1PX solid #e62c08;
        background: rgba(230, 44, 8, 0.06);
        position: relative;
    }
    .close-icon{
        position: absolute;
        right: -6px;
        top: -6px;
        width: 13PX;
        height: 13PX;
        background-image: url("../../../assets/clear-icon3x.png");
        background-size: 100% 100%;
    }
    .drop-input-wrap{
        display: flex;
        margin-top: 6px;
        vertical-align: top;
    }
    .add-btn{
        height: 32px;
        line-height: 32px;
        margin-left: 12px;
        width: 52px;
        min-width: 52px;
        text-align: center;
        color: white;
        background: #e93030;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .disable-add-btn{
        background: white;
        border: 1PX solid #ebebeb;
        color: #b3b3b3;
    }
</style>
