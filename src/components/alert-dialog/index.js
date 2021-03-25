import AlertDialogComponent from "./alert-dialog.vue";

let AlertDialog= {};

AlertDialog.install = (Vue) => {
    const AlertConstructor = Vue.extend(AlertDialogComponent);
    const instance = new AlertConstructor();
    instance.$mount();
    document.body.appendChild(instance.$el);

    Vue.prototype.$alert = {
        show(options = {}) {
            // isShow 是否展示确认框
            instance.isShow = true;
            // isShow 是否展示确认框
            instance.content = options.content || '内容';
            // onClose 点击关闭时的回调函数
            instance.cancelCallback = options.onCancel;
            // onClose 点击关闭时的回调函数
            instance.confirmCallback = options.onConfirm;
        },
        hide() {
            instance.isShow = false;
        }
    }
};

export default AlertDialog
