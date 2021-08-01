---
title: 通过例子理解BFC
date: 2021-07-20
categories:
 - CSS
tags:
 - CSS
---

<!-- more -->

### 先看看BFC到底是什么东西  
译为块级格式上下文，实际上就是一个独立的渲染区域。让处于BFC内部的元素与外部的元素相互隔离，使得内外元素的定位不会相互影响。  
OK！听着有点懵比，先来看看一个常见的问题：

```
.father{
  width: 300px;
  height: 300px;
  background-color: antiquewhite;
  margin-top: 100px;
}
.child{
  width: 100px;
  height: 100px;
  background-color: thistle;
}

<div class="father">
  <div class="child"></div>
</div>
```
上面给父元素设置了一个margin，结果显示为这样  
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_1.png)  
我们给子元素加上一个margin-top:150px后，再来看看：  
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_2.png)  
和想象的不一样有没有，子元素带着父元素拉下去了！本来父元素距离窗口100px的，我们是想让子元素距离父元素有个margin，结果现在压根没出现，反而把父元素拉下去了！  
&nbsp;
**这就是margin的坍塌问题：父子嵌套元素在垂直方向的margin,父子元素是结合在一起的,他们两个的margin会取其中最大的值。  
正常情况下,父级元素应该相对浏览器进行定位,子级相对父级定位。  
但由于margin的塌陷,父级相对浏览器定位。而子级没有相对父级定位,子级相对父级,就像坍塌了一样。**  

如何解决？？？当然是触发BFC了啊！！！  
给父元素添加 overflow:hidden 后：  
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_3.png)  
问题解决！既然BFC这么好用，那我们当然要深刻理解下它的规则。  
&nbsp;

### BFC的规则  
+ BFC就是一个块级元素，属于同一个BFC的块级元素会在垂直方向一个接一个的排列。
+ 属于同一个BFC的父元素和子元素，相邻的父子或者兄弟间margin垂直方向会重叠。
+ 计算BFC的高度时，浮动元素也会参与计算，即可以撑开容器。
+ 文字层不会被浮动层覆盖，环绕于周围。
&nbsp;

### 如何触发BFC  
+ overflow 不为 visible，通常我们使用overflow: hidden
+ display的值为inline-block、table-cell、flex、table-caption或者inline-flex，通常使用inline-block
+ position的值不是static或者relative。（position:absolute或者position:fixed）
+ 浮动元素
&nbsp;

## BFC解决的问题：  
说了那么多奇奇怪怪的东西，我们来看看如何使用这些规则解决一些常见问题：  
&nbsp;  

### 解决margin坍塌问题  
文章开始的例子就是margin坍塌问题，我们利用 overflow:hidden 使得父元素内形成了一个BFC，所以父子之间的margin就不受影响了。
&nbsp;

### 解决高度坍塌问题  
```
.father{
  background-color: wheat;
}
.child{
  width: 100px;
  height: 100px;
  margin: 100px;
  background-color: thistle;
}

<div class="father">
  <div class="child"></div>
  <div class="child"></div>
</div>
```
正常显示是下面这样的：
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_4.png)  
然后我们让子元素浮动后，可以看到父元素高度没有被撑开，原因是float元素脱离了文档流。
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_5.png)  
我们父元素使用overflow: hidden 触发bfc，就可以计算浮动元素的高度了  
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_6.png)
&nbsp;

### 解决margin重叠问题  
```
.child1{
  width: 100px;
  height: 100px;
  background-color: thistle;
  margin-bottom: 20px;
}
.child2{
  width: 100px;
  height: 100px;
  background-color: thistle;
  margin-top: 20px;
}

<div class="father">
  <div class="child1"></div>
  <div class="child2"></div>
</div>
```
上面两个子元素都设置了margin，按理来说margin应该相加起来等于40px，但实际上只有20px。
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_7.png)
解决办法：我们给其中一个子元素外边套上一个div，让这个div内部成为一个BFC
```
<div class="child1"></div>
<div style="overflow: hidden;">
  <div class="child2"></div>
</div>
```
问题解决
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_8.png)

&nbsp;

### 解决元素被浮动元素覆盖问题（两栏布局）  
来看看下面这个结构  
```
.box{
  margin: 100px 100px;
}
.box1{
  width: 100px;
  height: 100px;
  background-color: wheat;
}
.box2{
  width: 150px;
  height: 200px;
  background-color: thistle;
}

<div class="box">
  <div class="box1">小丑小丑小丑小丑小丑小丑小丑小丑小丑小丑小丑</div>
  <div class="box2">沙口沙口沙口沙口沙口沙口沙口沙口沙口沙口沙口</div>
</div>
```
正常显示是这样的：
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_9.jpg)  

当我们给第一个子元素加上浮动后：
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_10.jpg)  
我们发现第二个子元素因为第一个元素脱离文档流的原因，自己站位到了上面，但被第一个子元素覆盖了一部分。（文本信息不会被覆盖，会环绕到其周围。）。  
解决办法：让第二个子元素也变成一个bfc，我们给第二个子元素添加上overflow:hidden。
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_11.jpg)
完美解决！
&nbsp;

### 自适应两栏布局  
自适应两栏布局和解决被浮动元素覆盖的原理一样，具体实现如下：左边浮动，宽度由内容撑开。右边利用overflow:hidden触发bfc，占满剩余宽度。  
```js
.box{
  margin: 100px 100px;
}
.box1{
  background-color: wheat;
  float: left;
  height: 100px;
}
.box2{
  background-color: thistle;
  overflow: hidden;
  height: 100px;
}

<div class="box">
  <div class="box1">小丑小丑小丑小丑小丑小丑小丑小丑小丑小丑小丑</div>
  <div class="box2">沙口沙口沙口沙口沙口沙口沙口沙口沙口沙口沙口</div>
</div>
```
可以看到右边的盒子沾满了剩余空间  
![](https://gitee.com/PumpkinPie/personal-drawing-bed/raw/master/About_CSS/css3/css3_12.jpg)

