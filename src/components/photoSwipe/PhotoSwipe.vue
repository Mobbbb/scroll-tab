 <template>
    <div class="photo_swipe" v-if="showPhoto" @click="closePhoto" :style="{opacity: bigOpacity}">
        <div class="photo_swipe_header">
            <div class="current_index">
                {{ currentIndex + 1 }}<span>{{ "/" + datas.length }}</span>
            </div>
            <div v-if="showCheckSource" class="source_btn" @click="goSourcePage">阅读原文</div>
        </div>
        <div class="img_body" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <ul class="img_list"
                :style="{width:listWidth + 'px',left: moveLeft + 'px'}"
                :class="{transition_list: transitionList}">
                <li v-for="(item, index) in datas" :key="index">
                    <div class="img_box">
                        <img :src="item.imageUrl | repairProtocol" ref="image" :class="{long_img: longImgIndexs.includes(index)}">
                    </div>
                </li>
            </ul>
        </div>
        <div class="popup-content" v-if="showBottomBtn && btnList.length">
            <div class="popup-btn-item"
                 v-for="(item, index) in btnList"
                 :style="btnList.length === index + 1 ? {borderBottom: 'none'} : {}"
                 @click.stop="clickBottomBtnItem(item)">{{item.btnName}}</div>
            <div class="bottom-block"></div>
            <div class="bottom-cancel" @click.stop="showBottomBtn = false">取消</div>
        </div>
        <div class="content_body" v-if="showDesc && (showTitle || showContext)" @click.stop.prevent>
            <div class="more_btn" @click="toggleDesc" v-if="datas[currentIndex].content && showContext">
                <span :class="showAllDesc ? 'triangle_down' : 'triangle_up'"></span>
            </div>
            <div class="content_title" v-if="datas[currentIndex].title && showTitle">{{datas[currentIndex].title}}</div>
            <div class="content_desc" :class="{ellipsis: !showAllDesc}" v-if="datas[currentIndex].content && showContext">
                {{datas[currentIndex].content}}
            </div> 
        </div>
    </div>
</template>

