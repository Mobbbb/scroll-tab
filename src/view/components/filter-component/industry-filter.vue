<!--行业类型-->
<template>
    <div class="industry-filter filter-content-wrap">
        <div class="filter-content">
            <div v-for="item in showTotalList" class="filter-item">
                <div class="item-title overflow-ellipsis">{{item.name}}</div>
                <div class="item-cell-wrap flex" v-if="item.children">
                    <div v-for="cell in item.children">
                        <div class="item-cell overflow-ellipsis"
                             @click="selectItem(cell)"
                             :class="newSelected.includes(cell) ? 'selected-item' : ''"
                             v-if="cell.name">
                            {{cell.name}}
                        </div>
                        <div class="block-item-cell" v-else></div>
                    </div>
                </div>
            </div>
            <div style="height: 2.32rem;"></div>
        </div>
        <div class="filter-btn-wrap flex justify-between" :class="clickAble ? 'active-btn-wrap' : ''">
            <div class="filter-btn cancel-btn" @click="cancel">恢复默认</div>
            <div class="btn-line"></div>
            <div class="filter-btn confirm-btn" @click="confirm">确定</div>
        </div>
    </div>
</template>

<script>
import { fillIntoRestByBlock, addDiffRemoveSame } from '_a/libs/util';

export default {
    name: 'industry-filter',
    props: {
        value: {
            default: () => {
                return [];
            },
            type: Array
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
            newSelected: [],
            numOfRow: 3 // 一行的个数
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
        showTotalList() {
            let arr = [...this.list];
            arr.forEach(item => {
                if (item.children) {
                    fillIntoRestByBlock(this.numOfRow, item.children);
                }
            });
            return arr;
        },
        clickAble() {
            return this.value.length || this.newSelected.length;
        }
    },
    mounted() {

    },
    methods: {
        cancel() {
            if (this.clickAble) {
                this.$emit('input', []);
                this.$emit('on-cancel', []);
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
        selectItem(item) {
            this.newSelected = addDiffRemoveSame(this.newSelected, item, 'id', 'id');
        },
        resetValue() {
            this.newSelected = this.value;
        }
    }
};
</script>

<style scoped>
    .industry-filter{
        height: 375px;
        padding: 0 16px;
    }
    .filter-item{
        padding-bottom: 14px;
    }
    .item-title{
        padding: 10px 0 6px 0;
        font-weight: bold;
        font-size: 16px;
        line-height: normal;
    }
    .item-cell-wrap{
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .item-cell{
        width: 109px;
        height: 30px;
        line-height: 30px;
        background: #f5f5f5;
        text-align: center;
        border-radius: 3px;
        margin-top: 8px;
        border: 1PX solid #f5f5f5;
        box-sizing: border-box;
        font-weight: 400;
        padding: 0 10px;
    }
    .block-item-cell{
        width: 109px;
        height: 30px;
        margin-top: 8px;
    }
    .selected-item{
        border: 1PX solid #e62c08;
        background: rgba(230, 44, 8, 0.06);
    }
</style>
