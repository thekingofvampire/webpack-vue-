import Vue from 'vue';
import VueRouter from "vue-router";
import aaa from "../components/aaa.vue"
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: aaa
        }
    ]
})