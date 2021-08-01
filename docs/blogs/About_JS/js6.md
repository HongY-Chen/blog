---
title: 原生的Ajax及其封装
date: 2021-06-15
categories:
 - JS
tags:
 - JS
---

<!--more-->

Ajax:向服务器请求数据而不刷新页面，实现更好的用户体验  

### 原生的XHR对象  
创建：
```js
let xhr = new XMLHttpRequest();
```

使用XHR对象首先需要调用open() 方法，方法接受三个参数，请求类型("get"、"post"等)，请求URL，以及请求是否异步的布尔值，下面是一个例子  
```js
xhr.open('get','test.php',true);
```
调用open() 并不会实际发送请求，只是为发送请求做好准备  
**注意：只能访问同源URL**。所谓同源，即协议相同，域名相同，端口相同。如果请求的URL与发送请求的页面在任何方面有不同之处，则会抛出错误  
&nbsp;

要发送定义好的请求，需要调用send() 方法  
```js
xhr.open('get','test.php',true);
xhr.send(null);
```
send() 方法接受一个参数，是作为请求体发送的数据。如果不需要请求体，则必须传null，调用send() 之后，请求就会发送到服务器。  

&nbsp;

等到服务器响应，并且客户端接受到响应后，XHR对象的以下属性会被填充上数据  
+ responseText：作为响应体返回的文本  
+ responseXML：如果响应的内容类型是"text/xml" 或 "application/xml" ，那就是包含响应数据的XML DOM文档  
+ status：响应的HTTP状态码  
+ statusText：响应的HTTP状态描述  

收到响应后，我们第一步需要去检查status 属性确保响应是成功的。一般来说 HTTP状态码为 2xx表示成功。此时，responseText 或 responseXML中会有内容。如果HTTP状态码是304，则代表资源未修改过，是从浏览器缓存直接拿取的，当然这也代表响应有效。为确保拿到正确的响应，我们应该检查这些状态，如下所示  
```js
xhr.open('get','test.php',true);
xhr.send(null);
if((xhr.status >=200 && xhr.status < 300) || xhr.status == 304){
	console.log(xhr.responseText);
}else{
	console.log('request was unsuccessful:' + xhr.status);
}
```
以上代码可能显示服务器返回的内容，也可能显示错误消息，取决于HTTP的状态码。为什么检查status而不检查statusText属性，则是因为后者被证明在跨浏览器的情况下不可靠。  
无论是什么响应内容，responseText 属性始终会保存响应体，而responseXML 对于非XML数据是null。   

&nbsp;

我们多数情况下会使用异步请求，这样可以不阻塞当前的的代码，使得当前代码可以继续执行。  
XHR对象中有一个readyState 属性，表示当前处在请求/响应过程的哪个阶段。这个属性有如下可能的值：
+ 0：未初始化。尚未调用open() 方法  
+ 1：已打开。经调用open() 方法了，尚未调用send() 方法  
+ 2：已发送。经调用send() 方法，尚未收到响应  
+ 3：接受中。已经收到部分响应  
+ 4：完成。已经收到所有响应，可以使用了  

每当readyState发生变化，都会触发readystatechange事件。可以借此机会来查看readyState的值。般来说，我们关心的readyState的值是4，表示数据已经就绪，为保证跨浏览器兼容，我们应该在调用open() 方法前 处理onreadystatechange事件进行赋值  
```js
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4){
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
      console.log(xhr.responseText);
    }else{
      console.log('Request was unsuccessful:' + xhr.status);
    }
  }
};
xhr.open('get',url,true);
xhr.send();
```

收到响应之前如果想取消异步请求，可以调用abort() 方法：
```js
xhr.abort()
```
调用这个方法后，XHR对象会停止触发事件，并阻止访问这个对象上任何与响应相关的属性。

&nbsp;

### HTTP头部
值得注意的是，HTTP请求都会携带一些头部字段字段，XHR对象会通过一些方法暴露与请求和响应相关的头部字段。默认情况下，XHR对象会在请求时发送以下头部字段：  
+ Accept：浏览器可以处理的内容类型  
+ Accept-Charset：浏览器可以显示的字符集  
+ Accept-Encoding：浏览器可以处理的压缩编码类型  
+ Accept-Language：浏览器使用的语言  
+ Connection：浏览器与服务器的连接类型  
+ Cookie：页面中设置的Cookie  
+ Host：发送请求的页面所在的域  
+ Referer：发送请求的页面的URL  
+ User-Agent：浏览器的用户代理字符串  

这些通常都是会发送的，如果需要额外的请求头部，可以使用setRequestHeader() 方法。这个方法接受两个参数：头部字段的名称和值。为保证请求头部被发送，必须在open() 之后，send() 之前调用serRequestHeader()。  

下面是一个例子：我们发送Post请求的时候，会把Content-Type头部设置为"application/x-www-formurlencoded",这是因为对服务器而言Post请求与提交表单是不一样的，所以我们要模拟表单提交  
```js
xhr.open('post',url,true);
xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
xhr.send('name=chy&age=21');
```

&nbsp;

### 利用Promise封装Ajax  
下面我们来封装一下Ajax  
```js
function Ajax(){
  this.get = function(url){
    return new Promise((resolve,reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange == function(){
        if(xhr.readyState == 4){
          if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            resolve(xhr.response);
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('get',url,true);
      xhr.send();
    })
  }

  this.post = function(url,params){
    return new Promise((resolve,reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('post',url,true);
      xhr.setRequestHeader('content-type', "application/x-www-form-urlencoded");
      xhr.send(params);
    })
  }
}
```

