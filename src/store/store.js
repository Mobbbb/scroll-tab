import Vuex from "vuex";
import mainModule from "./modules/mainModule/index";
import chartModule from "./modules/chartModule/index";
import opinionModule from "./modules/opinionModule/index";
import reportsModule from "./modules/reportsModule/index";
import tabModule from "./modules/tabModule/index";
// import filterModule from "./modules/filterModule/index";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        mainModule,
        tabModule,
        // filterModule,
        chartModule,
        opinionModule,
        reportsModule,
    },
});
