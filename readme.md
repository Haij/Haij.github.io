

### accumulate over a long period



[ES6](./mds/es.md)方式数组去重

```js
function unique(arr) {
    return [...new Set(arr)]
}
```



实现数组reverse

```js
// 改变原数组, 此实现使用了指针对撞的方法
Array.prototype.myReverse = function () {
    let start = 0, end = this.length-1;
    while(start < end){
        [this[start], this[end]] = [this[end], this[start]];
        start++;
        end--;
    }
    return this;
}
```



找元素的第n级父元素

```js
function parents(ele, n) {
    while (ele && n) {
        ele = ele.parentElement ? ele.parentElement : ele.parentNode;
        n--;
    }
    return ele;
}
```



返回元素的第n个兄弟节点

```js
function retSibling(e, n) {
    while (e && n) {
        if (n > 0) {
            if (e.nextElementSibling) {
                e = e.nextElementSibling;
            } else {
                for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
            }
            n--;
        } else {
            if (e.previousElementSibling) {
                e = e.previousElementSibling;
            } else {
                for (e = e.previousElementSibling; e && e.nodeType !== 1; e = e.previousElementSibling);
            }
            n++;
        }
    }
    return e;
}
```



封装mychildren，解决浏览器的兼容问题

```js
function myChildren(e) {
    let children = e.childNodes,
        arr = [],
        len = children.length;
    for (var i = 0; i < len; i++) {
        if (children[i].nodeType === 1) {
            arr.push(children[i])
        }
    }
    return arr;
}
```



判断元素有没有子元素

```js
function hasChildren(e) {
    let children = e.childNodes,
        len = children.length;
    for (var i = 0; i < len; i++) {
        if (children[i].nodeType === 1) {
            return true;
        }
    }
    return false;
}
```



把一个元素插入到另一个元素的后面

```js
Element.prototype.insertAfter = function (target, elen) {
    let nextElen = elen.nextElenmentSibling;
    if (nextElen == null) {
        this.appendChild(target);
    } else {
        this.insertBefore(target, nextElen);
    }
}
```



返回当前的时间（年月日时分秒）

```js
function getDateTime() {
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours() + 1,
        minute = date.getMinutes(),
        second = date.getSeconds();
        month = checkTime(month);
        day = checkTime(day);
        hour = checkTime(hour);
        minute = checkTime(minute);
        second = checkTime(second);
     function checkTime(i) {
        if (i < 10) {
                i = "0" + i;
       }
      return i;
    }
    return "" + year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒"
}
```



获得滚动条的滚动距离

```js
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
```



获得视口的尺寸

```js
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        // ie8及其以下
        if (document.compatMode === "BackCompat") {
            // 怪异模式
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            // 标准模式
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}
```



绑定事件的兼容代码

```js
function addEvent(elem, type, handle) {
    if (elem.addEventListener) { //非ie和非ie9
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) { //ie6到ie8
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}
```



解绑事件

```js
function removeEvent(elem, type, handle) {
    if (elem.removeEventListener) { //非ie和非ie9
        elem.removeEventListener(type, handle, false);
    } else if (elem.detachEvent) { //ie6到ie8
        elem.detachEvent('on' + type, handle);
    } else {
        elem['on' + type] = null;
    }
}
```



取消冒泡的兼容代码

```js
function stopBubble(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}
```



检验字符串是否是回文

```js
function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    console.log(str)
    return (str == str.split('').reverse().join(''))
}
```



原生js封装ajax

```js
function ajax(method, url, callback, data, flag) {
    let xhr;
    flag = flag || true;
    method = method.toUpperCase();
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(2)
            callback(xhr.responseText);
        }
    }

    if (method == 'GET') {
        let date = new Date(),
        timer = date.getTime();
        xhr.open('GET', url + '?' + data + '&timer' + timer, flag);
        xhr.send()
        } else if (method == 'POST') {
        xhr.open('POST', url, flag);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}
```



cookie管理

```js
let cookie = {
    set: function (name, value, time) {
        document.cookie = name + '=' + value + '; max-age=' + time;
        return this;
    },
    remove: function (name) {
        return this.setCookie(name, '', -1);
    },
    get: function (name, callback) {
        let allCookieArr = document.cookie.split('; ');
        for (let i = 0; i < allCookieArr.length; i++) {
            var itemCookieArr = allCookieArr[i].split('=');
            if (itemCookieArr[0] === name) {
                return itemCookieArr[1]
            }
        }
        return undefined;
    }
}
```



防抖

```js
// 这里有个小笑话，看完你应该就秒懂了
// 小明军训，教官发令：向左转！向右转！向后转！大家都照着做，唯有小明坐下来休息，教官火的一批，大声斥问他为啥不听指挥？小明说，我准备等你想好到底往哪个方向转，我再转。
function debounce(handle, delay, immediate) {
    let timer = null;
    return function () {
        let _self = this,
            _args = arguments;
        clearTimeout(timer);
        if(immediate){
            const callNow = !timer;
            timer = setTimeout(()=>{
                timer = null;
            }, delay);
            if(callNow) handle.apply(_self, _args);
        }else{
            timer = setTimeout(function () {
                handle.apply(_self, _args)
            }, delay)
        }
    }
}
```



节流

```js
function throttle(handler, wait) {
    let lastTime = 0;
    return function (e) {
        let nowTime = new Date().getTime();
        if (nowTime - lastTime > wait) {
            handler.apply(this, arguments);
            lastTime = nowTime;
        }
    }
}
```



requestAnimFrame兼容性方法 & cancelAnimFrame兼容性方法

```js
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        function (id) {
            window.clearTimeout(id);
        };
})();
```



大数相加 ?

```js
function sumBigNumber(a, b) {
    let res = '', //结果
        temp = 0; //按位加的结果及进位
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || temp) {
        //~~按位非 1.类型转换，转换成数字 2.~~undefined==0 
        temp += ~~a.pop() + ~~b.pop();
        res = (temp % 10) + res;
        temp = temp > 9;
    }
    return res.replace(/^0+/, '');
}
```



### Vue 组件之间常用的通信方式

```js
props
总线 eventbus
vuex
自定义事件
关系情况
$parent
$children
$root
$refs
provide/inject

非 prop 特性
$attrs
$listener

-------------
    

带数据子调父
@Emit("onPass")
onPass() {
	return this.crtUser;
}
===
this.$emit('onPass', this.crtUser)

不带数据子调父
@Emit("onPass")
onPass() {}
===
this.$emit('onPass')
```

vue.$set 

### Typescript

```js
index.d.ts

declare type Point = {
  x: number;
  y: number;
}
OR
declare interface Point {
  x: number;
  y: number;
}

const menuHash: { [k: string]: { menuIcon?: string, menuUrl: string } } = {
  '1': { menuUrl: '/answer-stats' }, //答题统计
}

// ts计算属性，其返回类型直接写在后面
private get mapJson(): {
  area: string;
  outline: string;
  center: number[];
  zoom: number;
  cls?: string;
} {
    // code here
}
    
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
private sa: StringArray = ["1", "2", "3"];
private saL: string[] = ["1", "2"];
private na: NumberArray = [1, 2, 3];
private owna: ObjectWithNameArray = [
    {name: "abc"},
    {name: "cde"},
];
    

// 用接口定义函数的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
    
// type 和 interface 的区别
1. type 是类别名；interface 是接口
2. 接口重名会合并、类型别名重名会报错
    interface Person{
        name: string;
    }
    interface Person{
        age: number;
    }
    // 这个接口合并，变成下面的
    interface Person{
        name: string;
        age: number;
    }
   ---
    type Aanimal = {name: string;};
    type Aanimal = {age: number;}; // 会报错，重名了
 3. 两者都可以用来描述对象或函数的类型，但是语法不同
    interface SetPoint{
        (x: nubmer, y:number): void;
    }
    type SetPoint = (x: number, y:number) => void;
 4. 类型别名可以为任何类型引入名称。例如基本类型、联合类型
    // primitive
    type Name = string;
    // object
    type PartialPointX = {x: number;};
    type PartialPointY = {y: number;};
	// union
    type PartialPoint = PartialPointX | PartialPointY;
    // tuple
    type Data = [number, string];
    // dom
    let div = document.createElement("div");
    type B = typeof div;
 5. 扩展
    两者扩展方式不同，但并不互斥。
    接口(简称I)可以扩展类型别名(简称T)，同理，类型别名也可以扩展接口。
    接口的扩展就是继承，通过extends来实现。
    类型别名的扩展就是交叉类型，通过&来实现。
    5.1 I扩展I
    interface PointX{
        x: number;
    }
    interface Point extends PointX{
        y: number;
    }
    5.2 T扩展T
    type PointX = {
        x: number;
    };
    type Point = PointX & {
        y: number;
    };
    5.3 I扩展T
    type PointX = {
        x: number;
    };
    interface Point extends PointX{
        y: number;
    }
    5.4 T扩展I
    interface PointX{
        x: number;
    }
    type Point = PointX & {
        y: number;
    }
    
    
```



### ES6

![es6-tutorial](es6-tutorial.jpg)

Set对象的作用

```js
// 数组去重
let mySet = new Set([1,2,3,4,4]);
[...mySet]; //[1,2,3,4]

// 并集
let a = new Set([1,2,3]);
let b = new Set([4,3,2]);
let union = new Set([...a, ...b]); // {1,2,3,4}

// 交集
let a = new Set([1,2,3]);
let b = new Set([4,3,2]);
let intersect = new Set([...a].filter(x => b.has(x))); // {2, 3}

// 差集
let a = new Set([1,2,3]);
let b = new Set([4,3,2]);
let intersectAFilterB = new Set([...a].filter(x => !b.has(x))); // {1}
let intersectBFilterA = new Set([...b].filter(x => !a.has(x))); // {4}
let difference = new Set([...intersectAFilterB, ...intersectBFilterA]); // {1, 4}


// 数据偏平化
function flatter(arr){
    return arr.reduce((prev, curr)=>{
        return Array.isArray(curr) ? [...pre, ...flatter(curr)] : [...pre, curr];
    }, []);
}
```

### Prop

```js
$refs!: {
    chartPart: HTMLDivElement;
};

// 父组件传的是字符串类型，无默认值
@Prop(String)
private type!: string; // 图表类型 [ztfbt: 正态分布图, dzkzt:单值控制图, ztfbt: 回归分析图]

// 父组件传的是字符串类型【默认值为s0】
@Prop({
	type: String,
    default: "s0",
})
private dz?: string; // dz:单值控制图线条颜色类别，可选s0,s1

// 父组件传的是布尔类型【默认值为false】
@Prop({
    type: Boolean,
    default: false,
})
private detail?: Boolean;

// 父组件传的是对象类型【默认值为空对象】
@Prop({
type: Object,
    default: () => new Object(),
})
private data!: Object;

// 父组件传的是数组类型【默认值为空数组】
@Prop({
    type: Array,
    default: () => {
        return new Array();
    },
})
private chartData!: [];
```



### Echarts

```js
const container: HTMLDivElement = this.$refs.chartPart;
const chartPart: any = echarts.init(container);
echarts.registerTransform((ecStat as any).transform.regression);

option = {
    color: "#ffa248",
    dataset: [
        {
            source: coordinate,
        },
        {
            transform: {
                type: "ecStat:regression",
            },
        },
    ],
    ...
```



### CSS

通过 SVG 和 CSS，我们可以让一个对象或者元素沿着 SVG 路径做一些动效。

```html
<svg width="300px" height="175px" version="1.1"> 
    <path fill="transparent" stroke="#888888" stroke-width="1" d="M10 80 Q 77.5 10, 145 80 T 280 80" class="path"></path> 
</svg> 
<div class="ball"></div> 
```

```css
svg { 
    width: 300px; 
    display: block; 
    position: absolute; 
} 
.ball { 
    width: 10px; 
    height: 10px; 
    background-color: red; 
    border-radius: 50%; 
    offset-path: path('M10 80 Q 77.5 10, 145 80 T 280 80'); 
    offset-distance: 0%; animation: red-ball 2s linear alternate infinite; 
} 
@keyframes red-ball { 
    from { offset-distance: 0%; } 
    to { offset-distance: 100%; } 
}
```

#### clip-path

clip-path CSS 属性可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。剪切区域是被引用内嵌的URL定义的路径或者外部svg的路径，或者作为一个形状例如circle().。clip-path属性代替了现在已经弃用的剪切 clip属性。

```css
.diamond{
	width: 200px;
	height: 200px;
	background-image: linear-gradient(#e66465, #9198e5);
	clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
}
<div class="diamond"></div>
```

scss 循环

```scss
@for $i from 2 through 5 {
  .column-layout-#{$i} {
    grid-template-columns: repeat(#{$i}, 1fr);
  }
}
==>
.column-layout-2{
    grid-template-columns: repeat(2, 1fr);
}
.column-layout-3{
    grid-template-columns: repeat(3, 1fr);
}
.column-layout-4{
    grid-template-columns: repeat(4, 1fr);
}
.column-layout-5{
    grid-template-columns: repeat(5, 1fr);
}
```



### Element.classList

```js
const div = document.createElement('div');
div.className = 'foo';

// our starting state: <div class="foo"></div>
console.log(div.outerHTML);

// use the classList API to remove and add classes
div.classList.remove("foo");
div.classList.add("anotherclass");

// <div class="anotherclass"></div>
console.log(div.outerHTML);

// if visible is set remove it, otherwise add it
div.classList.toggle("visible");

// add/remove visible, depending on test conditional, i less than 10
div.classList.toggle("visible", i < 10 );

console.log(div.classList.contains("foo"));

// add or remove multiple classes
div.classList.add("foo", "bar", "baz");
div.classList.remove("foo", "bar", "baz");

// add or remove multiple classes using spread syntax
const cls = ["foo", "bar"];
div.classList.add(...cls);
div.classList.remove(...cls);

// replace class "foo" with class "bar"
div.classList.replace("foo", "bar");
```



### SVG

path标签

- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Belzier curve
- T = smooth quadratic Belzier curveto
- A = elliptical Arc
- Z = closepath



### VSCode

通过#region注释自定义代码折叠范围



### Git

1. install
    https://git-scm.com/book/
2. minimize config

```po
git config --global user.name "your name"
git config --global user.email "your email"
```

#### 创建代码仓库

```bash
touch README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin <repository>
git push -u origin master
```

#### 从master分支copy一个本地分支作为开发分支

```bash
// 步骤：
// 1.切换到被copy的分支（master），并且从远端拉取最新版本
git checkout master
git pull
// 2.从当前分支拉copy开发分支
git checkout -b dev
// Switched to a new branch 'dev'
// 3.把新建的分支push到远端
git push origin dev
// 4.关联
git branch --set-upstream-to=origin/dev
// 5.再次拉取验证
git pull
```

#### 合并分支代码, git命令

```bash
// 从master分支copy一个本地分支作为开发分支
// 进入要合并的分支（如开发分支合并到master，则进入master目录）
git checkout master
// 拉取最新代码
git pull
// 查看所有分支是否都pull下来
git branch -a
// 使用merge合并开发分支
git merge 分支名
// 查看合并后的状态
git status
// 本地仓库代码提交远程仓库
git push
```



### 刷新浏览器的DNS

```bas
// 在Chrome地址栏输入以下地址后回车，点击 Clear host cache 即可
chrome://net-internals/#dns
```



### NPM

```bash
// 工程构建（开发时、“打包”时）依赖
npm install <packname> --save-dev 简写（npm i packname -D） 自动把模块和版本号添加到devdependencies。
// 项目（运行时、发布到生产环境时）依赖
npm install <packname> --save 简写（npm i packname -S） 自动把模块和版本号添加到dependencies。

至于我们啥时候用--save-dev、啥时候用--save 感觉是个规范问题，用反了项目一样可以跑起来（对于安装依赖正确时），但会给其他看你项目的人带来误解、可能会导致一些bug的出现，还有一些配置的错乱等

// 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

```



### Vue3新特性 - style v-bind

```html
<template>
  <div class="box">hello linge</div>
</template>

<script setup>
import { ref } from 'vue'
const color = ref('red')
</script>
<style>
.box {
  width: 100px;
  height: 100px;
  color: v-bind(color);
}
</style>
```



### Javascript

```js
//打开全屏方法
function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
    }
}

//退出全屏方法
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExiFullscreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();

    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
//div全屏(全屏方法1)
document.getElementById("div").addEventListener('click', function() {
    openFullscreen(this); //调用上面全屏方法1
}, false);

//img全屏
document.getElementById("img").addEventListener('click', function() {
    alert('请下载相应的html, css, js代码在本地运行看效果！');
    //全屏方法2
    var RFSN = document.documentElement.requestFullScreen || document.documentElement.webkitRequestFullScreen || document.documentElement.mozRequestFullScreen || document.documentElement.msRequestFullScreen;
    if (RFSN) {
        RFSN.call(this);
    } else if (typeof window.ActiveXObject != "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}, false);
```



### Nginx

相关概念：正向代理 - 代理客户端（比如在自己电脑上安装的VPN软件）；反向代理 - 代理服务器（比如Nginx）。

```bash
// 常用命令
cd /usr/local/nginx/sbin/
./nginx 启动
./nginx -s stop 停止
./nginx -s quit 安全退出
./nginx -s reload 重新加载配置文件， 改了配置文件需要执行这个命令，用的比较多
ps aux|grep nginx 查看nginx进程
```



### MISC

1. 在文件夹的地址栏输入cmd，就可以打开一个本文件下的cmd命令窗口；

