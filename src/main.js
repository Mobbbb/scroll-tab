/**
 * Created by chenyinke on 2019/1/21.
 */
import Vue from 'vue';
import '_a/styles/reset.css';
import '_a/styles/common.css';

import App from './App.vue';
import router from './router';
import store from './store/store';
import MaskLayer from "./components/maskLayer/index";
import AlertDialog from "./components/alert-dialog/index";
import PhotoSwipe from "./components/photoSwipe/index";
import TextLayer from "./components/text-layer/index";
import { setRem, getRem } from './libs/util';

Vue.use(PhotoSwipe);
Vue.use(MaskLayer);
Vue.use(AlertDialog);
Vue.use(TextLayer);

window.getRem = getRem;
window.windowWidth = document.body.offsetWidth;
window.windowHeight = document.documentElement.clientHeight;

Vue.config.productionTip = false;

setRem();

window.onresize = () => setRem();

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
