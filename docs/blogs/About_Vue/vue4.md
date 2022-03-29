---
title: 开发 Vue 项目没有路径的提示解决方案
date: 2021-08-24
categories:
 - Vue
tags:
 - Vue
---

<!--more-->


### 在项目根目录下新建  jsconfig.json  文件  
### 在  jsconfig.json  文件中写入下方代码就好  
```

{
  "compilerOptions": {
    "experimentalDecorators": true, 
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "components/*": ["src/components/*"],
      "assets/*": ["src/assets/*"],
      "views/*": ["src/views/*"],
      "common/*": ["src/common/*"],
    }
  },
  "exclude": ["node_modules", "dist"]
```
然后重启一下OK

