import App from "./App.vue";
import router from "./router";
import { setupStore } from "/@/store";
import { getServerConfig } from "./config";
import { createApp, Directive } from "vue";
import { usI18n } from "../src/plugins/i18n";
import { MotionPlugin } from "@vueuse/motion";
import { useFontawesome } from "../src/plugins/fontawesome";
import { useElementPlus } from "../src/plugins/element-plus";
import { injectResponsiveStorage } from "/@/utils/storage/responsive";

import "animate.css";
import "virtual:windi.css";
// 导入公共样式
import "./style/index.scss";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);

// 自定义指令
import * as directives from "/@/directives";
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册`@iconify/vue`图标库
import { IconifyIconOffline, IconifyIconOnline } from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);

getServerConfig(app).then(async config => {
  injectResponsiveStorage(app, config);
  setupStore(app);
  app
    .use(router)
    .use(MotionPlugin)
    .use(useElementPlus)
    .use(usI18n)
    .use(useFontawesome);
  await router.isReady();
  app.mount("#app");
});
