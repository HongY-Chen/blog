---
title: 手写出 Promise，你就拥有了全世界！
date: 2021-08-04
categories:
 - JS
tags:
 - JS
---

###  promise的基本框架  
我们知道, new 一个 promise 需要传入一个函数，这个函数我们称之为 executor 。这个函数接受两个参数：resolve 和 reject，两个参数同样都是函数，我们第一步先完成这个简单的框架。  
```js
class Promise{
  constructor(executor){
    let resolve = () => {};
    let reject = () => {};
    //定义resolve和reject并传入,执行这个函数
    executor(resolve,reject);
  }
}
```
&nbsp;

### promise的状态  
基本框架搭好了，下面就是状态问题了。我们知道 promise 分为三个状态，pending，fulfilled 和 rejected。  
pending 为初始状态，它表明 promise 在等待着转换为 fulfilled(成功) 或是 rejected(失败)。  
在从初始状态变换过后，不论是成功还是失败，状态都不能再次改变了。成功时，我们需要有一个成功的 value 。失败后，我们也需要一个失败的 reason 。  
两个状态分别由 resolve 和 reject 函数进行转换，并且如果 executor 函数本身就报错了，我们直接执行 reject 将状态转换为 rejected。  
```js
class Promise{
  constructor(executor){
    // 初始的状态
    this.state = 'pending';
    // 成功的值
    this.value = undefined;
    // 失败的值
    this.reason = undefined;
    // 定义resolve函数
    let resolve = (value) => {
      if(this.state === 'pending'){
        //状态转换为fulfilled,并且存储成功的值
        this.state = 'fulfilled';
        this.value = value;
      }
    };
    // 定义reject函数
    let reject = (reason) => {
      if(this.state === 'pending'){
        //状态转换为rejected,并且存储失败的原因
        this.state = 'rejected';
        this.reason = reason;
      }
    };
    // 执行executor,如果报错,直接reject
    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error);
    }
  }
}
```
&nbsp;

### promise 中的 then 方法  
promise 中的 then 方法主要用来添加 状态改变时的回调函数。  
它接受两个参数，第一个参数是状态为 fulfilled 时的回调函数，我们称之为 onFulfilled，我们在里面传入成功的 value。第二个参数则是状态为 rejected 时的回调函数，我们称之为 onRjected，我们在里面传入失败的 reason。  

```js
class Promise{
  constructor(executor){...}
  // 定义then方法,接受两个参数onFulfilled,onRejected
  then(onFulfilled,onRejected){
    // 状态为fulfilled时运行成功的回调并传入value
    if(this.state === 'fulfilled'){
      onFulfilled(this.value);
    }
    // 状态为rejected时运行失败的回调并传入reason
    if(this.state === 'rejected'){
      onRejected(this.reason);
    }
  }
}
```
&nbsp;


### 解决异步问题  
实现到上一步，我们就可以实现简单的同步功能了。但是对于异步代码来说，还是一筹莫展。  
举个例子：如果我们 resolve 在 setTimeout 内执行，then 此时的 state 还是 pending 呢。  
解决这个问题的思路就是：在调用 then 时，将失败和成功存储到各自的数组里，一旦 resolve 或 reject ，就调用他们。  
为什么说是他们呢？因为一个 promise 可以有多个 then，我们把它们存在同一个数组内。

```js
// 多个then的情况
let p = new Promise();
p.then();
p.then();
```
&nbsp;

下面我们按照上面的思路实现一下：
```js
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的数组
    this.onResolvedCallbacks = [];
    // 存放失败的数组
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if(this.state === 'pending'){
        this.state = 'fulfilled';
        this.value = value;
        //状态为成功后,利用forEach执行成功数组里的函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = (reason) => {
      if(this.state === 'pending'){
        this.state = 'rejected';
        this.reason = reason;
        //状态为失败后,利用forEach执行失败数组里的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled,onRejected){
    if(this.state === 'fulfilled'){
      onFulfilled(this.value);
    }
    if(this.state === 'rejected'){
      onRejected(this.reason);
    }
    // 如果此时状态为pending时,将回调传入成功和失败的数组待执行
    if(this.state === 'pending'){
      //onFulfilled传入成功的数组
      this.onResolvedCallbacks.push(onFulfilled(this.value));
      //onRejected传入失败的数组
      this.onRejectedCallbacks.push(onRejected(this.reason));
    }
  }
}
```
&nbsp;


### 解决链式调用  
Promise其中的一个亮点就是链式调用，它解决了回调地狱问题。  
&nbsp;
那么对于 p1.then().then() 这种链式调用的方式，我们怎么实现呢？  
**在 then 之中返回一个新的Promise，传给下一个 then() 即可。**   
&nbsp;

对于这个新返回的 Promise，我们需要处理一些问题：  
- 这个新的 Promise 中的状态以 then 方法中的两个回调函数的返回值为准	
- 如果 then 方法中的回调函数的返回值是一个 Promise，我们需要让新的 Promise 的状态与这个返回的 Promise 的状态保持一致
- 如果 then 方法中的回调函数的返回值只是一个普通的值，直接改变新的 Promise 的状态为 fulfilled 即可  

