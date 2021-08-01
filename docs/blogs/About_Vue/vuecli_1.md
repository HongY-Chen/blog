---
title: VueCli打包后的项目如何运行
date: 2021-07-10
categories:
 - Vue
tags:
 - Vue
---

<!--more-->

Vue Cli 根据如下命令进行打包 :   
```
npm run build
```

**命令执行完出现**  
 DONE  Build complete. The dist directory is ready to be deployed.  
 INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html  
&nbsp;
嗯，打包完成了，但是此时打开dist文件夹下的index.html是打不开的，是一个空白页面  
项目需要运行在服务器上  

**解决办法**  

```
npm install http-server -g //全局
```
然后在dist文件下执行：  
```
http-server
```
然后打开显示出来的网址即可