<script>
export default {
    name: "photo-swipe",
    props: {
        datas: {
            type: Array,
            required: true
        },
        currentIndex: {
            type: [Number, String],
            default: 0
        },
        // 埋点方法
        trackPoint: {
            type: Function,
            required: false
        },
        // 页面跳转方法
        jumpFun: {
            type: Function,
            required: false
        },
        // 组件关闭时触发的钩子函数
        closeFun: {
            type: Function,
            required: false
        },
        // 是否展示标题
        showTitle: {
            type: Boolean,
            default: true,
        },
        // 是否展示摘要
        showContext: {
            type: Boolean,
            default: true,
        },
        // 是否展示查看原文按钮
        showCheckSource: {
            type: Boolean,
            default: true,
        },
    },
    data: function () {
        return {
            showPhoto: false,
            isTouch: false,
            isDoubleTouch: false,
            currentIndex: 0,
            now: 0,
            delta: 0,
            startX: 0,
            startY: 0,
            doubleStart: [],
            startPos: [],
            movePos: [],
            endPos: [],
            tMatrix: [1, 0, 0, 1, 0, 0], // x缩放，无，无，y缩放，x平移，y平移
            originLast: [],
            showAllDesc: false,
            gestureTimer: Date.now(),   // 手势缩放需要节流
            singleClickTimer: null,     // 单击的延时控制器
            isDoubleClick: false,       // 是否正处在双击的第二击过程中
            windowHeight: window.innerHeight, // 浏览器高度
            windowWidth: window.innerWidth, // 浏览器宽度
            longImgIndexs: [],          // 长图需要设置居上的样式的index
            MaxScale: 4,                // 图片最大放大倍数
            MinScale: 1,                // 图片最小缩小倍数
            twoPointAfter: 0,           // 两个触点之后一段时间
            isdownToQuit: false,        // 在下拉退出过程中
            bigOpacity: 1,              // 弹出层的透明度
            moveLeft: 0,                // ul滑动值
            onSliding: false,           // 是否在切换图片过程中
            transitionList: false,       // ul是否有过度效果，滑动过程不能有过渡效果，切换时需要
            isMagnify: false,           // 是否处于放大状态
            outDragging: false, // 是否正处于下拉退出的操作
            touchStartTime: null,
            longPressTimer: null,
            isMoving: false,
            longPressStatus: false,
            showBottomBtn: false,
        }
    },
    computed: {
        nextIndex() {
            return this.currentIndex === this.datas.length - 1 ? 0 : (this.currentIndex + 1)
        },
        preview() {
            return this.currentIndex === 0 ? (this.datas.length - 1) : (this.currentIndex - 1)
        },
        leftIndex() {
            return this.currentIndex;
        },
        showDesc() {
            return !this.isMagnify && this.datas[this.currentIndex] && (this.datas[this.currentIndex].title || this.datas[this.currentIndex].content);
        },
        listWidth() {
            return window.innerWidth * this.datas.length;
        }
    },
    methods: {
        touchStart(e) {
            if (e.touches.length >= 2) {
                this.isDoubleTouch = true;
                this.doubleStart = e.touches;
                // 两个触点中心坐标
                let screenMidPoint = this.getMidpoint(this.doubleStart[0], this.doubleStart[1]);
                // 中心目标相对目标元素坐标
                let midPoint = [screenMidPoint[0] - (e.target.offsetLeft + this.moveLeft), screenMidPoint[1] - e.target.offsetTop];
                this.gestureStart(midPoint);
            } else {
                this.delta = Date.now() - this.now;
                this.now = Date.now();
                this.startPos = [e.touches[0].pageX, e.touches[0].pageY];
                if (typeof this.showContextMenu === "function") {
                    this.touchStartTime = Date.now();
                    this.longPressTimer = setTimeout(() => {
                        if (!this.isMoving) {
                            this.showBottomBtn = true;
                            this.longPressStatus = true;
                            this.showContextMenu();
                        }
                    }, 680);
                }
                if (this.delta > 0 && this.delta <= 250) {
                    // 双击事件
                    // 双击事件要取消单击触发的回调
                    if(this.singleClickTimer){
                        clearTimeout(this.singleClickTimer);
                    }
                    this.isDoubleClick = true;
                    this.getImgWidthAndHeight();
                    let midPoint = [e.touches[0].pageX - (e.target.offsetLeft + this.moveLeft), e.touches[0].pageY - e.target.offsetTop];
                    this.doubleClick(midPoint)
                }
                this.startX = e.touches[0].pageX;
                this.startY = e.touches[0].pageY;
                this.isTouch = true;
            }
        },
        touchMove(e) {
            this.isMoving = true;
            if (e.touches.length >= 2 && this.isDoubleTouch) {
                // 手势缩放
                e.stopPropagation();
                e.preventDefault();
                let curr_pos = e.touches;

                let gap = this.getDistance(curr_pos[0], curr_pos[1]) - this.getDistance(this.doubleStart[0], this.doubleStart[1]);

                this.doubleStart = e.touches;

                this.gestureChange(gap);

            } else if (this.isTouch) {
                if (!this.longImgIndexs.includes(this.currentIndex)) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                if (this.maxHorizontal > 0) {
                    // 拖拽行为
                    e.stopPropagation();
                    e.preventDefault();
                    this.movePos = [e.touches[0].pageX, e.touches[0].pageY];
                    this.movePos = [this.movePos[0] - this.startPos[0], this.movePos[1] - this.startPos[1]];
                    this.startPos = [e.touches[0].pageX, e.touches[0].pageY];
                    this.dragMove(this.movePos)
                } else {
                    let moveX = e.touches[0].pageX - this.startPos[0];
                    let moveY = e.touches[0].pageY - this.startPos[1];

                    if (Math.abs(moveX/moveY) < 1 || this.outDragging) {
                        this.outDragging = true;
                        // 下拉退出的操作
                        // 如果下拉不超过50或者处于超长图的浏览过程中不作处理
                        let liScrollTop = $(this.$refs.image[this.currentIndex]).parent()[0].scrollTop;
                        if (e.touches[0].pageY - this.startPos[1] > 50 && liScrollTop < 1) {
                            this.isdownToQuit = true;
                            this.downToQuit(e.touches[0].pageY - this.startPos[1]);
                        }
                    } else {
                        // 滑动跟随效果
                        if (Date.now() - this.twoPointAfter > 200) {
                            this.transitionList = false;
                            this.startPos = [e.touches[0].pageX, e.touches[0].pageY];
                            this.onSliding = true;
                            if (this.moveLeft + moveX < this.windowWidth / 2
                                && this.moveLeft + moveX > -(this.listWidth - this.windowWidth / 2)) {
                                this.moveLeft = this.moveLeft + moveX;
                            }
                        }
                    }
                }
            }
        },
        touchEnd(e) {
            e.stopPropagation();
            e.preventDefault();
            const x = e.changedTouches[0].pageX;
            const y = e.changedTouches[0].pageY;

            if (this.isDoubleTouch) {
                // 如果是手势，在超过最大或者最小倍数之后，需要还原到最大倍数或者最小倍数
                if (this.tMatrix[0] > this.MaxScale || this.tMatrix[0] < this.MinScale) {
                    this.decreaseToLimit();
                } else {
                    // 如果不是的话，需要进行修正操作
                    this.repairVertical();
                }
                this.twoPointAfter = Date.now();
                this.isDoubleTouch = false;
                this.endPos = [x, y];
            }
            // 左右切换图片
            if (this.onSliding) {
                let moveX = this.startX - x;
                // 滑动超过一半宽度切换图片，否则还原位置
                this.transitionList = true;
                if (Math.abs(moveX) > this.windowWidth/4) {
                    if (moveX > 0 && this.currentIndex < this.datas.length-1) {
                        //this.moveLeft = -this.windowWidth * this.nextIndex;
                        this.slidePhoto(this.nextIndex);
                    } else if (moveX < 0 && this.currentIndex > 0){
                        //this.moveLeft = -this.windowWidth * this.preview;
                        this.slidePhoto(this.preview);
                    } else {
                        this.moveLeft = -this.windowWidth * this.currentIndex;
                    }
                } else {
                    this.moveLeft = -this.windowWidth * this.currentIndex;
                }
                setTimeout(() => {
                    this.transitionList = false;
                }, 350);
                this.onSliding = false;
            }
            if (this.isTouch && !this.isDoubleClick && !this.longPressStatus) {
                // 判断出如果是单击操作，无论在方法还是缩小状态都关闭全屏查看
                if (Math.abs(this.startX - x) < 5  && Math.abs(this.startY - y) < 5) {
                    this.singleClickTimer = setTimeout(() => {
                        this.isZoom = false;
                        this.isMagnify = false;
                        this.tMatrix = [1, 0, 0, 1, 0, 0];
                        this.maxMove();
                        this.closePhoto();
                    }, 300);
                }
            }
            if (this.isDoubleClick) {
                // 如果正在双击的第二击中
                this.isDoubleClick = false;
            }
            this.outDragging = false;
            this.isMoving = false;
            this.longPressStatus = false;
            clearTimeout(this.longPressTimer);
            if (this.isdownToQuit) {
                // 如果在下拉退出过程中
                this.tMatrix = [1, 0, 0, 1, 0, 0];
                this.maxMove();
                if (y - this.startPos[1] < 150) {
                    // Y轴方向位移小于200还要还原
                    this.bigOpacity = this.tMatrix[0];
                    this.$refs.image[this.currentIndex].style.transform = `matrix(${this.tMatrix.join(",")})`;
                    this.$refs.image[this.currentIndex].style.webkitTransform = `matrix(${this.tMatrix.join(",")})`;
                } else {
                    // 大于150就退出弹层
                    this.bigOpacity = 0;
                    // 组件关闭时执行钩子函数
                    if (typeof this.closeFun === "function") {
                        this.closeFun();
                        this.showBottomBtn = false;
                    }
                    setTimeout(() => {
                        this.showPhoto = false;
                        this.bigOpacity = 1;
                    }, 200);
                }
                setTimeout(() => {
                    // 等动画之后再还原超长图片的变化原点
                    if (this.longImgIndexs.includes(this.currentIndex)) {
                        this.$refs.image[this.currentIndex].style.transformOrigin = "0 0";
                        this.$refs.image[this.currentIndex].style.webkitTransformOrigin = "0 0";
                    }
                }, 150);
                this.isdownToQuit = false;
            }
        },
        gestureStart(point) {
            this.originLast = point;
        },
        gestureChange(gap) {
            let remaining = Date.now() - this.gestureTimer;
            if(remaining > 50){
                this.gestureTimer = Date.now();
                // 最终只允许不小于1倍，但是在动作上不小于0.5倍
                let selfMinScale = 0.5;
                let currentWidth = this.imgWidth * this.tMatrix[0];
                let affterWidth = currentWidth + (gap * 7);


                let current_scale = affterWidth/(this.imgWidth);

                this.tMatrix[0] = this.tMatrix[3] = current_scale < selfMinScale ? this.tMatrix[3] : current_scale;

                this.setScaleCauseMove(this.tMatrix[0],this.tMatrix[3]);

                // 如果缩放比例不是1，那么就要把isZoom置为true，让下次双击还原图片
                if(this.tMatrix[0] !== 1) {
                    this.isZoom = true;
                }
                if(this.tMatrix[0] > 1){
                    this.isMagnify = true;
                }
                this.$refs.image[this.currentIndex].style.transform = `matrix(${this.tMatrix.join(",")})`;
                this.$refs.image[this.currentIndex].style.webkitTransform = `matrix(${this.tMatrix.join(",")})`;

                this.maxMove();
            }else{
                return;
            }
        },
        doubleClick(point) {
            this.originLast = point;
            if (!this.isZoom) {
                this.isZoom = true;
                this.tMatrix[0] = 2;
                this.tMatrix[3] = 2;
                if(this.tMatrix[0] > 1){
                    this.isMagnify = true;
                }
                // 计算放大后基于origin的位移
                this.setScaleCauseMove(this.tMatrix[0],this.tMatrix[3]);
            } else {
                this.isZoom = false;
                this.isMagnify = false;
                this.tMatrix = [1, 0, 0, 1, 0, 0];
            }

            this.maxMove();

            this.repairVertical();

            this.$refs.image[this.currentIndex].style.transform = `matrix(${this.tMatrix.join(",")})`;
            this.$refs.image[this.currentIndex].style.webkitTransform = `matrix(${this.tMatrix.join(",")})`;
        },
        downToQuit(downGap) {
            let selfMinScale = 0.5;
            let currentWidth = this.imgWidth * this.tMatrix[0];
            let affterWidth = currentWidth - (downGap/10);
            let current_scale = affterWidth/(this.imgWidth);
            this.tMatrix[0] = this.tMatrix[3] = current_scale < selfMinScale ? this.tMatrix[3] : current_scale;
            this.tMatrix[5] = this.tMatrix[5] + (downGap * this.tMatrix[0] / 10);

            this.bigOpacity = this.tMatrix[0];
            if(this.longImgIndexs.includes(this.currentIndex)) {
                this.$refs.image[this.currentIndex].style.transformOrigin = "50% 50%";
                this.$refs.image[this.currentIndex].style.webkitTransformOrigin = "50% 50%";
            }
            this.$refs.image[this.currentIndex].style.transform = `matrix(${this.tMatrix.join(",")})`;
            this.$refs.image[this.currentIndex].style.webkitTransform = `matrix(${this.tMatrix.join(",")})`;

        },
        // 设置由于放大带来的位移
        setScaleCauseMove(xScale,yScale) {
            let extraX,
                extraY;
            // 如果不是超长图片
            if(!this.longImgIndexs.includes(this.currentIndex)){
                extraX = this.originLast[0] - (this.imgWidth/2);
                extraY = this.originLast[1] - (this.imgHeight/2);
            }else{
                // 如果是超长图片，transform-origin是从0,0开始的
                extraX = this.originLast[0];
                // Y轴方向还需要加上scrollTop
                let liScrollTop = $(this.$refs.image[this.currentIndex]).parent()[0].scrollTop;
                extraY = this.originLast[1] + liScrollTop;
            }
            this.tMatrix[4] = extraX + (-extraX) * xScale;
            // 当放大之后图片的高度没有超过设备高度时，在Y轴上不能有位移
            if(this.imgHeight * yScale > this.windowHeight){
                if(Math.abs(extraY + (-extraY) * yScale) > this.maxVertical){
                    if((extraY + (-extraY) * yScale) > 0){
                        this.tMatrix[5] = this.maxVertical;
                    }else{
                        this.tMatrix[5] = -this.maxVertical
                    }
                }else{
                    this.tMatrix[5] = extraY + (-extraY) * yScale;

                }
            }

        },
        // 修正方法带来的位移
        repairVertical() {
            // 如果放大之后，图片高度超过设备高度了，但是放大过程中的垂直方向的位移超过了最大垂直方向位移要修正过来
            // ！！！！！在touchend中也要加上去，作为对手势放大之后的修正
            if(this.maxVertical > 0){
                // 图片放大后高度大于设备高度才能在垂直方向上拖拽
                if(Math.abs(this.tMatrix[5]) > this.maxVertical){
                    if(this.tMatrix[5] > 0){
                        this.tMatrix[5] = this.maxVertical;
                    }else{
                        this.tMatrix[5] = -this.maxVertical
                    }
                }
            }else{
                // 由图片高度超过设备高度缩小至不超过设备高度
                this.tMatrix[5] = 0;
            }
        },
        // 还原至最大或者最小边界
        decreaseToLimit() {
            if(this.tMatrix[0] > this.MaxScale){
                this.tMatrix[0] = this.tMatrix[3] = this.MaxScale;
                this.setScaleCauseMove(this.MaxScale,this.MaxScale);
            }else if(this.tMatrix[0] < this.MinScale){
                this.tMatrix[0] = this.tMatrix[3] = this.MinScale;
                this.isZoom = false;
                this.isMagnify = false;
                this.setScaleCauseMove(this.MinScale,this.MinScale);
            }
            this.maxMove();
            this.repairVertical();
            this.$refs.image[this.currentIndex].style.transform = `matrix(${this.tMatrix.join(",")})`;
            this.$refs.image[this.currentIndex].style.webkitTransform = `matrix(${this.tMatrix.join(",")})`;
        },
        slidePhoto(index) {
            this.currentIndex = index;
            this.showAllDesc = false;
            this.getImgWidthAndHeight();
        },
        closePhoto() {
            // 组件关闭时执行钩子函数
            if(typeof this.closeFun === "function"){
                this.closeFun();
            }
            this.showBottomBtn = false;
            this.showPhoto = false;
        },
        dragMove(point) {
            if(!this.longImgIndexs.includes(this.currentIndex)) {
                // 如果不是超长图片
                // 水平方向
                if(Math.abs(this.tMatrix[4] + parseInt(point[0])) < this.maxHorizontal){
                    this.tMatrix[4] += parseInt(point[0]);
                }
                // 垂直方向
                if(this.maxVertical > 0){
                    // 图片放大后高度大于设备高度才能在垂直方向上拖拽
                    // this.maxVertical+50是因为获取windowHeight可能存在误差，这个数字比较主观，以后最好找个代替的方案
                    if(Math.abs(this.tMatrix[5] + parseInt(point[1])) < this.maxVertical+50){
                        this.tMatrix[5] += parseInt(point[1]);
                    }
                }
            }else{
                let liScrollTop = $(this.$refs.image[this.currentIndex]).parent()[0].scrollTop;
                // 水平方向
                if(this.tMatrix[4] + parseInt(point[0]) > -this.maxHorizontal && this.tMatrix[4] + parseInt(point[0]) < 0){
                    this.tMatrix[4] += parseInt(point[0]);
                }
                // 垂直方向
                if(this.tMatrix[5] + parseInt(point[1]) > -this.maxVertical && this.tMatrix[5] + parseInt(point[1]) < liScrollTop){
                    this.tMatrix[5] += parseInt(point[1]);
                }
            }

            this.$refs.image[this.currentIndex].style.transform = `matrix(${this.tMatrix.join(",")})`;
            this.$refs.image[this.currentIndex].style.webkitTransform = `matrix(${this.tMatrix.join(",")})`;
        },
        maxMove() {
            let scope = this.tMatrix[0];

            if(!this.longImgIndexs.includes(this.currentIndex)) {
                // 如果不是超长图片

                // 垂直方向最大拖拽，用放大后的图片高度减去设备高度再除以2
                this.maxVertical = ((this.imgHeight * scope) - this.windowHeight) / 2;
                // 水平方向最大拖拽，用放大后的图片宽度去减去设备宽度再除以2
                this.maxHorizontal = ((this.imgWidth * scope) - this.windowWidth) / 2;
            }else{
                // 如果是超长图片
                // 垂直方向最大拖拽，用放大后的图片高度减去原图高度，且只能是负的位移
                this.maxVertical = (this.imgHeight * scope) - this.imgHeight;
                // 水平方向最大拖拽，用放大后的图片宽度去减去原图宽度，且只能是负的位移
                this.maxHorizontal = (this.imgWidth * scope) - this.imgWidth;
            }
        },
        // 获取两点的距离
        getDistance(p1, p2) {
            let x = p2.pageX - p1.pageX;
            let y = p2.pageY - p1.pageY;
            return Math.sqrt((x * x) + (y * y));
        },
        // 获取中点
        getMidpoint(p1, p2) {
            let x = (p1.pageX + p2.pageX) / 2;
            let y = (p1.pageY + p2.pageY) / 2;
            return [x, y];
        },
        toggleDesc(e) {
            e.stopPropagation();
            e.preventDefault();
            if(this.showAllDesc){
                this.sendTrackPoint('clickFold');
            }else{
                this.sendTrackPoint('clickUnfold');
            }
            this.showAllDesc = !this.showAllDesc
        },
        getImgWidthAndHeight() {
            let self = this;
            let imgArr = this.$refs.image;
            setTimeout(()=>{
                if (this.$refs.image) {
                    this.imgWidth = this.$refs.image[this.currentIndex].width;
                    this.imgHeight = this.$refs.image[this.currentIndex].height;
                    this.longImgClass();
                }
            }, 50);
            if (Array.isArray(imgArr) && imgArr.length > 0) {
                imgArr[this.currentIndex].onload = function () {
                    self.imgWidth = this.width;
                    self.imgHeight = this.height;
                    self.longImgClass();
                };
            }
        },
        longImgClass() {
            if(this.imgHeight > this.windowHeight) {
                if(!this.longImgIndexs.includes(this.currentIndex)){
                    this.longImgIndexs.push(this.currentIndex);
                }
            }else{
                if(this.longImgIndexs.includes(this.currentIndex)){
                    this.longImgIndexs.splice(this.longImgIndexs.indexOf(this.currentIndex),1);
                }
            }
        },
        // 查看原文，本期不支持
        goSourcePage(e) {
            e.stopPropagation();
            e.preventDefault();
            let url = this.datas[this.currentIndex].sourceUrl;
            this.sendTrackPoint('clickYuanwen');
            if (url) {
                if (typeof this.jumpFun === "function") {
                    this.jumpFun(url);
                    this.showPhoto = false;
                } else {
                    window.location.href = url;
                }
            }
        },
        sendTrackPoint(type){
            if(this.trackPoint && typeof this.trackPoint === "function"){
                this.trackPoint(type);
            }
        },
        clickBottomBtnItem(item) {
            if (this.btnClickFun && typeof this.btnClickFun === "function") {
                this.btnClickFun(item);
                this.showBottomBtn = false;
                if (item.btnClickCloseImg) {
                    this.showPhoto = false;
                }
            }
        },
    },
    watch: {
        currentIndex(val) {
            this.moveLeft = -this.windowWidth * val;
        }
    },
    filters: {
        repairProtocol(url) {
            let path = url.split("://")[1];
            if(path){
                return location.protocol + '//' + path;
            }else {
                return url;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getImgWidthAndHeight();
        });
    }
}
</script>

