// @charset "utf-8";
import './index.less';

// toastTip弹窗ID
let uId = 0, timer = null;

function template(options){
    var htmlArr = ['<div class="toastTip">'];
    htmlArr.push('<p class="toastTipIcon"></p>');
    htmlArr.push('<p class="toastTipTxt">' + options.tipTxt + '</p>');
    htmlArr.push('</div>');
    return htmlArr.join('');
}

export function dialog(options){
    if (!(this instanceof dialog)) {
        console.log('toastTip为构造函数，需要实例化调用。');
        return;
    }
    this.elmt = null; // 实例化后的dom元素
    this.settings = null; // 合并后的配置参数
    if (!this.init) {
        dialog.prototype.init = function (options){
            let _default = {
                    styles: [],
                    iconClass: '',
                    tipTxt: '',
                    showTime: 3000,
                    mask: false,
                },
                _options = $.extend(true, {}, _default, options),
                that = this;

            _options.uid = uId++;
            that.settings = _options;
            that.elmt = $(template(_options)).appendTo('body');
        };
        dialog.prototype.popup = function (options){
            let that = this, _options = that.settings;
            if (options) {
                _options = $.extend(true, {}, that.settings, options);
                let pngUrl = "url(" + _options.iconClass + ")";
                that.elmt.find('.toastTipIcon').css('background-image', pngUrl);
                that.elmt.find('.toastTipTxt').text(_options.tipTxt);
            }
            that.settings = _options;
            if (!that.elmt) {
                that.init(_options);
            }
            that.elmt.addClass('show');
            if(_options.showTime >= 0){ // showTime<0  表示不限制时间
                clearTimeout(timer);
                timer = setTimeout(function (){
                    that.unpopup()
                }, _options.showTime)
            }
        };
        dialog.prototype.unpopup = function (){
            this.elmt.removeClass('show');
        };
        dialog.prototype.addMask = function () { // 添加遮罩层
            let maskDom = $('<div class="mask toastMask "></div>');
            maskDom.appendTo('body');
            this.elmt.push(maskDom[0]);
        };
        dialog.prototype.remove = function (){
            this.elmt = null;
            this.settings = null;
        };
    }
    this.init(options);
}

const tipInstance = new dialog();
export default tipInstance
