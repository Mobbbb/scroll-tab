<template>
    <div id="scroll-tab">
        <div class="static-top-wrap">
            <slot name="static-top" :current="value"></slot>
        </div>
        <CardSwipe v-model="value"
                   :height="height"
                   :cardWidth="cardWidth"
                   @on-change-end="swipeChangeEnd">
            <CardPane v-for="(item, index) in tabNum" :key="index">
                <slot name="static-top" :value="value"></slot>
                <slot :name="`card-pane-${index}`"></slot>
            </CardPane>
        </CardSwipe>
    </div>
</template>

<script>
import CardSwipe from './card-swipe.vue';
import CardPane from './card-pane.vue';

export default {
    name: 'scroll-tab',
    props: ['tabNum', 'height', 'value', 'cardWidth'],
    components: {
        CardSwipe,
        CardPane,
    },
    data() {
        return {

        };
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        swipeChangeEnd(value) {
            this.$emit('input', value);
            this.$emit('on-change-end');
        },
    },
}
</script>

<style scoped>
    #scroll-tab{
        height: 100%;
        position: relative;
    }
    .static-top-wrap{
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        z-index: -1;
    }
</style>
