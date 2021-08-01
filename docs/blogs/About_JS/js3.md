---
title: JavaScript中的继承方式
date: 2021-07-19
categories:
 - JS
tags:
 - JS
---

<!--more-->

###  原型链继承  
所谓原型链继承，就是将子类构造函数的原型替换成父类的实例，这样子类的实例不仅能从父类的实例中继承属性，还和父类的原型挂上了钩，下面是一个例子  
```js
//父类
function SuperType(){
  this.property = true;
}
//在父类的原型上定义方法
SuperType.prototype.getSuperValue = function(){
  return this.property;
}
//子类
function SubType(){
  this.subPropertype = false;
}
//继承父类
SubType.prototype = new SuperType();
//定义自己的函数
SubType.prototype.getSubValue = function(){
  return this.subPropertype;
}

let sub = new SubType();
console.log(sub.getSuperValue()); //true
```
当子类想添加自己的方法，或者覆盖父类的方法时，需要在原型赋值后再添加到原型上。  
**原型链的问题：**如果原型中包含引用值，则所有实例会共享这个引用值，这也是为什么属性通常会在构造函数上定义而不再原型上定义的原因。下面是一个例子  
```js
function superType(){
  this.colors = ['red','blue','green'];
}

function subType(){};
//继承父类
subType.prototype = new superType();

let sub1 = new subType();
sub1.colors.push('black');

let sub2 = new subType();
console.log(sub2.colors); // red,blue,green,black
```
上面代码可以看出，子类的两个实例共享了原型上的colors属性。  
除此之外，原型链继承还有第二个问题：子类实例化时不能给父类的构造函数传参，我们没法再不影响所有对象实例的情况下把参数传进父类的构造函数。因此原型链继承基本不会被单独使用。  

&nbsp;

### 盗用构造函数继承（经典继承）  
为了解决原型包含引用值会被子类实例共享的问题，盗用构造函数脱颖而出。思路即：在子类的构造函数中，通过apply() 和 call() 方法，调用父类的构造函数。下面是例子：  
```js
function superType(){
  this.colors = ['red','blue','green'];
}

function subType(){
  //继承父类
  superType.call(this);
}

let sub1 = new subType();
sub1.colors.push('black');
console.log(sub1.colors); // red,blue,green,black

let sub2 = new subType();
console.log(sub2.colors); // red,blue,green
```

除此之外，相较于原型链，盗用构造函数还可以在子类构造函数中向父类构造函数传参：
```js
function superType(name){
  this.name = name;
}

function subType(name,age){
  //继承父类
  superType.call(this,name);
  this.age = age;
}

let sub1 = new subType('chy',21);
console.log(sub1.name,sub1.age); // chy21
```
上述的name传入到父类的构造函数中，但在子类的构造函数中调用父类的构造函数时，实际上这个name属性会被定义到子类的实例上。  
**盗用构造函数的问题：**必须在构造函数中定义方法，所以函数不能重用。并且子类也不能访问父类原型上定义的方法，由于这些问题，盗用构造函数也不能单独使用。  
&nbsp;

### 组合继承（伪经典继承）  
组合继承综合了原型链继承和盗用构造函数继承的优点，同时也解决了他们各自的缺陷。  
思路是使用原型链继承父类原型上的属性和方法，然后通过盗用构造函数继承父类的实例，这样既可以把方法定义在原型上重用，又可以让每个实例都拥有自己的属性：  

```js
function superType(name){
  this.name = name;
  this.colors = ['red','blue','green']
}
superType.prototype.sayName(){
  console.log(this.name);
}

function subType(name,age){
  //继承父类
  superType.call(this,name);
  this.age = age;
}
//继承父类的方法
subType.prototype = new superType();
//定义自己的方法
subType.prototype.sayAge = function(){
  console.log(this.age);
}

let sub1 = new subType('chy',21);
sub1.colors.push('black');
console.log(sub1.colors); // red,blue,green,black
sub1.sayName() // chy
sub1.sayAge() // 21

let sub2 = new subType('ltj',22);
console.log(sub2.colors); // red,blue,green
sub2.sayName() // ltj
sub2.sayAge() // 22
```
组合继承是JS中使用最多的继承模式，但它同时也会有些许不足，就是效率问题：父类构造函数始终会被调用两次，一次是创建子类原型时调用，另一次在子类构造函数中调用。  
&nbsp;

