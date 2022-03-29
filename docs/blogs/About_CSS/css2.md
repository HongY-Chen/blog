---
title: 移动端rem适配
date: 2021-06-28
categories:
 - CSS
tags:
 - CSS
---

<!-- more -->

### rem是什么  
rem（font size of the root element）是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位。设置 html 的 font-size 属性，rem 是根据它的大小来动态变化整个项目中使用 rem 单位的元素大小。  
**比如：html{font-size:100px},那么1rem就等于100px;**  
&nbsp;
### 关于lib-flexible
lib-flexible 是淘宝项目组开发出来的一个小插件   
它会自动在html的head中添加一个 meta name="viewport" 的标签，同时会自动设置 html 的font-size为屏幕宽度除以10，假如设计稿的宽度是750px，此时1rem应该等于75px。假如量的某个元素的宽度是150px，那么在css里面定义这个元素的宽度就是 width: 2rem。但是当分辨率大于某个特定值时，它便不再生效。  
&nbsp;
### 移动端适配  
一般而言，lib-flexible 并不独立出现，而是搭配 postcss-pxtorem 一起做适配方案，目的是自动将css中的px转换成rem。  
意思就是说，我们写的时候不用以rem做单位，继续用px写，但是编译的时候能转化为rem  
&nbsp;
### 安装lib-flexible
```js
npm install lib-flexible -S
// main.js 全局引入
import 'lib-flexible';
```

### 安装 postcss-pxtorem  
```
npm install postcss-pxtorem -S
```
### 配置 postcss-pxtorem  
配置 postcss-pxtorem，可在 vue.config.js、.postcssrc.js、postcss.config.js 其中之一配置，权重从左到右降低，没有则新建文件，只需要设置其中一个即可:  
&nbsp; 
**在项目根目录下新建 vue.config.js  文件，配置代码如下：**  

```js
//rootValue根据设计稿宽度除以10进行设置，这边假设设计稿为375，即rootValue设为37.5；
//propList是设置需要转换的属性，这边*为所有都进行转换。  
module.exports = {
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            require("autoprefixer")({
              // 配置使用 autoprefixer 兼容浏览器版本
              overrideBrowserslist: ["last 15 versions"] 
            }),
            require("postcss-pxtorem")({
              //根元素(html)的字体大小
              rootValue: 75, 
              //rootValue: 37.5, 如果是Vant的话根字体是37.5
              propList: ["*"],
            })
          ]
        }
      }
    }
  };
```

**在.postcssrc.js或postcss.config.js中配置如下：**  
```js
module.exports = {
    "plugins": {
        'postcss-pxtorem': {
            rootValue: 37.5,
            propList: ['*']
        }
    }
}
```
## 测试结果  
css中设置某类宽度为375px：
```css
.content{
  width:375px;
}
```
运行后在浏览器可以发现已经转化为10rem,即 375 设置的 rootValue：
![pic](https://img-blog.csdnimg.cn/20201013145222630.png)  
以上情况则说明 postcss-pxtorem 配置成功。  
&nbsp;
当我们在f12中切换设备时可发现：  
![](https://img-blog.csdnimg.cn/20201013145642519.png)  
![](https://img-blog.csdnimg.cn/20201013145743428.png)  
html的字体大小跟随设备宽度进行改变，body跟随设备的dpr进行改变，这是 lib-flexible 的实现，即说明配置成功。  
&nbsp;

### 本文结束
