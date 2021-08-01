---
title: JavaScript中数组相关方法
date: 2021-07-16
categories:
 - JS
tags:
 - JS
---

<!--more-->

### from(ES6新增)  
from()用于将类数组结构转换为数组实例，并返回  
Array.from()的第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个length属性和可索引元素的结构  
```js
//例如将字符串拆分成单字符数组
Array.from('chy') // ['c','h','y']

//也可以使用from将集合或映射转换为新数组
const m = new Map().set(1,2).set(3,4)
const s = new Set().add(1).add(2).add(3).add(4)
Array.from(m) //[[1,2],[3,4]];
Array.from(s) //[1,2,3,4];

//还能对现有数组进行浅负值
const a1 = [1,2,3,4]
congst a2 = Array.from(a1) // [1,2,3,4]
a1 === a2 //false

//转换arguments对象  
function fn(){
	return Array.from(arguments)
}
```
Array.from()还可以接受第二个可选的映射函数参数，这个函数可以直接增强新数组的值，即无需调用Array.from().map()。
```js
const a1 = [1,2,3,4]
const a2 = Array.from(a1, x => x**2) //[1,4,9,16]
```

### of(ES6新增)  
Array.of()可以把一组参数转换为数组，此方法用于替代ES6前常用的Array.protoyepe.slice.call(arguments)，一种笨拙的将arguments对象转换为数组的写法  
```js
Array.of(1,2,3,4) //[1,2,3,4]
Array.of(undefined,null) //[undefined,null]
```

### isArray  
Array.isArray()用于确定一个值是否为数组  
```js
if(Array.ifArray(value)){
	//dosomething
}
```

### keys，values 和 entries(都是ES6新增)  
ES6中，Array的原型上暴露了三个用于检索数组内容的方法：keys()，values()，和entries()  
keys()返回数组索引的迭代器，values()返回数组元素的迭代器，而entries()返回索引/值的迭代器  
```js
const color = ['red','blue','green']
//由于这三个方法都返回迭代器，故可以使用from将他们转换为数组实例
const Keys = Array.from(color.keys()) //[0,1,2]
const Values = Array.from(color.values()) //['red','blue','green']
const Entries = Array.from(color.entries()) //[ [0,'red'],[1,'blue'],[2,'green'] ]
```

### toLocaleString，toString 和 valueOf  
所有对象都有 toLocaleString()，toString()，和valueOf() 方法  
其中，valueOf返回的还是数组本身  

```js
let colors = ['red','blue','green']
colors.valueOf() // red,blue,green
```
toString会对数组的每个值都调用其 toString() 方法，返回每个值用逗号分隔符分割后再拼接而成的字符串  
```js
colors.toString() // red,blue,green
```
toLocaleString() 会对数组的每个值都调用 toLocaleString() 方法，返回每个值用逗号分隔符分割后再拼接而成的字符串  
```js
colors.toLocaleString() // red,blue,green
```
前面两个方法都是返回以逗号分割的字符串，如果想使用不同的分隔符，可以使用 join()方法  
join()方法接受一个参数，即字符分隔符，同样返回所有项的字符串  
如果不给 join()传参，或是传了undefined，则仍然使用逗号作为分隔符  
```js
colors.join(',') // red,blue,green
colors.join('|') // red|blue|green
colors.join() // red,blue,green
```
::: warn
注意：如果数组中某一项是null或undefined，则上面的方法返回的结果会以空字符串表示
:::


### push 和 pop  
push() 方法接受任意数量的参数，并添加到数组末尾，返回数组的长度  
pop() 方法则删除数组最后一项，同时减少数组的length，返回被删除的项
```js
let colors = []
let count = colors.push('red','blue') // 2

let item = color.pop() // blue
```


### shift 和 unshift  
shift() 方法会删除数组的第一项并返回它，然后数组长度减一  
unshift() 方法则相反，在数组的开头添加任意多个值，然后返回新的数组长度  
```js
let colors = []
let count = colors.unshift('red','blue','green') // 3

colors.shift() // green
```

