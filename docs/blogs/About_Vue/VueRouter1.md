---
title: Vue路由中两种传参方式
date: 2021-07-31
categories:
 - Vue
tags:
 - Vue
---

<!--more-->

### 使用params传递  
在使用params传递时，我们需要在路由path中先添加占位符 /:key/:key  
像下面这样，我们添加了一个name和一个age的key，这样才能传参。  
```js
{
    path: '/about/:name/:age',
    name: 'About',
    component: () => import('../views/About.vue')
}
```
然后我们在前方传参时，按照如下方式  
```
<router-link to="/about/chy/21">About</router-link>
```
使用params传参时，params就是路由的一部分，必须要在后面添加参数。  
如果参数没有加在路由上面，也是可以传过去的，但是不会在url上显示你的参数，并且刷新后参数就会丢失。  
&nbsp;

怎么拿到参数呢？我们利用$route这个对象，这个对象的内容是当前页面的信息  
```
<p>
  {{ this.$route.params.name }}
  {{ this.$route.params.age }}
</p>
```


### 使用query进行传参  
使用query的话就不需要在路由内配置什么，query只是拼接在url后面的参数。  
query使用 ?key=value&key=value 进行传参，如下所示：  
```
<router-link to="/home?name=ltj&age=22">Home</router-link>
```
我们同样使用$route这个对象拿到参数  
```
<p>
  {{ this.$route.query.name }}
  {{ this.$route.query.age }}
</p>
```

