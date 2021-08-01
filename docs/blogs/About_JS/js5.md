---
title: 构造函数实例化时,使用new调用与直接调用的区别
date: 2021-07-19
categories:
 - JS
tags:
 - JS
---

### new做了什么？  
首先我们看看new一个对象，它具体做了什么：  
1. 在内存中创建一个空的新对象
2. 将构造函数的prototype属性赋值给新对象的prototype属性
3. 将构造函数内的this指向该对象
4. 执行构造函数内的代码
5. 如果构造函数返回非空对象，则返回这个非空对象。否则，返回上述创建的新对象。
&nbsp;

### 构造函数也是函数  
构造函数与普通函数的区别就是调用方式不同，除此之外，构造函数也是函数。任何函数只要调用new操作符就是构造函数，而不使用new调用的函数就是普通函数。我们来看一下下面这个例子：
```js
function person(name,age){
  this.name = name;
  this.age = age;
  this.sayName = function(){
    console.log(this.name);
  }
}

let p1 = new person('chy',21);
p1.sayName(); // chy

person('ltj',22);
window.sayName(); // ltj
```
这个例子一开始使用了构造函数的调用方式，即使用new操作符创建对象。然后使用了普通函数调用的方式，这时候没有使用new操作符调用person() ，结果会导致将属性和方法添加到window对象上。因此在上面的调用后，window对象上就有了一个sayName() 方法，调用它返回了"ltj"。  
&nbsp;

下面我们再展示使用call方法来调用这个函数：  
```js
let o = new Object();
person.call(o,'chy',21);
o.sayName(); // chy
```
上述代码调用完后，所有属性和方法都会添加到对象o上。
&nbsp;

### 总结  
没有使用new的构造函数就是一个普通函数，在没有明确指向this的情况下，this指向window对象，返回值就是构造函数返回的结果。  
使用new的构造函数，this指向实例化的对象，如果构造函数的返回值不是一个引用类型，则返回这个实例化的对象。