import {defineUserConfig} from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
    base: "/",
    lang: "zh-CN",
    title: "SH的全栈笔记",
    description: "专注于服务端技术",
    theme,
    // Enable it with pwa
    // shouldPrefetch: false,
});
