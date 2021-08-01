---
title: for-in语句与for-of语句的区别
date: 2021-07-16
categories:
 - JS
tags:
 - JS
---

<!--more-->

###  for-in语句  
它主要用于枚举对象中的非符号键属性  
```js
for(const propName in window){
	console.log(propName);
}
```
上面这个例子利用for-in循环显示了window对象的所有属性，每次都会给变量propName赋予一个windows对象的属性作为值，直到window所有属性都被枚举一遍。  
&nbsp;
对象的属性是无序的，并且for-in语句还会遍历原型的属性，所以for-in语句并不能确保返回对象属性的顺序。  
如果我们想要遍历的是实例上属性(不包括原型)，需要利用hasOwnProperty方法多加一层判断,该方法用于检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
```js
for (let key in myObject) {
　　if（myObject.hasOwnProperty(key)){
　　　　console.log(key);
　　}
}
```
如果for-in循环要迭代的变量是null或undefined，则不执行此次循环。  
&nbsp;

### for-of语句  
for-of主要用于遍历可迭代对象的元素  
```js
for(const el of [1,2,3,4]){
	console.log(el);
}
```
for-of会持续到所有元素都迭代完，并且会按照可迭代对象的next()方法产生值的顺序迭代元素。  
如果尝试迭代的变量不支持迭代，则for-of语句会抛出错误。  
并且它与forEach()不同的是，它可以正确响应break、continue和return语句。  