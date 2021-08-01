module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  title: "Lemonrain's Blog",
  // description: '我相信 你会变成我心目中的模样',
  theme:'reco',
  themeConfig: {
    mode: 'light', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    modePicker: false, // 默认 true，false 不显示模式调节按钮，true 则显示
    logo: '/head.jpg',
    authorAvatar: '/head.jpg',
    author: 'Lemonrain',
    nav: [
      { text: '主页', link: '/', icon: 'reco-home'},
      { text: '关于', link: '/blogs/About_Me/', icon: 'reco-account'},
    ],
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    },
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    subSidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    record: '琼ICP备2021000953号',
    recordLink: 'http://beian.miit.gov.cn/',
    startYear: '2021'
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ["vuepress-plugin-auto-sidebar", { collapsable: true }],//自动侧边栏
    ["@vuepress-reco/vuepress-plugin-pagation", {}],//分页插件
    ['cursor-effects'], //鼠标点击插件
    // ['ribbon'], //丝带背景插件
    //复制弹窗
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
        content: "复制成功!"
      }
    }]
  ]
}