### reverse 和 sort  
数组有两个方法可以用来对元素进行重新排序，其中 reverse() 方法可以将数组反向排序  
```js
let values = [1,2,3,4,5]
values.reverse() // 5,4,3,2,1
```
方法很直观，但不够灵活，所以才有了sort() 方法  
默认情况下sort()方法会按照升序重新排列数组元素。为此，sort() 会在每一项调用String() 转型函数，然后比较字符串来决定顺序，即会先把数组转化为字符串再比较，排序  
```js
let values = [0,1,5,10,15]
values.sort() // 0,1,10,15,5
```
一开始数组中的排序是正确的，但是转换成字符串后，因为字符串10在字符串5的前头，所以会排在前面，很明显这非常不合适。所以 sort() 方法可以接受一个比较函数，用于判断哪个值该排在前面  
比较函数接受两个参数，如果第一个参数应该排在第二个参数的前面，就返回负值，如果两个参数相等，则返回0；如果第一个参数应该排在第二个参数后面，则返回正值  
```js
 // 一个比较函数的例子
 function compare(value1,value2){
 	if(value1 < value2){
 		return -1;
 	}else if(value1 > value2){
 		return 1;
 	}else{
 		return 0;
 	}
 }
 
 let values = [0,1,5,10,15];
 value.sort(compare) // 0,1,5,10,15
```
传入比较函数后，数组中的数值在排序后保持了正确的顺序，当然如果想要降序可以改变成下面这样  
```js
 // 一个降序比较函数的例子
 function compare(value1,value2){
 	if(value1 < value2){
 		return 1;
 	}else if(value1 > value2){
 		return -1;
 	}else{
 		return 0;
 	}
 }
 
 let values = [0,1,5,10,15];
 value.sort(compare) // 15,10,5,1,0
```
如果元素是数值，我们可以写的更简单  
```js
// 这是降序的，升序则更改一下相减的两者即可
function compare(value1,value2){
	return value2 - value1;
}
```

### concat  
concat() 方法会先创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回新构建的数组，如果传入一个或多个数组，concat() 会把这些数组每一项都添加到结果数组  
```js
let colors = ['red','blue','green']
let colors2 = colors.concat('yellow',['black','brown'])

console.log(colors) // ['red','blue','green']
console.log(colors2) // ['red','blue','green','yellow','black','brown']
```

### slice  
slice() 方法用于创建一个包含原有数组中一个或多个元素的新数组。slice() 方法可以接受一个或两个参数：返回元素开始的索引和结束索引。如果只有一个参数，则slice() 会返回该索引到数组末尾的所有元素。如果有两个参数，则 slice() 返回从开始索引到结束索引对应的所有元素，**其中不包括结束索引对应的元素**，此方法不影响原始数组  
```js
let colors = ['red','blue','green','black','yellow']
let colors2 = colors.slice(1)
let colors3 = colors.slice(1,4)

console.log(colors2) // blue,green,black,yellow
console.log(colors3) // blue,green,black
```
**注意：如果slice的参数有负值，那么就以数值长度加上这个负值的结果确定位置  
比如在包含5个元素的数组上调用slice(-2,-1)，就相当于调用slice(3,4)。如果结果位置小于开始位置，则返回空数组**


### splice  
splice() 的主要目的是在数组中间插入元素，但有三种不同的方式使用这个方法  

**删除**：需要给splice() 传两个参数，要删除的第一个元素的位置和要删除的元素数量，可以从数组中任意删除多个元素，比如splice(0,2)会删除前两个元素  

**插入**：需要给splice()传3个参数，开始位置，0 (即要删除的元素数量) 和要插入的元素，可以在数组中指定的位置插入元素。第三个参数之后还可以传第四个，第五个参数，乃至任意多个要插入的元素。比如，splice(2,0,'red','green') 会从数组位置2开始插入 'red' 和 'green' 字符串  

**替换**：splice() 在删除的同时可以在指定位置插入新元素，同样传入三个参数。开始位置，要删除的元素的数量和要插入的任意多个元素。比如，spilce(2,1,'red','green') 会在位置2删除一个元素，然后从该位置开始向数组中插入'red' 和 'green'

splice()方法始终由被删除的元素组成的数组（如果没有删除元素，则返回空数组）
```js
let colors = ['red','green','blue']
let removed = colors.splice(0,1) //删除第一项
console.log(colors) // green,blue
console.log(removed) // red

removed = colors.splice(1,0,'yellow','orange') // 在位置1插入两个元素
console.log(colors) // green,yellow,orange,blue
console.log(removed) // 空数组

removed = colors.splice(1,1,'red','purple') //在位置1删除一个元素，插入两个元素
console.log(colors) // green,red,purple,orange,blue
console.log(colors) // yellow
```

