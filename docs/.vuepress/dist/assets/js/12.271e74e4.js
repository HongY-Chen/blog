(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{523:function(s,t,a){"use strict";a.r(t);var n=a(6),r=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h3",{attrs:{id:"rem是什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rem是什么"}},[s._v("#")]),s._v(" rem是什么")]),s._v(" "),a("p",[s._v("rem（font size of the root element）是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位。设置 html 的 font-size 属性，rem 是根据它的大小来动态变化整个项目中使用 rem 单位的元素大小。"),a("br"),s._v(" "),a("strong",[s._v("比如：html{font-size:100px},那么1rem就等于100px;")]),a("br")]),s._v(" "),a("h3",{attrs:{id:"关于lib-flexible"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于lib-flexible"}},[s._v("#")]),s._v(" 关于lib-flexible")]),s._v(" "),a("p",[s._v("lib-flexible 是淘宝项目组开发出来的一个小插件"),a("br"),s._v('\n它会自动在html的head中添加一个 meta name="viewport" 的标签，同时会自动设置 html 的font-size为屏幕宽度除以10，假如设计稿的宽度是750px，此时1rem应该等于75px。假如量的某个元素的宽度是150px，那么在css里面定义这个元素的宽度就是 width: 2rem。但是当分辨率大于某个特定值时，它便不再生效。'),a("br")]),s._v(" "),a("h3",{attrs:{id:"移动端适配"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#移动端适配"}},[s._v("#")]),s._v(" 移动端适配")]),s._v(" "),a("p",[s._v("一般而言，lib-flexible 并不独立出现，而是搭配 postcss-pxtorem 一起做适配方案，目的是自动将css中的px转换成rem。"),a("br"),s._v("\n意思就是说，我们写的时候不用以rem做单位，继续用px写，但是编译的时候能转化为rem"),a("br")]),s._v(" "),a("h3",{attrs:{id:"安装lib-flexible"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装lib-flexible"}},[s._v("#")]),s._v(" 安装lib-flexible")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("npm install lib"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("flexible "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("S")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// main.js 全局引入")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'lib-flexible'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"安装-postcss-pxtorem"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装-postcss-pxtorem"}},[s._v("#")]),s._v(" 安装 postcss-pxtorem")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("npm install postcss-pxtorem -S\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"配置-postcss-pxtorem"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置-postcss-pxtorem"}},[s._v("#")]),s._v(" 配置 postcss-pxtorem")]),s._v(" "),a("p",[s._v("配置 postcss-pxtorem，可在 vue.config.js、.postcssrc.js、postcss.config.js 其中之一配置，权重从左到右降低，没有则新建文件，只需要设置其中一个即可:"),a("br"),s._v(" "),a("strong",[s._v("在项目根目录下新建 vue.config.js  文件，配置代码如下：")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//rootValue根据设计稿宽度除以10进行设置，这边假设设计稿为375，即rootValue设为37.5；")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//propList是设置需要转换的属性，这边*为所有都进行转换。  ")]),s._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    css"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      loaderOptions"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        postcss"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n          plugins"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"autoprefixer"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 配置使用 autoprefixer 兼容浏览器版本")]),s._v("\n              overrideBrowserslist"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"last 15 versions"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" \n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"postcss-pxtorem"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//根元素(html)的字体大小")]),s._v("\n              rootValue"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("75")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//rootValue: 37.5, 如果是Vant的话根字体是37.5")]),s._v("\n              propList"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br")])]),a("p",[a("strong",[s._v("在.postcssrc.js或postcss.config.js中配置如下：")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"plugins"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'postcss-pxtorem'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            rootValue"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("37.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            propList"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'*'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("h2",{attrs:{id:"测试结果"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#测试结果"}},[s._v("#")]),s._v(" 测试结果")]),s._v(" "),a("p",[s._v("css中设置某类宽度为375px：")]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".content")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("375px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("运行后在浏览器可以发现已经转化为10rem,即 375 设置的 rootValue：\n"),a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201013145222630.png",alt:"pic"}}),a("br"),s._v("\n以上情况则说明 postcss-pxtorem 配置成功。"),a("br"),s._v("\n \n当我们在f12中切换设备时可发现："),a("br"),s._v(" "),a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201013145642519.png",alt:""}}),a("br"),s._v(" "),a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201013145743428.png",alt:""}}),a("br"),s._v("\nhtml的字体大小跟随设备宽度进行改变，body跟随设备的dpr进行改变，这是 lib-flexible 的实现，即说明配置成功。"),a("br")]),s._v(" "),a("h3",{attrs:{id:"本文结束"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#本文结束"}},[s._v("#")]),s._v(" 本文结束")])])}),[],!1,null,null,null);t.default=r.exports}}]);