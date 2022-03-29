---
title: 跨域的解决方案
date: 2021-08-11
categories:
 - JS
tags:
 - JS
---

<!--more-->

# 同源策略  
要求：两个网页的协议、域名、端口号三个东西必须相同。否则，两个网页不能访问各自的cookie。  
举个例子，对于 http://www.baidu.com/js/test.js 这个网址来说，协议是 http:// ，域名是 www.baidu.com ，端口是80(默认端口可以省略)，它的同源情况如下
```
http://www.baidu.com/css/test.css ：同源
http://baidu.com/js/test2.js ：不同源(域名不同)
http://v2.www.baidu.com/js/test2.js ：不同源(域名不同)
http://www.baidu.com:81/js/test2.js ：不同源(端口不同)
```

## 目的  
同源策略的目的主要是为了保证用户的信息，防止恶意网站窃取数据。  
如果A网站是一家银行，用户登陆后又去浏览其他网站，如果其他网站可以读取A的 Cookie，那可就坏事了。所以同源策略是必须的。  

## 限制范围  
目前，如果非同源，共有三种行为受到限制：
```
1.Cookie、LocalStorage 和 IndexDB 无法读取。
2.DOM 无法操作。
3.不能发送 Ajax 请求。
```
下面介绍跨域的解决方案。  


# 跨域  

## 对于Cookie  
Cookie是服务器写给浏览器的一些信息，只有同源的网页才能共享。**但是只要两个网页一级域名相同，只是二级域名不同，可以使用 Cookie 中的 domain 共享 Cookie。**  
同时我们要注意：**设置 Cookie 的话只能在本域名下或是 domain 级别高于自身的域名下才会生效**  
举例来说：A网页是 http://w1.example.com/a.html ，B网页是 http://w2.example.com/b.html ，那么只要设置相同的 document.domain，两个网页就可以共享 Cookie。
```js
document.domain = 'example.com'
```
现在A网页只要通过脚本设置一个 Cookie
```js
document.cookie = 'name = chy'
```
B网页就可以读到这个 Cookie
```js
let allCookie = document.cookie
```
这种方式的跨域只适用于 Cookie 和 iframe窗口，LocalStroage跨域的方式下面会介绍。  
另外，服务器设置 Cookie 的时候，指定 Cookie 所属域名为一级域名，比如 .example.com
```
Set-Cookie: key=value;domain=.example.com;path=/
```
这样二级域名和三级域名不用做任何设置就能访问到这个Cookie了。  


## 窗口  
如果两个网页不同源，就无法拿到对方的DOM。比如我们使用 iframe 和 window.open 方法打开的窗口，它们与父窗口之间无法进行通信。  
比如，父窗口运行下面的代码时，iframe 窗口不是同源的窗口，就会报错：
```js
document.getElementById('IFrame').contentWindow.body
// Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.
```
子窗口访问父窗口亦然  
```js
window.parent.document.body
//报错
```
但是如果两个窗口一级域名相同，只是二级域名不同，那么设置上面的 document.domain 属性，就可以规避同源策略，拿到 DOM。  

## 完全不同源的窗口  
对于完全不同源的网站，有三种方法让他们解决跨域窗口的通信问题。  

### 1. hash
所谓 hash 就是 URL # 后面的部分，比如 http://example.com/x.html#abc 中的 #abc。如果只是改变 hash 部分，是不会造成页面的刷新的。  
&nbsp;

父窗口可以把信息，写入子窗口的 hash 部分：
```js
let src = '原来的地址' + '#' + data;
document.getElementById('IFrame').src = src;
```
**子窗口通过监听 haschange 事件得到通知。**

```js
window.onhaschange = function(){
	let message = window.location.hash;
	// 其他操作
}
```
同样，子窗口也可以改变父窗口的 hash 
```js
window.parent.location.href = target + '#' + hash;
```

### 2. window.name  
浏览器窗口有一个 window.name 属性。这个属性的特点就是，无论是否同源，只要在同一个窗口内，前一个网页如果设置了这个属性，后一个网页就可以读取它。  
&nbsp;

父窗口先打开一个子窗口，载入一个不同源的网页，该网页将信息写入 window.name 属性。  
```js
window.name = data;
```
然后子窗口跳回一个与主窗口同域的网址。
```js
location = 'http://parent.url.com/xxx.html'
```
然后主窗口就可以读取子窗口的 window.name 了。
```js
let data = document.getElementById('IFrame').contentWindow.name;
```
这种方法的优点是，window.name 容量很大，可以放置非常长的字符串。  
缺点则是要监听子窗口的 window.name 属性的变化，影响网页性能。  


