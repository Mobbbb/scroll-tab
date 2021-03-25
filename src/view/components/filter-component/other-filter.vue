<!--筛选-->
<template>
    <div class="other-filter filter-content-wrap">
        <div class="filter-content">
            <div class="filter-left">
                <div class="filter-left-item"
                     :class="filterType === item.value ? 'active-left-item' : ''"
                     @click="selectLeftItem(item)"
                     v-for="item in list">
                    {{item.name}}
                </div>
            </div>
            <div class="filter-right">
                <div class="filter-right-item flex justify-between align-center"
                     v-for="(item, index) in list[0].children"
                     v-show="list[0].value === filterType"
                     :style="list[0].children.length === index + 1 ? {borderBottom: 'none'} : {}"
                     @click="addAndCancelItem(item)">
                    <div :style="newSelected[filterType].includes(item.id) ? {color: '#e62c08'} : ''">{{item.name}}</div>
                    <div :class="newSelected[filterType].includes(item.id) ? 'multi-selected-icon' : 'normal-multi-select-icon'"></div>
                </div>
                <div class="filter-right-item flex justify-between align-center"
                     v-for="(item, index) in list[1].children"
                     v-show="list[1].value === filterType"
                     :style="list[1].children.length === index + 1 ? {borderBottom: 'none'} : {}"
                     @click="addAndCancelItem(item)">
                    <div :style="newSelected[filterType] === item.id ? {color: '#e62c08'} : ''">{{item.name}}</div>
                    <div class="icon22 single-select-icon" v-if="newSelected[filterType] === item.id"></div>
                </div>
                <div class="filter-right-item flex justify-between align-center"
                     v-for="(item, index) in list[2].children"
                     v-show="list[2].value === filterType"
                     :style="list[2].children.length === index + 1 ? {borderBottom: 'none'} : {}"
                     @click="addAndCancelItem(item)">
                    <div :style="newSelected[filterType] === item.id ? {color: '#e62c08'} : ''">{{item.name}}</div>
                    <div class="icon22 single-select-icon" v-if="newSelected[filterType] === item.id"></div>
                </div>
            </div>
        </div>
        <div class="filter-btn-wrap flex justify-between other-filter-btn" :class="clickAble ? 'active-btn-wrap' : ''">
            <div class="filter-btn cancel-btn" @click="cancel">恢复默认</div>
            <div class="btn-line"></div>
            <div class="filter-btn confirm-btn" @click="confirm">确定</div>
        </div>
    </div>
</template>

<script>
import { addDiffRemoveSame } from '_a/libs/util';
import { filterTypeMap, dropList } from './config';

export default {
    name: 'other-filter',
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
                level: [],
                page: '',
                time: ''
            },
            filterType: 'level',
        }
    },
    watch: {
        value: {
            handler: function() {
                this.resetValue();
            },
            immediate: true
        },
    },
    computed: {
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
        }
    },
    mounted() {

    },
    methods: {
        selectLeftItem(item) {
            this.filterType = item.value;
        },
        cancel() {
            if (this.clickAble) {
                this.newSelected = JSON.parse(JSON.stringify(this.emptyObj));
                this.$emit('input', this.newSelected);
                this.$emit('on-cancel', this.newSelected);
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
            if (this.filterType === 'level') { // 多选
                let arr = [...this.newSelected[this.filterType]];
                this.newSelected[this.filterType] = addDiffRemoveSame(arr, item.id);
            } else { // 单选
                if (this.newSelected[this.filterType] === item.id) {
                    this.newSelected[this.filterType] = '';
                } else {
                    this.newSelected[this.filterType] = item.id;
                }
            }
        },
        resetValue() {
            this.newSelected = JSON.parse(JSON.stringify(this.value));
        },
    }
};
</script>

<style scoped>
    .other-filter{
        height: 375px;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        font-size: 16px;
    }
    .filter-content{
        height: auto;
        flex: 1;
        display: flex;
    }
    .filter-left{
        min-width: 90px;
        background: #f5f5f5;
    }
    .filter-right{
        flex: 1;
        padding: 0 16px;
        overflow-y: scroll;
    }
    .filter-left-item{
        height: 46px;
        line-height: 46px;
        padding-left: 16px;
    }
    .active-left-item{
        background: white;
    }
    .filter-right-item{
        height: 46px;
        line-height: 46px;
        border-bottom: 1PX solid #f0f0f0;
    }
    .other-filter-btn{
        position: static;
        min-height: 47px;
    }
    .normal-multi-select-icon{
        height: 18px;
        width: 18px;
        min-width: 18px;
        border-radius: 9px;
        border: 1PX solid #dedede;
        background: rgb(245, 245, 245);
        box-sizing: border-box;
    }
    .single-select-icon{
        width: 20px;
        height: 20px;
        background-position: -210px -70px;
    }
</style>