```js
then(onFulfilled,onRejected){
  // 新建一个promise,最后return出去
  let promise2 = new Promise((resolve,reject) => {
    // 判断上一个 Promise的状态
    if(this.state === 'fulfilled'){
      let res = onFulfilled(this.value);
      // 由于回调的返回值可以有多种,我们需要一个辅助函数对其进行处理
      resolvePromise(res,resolve,reject)
    }
    if(this.state === 'rejected'){
      let res = onRejected(this.reason);
    }
    // 如果状态为pending,将回调传入成功和失败的数组待执行
    if(this.state === 'pending'){
       //onFulfilled传入成功的数组
      this.onResolvedCallbacks.push(onFulfilled(this.value));
      //onRejected传入失败的数组
      this.onRejectedCallbacks.push(onRejected(this.reason));
    }
  })
  return promise2;
}
  
// 辅助函数,判断处理回调的结果
  resolvePromise(res,resolve,reject){
    // 首先判断结果是否是 Promise 对象,如果是,利用 then 改变它的状态
    // 即把新建的 Promise 对象的resolve 和 reject 传入
    // 这样使用 then 改变状态时,新建的 Promise 的状态就能与他保持一致
    if(res instanceof Promise){
      res.then(resolve,reject);
    }else{
      //如果只是普通值,直接resolve就好
      resolve(res);
    }
  }
```
&nbsp;

### 解决链式调用问题  
除了上边所解决的状态要保持一致以外，我们还有很多问题要解决。
- 如果 then 方法返回的对象是自己的 Promise 对象，那么就会发生循环引用。自己等待自己，永远完不成。  
```js
let p = new Promise(resolve => {
  resolve(0);
});
var p2 = p.then(data => {
  // 循环引用，自己等待自己完成，一辈子完不成
  return p2;
})
```
&nbsp;
所以我们需要加一层判断，回调返回的结果是不是自己。

```js
resolvePromise(promise2,res,resolve,reject){
  // 判断回调的结果是否等于本身
  if(res === promise2 ){
    return reject(new TypeError('你反复调用自己是想干嘛?'));
  }
  // 首先判断结果是否是 Promise 对象,如果是,利用 then 改变它的状态
  // 即把新建的 Promise 对象的resolve 和 reject 传入
  // 这样 then 改变状态时,新建的 Promise 的状态就能与他保持一致
  if(res instanceof Promise){
    res.then(resolve,reject);
  }else{
    //如果只是普通值,直接resolve就好
    resolve(res);
  }
}
```
**上面的方法会报错：Cannot access 'p2' before initialization**  
原因很明显，我们没有等待 promise2 初始化完毕就把它传进去辅助函数了。所以我们设置一个定时器，等待它初始化结束再去工作：
```js
then(onFulfilled,onRejected){
  // 新建一个promise,最后return出去
  let promise2 = new Promise((resolve,reject) => {
    // 判断上一个 Promise的状态
    if(this.state === 'fulfilled'){
      //设置一个定时器异步等待promise2初始化结束再工作
      setTimeout(() => {
        let res = onFulfilled(this.value);
        // 由于回调的返回值可以有多种,我们需要一个辅助函数对其进行处理
        this.resolvePromise(promise2,res,resolve,reject)
      },0)
    }
    if(this.state === 'rejected'){
      let res = onRejected(this.reason);
    }
    // 如果状态为pending,将回调传入成功和失败的数组待执行
    if(this.state === 'pending'){
      //onFulfilled传入成功的数组
      this.onResolvedCallbacks.push(onFulfilled(this.value));
      //onRejected传入失败的数组
      this.onRejectedCallbacks.push(onRejected(this.reason));
    }
  })
  return promise2;
}
```
此时报错问题解决，进行下一步。  
&nbsp;


### then 中回调函数的错误处理  
在 then 中，我们有 onFulfilled 和 onRejected 这两个回调。onRejected 本身就是处理错误的不说，如果 onFulfilled 这个回调中出错了，我们需要捕获错误，并主动更改返回的 Promise 的状态。  
```js
then(onFulfilled,onRejected){
  // 新建一个promise,最后return出去
  let promise2 = new Promise((resolve,reject) => {
    // 判断成功的回调
    if(this.state === 'fulfilled'){
      //设置一个定时器异步等待promise2初始化结束再工作
      setTimeout(() => {
        //成功的回调也需要捕获错误
        try {
          let res = onFulfilled(this.value);
          // 由于回调的返回值可以有多种,我们需要一个辅助函数对其进行处理
          this.resolvePromise(promise2,res,resolve,reject);
        } catch (error) {
          reject(error);
        }
      },0)
    }
    if(this.state === 'rejected'){
      //调用失败的回调,返回错误信息
      let res = onRejected(this.reason);
    }
    // 如果状态为pending,将回调传入成功和失败的数组待执行
    if(this.state === 'pending'){
      //onFulfilled传入成功的数组
      this.onResolvedCallbacks.push(onFulfilled(this.value));
      //onRejected传入失败的数组
      this.onRejectedCallbacks.push(onRejected(this.reason));
    }
  })
  return promise2;
}
```
