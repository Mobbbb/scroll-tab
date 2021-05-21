/**
 * Created by mobbbb on 2019/1/21.
 */
import Vue from 'vue';
import '_a/styles/reset.css';
import '_a/styles/common.css';

import App from './App.vue';
import store from './store/store';
import { setRem, getRem } from './libs/util';

window.getRem = getRem;
window.windowWidth = document.body.offsetWidth;
window.windowHeight = document.documentElement.clientHeight;

Vue.config.productionTip = false;

setRem();

window.onresize = () => setRem();

new Vue({
    store,
    render: h => h(App),
}).$mount("#app");
