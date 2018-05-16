import Vue from 'vue'
// import './styles/main.css'
import App from './app.vue';
import router from './router'

import $ from "jquery"
new Vue({
    el: "#app",
    router,
    template: '<App/>',
    components: { App }
})
