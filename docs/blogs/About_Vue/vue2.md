---
title: 记一次生命周期踩坑
date: 2021-07-05
categories:
 - Vue
tags:
 - Vue
---

<!--more-->

我们通常喜欢在生命周期里发送Ajax请求数据。像下面这样  
```js
// console.log(this.$store.state.musicList);
// 初始时先赋值歌单里的第一首歌的信息
this.$store.dispatch('updateMusicCover',this.originId)
.then((value) => {
  this.musicCover = this.currentMusicCover;
  this.MusicName = this.originName;
})
```
&nbsp;

**但是一定要记住要先判断请求的数据是否已经存在，是否需要重新请求啊！！！！**
```js
created() {
    // 先判断是否当前专辑图片为空，为空则初始化
    if(!this.currentMusicCover){
      // console.log(this.$store.state.musicList);
      // 初始时先赋值歌单里的第一首歌的信息
      this.$store.dispatch('updateMusicCover',this.originId)
      .then((value) => {
        this.musicCover = this.currentMusicCover;
        this.MusicName = this.originName;
      })
    }else{
      //不为空，则渲染当前专辑
      this.musicCover = this.currentMusicCover;
    }
},
```

