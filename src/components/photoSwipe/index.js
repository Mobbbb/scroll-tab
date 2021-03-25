import photoSwipe from "./PhotoSwipe.vue"

let PhotoSwipe= {};

PhotoSwipe.install = (Vue) => {
    let instance;
    let initInstance = () => {
        const PhotoSwipeConstructor = Vue.extend(photoSwipe);
        instance = new PhotoSwipeConstructor();
        instance.$mount();
        document.body.appendChild(instance.$el);
    };

    Vue.prototype.$photoSwipe = {
        open(opt = {}) {
            !instance && initInstance();
            instance.showPhoto = true;
            instance.datas = opt.datas;
            //  [
            //      {
            //          imageUrl: 'http://', // 图片地址
            //          sourceUrl: ''， // 查看原文地址
            //          content: '', // 底部展示的文字内容
            //          sourceUrl: '', // 查看原文的跳转地址
            //      }
            //  ]
            instance.trackPoint = opt.trackPoint;
            instance.currentIndex = opt.currentIndex;
            instance.showTitle = opt.showTitle;
            instance.jumpFun = opt.jumpFun; // 查看原文的跳转方法(需要sourceUrl存在才会调用)
            instance.closeFun = opt.closeFun; // 关闭的回调
            instance.showContext = opt.showContext; // 是否展示底部的文字内容
            instance.showCheckSource = opt.showCheckSource; // 是否显示查看原文按钮
            instance.showContextMenu = opt.showContextMenu;
            instance.btnClickFun = opt.btnClickFun;
            instance.btnList = opt.btnList || [];
            //  [
            //      {
            //          type: 'savePic',
            //          btnName: '保存图片', // 按钮名
            //          btnClickCloseImg: false // 点击按钮后是否关闭图片
            //      }
            //  ]
        },
        close() {
            instance.showPhoto = false;
        }
    }
};

export default PhotoSwipe