<style scoped>
    .img_list{
        position: relative;
        white-space: nowrap;
        height: 100%;
        display: flex;
        display: -webkit-flex;
    }
    .img_list li{
        height: 100%;
        display: inline-block;
    }
    .img_box{
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
        overflow: auto;
    }
    .transition_list{
        -webkit-transition: left 0.3s;
        -moz-transition: left 0.3s;
        -ms-transition: left 0.3s;
        -o-transition: left 0.3s;
        transition: left 0.3s;
    }

    .photo_swipe {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #1A1A1A;
        z-index: 99;
        -webkit-transition: opacity 0.2s;
        transition: opacity 0.2s;
    }

    .img_body {
        position: relative;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .img_body img {
        width: 15rem;
        -webkit-transition: transform 0.2s ease-out;
        transition: transform 0.2s ease-out;
    }

    .img_body .long_img{
        align-self: flex-start;
        -webkit-align-self: flex-start;
        transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
    }

    .slide li {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
        overflow: auto;
    }

    .photo_swipe_header{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
        height: 44px;
        line-height: 44px;
        color: #FFF;
        background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
        background: -o-linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
        background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
        background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
        z-index: 20;
    }
    .current_index {
        font-size: 0.56rem;
    }
    .source_btn {
        font-size: 0.56rem;
    }

    .content_body {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #202020;
        color: #ddd;
        padding-bottom: 0.5rem;
        opacity: 0.8;
    }

    .more_btn {
        text-align: center;
    }

    .triangle_up {
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 0.2rem solid transparent;
        border-right: 0.2rem solid transparent;
        border-bottom: 0.2rem solid #bbb
    }

    .triangle_down {
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 0.2rem solid transparent;
        border-right: 0.2rem solid transparent;
        border-top: 0.2rem solid #bbb
    }

    .content_title {
        padding: 0.2rem 0.5rem;
        font-weight: bold;
        font-size: 0.64rem;
    }

    .content_desc {
        max-height: 4.5rem;
        padding: 0 0.5rem;
        overflow: auto;
        font-size: 0.56rem;
    }

    .ellipsis {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .popup-content{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        border-radius: 10px 10px 0 0;
        font-size: 16px;
    }
    .popup-btn-item{
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-bottom: 1PX solid #f0f0f0;
    }
    .bottom-block{
        height: 4px;
        background: #f0f0f0;
    }
    .bottom-cancel{
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
</style>
