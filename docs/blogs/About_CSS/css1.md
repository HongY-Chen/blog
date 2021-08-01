---
title: fixed 相对父元素定位
date: 2021-06-08
categories:
 - CSS
tags:
 - CSS
---

<!--more-->  

### Position:fixed  
今天偶然发现fixed可以相对其父元素进行定位  
&nbsp;
首先我们知道，fixed是相对浏览器窗口定位的，通过设置top，bottom，left，right，来改变他的位置  
&nbsp;
但是，如果我们不设置这几个东西，而是设置margin的话，他会相对于他的父元素来进行定位  

&nbsp;
这种方法本质上fixed元素还是相当于窗口定位的，实现效果上是相对于父元素定位。  
&nbsp;
**因此，position:fixed元素若要以窗口进行定位，最好是放在body根标签下**

