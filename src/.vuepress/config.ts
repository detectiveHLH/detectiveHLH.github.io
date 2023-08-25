import {defineUserConfig} from "vuepress";
import {getDirname, path} from "@vuepress/utils";
import theme from "./theme.js";

// @ts-ignore
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
    base: "/",
    lang: "zh-CN",
    title: "SH的全栈笔记",
    description: "专注于服务端技术",
    alias: {
        "@MyComponent": path.resolve(__dirname, "components/MyComponent.vue"),
    },
    theme,
    // Enable it with pwa
    // shouldPrefetch: false,
});
