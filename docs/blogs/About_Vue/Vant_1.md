---
title: Vant安装及按需引入
date: 2021-07-01
categories:
 - Vue
tags:
 - Vue
---

<!--more-->

## 通过npm安装Vant  
```
# Vue 2 项目，安装 Vant 2：
npm i vant -S

# Vue 3 项目，安装 Vant 3：
npm i vant@next -S
```

安装成功之后，我们再来安装按需引入Vant组件的babel插件 babel-plugin-import:  
```
npm install babel-plugin-import -D //安装插件
```

接下来，在项目根目录下新建babel配置文件babel.config.js
```js
// babel.config.js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
```

接着就可以愉快的使用Vant组件了  
在main.js下引入Vant
```js
import { Button } from 'vant';
Vue.use(button)
```
