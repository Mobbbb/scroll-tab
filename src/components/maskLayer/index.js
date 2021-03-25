import MaskLayerComponent from "./MaskLayer.vue";

let MaskLayer= {};

MaskLayer.install = (Vue) => {
    const MaskConstructor = Vue.extend(MaskLayerComponent);
    const instance = new MaskConstructor();
    instance.$mount();
    document.body.appendChild(instance.$el);

    Vue.prototype.$mask = {
        show(options = {}) {
            // isShow 是否展示遮罩
            instance.isShow = true;
            // retain 点击遮罩时，是否保留遮罩
            instance.retain = options.retain;
            // onClose 点击关闭时的回调函数
            instance.callback = options.onClose;
            // data 想要展示在遮罩上的内容
            instance.data = options.data;
            // backgroundColor 自定义遮罩的背景色
            instance.backgroundColor = options.backgroundColor || 'rgba(0, 0, 0, 0.6)';
            instance.popUpData = options.popUpData;
        },
        hide() {
            instance.isShow = false;
        }
    }
};

export default MaskLayer