### indexOf，lastIndexOf 和 includes  
ES提供了三个搜索方法：indexOf()，lastIndexOf()，和includes()。其中includes() 是ES6新增的方法  
这三个方法都接受两个参数，要查找的元素和一个可选的起始搜索位置。  
indexOf() 和 includes() 方法从数组前头开始往后搜索，而lastIndexOf() 从数组末尾开始往前搜索  
indexOf() 和 lastIndexOf()返回要查找的元素在数组中的位置，没有找到则返回-1。而includes() 返回布尔值。  
这三个方法在比较数组每一项时会使用全等 === 比较  

```js
let nums = [1,2,3,4,5,4,3,2,1]
console.log(nums.indexOf(4)) // 3
console.log(nums.lastIndexOf(4)) // 5
console.log(nums.includes(4)) // true
```

### find 和 findIndex  
这两个方法接受一个函数，函数中接受三个参数：元素，索引和数组本身，其中元素是当前搜索的元素，索引是当前元素的索引，而数组就是正在搜索的数组，这个函数返回真值，表示是否匹配  

这两个方法都从最小的索引开始，find() 返回第一个匹配的元素，findIndex() 返回第一个匹配元素的索引
```js
const people = [
	{
		name:'chy',
		age:22
	},
	{
		name:'ltj',
		age:20
	}
];

console.log(people.find( (value,index,array) => { value.age < 21 } ))
// { name:'ltj' , age:20 }
console.log(people.findIndex( (value,index,array) => { value.age < 21 } ))
// 0
```


### every、filter、forEach、map、some 迭代方法  
这五个迭代方法都接受一个函数作为参数，这个函数中接受三个参数：数组元素，元素索引和数组本身，这些方法都不改变调用他们的数组  
### every  和 some
every() 方法对数组每一项都运行传入的函数，如果对每一项函数都返回true，则这个方法返回true  
some方法() 对数组每一项都运行传入的函数，如果有一项函数返回true，则这个方法返回true  
```js
let nums = [1,2,3,4,5,4,3,2,1]
let res1 = nums.every( (item,index,array) => { item > 2 } )
let res2 = nums.some((item,index,array) => { item > 2 })
console.log(res1) // false
console.log(res2) // true
```
### filter  
对数组每一项都运行传入的函数，函数返回true的项会组成数组之后返回  
```js
let nums = [1,2,3,4,5,4,3,2,1]
let res = nums.filter((item,index,array) => {item > 2})
console.log(res) // 3,4,5,4,3
```
### forEach  
对数组每一项都运行传入的函数，没有返回值，本质上，forEach() 方法相当于使用for循环遍历数组  
```js
let nums = [1,2,3,4,5,4,3,2,1]
let res = nums.forEach((item,index,array) => {
	// dosomething
})
```
### map  
对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组  
```js
let nums = [1,2,3,4,5,4,3,2,1]
let res = nums.map((item,index,array) => { item * 2 })
console.log(res) // 2,4,6,8,10,8,6,4,2
```

### reduce 和 reduceRight  
这两个方法都会迭代数组的所有项，并在此基础上构建一个最终返回值。reduce() 方法从数组第一项开始遍历到最后一项，而reduceRight() 则是从最后一项开始遍历至第一项  

两个方法都接收两个参数：对每一项都会运行的归并函数，以及可选的归并起点值  
归并函数接受4个参数：上一个归并值，当前项，当前项的索引和数组本身，即如果没有给上述两个方法传入第二个参数，则第一次迭代从数组的第二项开始。因此传给归并函数的第一个参数是数组的第一项，第二个参数是数组的第二项  

```js
// 利用reduce累加数组
let values = [1,2,3,4,5]
let sum = values.reduce((pre,cur,index,array) => { pre + cur })
console.log(sum) // 15
```
第一次执行归并函数时，pre是1，cur是2。第二次执行时，pre是3(1+2)，cur是3(数组第三项)，如此递进，知道所有项都遍历一遍，然后返回归并结果  

reduceRight() 方法类似，只是方向相反  
```js
let values = [1,2,3,4,5]
let sum = values.reduceRight((pre,cur,index,array) => { pre + cur })
console.log(sum) // 15
```
在上面，第一次调用归并函数时pre是5，cur是4，这两个方法除了方向相反，没有什么区别  