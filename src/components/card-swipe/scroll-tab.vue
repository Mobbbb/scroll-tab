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
            this.staticTopStyle.zIndex = 1;
        },
        swipeChangeEnd(value) {
            this.$emit('input', value);
            this.$emit('on-change-end');
            this.staticTopStyle.zIndex = -1;
        },
        setStaticTopPos(top) {
            if (top <= this.innerStaticTopHeight) {
                this.staticTopStyle.top = `-${top}px`;
            } else {
                this.staticTopStyle.top = `-${this.innerStaticTopHeight}px`;
            }
        },
        syncScrollHeight(context, scrollHeight) {
            const cardPanes = this.findBrothersComponents(context, 'card-pane');
            cardPanes.forEach(item => {
                if (scrollHeight <= this.innerStaticTopHeight) {
                    item.$el.scrollTop = scrollHeight;
                } else {
                    item.$el.scrollTop = this.innerStaticTopHeight;
                }
            });
        },
        findBrothersComponents(context, componentName, exceptMe = true) {
            let res = context.$parent.$children.filter(item => {
                return item.$options.name === componentName;
            });
            let index = res.findIndex(item => item._uid === context._uid);
            if (exceptMe) res.splice(index, 1);
            return res;
        },
    },
    watch: {
        value() {
            this.staticTopStyle.zIndex = 1;
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
