# 待学习列表

- vue3
- [vite](https://vitejs.cn/)
- [element-plus](https://element-plus.org/)
- volar
- [ts](https://tslang.cn)
- [pinia](https://pinia.web3doc.top/)
- [nprogress](https://www.npmjs.com/package/nprogress)
- [vue指令](./mds/part-1.md)
- [ES](./mds/ES.md)
- [Layout](./mds/layout.md)
- [JStips](./mds/jstips.md)
- [grid-table](./mds/grid-table.md)

# css3 多行省略(数字8，是8行后省略）
```css
.multi-lines{
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
-webkit-line-clamp: 8;
max-height: 170px;
}
```
# css3 nth-chind
![image](https://github.com/user-attachments/assets/9b781642-feb3-4287-bd5f-25e67bae4f34)


# css3 grid grid-template-columns
```css
.employee-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
```

# vue3 v-model
父组件
```html
<template>
  <div class="!bg-white flex flex-col items-center justify-center">
    <p>尊敬的用户，您尚未购买此定制化功能，如需使用，请先进行购买</p>
    <p class="text-blue-600">欢迎致电: 13305146308</p>
    <MM v-model="isShow" name="lisa" class="tty" />
  </div>
</template>

<script setup>
import MM from './mm.vue';

const isShow = ref(true)
</script>

<style scoped lang="scss">
.tty {
  background: red;
}
</style>
```
子组件
```html
<template>
  <div>
    {{ modelValue }} and name is {{ name }}
    <button @click="close">close</button>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue', 'name'])
const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
```
![image](https://github.com/user-attachments/assets/731dce21-40cc-4bb4-beb8-f6503734c6cc)
useVModel.js
```js
import { computed } from 'vue'

const cacheMap = new WeakMap()

export function useVModel(props, propName, emit) {
  return computed({
    get() {
      if (cacheMap.has(props[propName])) {
        return cacheMap.get(props[propName])
      }
      const proxy = new Proxy(props[propName], {
        get(target, key) {
          return Reflect.get(target, key)
        },
        set(target, key, value) {
          target[key] = value
          emit(`update:${propName}`, {
            ...target,
            [key]: value
          })
          return true
        }
      })
      cacheMap.set(props[propName], proxy)
      return proxy
    },
    set(value) {
      emit(`update:${propName}`, value)
    }
  })
}
```
// use
<el-input v-model="model.keyword" />
```js
import { useVModel } from './useVModel'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits(['update:modelValue'])
const model = useVModel(props, 'modelValue', emits)
```

# vue2 Vs vue3响应式的区别
- Vue2响应式：基于Object.defineProperty()实现的。
- Vue3响应式：基于Proxy实现的。

# 多个ElMessageBox弹框，一次关闭
直接调用ElMessageBox.close()；会关闭当前打开的所有消息弹出框

# 跨域
![image](https://github.com/user-attachments/assets/ec224c6e-639b-40d8-a37f-c9154df41d1b)


# 并发请求
```js
function concurRequest(urls, maxNum) {
	return new Promise(resolve => {
		if(urls.length == 0) {
			resolve([])
			return
		}

		const results = []
		let index = 0 //下一个请求的下标
		let count = 0 //当前请求完成的数量

		// 发送请求
		async function request() {
			const i = index
			const url = urls[index]
			index++
			try{
				const resp = await fetch(url)
				results[i] = resp
			} catch(err) {
				results[i] = err
			} finally {
				count++
				if(count === urls.length){
					console.log('over')
					resolve(results)
				}
				request()
			}
		}

		const times = Math.min(urls.length, maxNum)
		for(let i = 0; i < times; i++) {
			request()
		}
	})
}

concurRequest([url,url,url,...], 3).then(resps => {
	console.log(resps)
})
```

# 较大数据请求，使用分片的方式
```js
async function loadNovel() {
	const url = 'https://www.......'
	const resp = await fetch(url)
	const reader = resp.body.getReader()
	const decoder = new TextDecoder()
	for(;;){
		const {value, done} = await reader.read()
		if(done){
  			break
		}
		const d = decoder.decode(value)
		console.log(d)
	}
}
```


# 防抖与节流实现
```js
// 防抖
function debounce = (callback, interval = 300) => {
	let timer = null
	return function() {
		clearTimeout(timer)
		timer = setTimeout(() => {
			callback.apply(this)
		}, interval)
	}
}

// 使用
_input.addEventListener('input', debounce(() => {
	ajax(this.value)
}, 500))


// 节流
function throttle = (callback, interval = 300) => {
	let flag = false
	return function () {
		if(flag) return
		flag = true
		setTimeout(() => {
			callback.apply(this)
			flag = false
		}, interval)
	}
}

// 使用
window.addEventListener('scroll', throttle(() => {
	// 判断滚动距离
}, 500))
```

# 单位转换
```js
function formatSizeUnits(kb) {
    let units = ['KB', 'MB', 'GB', 'TB', 'PB'];
    let unitIndex = 0;

    while (kb >= 1024 && unitIndex < units.length - 1) {
        kb /= 1024;
        unitIndex++;
    }

    return `${kb.toFixed(2)} ${units[unitIndex]}`;
}
```

# ES6空值判断
```js

//旧写法
if(value != null && value != 'undefined' && value != '' && typeof(value) != 'undefined') {
  // todo:...
}

//新写法
if((value ?? '') != '') {
  // todo:...
}

```


::v-deep usage as a combinator has been deprecated. Use :deep(<inner-selector>) instead.

# nprogress 的使用

1.安装

```bash
npm install --save nprogress
```

2.导入 NProgress 包对应的 js 和 css

```js
import nProgress from "nprogress";
import "nprogress/nprogress.css";
```

3.在 request 拦截器中，展示进度条 NProgress.start()

```js
axios.interceptors.request.use((config) => {
  nProgress.start();
  // ...
  return config;
});
```

4.在 response 拦截器中，隐藏进度条 NProgress.done()

```js
axios.interceptors.response.use((config) => {
  nProgress.doen();
  // ...
  return config;
});
```

或者也可以在路由守卫中设置

router.js

```
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
	nProgress.start();
	// ...
	next()
})

router.afterEach(() => {
	nProgress.done();
})
```

# NPM

## 设置 npm registry 的方法

持久使用

```bash
npm config set registry https://registry.npmmirror.com
```

配置后可通过下面方式来验证是否成功

```bash
npm config get registry
```

npm 自身就默认的镜像：http://registry.npmjs.org

```bash
npm config set registry http://registry.npmjs.org
```

如果用 npm 命令使用淘宝镜像，再次修改为 npm 的淘宝链接：

```bash
npm config set registry http://registry.npm.taobao.org
```

# GIT

## 本地创建分支并推送到远程

- 创建本地分析并切换到该分支

```bash
git checkout -b feature
// 相当于
git branch feature
git checkout feature
```

即 git checkout -b 相当于把两条命令 git branch branchName、git checkout branchName 合成一条命令

- 将 feature 分支推送到远程

-u 参数与 --set-upstream 是一个意思，所以用-u 就好了，好记还好打。

```bash
git push -u origin feature
```



## 从某个分支创建新分支的方法

第一步，切换到你指定的分支
如我要从dev上拉一个分支，代码一模一样

```bash
git checkout dev
```

第二步，拉取dev的最新代码

```bash
git pull
```

第三步，在本地创建一个test分支，并切换到该分支

```bash
git checkout -b newBranchName
```

第四步，把分支推到远程仓库。此时执行 <code>**git branch -av**</code> 可以看到该分支在远程仓库也有了

```bash
git push origin newBranchName
```

第五步，将本地分支与远程分支关联

```bash
git branch --set-upstream-to=origin/newBranchName newBranchName
```

通过以上几个步骤，新分支就创建好了，可以使用新分支开发新功能了。

```bash
git push -u origin newBranchName
==
git push origin newBranchName
git branch --set-upstream-to=origin/newBranchName newBranchName
//todo: 我猜测的，还没验证
```





# Js 之 Fetch

- Fetch API 提供了一个获取资源的接口（包括跨域请求），用于取代传统的 XMLHttpRequest 的，在 JavaScript 脚本里面发出 HTTP 请求。
- fetch api 是基于 promise 的设计，返回的是 Promise 对象，它是为了取代传统 xhr 的不合理的写法而生的。
- 接受第二个可选参数，一个可以控制不同配置的 `init` 对象。如下使用 [`fetch()`](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FGlobalFetch%2Ffetch) POST JSON 数据

```js
fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
  });

// 等价于以下写法
async function getJSON() {
  let url =
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("Request Faild", error);
  }
}
getJSON().then(function (myJson) {
  console.log(myJson);
});
```

```js
// 读取内容的方法
// Response对象根据服务器返回的不同类型的数据，提供了不同的读取方法。
response.text()：得到文本字符串。
response.json()：得到 JSON 对象。(上例中所使用的)
response.blob()：得到二进制 Blob 对象。
response.formData()：得到 FormData 表单对象。
response.arrayBuffer()：得到二进制 ArrayBuffer 对象（主要用于获取流媒体文件）。
```

```js
// 第二个可选参数举例
let url = "https://example.com/profile";
let data = { username: "example" };
fetch(url, {
  method: "POST", // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers: new Headers({
    "Content-Type": "application/json",
  }),
})
  .then((res) => res.json())
  .catch((error) => console.error("Error:", error))
  .then((response) => console.log("Success:", response));
```

# Js 之 File

```js
playOne(row) {
    let self = this;
    let name = row.url.slice(row.url.lastIndexOf("/") + 1);
    if (row.url) {
        fetch(row.url)
            .then((res) => res.blob())
            .then((blob) => {
            // 此处new一个File
            self.originFileTemp = new File([blob], name, { type: "video/mp4" });
        });
    }
    this.videoUrl = row.url;
}
```

# 箭头函数中 this 的指向问题

箭头函数没有自己的 this，它的 this 是继承而来；默认指向在定义它时所处的对象，而不是执行时的对象，定义它的时候，可能环境是 window；箭头函数可以让我们在 setInterval，setTimeout 中方便地使用 this。

```js
const obj = {
  aaa() {
    setTimeout(function () {
      console.log(this); //打印出window对象
    }, 1000);

    setTimeout(() => {
      console.log(this); //打印出obj对象
    }, 1000);
  },
};
```

# Date 对象

```js
Date.now() === new Date().valueOf();
// 返回时间戳1658136358926
```

# WebSocket

WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。

WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

现在，很多网站为了实现推送技术，所用的技术都是 Ajax 轮询。轮询是在特定的的时间间隔（如每 1 秒），由浏览器对服务器发出 HTTP 请求，然后由服务器返回最新的数据给客户端的浏览器。这种传统的模式带来很明显的缺点，即浏览器需要不断的向服务器发出请求，然而 HTTP 请求可能包含较长的头部，其中真正有效的数据可能只是很小的一部分，显然这样会浪费很多的带宽等资源。

HTML5 定义的 WebSocket 协议，能更好的节省服务器资源和带宽，并且能够更实时地进行通讯。

我们将从以下四个方面来介绍 WebSocket API:

1. WebSocket 构造函数；
2. WebSocket 属性；
3. WebSocket 方法；
4. WebSocket 事件；

## WebSocket 构造函数

```js
const myWebSocket = new WebSocket(url, [, protocals]);
```

## WebSocket 属性

- url: 只读属性，返回值为当构造函数创建 WebSocket 实例对象时 URL 的绝对路径
- readyState: 只读属性，用来表示连接状态 （0：未连接；1：连接已建立；2：连接正在关闭；3：连接已关闭或打不开连接）
- bufferedAmount: 只读属性，未发送至服务器的字节数
- binaryType: 使用二进制的数据类型连接
- extensions: 只读属性，服务器选择的扩展
- protocol: 只读属性，用于返回服务器端选中的子协议的名字
- onopen: 用于指定连接成功后的回调函数
- onmessage: 用于指定当从服务器接受到信息时的回调函数
- onclose: 用于指定连接关闭后的回调函数
- onerror: 用于指定连接失败后的回调函数

## WebSocket 方法

- send(): 向服务器发送数据
- close(): 关闭连接

## WebSocket 事件

- onopen: 连接建立时触发
- onmessage: 客户端接受服务端数据时触发
- onerror: 通信错误时触发
- onclose: 连接关闭时触发

![img](https://pics7.baidu.com/feed/738b4710b912c8fcf74a9e8ff5f4bd4fd7882133.jpeg?token=4a81e7dbcb4cc830a4b7adeb54cb8012)

# JavaScript function 的 length 属性

函数的 length 得到的是形参个数（）

例如

```js
function test(a, b, c) {}
test.length; // 3

function test(a, b, c, d) {}
test.length; // 4

// 带默认值的形参不包括在内
function test(a, b, c, d = 1, e = 2) {}
test
  .length(
    // 3

    // 如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了
    function (...args) {}
  )
  .length(
    // 0
    function (a = 0, b, c) {}
  )
  .length(
    // 0
    function (a, b = 1, c) {}
  ).length; // 1
```

# Javascript snipet

```js
/**
 * 取消查询
 */
function closeSearch() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.abort();
}

/**
 * 停止页面加载
 */
function myStop() {
  if (!!(window.attachEvent && !window.opera)) {
    document.execCommand("stop");
  } else {
    window.stop();
  }
}

/**
 * 指定长度的随机字符串
 * @param length 指定的长度
 * @returns {string}
 */
function randomString(length) {
  var str = "";
  for (; str.length < length; str += Math.random().toString(36).substr(2));
  return str.substr(0, length);
}

/**
 * 对象数组按照对象的keyword分类
 */
const groupBy = (array) => array.reduce((preEle, curEle) => {
    if (!preEle[curEle.keyword]) preEle[curEle.keyword] = [];
    preEle[curEle.keyword].push(curEle);
    return preEle;
}, {});
```



# TS 多态的 this 类型

```ts
class BasicCalculator {
  public constructor(protected value: number = 0) {}

  public currentValue(): number {
    return this.value;
  }

  public add(operand: number): this {
    this.value += operand;
    return this;
  }

  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
}

let v = new BasicCalculator(2).multiply(3).add(2).currentValue();
console.log("v: ", v);

class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }

  public sin(): this {
    this.value = Math.sin(this.value);
    return this;
  }
}

let sc = new ScientificCalculator(45).multiply(5).sin().add(1).currentValue();
console.log("sc: ", sc);
```

# 如何设置跨域隔离启用 SharedArrayBuffer

最近在研究 ffmpeg WebAssembly 版本在网页运行的工具，发现使用到了 SharedArrayBuffer，涉及到跨域隔离的问题，需要设置两个 HTTP 消息头启用跨域隔离：

- Cross-Origin-Opener-Policy 设置为 same-origin（保护源站免受攻击）
- Cross-Origin-Embedder-Policy 设置为 require-corp（保护源站免受侵害）

不同的服务有不同的设置方法，这里简要介绍下。

## 解决

### 方案一

对于**前端开发**来说，本地开发阶段，可以起一个 Node.js 服务，用于本地开发实时调试，比如我用 Express.js (Node.js 后端框架)

```js
// Add headers
app.use(function (req, res, next) {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  // Pass to next layer of middleware
  next();
});
```

vue 开发，配置 vue.config.js

```
devServer: {
    open: false,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    // http 代理配置
    proxy: {
      "/api": {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    before: (app) => { },
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
}
```

### 方案二

部署到服务器上之后，一般会用 [nginx](https://so.csdn.net/so/search?q=nginx&spm=1001.2101.3001.7020) 做代理服务器，这时候可以给 nginx 配置加两个响应头

nginx 配置

```
location / {
	# 设置响应头
	add_header 'Cross-Origin-Embedder-Policy' 'require-corp';
    add_header 'Cross-Origin-Opener-Policy' 'same-origin';
}
```

# Nginx

Nginx 是 lgor Sysoev 为俄罗斯访问量第二的 rambler.ru 站点设计开发的。从 2004 年发布至今，凭借开源的力量，已经接近成熟与完善。

Nginx 功能丰富，可作为 HTTP 服务器，也可作为反向代理服务器，邮件服务器。支持 FastCGI、SSL、Virtual Host、URL Rewrite、Gzip 等功能。并且支持很多第三方的模块扩展。

Nginx 的稳定性、功能集、示例配置文件和低系统资源的消耗让他后来居上

## nginx for Windows

启动 nginx 的两种方式

- 直接双击 nginx.exe, 双击后一个黑色的弹窗一闪而过
- 打开 cmd，切换到 nginx 解压目录下，输入命令 nginx.exe 或者 start nginx

检查 80 端口是否被占用的命令是： netstat -ano | findstr 0.0.0.0:80 或 netstat -ano | findstr "80"

```
// 查看nginx进程
tasklist /fi "imagename eq nginx.exe" // 注意，使用双引号

Image Name           PID Session Name     Session#    Mem Usage
=============== ======== ============== ========== ============
nginx.exe            652 Console                 0      2 780 K
nginx.exe           1332 Console                 0      3 112 K

```

| command         | ps                                                                                                                         |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------- |
| start nginx     | run nginx                                                                                                                  |
| nginx -s stop   | fast shutdown                                                                                                              |
| nginx -s quit   | graceful shutdown                                                                                                          |
| nginx -s reload | changing configuration, starting new worker processes with a new configuration, gracefull shutdown of old worker processes |
| nginx -s reopen | re-opening log files                                                                                                       |

关闭 nginx 的两种方式

- 输入 nginx 命令 nginx -s stop(快速停止 nginx) 或 nginx -s quit(完整有序的停止 nginx)
- 使用 taskkill /f /t /im nginx.exe

# http 服务器: a simple static HTTP server

```bash
// 安装服务器
npm i http-server -g

// 在任意目录的终端启动服务
http-server [path] [options]

Available Options: 看下表

```

| Command                  | Description                                                                                                                                                                                                                                      | Defaults   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `-p` or `--port`         | Port to use. Use `-p 0` to look for an open port, starting at 8080. It will also read from `process.env.PORT`.                                                                                                                                   | 8080       |
| `-a`                     | Address to use                                                                                                                                                                                                                                   | 0.0.0.0    |
| `-d`                     | Show directory listings                                                                                                                                                                                                                          | `true`     |
| `-i`                     | Display autoIndex                                                                                                                                                                                                                                | `true`     |
| `-g` or `--gzip`         | When enabled it will serve `./public/some-file.js.gz` in place of `./public/some-file.js` when a gzipped version of the file exists and the request accepts gzip encoding. If brotli is also enabled, it will try to serve brotli first.         | `false`    |
| `-b` or `--brotli`       | When enabled it will serve `./public/some-file.js.br` in place of `./public/some-file.js` when a brotli compressed version of the file exists and the request accepts `br` encoding. If gzip is also enabled, it will try to serve brotli first. | `false`    |
| `-e` or `--ext`          | Default file extension if none supplied                                                                                                                                                                                                          | `html`     |
| `-s` or `--silent`       | Suppress log messages from output                                                                                                                                                                                                                |            |
| `--cors`                 | Enable CORS via the `Access-Control-Allow-Origin` header                                                                                                                                                                                         |            |
| `-o [path]`              | Open browser window after starting the server. Optionally provide a URL path to open. e.g.: -o /other/dir/                                                                                                                                       |            |
| `-c`                     | Set cache time (in seconds) for cache-control max-age header, e.g. `-c10` for 10 seconds. To disable caching, use `-c-1`.                                                                                                                        | `3600`     |
| `-U` or `--utc`          | Use UTC time format in log messages.                                                                                                                                                                                                             |            |
| `--log-ip`               | Enable logging of the client's IP address                                                                                                                                                                                                        | `false`    |
| `-P` or `--proxy`        | Proxies all requests which can't be resolved locally to the given url. e.g.: -P [http://someurl.com](http://someurl.com/)                                                                                                                        |            |
| `--proxy-options`        | Pass proxy [options](https://github.com/http-party/node-http-proxy#options) using nested dotted objects. e.g.: --proxy-options.secure false                                                                                                      |            |
| `--username`             | Username for basic authentication                                                                                                                                                                                                                |            |
| `--password`             | Password for basic authentication                                                                                                                                                                                                                |            |
| `-S`, `--tls` or `--ssl` | Enable secure request serving with TLS/SSL (HTTPS)                                                                                                                                                                                               | `false`    |
| `-C` or `--cert`         | Path to ssl cert file                                                                                                                                                                                                                            | `cert.pem` |
| `-K` or `--key`          | Path to ssl key file                                                                                                                                                                                                                             | `key.pem`  |
| `-r` or `--robots`       | Automatically provide a /robots.txt (The content of which defaults to `User-agent: *\nDisallow: /`)                                                                                                                                              | `false`    |
| `--no-dotfiles`          | Do not show dotfiles                                                                                                                                                                                                                             |            |
| `--mimetypes`            | Path to a .types file for custom mimetype definition                                                                                                                                                                                             |            |
| `-h` or `--help`         | Print this list and exit.                                                                                                                                                                                                                        |            |
| `-v` or `--version`      | Print the version and exit.                                                                                                                                                                                                                      |            |

# NVM Windows

[nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 管理不同版本的 node 与 npm 的工具

## 安装多版本 node/npm

例如，我们要安装 12.22.2 版本，可以用如下命令：

```
nvm install 12.22.2
```

nvm 遵守语义化版本命名规则。例如，你想安装最新的 **12.22**系列的最新的一个版本，可以运行

```
nvm install 12.22
```

## 列出已安装实例

```
nvm ls / nvm list
```

## 在不同版本间切换

nvm use 加版本号，例如想使用 node 16.17.0

```
nvm use 16.17.0
```

# java 后台启动 jar 包的一些命令

## 启动方式一

在 jar 包所在文件夹打开命令窗口，输入以下命令

**java -jar app.jar**
特点：当前 ssh 窗口被锁定，可按 CTRL + C 打断程序运行，或直接关闭窗口，程序退出

## 启动方式二

**java -jar app.jar &**
&代表在后台运行。
特定：当前 ssh 窗口不被锁定，但是当窗口关闭时，程序中止运行。

## 启动方式三： nohup 命令

linux 系统启动命令:
**nohup java -jar xxx.jar &**

nohup 意思是不挂断运行命令,当账户退出或终端关闭时,程序仍然运行

## 启动方式四

windows 下通过脚本启动 jar 包

启动 jar

创建一个以 bat 后缀结束的文件，写入一下代码

```vbscript
@echo off
start javaw -jar xxx.jar
exit
```

启动脚本

# JS 的 get 方法和 set 方法

- **get 关键字将对象属性与函数进行绑定，当属性被访问时，对应函数被执行。**
- **set 关键字将对象属性与函数进行绑定，当属性被赋值时，对应函数被执行。**

```js
let user = {
  info: {
    name: "zhangsan",
  },
  get name() {
    return this.info.name;
  },
  set name(val) {
    console.log("I change name");
    this.info.name = val;
  },
};

user.name; // return 'zhangsan'
user.name = "lisi"; // call set name(val)
```

再来一例

```js
const Config = {
  get basePath() {
    let path = win.location.origin;
    let pathname = win.location.pathname;
    let demoIdx = pathname.lastIndexOf("/demo/");
    return path + pathname.substr(0, demoIdx);
  },
  get buildPath() {
    return this.basePath + "/dist/";
  },
  get libPath() {
    return this.buildPath + "lib/";
  },
  get src() {
    return this.basePath + "/data/video3/playlist.m3u8";
  },
};
let el = doc.querySelector(".play-container");
let player = new GoldPlay(el, {
  sourceURL: Config.src,
  type: "HLS",
  libPath: Config.libPath,
  playBackRate: 1,
});
```

# splitpanes

[splitpanes](https://antoniandre.github.io/splitpanes/)

https://github.com/antoniandre/splitpanes

A Vue.js reliable, simple and touch-ready panes splitter / resizer.

## Features

- Light weight & no dependencies other than Vue JS
- Only worry about your panes, the splitters are automatic
- Nesting supported
- Fully responsive
- Support for touch devices
- Push other panes or not
- Double click a splitter to maximize pane
- Programmatically set pane width or height
- Programmatically add and remove panes
- **Supports Vue 2 & Vue 3**

>  [Vue 3 is the new default](https://blog.vuejs.org/posts/vue-3-as-the-new-default.html)**, and so is Splitpanes 3, for Vue 3.** 🙌
> **For Vue 2 projects, you should use** `npm i splitpanes@legacy`**.**



### accumulate over a long period

鼠标滚轮横行滑动
```vue
<div v-if="item?.skillTagVOS?.length" class="mouse-wheel">
<div ref="scrollLeftRef" class="mt-2 overflow-x-hidden">
  <div class="flex gap-4">
    <el-tag v-for="skill in item.skillTagVOS" :key="skill.id" type="info" effect="light" round>
      {{ skill.tagName }}
    </el-tag>
  </div>
</div>
</div>

const scrollLeftRef = ref()
const scrollInit = () => {
  scrollLeftRef.value.addEventListener('mousewheel', (event) => {
    // 获取滚动方向
    const detail = event.wheelDelta || event.detail;
    // 定义滚动方向，其实也可以在赋值的时候写
    const moveForwardStep = 1
    const moveBackStep = -1
    // 定义滚动距离
    let step = 0
    // 判断滚动方向,这里的20可以改，代表滚动幅度，也就是说滚动幅度是自定义的
    if (detail < 0) {
      step = moveForwardStep * 20;
    } else {
      step = moveBackStep * 20;
    }
    // 对需要滚动的元素进行滚动操作
    scrollLeftRef.value.scrollLeft += step
  }, false)
}

.mouse-wheel {
  position: relative;
  cursor: default;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    content: "";
    width: 50px;
    height: 24px;
    background: linear-gradient(to right, transparent, #fff);
  }
}

```



```
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
```

安装指定的pnpm版本
```
1. node16.13以上
2. corepack enable
3. corepack prepare pnpm@版本号 --activate
```

object-fit 属性指定元素的内容应该如何去适应指定容器的高度与宽度。

object-fit 一般用于 img 和 video 标签，一般可以对这些元素进行保留原始比例的剪切、缩放或者直接进行拉伸等。

您可以通过使用 object-position 属性来切换被替换元素的内容对象在元素框内的对齐方式。

object-position 属性一般与 object-fit一起使用，用来设置元素的位置。

object-position 一般用于 img 和 video 标签。
| value      | desc                                                         |
| ---------- | ------------------------------------------------------------ |
| fill       | 默认，不保证保持原有的比例，内容拉伸填充整个内容容器。       |
| contain    | 保持原有尺寸比例。内容被缩放。                               |
| cover      | 保持原有尺寸比例。但部分内容可能被剪切。                     |
| none       | 保留原有元素内容的长度和宽度，也就是说内容不会被重置。       |
| scale-down | 保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。 |
| initial    | 设置为默认值，[关于 *initial*](https://www.runoob.com/cssref/css-initial.html) |
| inherit    | 从该元素的父元素继承属性。 [关于 *inherit*](https://www.runoob.com/cssref/css-inherit.html) |


object-position: position|initial|inherit;

| value    | desc                                                         |
| -------- | ------------------------------------------------------------ |
| position | 指定 image 或 video 在容器中的位置。第一个值为 x 坐标位置的值，第二个值为 y 坐标位置的值。 |


取数组的最后一个元素
```
解构的方法
const { length, 0: first, [length - 1]: last } = ['a', 'b', 'c', 'd']
// length = 4
// first = 'a'
// last = 'd'

Array.prototype.at()
const last = ['a', 'b', 'c', 'd'].at(-1)
// 'd'

pop
const last = ['a', 'b', 'c', 'd'].pop()
// 'd'
...
```

安装ESLint之后代码运行出现报错‘xxx‘ is missing in props validation

解决办法：
在.eslintrc.js中的"rules"下面添加：防止在react组件定义中缺少props验证
```
rules: {
	'react/prop-types': 0,
	...
}
```

uniCopy
```
export default function uniCopy({content,success,error}) {
	if(!content) return error('复制的内容不能为空 !')
	content = typeof content === 'string' ? content : content.toString() // 复制内容，必须字符串，数字需要转换为字符串
	/**
	 * 小程序端 和 app端的复制逻辑
	 */
	//#ifndef H5
	uni.setClipboardData({
		data: content,
		success: function() {
			success("复制成功~")
			console.log('success');
		},
		fail:function(){
			success("复制失败~")
		}
	});
	//#endif
	
	/**
	 * H5端的复制逻辑
	 */
	// #ifdef H5
	if (!document.queryCommandSupported('copy')) { //为了兼容有些浏览器 queryCommandSupported 的判断
		// 不支持
		error('浏览器不支持')
	}
	let textarea = document.createElement("textarea")
	textarea.value = content
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 选择对象
	textarea.setSelectionRange(0, content.length) //核心
	let result = document.execCommand("copy") // 执行浏览器复制命令
	if(result){
		success("复制成功~")
	}else{
		error("复制失败，请检查h5中调用该方法的方式，是不是用户点击的方式调用的，如果不是请改为用户点击的方式触发该方法，因为h5中安全性，不能js直接调用！")
	}	
	textarea.remove()
	// #endif
}

```

手机号码校验
```
const rules = reactive({
  applicantName: [
    { required: true, message: '请输入您的姓名', trigger: 'blur' }
  ],
  applicantCompany: [
    { required: true, message: '请输入您的企业全称', trigger: 'blur' }
  ],
  applicantPhone: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}(,1[3|4|5|6|7|8|9][0-9]\d{8})*$/, message: '手机号码格式不正确' },
  ]
})
```

element plus (vue3) 中 el-input 与 el-time-picker的focus聚焦事件
```
const timepikerRef = ref(null)
timepikerRef.value.focus(true)
 或
import {getCurrentInstance,nextTick } from "vue"
const { proxy } = getCurrentInstance()
// proxy.$refs.timepikerRef?.focus(true)
proxy.$refsl`${row.name}Ref ].focus(true)
// $frow.name}='timepiker
```

货币格式化
```
row.salary.toLocaleString('zh-CN', {
	style: 'currency',
	currency: 'CNY'
}).slice(0, -3)
```

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
// 小明军训，教官发令：向左转！向右转！向后转！大家都照着做，唯有小明坐下来休息，教官火的一批，
// 大声斥问他为啥不听指挥？小明说，我准备等你想好到底往哪个方向转，我再转。
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

clip-path CSS 属性可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。
剪切区域是被引用内嵌的URL定义的路径或者外部svg的路径，或者作为一个形状例如circle().。
clip-path属性代替了现在已经弃用的剪切 clip属性。

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

#### 提交规范用语
|   用语   |                 描述                 |
| :------: | :----------------------------------: |
|   feat   |             新增 feature             |
|   fix    |               修复 bug               |
| refactor |  代码重构，没有加新功能或者修复 bug  |
|  chore   | 改变构建流程、或者增加依赖库、⼯具等 |
|   perf   |     优化相关，⽐如提升性能、体验     |
|  revert  |           回滚到上⼀个版本           |
|   test   |  测试⽤例，包括单元测试、集成测试等  |
|   docs   |            仅仅修改了⽂档            |


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

至于我们啥时候用--save-dev、啥时候用--save 感觉是个规范问题，用反了项目一样可以跑起来（对于安装依赖正确时），
但会给其他看你项目的人带来误解、可能会导致一些bug的出现，还有一些配置的错乱等

// 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

1.安装cnpm
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

2.设置/查看npm/cnpm源地址
$ npm/cnpm config set/get registry

3.查看npm所以信息
$ npm config list

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
    var RFSN = document.documentElement.requestFullScreen ||
	document.documentElement.webkitRequestFullScreen ||
	document.documentElement.mozRequestFullScreen ||
	document.documentElement.msRequestFullScreen;
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

