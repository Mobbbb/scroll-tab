<template>
    <div id="scroll-tab">
        <div class="static-top-wrap" ref="staticTopWrap" :style="staticTopStyle">
            <slot name="static-top" :current="value"></slot>
        </div>
        <CardSwipe v-model="value"
                   :height="height"
                   :cardWidth="cardWidth"
                   @on-change-end="swipeChangeEnd"
                   @on-drag-start="swipeChangeStart">
            <CardPane v-for="(item, index) in tabNum" :key="index" @scroll.native="scrollHandle" ref="CardPane">
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
    props: ['tabNum', 'height', 'value', 'cardWidth', 'staticTopHeight'],
    components: {
        CardSwipe,
        CardPane,
    },
    data() {
        return {
            staticTopStyle: {
                zIndex: -1,
                top: 0,
            },
            innerStaticTopHeight: 0,
            scrollHeight: 0,
        };
    },
    computed: {

    },
    mounted() {
        this.innerStaticTopHeight = this.$refs.staticTopWrap.clientHeight;
    },
    methods: {
        swipeChangeStart() {
            this.$emit('on-drag-start');
            this.setStaticTopPos();
            this.syncScrollHeight(this.value);
        },
        swipeChangeEnd(value) {
            this.$emit('input', value);
            this.$emit('on-change-end');
            this.staticTopStyle.zIndex = -1;
        },
        scrollHandle(e) {
            this.getStaticTopPos(e.target.scrollTop);
            this.$emit('on-scroll', {
                scrollTop: e.target.scrollTop,
                staticTopHeight: this.innerStaticTopHeight,
            });
        },
        getStaticTopPos(top) {
            if (top <= this.innerStaticTopHeight) {
                this.scrollHeight = top;
            } else {
                this.scrollHeight = this.innerStaticTopHeight;
            }
        },
        setStaticTopPos() {
            this.staticTopStyle.zIndex = 1;
            this.staticTopStyle.top = `-${this.scrollHeight}px`;
        },
        syncScrollHeight(current) { // 同步滚动高度
            const cardPanes = this.$refs.CardPane;
            cardPanes.forEach((item, index) => {
                if (index !== current) {
                    if (item.$el.scrollTop <= this.innerStaticTopHeight) {
                        item.$el.scrollTop = this.scrollHeight;
                    }
                }
            });
        },
    },
    watch: {
        value(newVal, oldVal) {
            this.setStaticTopPos();
            this.syncScrollHeight(oldVal);
        },
        staticTopHeight() {
            this.innerStaticTopHeight = this.staticTopHeight;
        },
    },
}
</script>

<style scoped>
    #scroll-tab{
        height: 100%;
        position: relative;
        background: #f5f5f5;
    }
    .static-top-wrap{
        position: absolute;
        width: 100%;
        left: 0;
        z-index: 1;
    }
</style>
