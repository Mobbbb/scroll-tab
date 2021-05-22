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
    props: {
        tabNum: {
            type: Number,
        },
        height: {
            default: 'auto',
            type: String,
        },
        value: {
            default: 0,
            type: Number,
        },
        cardWidth: {
            default: 200,
            type: Number,
        },
        staticTopHeight: {
            default: 0,
            type: Number,
        },
        staticTopOffset: {
            default: 0,
            type: Number,
        },
    },
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
            innerStaticTopHeight: 0, // 上部偏移量的最大值
            staticTopDisplacement: 0, // 当前上部位移量
            currentScrollHeight: 0,
        };
    },
    computed: {

    },
    mounted() {
        this.innerStaticTopHeight = this.$refs.staticTopWrap.clientHeight - this.staticTopOffset;
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
            this.currentScrollHeight = e.target.scrollTop;
            this.getStaticTopPos();
            this.$emit('on-scroll', {
                scrollTop: e.target.scrollTop,
                staticTopHeight: this.innerStaticTopHeight,
            });
        },
        getStaticTopPos() {
            if (this.currentScrollHeight <= this.innerStaticTopHeight) {
                this.staticTopDisplacement = this.currentScrollHeight;
            } else {
                this.staticTopDisplacement = this.innerStaticTopHeight;
            }
        },
        setStaticTopPos() {
            this.staticTopStyle.zIndex = 1;
            this.staticTopStyle.top = `-${this.staticTopDisplacement}px`;
        },
        syncScrollHeight(current) { // 同步滚动高度
            const cardPanes = this.$refs.CardPane;
            cardPanes.forEach((item, index) => {
                if (index !== current) {
                    if (this.currentScrollHeight < this.innerStaticTopHeight) {
                        item.$el.scrollTop = this.currentScrollHeight;
                    } else if (item.$el.scrollTop <= this.innerStaticTopHeight) {
                        item.$el.scrollTop = this.staticTopDisplacement;
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