### 原型式继承  
我们先来看看一个函数：
```js
function object(o){
   function f() {};
   f.prototype = o;
   return new f();
 }
```
上面的函数里临时创建了一个构造函数，将传入的对象赋值给这个构造函数的原型，然后返回这个构造函数的一个实例。这样所有的通过object 函数创建出来的实例，原型都是你传入的对象。  
这样，我们就可以共享对象间的属性，并且不需要单独创建构造函数。下面是一个例子：  
```js
let person = {
   name:'chy',
   friends:['ltj','wy','clown']
 }

let person2 = object(person);
person2.name = 'xiaobai';
person2.friends.push('batman');

let person3 = object(person);
person3.name = 'batman';
person3.friends.push('superman');
console.log(person.friends); // ltj,wy,clown,batman,superman
```
ES5中提供给我们一个方法实现上面的函数，即Object.create() 。这个方法接受两个参数，作为原型对象的对象，以及给新对象定义额外的属性(第二个可选) 。在只有一个参数时，Object.create() 与上面的object 函数作用相同。  
&nbsp;


### 寄生式继承  
寄生式继承与原型式继承类似，主要思路是：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象，下面是一个例子。  
```js
function object(o){
   function f(){};
   f.prototype = o;
   return new f();
 }

 function createAnother(o){
   let clone = object(o);  //通过调用函数继承一个对象
   clone.sayHi = function(){ //以某种方式增强这个对象
     console.log('hi');
   }
   return clone; //返回对象
 }

 let person = {
   name:'chy'
 }
 let person2 = createAnother(person);
 person2.sayHi(); // hi
```
上面的object 函数不是必须的，任何返回新对象的函数都能在这里使用。寄生式继承同样不需要关心构造函数，只需要关心对象。  
**注意：通过寄生式继承给对象添加函数会导致函数难以重用，类似于构造函数模式。返回的每个实例都拥有自己的方法，太过于奢侈。**  
&nbsp;

### 寄生式组合继承  
之前说过组合式继承有自己效率的问题：调用两次父类构造函数，一次是给子类的原型赋值，一次是在子类的构造函数里进行盗用。这使得子类的原型拥有父类的属性，子类的实例也拥有父类的属性，而寄生式组合继承就能解决这个问题。  
&nbsp;
具体思路是：不使用父类的构造函数给子类的原型赋值，而是取得父类原型的一个副本进行赋值。因为子类的原型上不需要那些用不到的属性。实际上就是用寄生式继承来继承父类的原型，然后将返回的新对象赋给子类的原型。寄生式组合继承的基本模式如下：  

```js
 function object(o){
   function f(){};
   f.prototype = o;
   return new f();
 }

 function inherit(subType,superType){
   let prototype = object(superType.prototype); // 创建对象
   prototype.constructor = subType; // 增强对象
   subType.prototype = prototype; // 赋值对象
 }
```
上述inherit 函数实现了寄生式组合继承的核心逻辑，函数接受两个参数：子类的构造函数和父类的构造函数。  
函数第一步先创建父类原型的一个副本，然后给返回的prototype 对象设置constructor属性，因为我们改变子类的原型会造成constructor 的丢失，最后再把这个新对象prototype 赋值给子类的原型。 下面我们用这个函数来实现之前在组合继承中的例子：

```js
function superType(name){
  this.name = name;
  this.colors = ['red','blue','green'];
}
superType.prototype.sayName = function(){
  console.log(this.name);
}

function subType(name,age){
  superType.call(this,name);
  this.age = age;
}
inherit(subType,superType); //继承父类的原型
subType.prototype.sayAge = function(){
  console.log(this.age);
}
```
如上面代码所示，这边只调用了一次父类的构造函数，可以说这个例子效率更高，并且原型链依然不变。寄生式组合继承可以说是引用类型继承的最佳模式。