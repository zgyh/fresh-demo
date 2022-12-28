import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$globalData = {
	navBarHeight: 0,
	menuRight: 0,
	menuTop: 0,
	menuHeight: 0,
	lang: 'zh-CN',
	channel: 'CDFG'
}
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif