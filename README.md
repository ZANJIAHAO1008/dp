# vue-frame

> Vue前端脚手架

## 特性

- 基于vue，chinaoly-ui-vue，chinaoly-business-vue，vuex，[Mock](https://github.com/nuysoft/Mock) 企业级后台管理系统最佳实践。
- 基于chinaoly-ui-vue及chinaoly-business-vue设计语言，提供后台管理系统常见使用场景。
- 使用vue-hot-reload-api本地调试和构建，其中Mock功能实现脱离后端独立开发。
- 响应式设计。

## npm换源

```bash
npm config set registry http://192.168.3.189/nexus/content/groups/public-npm/
```

## 克隆项目文件

```bash
git clone git@192.168.1.244:YYCP/YYCP-vueFrame.git
```

## 导出并切换到dev分支

```bash
git checkout -b dev origin/dev
```

## 进入目录安装依赖

```bash
npm i 或者 yarn install
```

## 开发

```bash
npm run dev
打开 http://localhost:8080
```

## 打包发布

```bash
npm run build
```

## 规范

### 目录结构

```shell
├── dist  项目输出目录
├── build 项目构建配置
├── src   项目源码目录
    ├── components 项目中的公共组件
    ├── config 项目中的配置数据
    ├── fetch  接口请求
    ├── images 图片文件
    ├── libs   公共方法
    ├── router 路由配置
    ├── store  状态管理
    ├── styles 样式文件
    ├── template 模板文件
    └── views  页面
        ├── login  登录页面
        ├── home   首页
        ├── Main   框架页面
        └── pages  其他页面
└── static 静态资源目录
    ├── images 图谱资源
    ├── css 第三方库的css文件
    └── js  第三方库的js文件
```

>说明：因特殊原因，如要直接修改第三方库源码或无法用import导入的插件需放在static下，该文件夹不作sonar质量检查。

### 文件命名及存储说明

- components: **组件为单位** 简单组件以单文件保存，复杂组件以文件夹保存，组件文件(夹)名首字母大写（如`DataTable`），文件夹内主文件以`index.js`导出。
- pages: **页面为单位** 以文件夹保存，文件夹名首字母小写（特殊除外，如`UIElement`），文件夹内主文件以`index.js`导出，多文件时可建立`components`文件夹，如果有子路由，依次按照路由层次建立文件夹(如`/pages/user/message/`）。
- mock: **接口模型为单位** 以文件保存，同一接口类型，放到同一文件下，mock按需求参照接口模型
- 样式定义: `common.less` 为框架公共样式文件，请不要随意改动代码，如有自定义的公共样式请定义在`custom.less`中，公共样式从优先级`custom.less` > `common.less`

### 方法命名说明

1. 方法命名采用驼峰命名法，并有一定意义 如`setModalVisible`
2. 接口相关的方法命名示例 `queryXX`、`updateXX`、`saveXX`、`deleteXX`
3. 变量相关的方法命名示例 `setModalVisible`、`getModalVisible`、`showDetail`
4. 事件相关的方法命名示例 `onClick`、`onPageChange`

### 变量命名说明

1. 变量命名采用驼峰命名法，并有一定意义 如`dataSource`
2. 声明时优先使用`const`，需要改变的变量用 `let`。
3. 布尔型数据用 `b-/is-/has-/can-`，如 `bVisible`、`isLoading`
4. 数字型数据用 `nXXX`,  如 `nCount`

### vue文件中标签(template、script、style)声明顺序

> `template`、`script`、`style`，并使用空行分隔

### vue文件中方法(props，data 等)声明顺序

> `name`、`mixins`、`components`、`props`、`model`、`inject`、`data`、`computed`、`watch`、`created`、`mounted`、`activited`、`updated`、`methods`

### vue文件template中属性声明顺序

> `指令(v-XXX)`、`属性(type、style等)`、`事件(@XXX)`  
如：`<co-button v-show="bVisible" type="primary" style="" @click="addRole">新增</co-button>`

### 样式命名说明

1. 类名需有一定意义，全部小写，多个单词用连字符连接，如 `header-title`
2. 尽量用公共样式，少用自定义样式，单独组件中的样式需要加 `scoped`
3. 尽量少用样式穿透`deep`或`>>>`，可以在`custom.less`修改公共组件样式
4. 禁用`id`声明样式

### 样式声明顺序

1. 位置属性(`position`, `top`, `right`, `z-index`, `display`, `float`等)
2. 大小(`width`, `height`, `padding`, `margin`)
3. 文字系列(`font`, `line-height`, `letter-spacing`, `color-`, `text-align`等)
4. 背景(`background`, `border`等)
5. 其他(`animation`, `transition`等)

### 注释

1. 单行注释用 `// xxx`，多行用 `/* xxx */`
2. 文件头部需声明该文件的作用如 `// 用户详情弹窗`
3. 方法需声明方法的作用、入参(可选)、出参(可选)

  ```js
   /**
    * 使用 param 表示函数形参
    * 使用 returns 表示函数返回值
    * @param {类型} data
    * @param {object} options
    * @param {类型} options.xxx
    * @param {类型} options.yyy
    * @param {类型} [options.zzz] 可选参数
    * @returns {类型}
    */
    export function myMethod(data, options) {}

   /**
    * 类型参考：https://www.tslang.cn/docs/handbook/basic-types.html
    *
    * 基本
    * @type {boolean}
    * @type {number}
    * @type {string}
    * @type {1 | 2 | 3}
    * @type {'a' | 'b' | 'c'}
    *
    * 数组
    * @type {Array}
    * @type {string[]}
    *
    * 函数
    * @type {Function}
    * @type {(data) => void}
    * @type {(data: Array) => void | boolean}
    *
    * 对象
    * @type {object}
    *
    * 联合
    * @type {number | string}
    * @type {boolean | (() => boolean)}
    *
    * 导入 ts 类型
    * @type {import('xxx').yyy}
    *
    * 从现有的 js 变量或 ts 类型进行推导
    * @type {Parameters<fn>} 取函数形参的类型
    * @type {Parameters<fn>[0]} 取函数第一个形参的类型
    * @type {ReturnType<fn>} 取函数返回值的类型
    * @type {obj['xxx']} 取指定属性值的类型（不能使用点语法）
    * ...
    */
  ```

## 注意事项

1. 慎用 `this.refs`、`this.parent`、`this.$root`、`provide/inject`  
  `this.$refs` 一般用在第三方开源组件或内部公共库组件或非常稳定的组件，以调用显式声明的方法
2. 尽量不要在 `watch` 中变更数据，易造成死循环。数据变更应该交给用户交互事件或初始化的异步回调
3. 组件中的 `data` 及 vuex 中的 `state` 应该可序列化，即不要存 *undefined*、*function* 等
4. muatations 中不要写异步方法，vuex中的数据通过commit修改，不允许直接修改
5. 父组件通过$refs调用子组件时，不允许直接修改子组件的数据，需通过方法修改

## 提交

### message 格式

`<type>: <subject>`

### 常用的 type 类别

```js
build: 构建新版本
chore: 构建过程或辅助工具的变动
docs: 文档（documentation）
feat: 新功能（feature）
fix: 修补bug
refactor: 重构（即不是新增功能，也不是修改bug的代码变动）
style: 格式（不影响代码运行的变动）
test: 增加测试
```

## tips

### 其他常用地址

- [建议及BUG反馈](http://192.168.51.21:8080/projects/YFZBXQSJ)
- [中奥基础组件库](http://192.168.0.71:7778)
- [中奥业务组件库](http://192.168.0.71:7779)
- [前端常用软件](https://192.168.1.74/svn/YFZB/Software/前端开发)
- [前端规范文档](https://192.168.1.74/svn/YFZB/Templates/D2开发人员/前端开发)
- [前端开发指南](http://192.168.1.211:8090/pages/viewpage.action?pageId=65753)
- [sonar校验规则](http://192.168.3.180:9000/coding_rules?activation=true&qprofile=AXCABd78pR5HGkl1ftWS)

### 推荐学习网站

- [vue 官网教程](https://cn.vuejs.org/v2/guide/)
- [ES6 基础语法](https://segmentfault.com/a/1190000010929042)
- [ECMAScript 6 入门](http://es6.ruanyifeng.com)
- [MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)
- [vue-router](https://router.vuejs.org/zh/guide/)
- [less 教程](https://www.w3cschool.cn/less/)
- [Webpack](https://github.com/webpack/webpack)
- [vue开源组件库](https://segmentfault.com/p/1210000008583242/read?from=timeline#UI组件)
