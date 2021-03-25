import TextLayerComponent from "./text-layer.vue";

let TextLayer= {};

TextLayer.install = (Vue) => {
    const TextConstructor = Vue.extend(TextLayerComponent);
    const instance = new TextConstructor();
    instance.$mount();
    document.body.appendChild(instance.$el);

    Vue.prototype.$textLayer = {
        show(option = {}) {
            // isShow 是否展示确认框
            instance.isShow = true;
            instance.content = option.content;
            instance.position = option.position || {};
            // onClose 点击关闭时的回调函数
            instance.callback = option.onClose;
            instance.turnto = option.turnTo;
        },
        hide() {
            instance.isShow = false;
        }
    }
};

export default TextLayer
