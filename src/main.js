import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import DatePicker from "v-calendar/lib/components/date-picker.umd";

// Register components in your 'main.js'
// Vue.component('calendar', Calendar)
Vue.component("date-picker", DatePicker);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
