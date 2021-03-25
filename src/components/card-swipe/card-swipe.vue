<template>
    <div class="tab-content-wrap" :style="{height}">
        <div class="tab-move-content"
            @transitionend="transitionEnd"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            :style="{transform: 'translateX(' + tabPosition + 'px)',
            transition: banAnimation ? '' : 'all 300ms ease 0s'}">
            <slot></slot>
        </div>
		<slot name="bodySlot"></slot>
    </div>
</template>

<script>
export default {
    name: 'card-swipe',
    props: {
        sensitivity: {
            default: 0.2,
            type: Number,
        },
        value: {
            default: 0,
            type: Number,
        },
        height: {
            default: 'auto',
            type: String,
        },
        cardWidth: {
            default: 200,
            type: Number
        },
        cardNum: {
            default: 0,
            type: Number
        },
    },
    data() {
        return {
            startX: 0, // 开始拖动时的x坐标
            startY: 0, // 开始拖动时的y坐标
            firstMoveY: 0, // 首次移动时，y方向的移动量
            firstMoveX: 0, // 首次移动时，x方向的移动量
            banAnimation: false, // 禁止动画效果的信号
            isDragging: false, // 是否正在左右拖拽
            direction: 0, // 拖拽方向
            tempCurrent: 0, // 动态计算页卡位置的临时存储值
            tempMoveX: 0, // 当前移动页卡的距离
        };
    },
    computed: {
        tabNum() {
            if (this.cardNum) {
                return this.cardNum;
            }
            return this.$children.length;
        },
        tabPosition() {
            return -this.value * this.cardWidth + this.tempMoveX;
        },
    },
    methods: {
        touchStart(e) {
            this.startX = e.changedTouches[0].pageX;
            this.startY = e.changedTouches[0].pageY;
            this.firstMoveY = 0;
            this.firstMoveX = 0;
            this.banAnimation = true;
            this.isDragging = false;
            this.direction = 0;
        },
        touchMove(e) {
            const moveX = e.changedTouches[0].pageX - this.startX;
            this.firstMoveX = e.changedTouches[0].pageX - this.startX;
            this.firstMoveY = e.changedTouches[0].pageY - this.startY;

            if (!this.isDragging) {
                this.isDragging = true;
                this.direction = Math.abs(this.firstMoveX) - Math.abs(this.firstMoveY);
                if (this.direction > 0) {
					this.$emit('on-drag-start');
				}
            }

            if (this.direction > 0) {
                // 防止内容滚动
                if (e.cancelable) e.preventDefault();
                e.stopPropagation();
                this.limitMoveArea(moveX);
            }
        },
        touchEnd() {
            if (this.direction > 0) { // 发生了x方向的移动
                if (this.tempMoveX === 0) { // 说明移动未成功
					this.$emit('on-change-end', this.value);
				}
                this.tempMoveX = 0;
                this.$emit('input', this.tempCurrent);
            }
            this.banAnimation = false;
        },
        transitionEnd() {
            this.$emit('on-change-end', this.value);
        },
        limitMoveArea(moveX) {
            const current = this.computedCurrent(moveX);
            const moveNum = this.tabNum - 1;
            this.tempMoveX = moveX;

            if (current <= 0) {
                this.tempCurrent = 0;
            } else if (current >= moveNum) {
                this.tempCurrent = moveNum;
            } else {
                this.tempCurrent = current;
            }

            if (this.tempMoveX <= -(moveNum - this.value) * this.cardWidth) {
                this.tempMoveX = -(moveNum - this.value) * this.cardWidth;
            }
            if (this.tempMoveX >= this.value * this.cardWidth) {
                this.tempMoveX = this.value * this.cardWidth;
            }
        },
        computedCurrent(moveX) {
            let current = 0;
            let direction = 0;
            if (moveX !== 0) direction = -moveX / Math.abs(moveX);
            const lastMoveX = Math.abs(moveX) % this.cardWidth;
            const index = Math.floor(Math.abs(moveX) / this.cardWidth);
            if (lastMoveX > this.cardWidth * this.sensitivity) { // 滑动距离大于xxx页卡（取余）
                current = this.value + direction * (index + 1);
            } else {
                current = this.value + direction * index;
            }
            return current;
        },
    },
}
</script>

<style>
    .tab-content-wrap{
        overflow: hidden;
    }
    .tab-move-content{
        white-space: nowrap;
        height: 100%;
        /**
        * 让容器可以被子元素撑开，以解决ios tab滑动至第二个之后时，不可再继续滑动的bug
        **/
        width: fit-content;
    }
</style>
