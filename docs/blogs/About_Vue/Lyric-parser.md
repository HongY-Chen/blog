---
title: lyric-paser插件的使用
date: 2021-07-04
categories:
 - Vue
tags:
 - Vue
---

<!--more-->

### 前言  
项目中有涉及到歌词，自己又懒得手写，随即百度了一下，发现此插件，下面记录下用法  

### 安装  
```js
 npm install lyric-parser
```

### 使用  
```js
 import Lyric from 'lyric-parser'
 //新建一个对象
 let lyric = new Lyric(lyricStr, handler)
 // 歌词行数,文本
 function hanlder({lineNum, txt}){
   // this hanlder called when lineNum change
 }
```

### 相关方法  
```js
// play() 播放歌词
this.lyric.play();

// stop() 暂停歌词
this.lyric.stop();

// seek(startTime) 跳转到startTime时间的歌词  
this.lyric.seek(startTime);

// togglePlay() 播放暂停进行切换
this.lyric.togglePlay();
```

### 发现插件BUG  
自己在调用接口获取歌词时，发现它会将毫秒时间换算成秒加到秒上  
观察源码Index.js下 发现错误：  
```js
if (txt) {
  this.lines.push({
    time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
    txt
  })
}
```
修改为下面这样即可  
```js
if (txt) {
  this.lines.push({
    time: result[1] * 60 * 1000 + result[2] * 1000 + (parseInt(result[3]) || 0) ,
    txt : txt
  })
}
```