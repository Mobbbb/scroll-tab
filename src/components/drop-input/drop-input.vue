<template>
    <div class="drop-input">
        <div class="input-wrap">
            <input type="text" v-model="text" @input="inputText" class="search-input" :placeholder="placeholder">
            <div class="search-icon" v-if="!text"></div>
            <div class="clear-icon" @click="clear" v-else></div>
        </div>
        <div class="drop-content" v-show="showDropList">
            <div class="drop-item" v-for="item in displayDropList" @click="selectDropItem(item)">{{item.name}}</div>
        </div>
        <!--<div class="drop-content" v-show="showNoDataList">
            <div class="drop-item no-data-item">无匹配结果，请重新输入</div>
        </div>-->
    </div>
</template>

<script>

export default {
    name: 'person-filter',
    props: {
        value: {
            default: '',
            type: String
        },
        placeholder: {
            default: '',
            type: String
        },
        dropList: {
            default: () => {
                return [];
            },
            type: Array
        }
    },
    data() {
        return {
            text: '',
        }
    },
    watch: {
        value: {
            handler: function() {
                this.text = this.value;
            },
            immediate: true
        },
    },
    computed: {
        showDropList() {
            return this.dropList.length && this.value !== '';
        },
        showNoDataList() {
            return !this.dropList.length && this.value !== '';
        },
        displayDropList() {
            return this.dropList.slice(0, 6);
        }
    },
    mounted() {

    },
    methods: {
        inputText() {
            this.$emit('input', this.text);
        },
        selectDropItem(item) {
            this.$emit('on-click', item);
            this.$emit('input', '');
        },
        clear() {
            this.text = '';
            this.$emit('input', this.text);
        }
    }
};
</script>

<style scoped>
    .drop-input{
        position: relative;
        height: 32px;
        width: 100%;
    }
    .drop-content{
        position: absolute;
        top: 38px;
        left: 0;
        right: 0;
        background: white;
        border-radius: 6px;
        border: 1PX solid #e5e5e5;
        box-sizing: border-box;
        padding: 0 16px;
        max-height: 260px;
        overflow-y: scroll;
        z-index: 5;
    }
    .drop-item{
        height: 43px;
        line-height: 43px;
        border-bottom: 1PX solid #f0f0f0;
        font-size: 16px;
        box-sizing: border-box;
    }
    .drop-item:last-of-type{
        border: none;
    }
    .no-data-item{
        color: #b2b2b2;
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        text-align: center;
    }
    .input-wrap{
        position: relative;
        height: 32px;
    }
    .search-icon{
        top: 5px;
        right: 10px;
        position: absolute;
    }
    .clear-icon{
        width: 22px;
        height: 22px;
        background-image: url("../../assets/clear-icon3x.png");
        background-size: cover;
        top: 5px;
        right: 10px;
        position: absolute;
    }
    .search-input{
        width: 100%;
        height: 32px;
        line-height: 32px;
        border-radius: 6px;
        border: 1PX solid #e5e5e5;
        padding: 5px 32px 4px 10px;
        -moz-user-focus: unset;
        -webkit-appearance: none;
        outline: none;
        -webkit-user-select: text!important;
        font-size: 16px;
        box-sizing: border-box;
        vertical-align: top;
    }
    .search-input::-webkit-input-placeholder{
        color: #b3b3b3;
    }
    .search-input::-moz-placeholder{
        color: #b3b3b3;
    }
    .search-input:-moz-placeholder{
        color: #b3b3b3;
    }
    .search-input:-ms-input-placeholder{
        color: #b3b3b3;
    }
</style>
