<template>
    <div class="label-wrap" v-if="params.stock_name || industryName">
        <StockLabel v-if="params.stock_name"
                    :name="params.stock_name"
                    :code="params.stock_code"
                    :trackPointTab="trackPointTab"
                    :size="size">
        </StockLabel>
        <IndustryLabel v-else-if="industryName"
                       :name="industryName"
                       :size="size">
        </IndustryLabel>
        <UpSpace v-if="params.stock_name || industryName"
                 :risingUp="params.rising_up"
                 :risingDown="params.rising_down"
                 :size="size">
        </UpSpace>
    </div>
</template>

<script>
import UpSpace from '_a/view/components/card-component/up-space.vue';
import StockLabel from '_a/view/components/card-component/stock-label.vue';
import IndustryLabel from '_a/view/components/card-component/industry-label.vue';

export default {
    name: 'label-wrap',
    components: {
        UpSpace,
        StockLabel,
        IndustryLabel,
    },
    props: {
        params: {
            default: {},
            type: Object,
        },
        trackPointTab: {
            default: '',
            type: String,
        },
        size: {
            default: 'normal',
            type: String,
        }
    },
    computed: {
        industryName() {
            const industryList = this.$store.state.filterModule.industryList;
            const secondIndustryType = this.params.second_industry_type || '';
            let typeArr = secondIndustryType.split(',');
            let name = '';
            industryList.forEach(item => {
                if (item.children instanceof Array) {
                    item.children.forEach(cell => {
                        if (cell.id === typeArr[0]) {
                            name = cell.name;
                        }
                    });
                }
            });

            return name;
        }
    },
    methods: {

    },
};
</script>

<style scoped>

</style>