### 3.window.postMessage  
前面两种方法都算是破解，HTML5 为了解决这个问题引入了一个新的 API ：为 window 对象添加了一个 window.postMessage 方法，允许跨窗口通信，无论是否同源。  
如果父窗口 http://aaa.com 向子窗口 http://bbb.com 发消息，调用 postMessage 方法即可。  
```js
let newIframe = window.open('http://bbb.com');
newIframe.postMessage('Hello Clown','http://bbb.com')
```
postMessage 方法的的调用者，需要是其他窗口的一个引用，比如 iframe 的 contentWindow 属性，亦或者是 window.open 方法返回的窗口对象。  
postMessage 方法接受两个参数 ，第一个参数是消息的具体内容，第二个参数是接受消息的窗口的源，即“协议+域名+端口”。也可以设置为 \* 表示不限制域名，向所有窗口发送。  
&nbsp;

子窗口向父窗口发送消息的例子:
```js
window.opener.postMessage('hello batman','http://aaa.com');
```
父窗口和子窗口都可以通过 message 事件，监听对方的消息。
```js
window.addEventListener('message',function(event){
  console.log(event.data);
})
```
message 事件的事件对象 event，提供了以下三个属性
```
event.source:发送消息的窗口
event.origin:消息发向的网址
event.data:消息的内容
```
下面一个例子，子窗口通过 event.source 属性引用父窗口，然后发送消息
```js
window.addEventListener('message',function(event){
  event.source.postMessage('hello','*')
})
```
event.origin 属性也可以过滤掉不是发给自己的消息
```js
window.addEventListener('message',function(event){
  if(event.origin !== 'http://www.bbb.com'){
    return
  }
  if(event.data === 'hello,clown'){
    event.source.postMessage('hello,batman',event.origin);
  }else{
    console.log(event.data);
  }
})
```


### LocalStroage  
通过 postMessage，读写其他窗口的 LocalStroage 也成为了可能。  
下面一个例子，父窗口将消息写入了子窗口的 LocalStroage：
```js
// 父窗口
let win = document.getElementById('Iframe').contentWindow;
let obj = { name:'chy' };
win.postMessage(JSON.stringify(obj),'http://www.bbb.com');

// 子窗口
window.onmessage = function(event){
	if(event.origin !== 'http://www.bbb.com'){
		return;
	}
	let mes = JSON.parse(event.data);
	localStorage.setItem('name',mes.name);
}
```

# Ajax跨域  
同源策略规定，Ajax 请求只能发送给同源的网站。但是我们目前有多种办法规避这个限制，下面一一介绍。  
&nbsp;

## JSONP  
JSONP 是跨域通信中十分常见的方法，最大的特点就是简单适用，兼容性好。遗憾的是只支持 GET 方法。  
它的基本思想是：因为 \<script\> 标签不受同源策略的限制，所以网页动态添加一个 \<script\> 标签，向服务器请求 JSON 数据。服务器收到请求后将数据放在一个指定名字的回调函数中返回。  

```js
function JSONP(src){
  let script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}
window.onload = function(){
  JSONP('http://example.com/name?callback=foo');
}
function foo(data){
  console.log(data);
}
```
上面代码通过动态创建 \<script\> 标签，向服务器 example.com 发送请求。**注意：该请求的查询字符串中有一个 callback 参数，用来指定回调函数的名字，这是 JSONP 的核心**。  
服务器收到这个请求后，会将数据放到回调函数的参数位置返回。  
```
foo({'name':'chy'});
```
由于 \<script\> 标签请求的脚本，直接作为代码运行。这时只要浏览器中定义了 foo 函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，所以我们不需要使用 JSON.parse() 。  


## CORS  

### 简介：
CORS 是一个W3C标准，它允许浏览器向跨源服务器，发送 XMLHttpRequest 请求，从而克服了 Ajax 只能同源使用的限制。  
CORS 需要浏览器和服务器同时支持。目前所有浏览器都支持该功能，IE浏览器不能低于IE10。  
&nbsp;
整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。浏览器一旦发现 Ajax 请求跨域后，就会自动附加一些头的信息，有时还会多出一次附加的请求，但用户没有感觉。  
因此，实现 CORS 通信关键在于服务器，只要服务器实现了 CORS 接口，就可以跨域通信。  
&nbsp;

### 两种请求  
浏览器将 CORS 请求分为两类：简单请求与非简单请求。  
简单请求需要同时满足以下两大条件：
```js
1.请求方法是以下三种方法之一：
- HEAD
- POST
- GET

2.HTTP的头信息不超出以下几种字段：
- Accept(表示浏览器期望接收的数据类型)
- Accept-Language(表示浏览器支持的语言)
- Content-Language(表示返回的语言类型)
- Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain (表示发送端发送的数据格式)
```

这是为了兼容表单 (form) ，因为表单一直都可以跨域。Ajax 跨域的设计就是，表单能发，那 Ajax 就能发。  
不满足上述条件的，就是非简单请求，浏览器对这两种请求的处理，是不一样的。  
&nbsp;

### 简单请求  





