---
title: 网易云Api的搭建及宝塔部署
data: 2021-07-04
categories:
  - Other
tags:
  - Other
---

<!-- more -->

### 下载  
来自GitHub的NeteaseCloudMusicApi项目  
项目地址为 : [网易云Api](https://github.com/Binaryify/NeteaseCloudMusicApi)  
&nbsp;  

下面进行详细介绍 首先是安装  
```
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
$ npm install
```
然后把文件上传到服务器上  
![](https://www.jxip.net/wp-content/uploads/2020/08/2020080306272412.png)   
接下来在软件管理中，下载安装 **PM2管理器**  
添加上传到服务器上的项目，以及启动文件，项目名称  
**注意要在管理中安装package.json中的包** 
![](https://www.jxip.net/wp-content/uploads/2020/08/2020080306284581.png)  
&nbsp;
![](https://www.jxip.net/wp-content/uploads/2020/08/2020080306292930.png)  
接下来在安全中放行端口号，这个项目的默认端口是3000  
![](https://www.jxip.net/wp-content/uploads/2020/08/2020080306313425.png)  
成功如下  
![](https://www.jxip.net/wp-content/uploads/2020/08/20200803063407100-1024x389.png)  
**注意，如果这边最后没法访问，也有可能是服务器那边没有放行端口，除了在宝塔这边放行以外还要跑去看看服务器那边的情况**  

