export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-4354ceb6","v-6e19edb7","v-7a332511","v-f191175e","v-c5914af2","v-54945e14","v-57fe0f52","v-5b67c090","v-5ed171ce","v-1d0d82b3","v-1ec25b52","v-1b58aa14","v-19a3d175","v-17eef8d6","v-382e7548","v-36799ca9","v-184f4da6","v-2e3eac9e","v-1473bf53","v-4e65ec78","v-c151bf32","v-438ffe52","v-34c4c40a","v-39e34de7"]}},"star":{"/":{"path":"/star/","keys":["v-5b67c090","v-4354ceb6","v-19a3d175","v-6e19edb7"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-4354ceb6","v-7a332511","v-f191175e","v-c5914af2","v-54945e14","v-57fe0f52","v-5b67c090","v-5ed171ce","v-1d0d82b3","v-1ec25b52","v-1b58aa14","v-19a3d175","v-17eef8d6","v-382e7548","v-36799ca9","v-6e19edb7"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

