<template>
    <div class="report-filter filter-content-wrap">
        <div class="filter-content">
            <div v-for="item in list"
                 class="filter-item"
                 :class="newSelected.includes(item) ? 'selected-item' : ''"
                 @click="selectItem(item)">
                <div class="item-text overflow-ellipsis">{{item.name}}</div>
                <div :class="newSelected.includes(item) ? 'multi-selected-icon' : 'normal-multi-select-icon'"></div>
            </div>
            <div style="height: 1.88rem;"></div>
        </div>
        <div class="filter-btn-wrap flex justify-between" :class="clickAble ? 'active-btn-wrap' : ''">
            <div class="filter-btn cancel-btn" @click="cancel">恢复默认</div>
            <div class="btn-line"></div>
            <div class="filter-btn confirm-btn" @click="confirm">确定</div>
        </div>
    </div>
</template>

<script>
import { addDiffRemoveSame } from '_a/libs/util';

export default {
    name: 'report-filter',
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
            this.newSelected = addDiffRemoveSame(this.newSelected, item, 'code', 'code');
        },
        resetValue() {
            this.newSelected = this.value;
        }
    }
};
</script>

<style scoped>
    .report-filter{
        height: 375px;
        padding: 0 16px;
    }
    .filter-item{
        height: 46px;
        line-height: 46px;
        border-bottom: 1PX solid #f0f0f0;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 1px;
    }
    .item-text{
        font-size: 16px;
    }
    .selected-item .item-text{
        color: #e62c08;
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
</style>
