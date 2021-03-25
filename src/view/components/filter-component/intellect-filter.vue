<!--最右侧（智能筛选）-->
<template>
    <div class="intellect-filter filter-content-wrap">
        <div class="filter-content">
            <div v-for="item in list"
                 class="intellect-filter-item"
                 :class="value === item.value ? 'selected-item' : ''"
                 @click="selectItem(item)">
                <div class="item-text overflow-ellipsis">{{item.name}}</div>
                <div class="icon22 single-select-icon" v-if="value === item.value"></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'intellect-filter',
    props: {
        value: {
            default: '',
            type: String
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

        }
    },
    watch: {

    },
    computed: {

    },
    mounted() {

    },
    methods: {
        selectItem(item) {
            if (this.value === item.value) {
                this.$emit('input', '');
                this.$emit('on-select', '');
            } else {
                this.$emit('input', item.value);
                this.$emit('on-select', item.value);
            }
        },
    }
};
</script>

<style scoped>
    .intellect-filter{
        padding: 0 16px;
    }
    .intellect-filter-item{
        height: 46px;
        line-height: 46px;
        border-bottom: 1PX solid #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .intellect-filter-item:last-of-type{
        border-bottom: none;
    }
    .item-text{
        font-size: 16px;
    }
    .selected-item .item-text{
        color: #e62c08;
    }
    .single-select-icon{
        width: 20px;
        height: 20px;
        background-position: -210px -70px;
    }
</style>
