---
title: BetterScroll的封装配置
date: 2021-07-04
categories:
 - Vue
tags:
 - Vue
---

<!--more-->
参考文章  : [当BetterScroll遇上Vue](https://zhuanlan.zhihu.com/p/27407024)  
&nbsp;
**今天在做项目，处理歌词的时候需要用到better-scroll这个插件，随即百度了一下**  

### Better-scroll的滚动原理  
当页面内容的高度超过视口高度的时候，会出现纵向滚动条；当页面内容的宽度超过视口宽度的时候，会出现横向滚动条。也就是当我们的视口展示不下内容的时候，会通过滚动条的方式让用户滚动屏幕看到剩余的内容。通过一张图片可以清楚的了解到  
![](https://pic4.zhimg.com/80/v2-71a1e5fbbb39fa4a99f96ecc333a1927_720w.jpg)  

### Better-scroll的基本结构  
代码如下  
```js
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
    ...
  </ul>
</div>

import BScroll from 'better-scroll'
let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper, {})
```
better-scroll 对外暴露了一个 BScroll 的类，我们初始化只需要 new 一个类的实例即可。第一个参数就是我们 wrapper 的 DOM 对象，第二个是一些配置参数，具体参考[better-scroll的文档](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#%E4%BA%8B%E4%BB%B6)  
&nbsp;
better-scroll 的初始化时机很重要，因为它在初始化的时候，会计算父元素和子元素的高度和宽度，来决定是否可以纵向和横向滚动。因此，我们在初始化它的时候，必须确保父元素和子元素的内容已经正确渲染了。如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常。所以 better-scroll 不能滚动的原因多半是初始化 better-scroll 的时机不对，或者是当 DOM 结构发送变化的时候并没有重新计算 better-scroll。  
&nbsp;

### 发现有坑  
Better-scroll 在谷歌浏览器手机模拟器测试时，会出现刷新后才能滚动的BUG，开始以为是new的时候content没有被撑起，调试了许久无果，随即百度  
**问题在于touch事件没注册**  
&nbsp;
**解决办法:**  
new BScroll时,在参数options中加入  

```js
mouseWheel: true,//开启鼠标滚轮
disableMouse: false,//启用鼠标拖动
disableTouch: false//启用手指触摸
```
下面的封装已更新此内容
&nbsp;

### 封装  
按需获取即可  
```js
<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>
 
<script >
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        /**
       * probeType属性如下: 
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
        type: Number,
        default: 1
      },
      click: {
        //点击列表是否派发click事件
        type: Boolean,
        default: false
      },
      // 是否开启横向滚动
      scrollX: {
        type: Boolean,
        default: false
      },
      // 是否派发滚动事件
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        //列表的数据
        type: Array,
        default: null
      },
      pullup: {
        // 是否派发滚动到底部的事件，用于上拉加载
        type: Boolean,
        default: false
      },
      pulldown: {
        // 是否派发顶部下拉的事件，用于下拉刷新
        type: Boolean,
        default: false
      },
      beforeScroll: {
        // 是否派发列表滚动开始的事件
        type: Boolean,
        default: false
      },
      refreshDelay: {
        // 当数据更新后，刷新scroll的延时
        type: Number,
        default: 20
      }
    },
    mounted() {
      //在 DOM 渲染完毕后初始化 better-scroll
      this.$nextTick(()=>{
        this.initScroll();
      })
    },
    methods: {
      // 初始化滚动组件，拿不到 this.$refs.wrapper 代码不往下走
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll 初始化, 传入配置项参数
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX,
          mouseWheel: true,//开启鼠标滚轮
          disableMouse: false,//启用鼠标拖动
          disableTouch: false//启用手指触摸
        })
        // console.log(this.scroll);
        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        // 上拉事件
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              // 派发滚动到底部的事件
              this.$emit('scrollToEnd')
            }
          })
        }
        //下拉事件
        if (this.pulldown) {
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              // 下拉刷新
              this.$emit('pulldown')
            }
          })
        }
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            // 列表滚动前触发
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理 better-scroll 的 disable 方法，禁用BScroll
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理 better-scroll 的 enable 方法，启用BScroll
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理 better-scroll 的 refresh 方法
        // 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理 better-scroll 的 scrollTo 方法
        // 相对于当前位置偏移滚动 x,y 的距离。
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理 better-scroll 的 scrollToElement 方法
        // 滚动到指定的目标元素
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      //监听数据的变化，重新计算高度
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
 
<style scoped lang="less" >
  .scroll-wrapper {
    width: 100%;
    // height: 100%;
    overflow: hidden;
  }
</style>
```

