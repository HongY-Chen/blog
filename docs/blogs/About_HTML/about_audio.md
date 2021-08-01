---
title: audio时间的更新
date: 2021-07-10
categories:
 - HTML
tags:
 - HTML
---

<!-- more -->

今天用Vue处理Audio标签时，利用computed拿到Audio的currentTime,渲染后发现不是响应式的  
### 解决  
Audio标签有一个timeupdate事件，我们可以在该事件中，拿到最新的currentTime，然后赋值给Vue  
```js
<audio src="" ref="audio" @timeupdate="updateTime"></audio>
updateTime(){
  this.$store.commit('updateCurrentTime',this.$refs.audio.currentTime);
}
```