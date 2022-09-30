## ES Collections t

### ES2016(ES7)

#### 1、Array.prototype.includes()

includes() 方法用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回 false。语法：arr.includes(valueToFind，[fromIndex])fromIndex 可选 从fromIndex 索引处开始查找 valueToFind。如果为负值（即从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）默认为 0。const arr = ['es6', 'es7', 'es8']

```js
console.log(arr.includes('es7')) // true
console.log(arr.includes('es7', 1)) // true
console.log(arr.includes('es7', 2)) // false
console.log(arr.includes("es7", -1)); // fsle
console.log(arr.includes("es7", -2)); // true
```

includes()只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些是无法判断的。并且能识别NaN，indexOf是不能识别NaN的。

#### 2、幂运算符 

比如我们想求2的10次方。自己写函数实现：

```js
function pow(x, y) {
    let result = 1
    for (let i = 0; i < y; i++) {
        result *= x
    }
    return result
}
console.log(pow(2, 10)) // 1024
```

用Math.pow()实现：

```js
console.log(Math.pow(2, 10)); // 1024
```

用幂运算符实现：

```js
console.log(2 ** 10); // 1024*
```

幂运算符的两个*号之间不能出现空格，否则语法会报错。



### ES2017(ES8)

#### 1、Object.values()

Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

```js
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.values(obj)); // [ 'jimmy', 18, 188 ]
```

#### 2、Object.entries()

Object.entries() 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组。

```js
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.entries(obj)); // [ [ 'name', 'jimmy' ], [ 'age', 18 ], [ 'height', 188 ] ]
console.log(Object.entries([1, 2, 3])); // [ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]
```



#### 3、String.prototype.padStart

语法：str.padStart(targetLength，[padString])

- targetLength 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString 可选，填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "

```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

可以应用在日期格式化的时候，月份补0的情况，也可以应用在手机号、身份证号脱敏的情况。

#### 4、String.prototype.padEnd

语法、用法如上padStart，可应用在需补全的情况。

```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");       // "abcfoofoof"
'abc'.padEnd(6, "123456");      // "abc123"
'abc'.padEnd(1);      // "abc"
```



#### 5、async/awaitasync/await

就不多讲了，老生常谈的问题，一笔带过。

```js
function timeout() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(1)
            resolve()
        }, 1000)
    })
}

// 不加async和await是2、1   加了是1、2
async function foo() {
    await timeout() 
    console.log(2)
}
foo()
```

#### 6、Object Rest & Spread

在 ES9 新增 Object 的 Rest & Spread 方法，就是常看到的...操作

```js
const input = {
  a: 1,
  b: 2,
  c: 3,
}

const output = {
  ...input,
  c: 4
}

console.log(output) // {a: 1, b: 2, c: 4}
```

这块代码展示了 spread 语法，可以把 input 对象的数据都拓展到 output 对象，这个功能很实用。需要注意的是，如果存在相同的属性名，只有最后一个会生效。

LPRE">如果属性的值是一个对象的话，该对象的引用会被拷贝，而不是生成一个新的对象，即为浅拷贝。示例如下

```js
const obj = { x: { y: 10 } };
const copy1 = { ...obj };
const copy2 = { ...obj };
obj.x.y = "jimmy";
console.log(copy1, copy2); // x: {y: "jimmy"} x: {y: "jimmy"}
console.log(copy1.x === copy2.x); // → true我们再来看下Object rest的示例：const input = {
  a: 1,
  b: 2,
  c: 3
}

let { a, ...rest } = input

console.log(a, rest) // 1 {b: 2, c: 3}
```

当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据。注意，rest 属性必须始终出现在对象的末尾，否则将抛出错误。

#### 7、for await of

异步迭代器(for-await-of)：循环等待每个Promise对象变为resolved状态才进入下一步。类似Promise.all的操作

我们知道 for...of 是同步运行的，先看for...of的表现：

```js
function TimeOut(time){
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)]
    for (let item of arr) {  
     console.log(Date.now(),item.then(console.log))
    }
}

test()
```

打印结果为：

<img src="https://pic3.zhimg.com/50/v2-0552907b7a06a7c233d64dacc3622f02_720w.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="336" data-rawheight="170" class="content_image" width="336"/>



上述代码证实了 for of 方法不能遍历异步迭代器，得到的结果并不是我们所期待的，于是 for await of 就粉墨登场

ES9 中可以用 for...await...of 的语法来操作，看看 for...await...of 的表现：

```js
function TimeOut(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)]
    for await (let item of arr) {
        console.log(Date.now(), item)
    }
}
test()
// 1560092345730 2000
// 1560092345730 1000
// 1560092346336 3000
```

#### 8、Promise.prototype.finally()

Promise.prototype.finally() 方法返回一个Promise，在promise执行结束时，无论结果是fulfilled或者是rejected，在执行then()和catch()后，都会执行finally指定的回调函数。这为指定执行完promise后，无论结果是fulfilled还是rejected都需要执行的代码提供了一种方式，避免同样的语句需要在then()和catch()中各写一次的情况。算是一个兜底回调。

```js
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
        // reject('fail')
    }, 1000)
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
}).finally(() => {
    console.log('finally')
})
```

大多应用在loading的关闭。



### ES2019(ES10)

#### 1、Object.fromEntries() 

Object.fromEntries() 把键值对列表转换为一个对象，这个方法是和 Object.entries() 相对的。

```js
const obj = {
    name: 'jimmy',
    age: 18
}
const entries = Object.entries(obj)
console.log(entries)
// [Array(2), Array(2)]

// ES10
const fromEntries = Object.fromEntries(entries)
console.log(fromEntries)
```

同时，Map集合也可以作为入惨

```js
const map = new Map()
map.set('name', 'jimmy')
map.set('age', 18)
console.log(map) // {'name' => 'jimmy', 'age' => 18}

const obj = Object.fromEntries(map)
console.log(obj)
```



#### 2、Array.prototype.flat()

语法：let newArray = arr.flat([depth])

`depth` 可选，指定要提取嵌套数组的结构深度，默认值为 1

`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```js
const arr1 = [0, 1, 2, [3, 4]];
console.log(arr1.flat());  //  [0, 1, 2, 3, 4]
const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr2.flat(2));  //  [0, 1, 2, [3, 4]]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// `flat()` 方法会移除数组中的空项:
var arr5 = [1, 2, , 4, 5];
arr5.flat(); // [1, 2, 4, 5]
```



#### 3、String.prototype.trimStart()和String.prototype.trimEnd()

trimStart() 方法从字符串的开头删除空格，trimLeft()是此方法的别名。

trimEnd() 方法从一个字符串的右端移除空白字符，trimRight 是 trimEnd 的别名。

这里就不做代码示例了，功能简单清晰。

#### 4、Symbol.prototype.description

我们知道，Symbol 的描述只被存储在内部的 Description ，没有直接对外暴露，我们只有调用 Symbol 的 toString() 时才可以读取这个属性：

```js
const name = Symbol('es')
console.log(name.toString()) // Symbol(es)
console.log(name) // Symbol(es)
console.log(name === 'Symbol(es)') // false
console.log(name.toString() === 'Symbol(es)') // true
```

现在可以通过 description 方法获取 Symbol 的描述:

```js
const name = Symbol('es')
console.log(name.description) // es
name.description = "es2" // 只读属性 并不能修改描述符
console.log(name.description === 'es') // true
// 如果没有描述符 输入undefined
const s2 = Symbol()
console.log(s2.description) // undefined
```

#### 5、JSON.stringify() 增强能力

JSON.stringify 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题。因为 JSON 都是被编码成 UTF-8，所以遇到 0xD800–0xDFFF 之内的字符会因为无法编码成 UTF-8 进而导致显示错误。在 ES10 它会用转义字符的方式来处理这部分字符而非编码的方式，这样就会正常显示了。

```js
// \uD83D\uDE0E  emoji 多字节的一个字符
console.log(JSON.stringify('\uD83D\uDE0E')) // 打印出笑脸

// 如果我们只去其中的一部分  \uD83D 这其实是个无效的字符串
// 之前的版本 ，这些字符将替换为特殊字符，而现在将未配对的代理代码点表示为JSON转义序列
console.log(JSON.stringify('\uD83D')) // "\ud83d"
```

#### 6、修订 Function.prototype.toString()

以前函数的toString方法来自Object.prototype.toString(),现在的 Function.prototype.toString() 方法返回一个表示当前函数源代码的字符串。以前只会返回这个函数，不包含注释、空格等。

```js
function foo() {
    // es10新特性
    console.log('imooc')
}
console.log(foo.toString()) 
// 打印如下
// function foo() {
//  // es10新特性
//  console.log("imooc");
// }
```



### ES2020(ES11)

#### 1、空值合并运算符（Nullish coalescing Operator）

**空值合并操作符**（??）是一个逻辑操作符，当左侧的操作数为 null或者undefined时，返回其右侧操作数，否则返回左侧操作数。

```js
const foo = undefined ?? "foo"
const bar = null ?? "bar"
console.log(foo) // foo
console.log(bar) // bar
```

与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如'',0,NaN,false）时。见下面的例子。

```js
const foo = "" ?? 'default string';
const foo2 = "" || 'default string';
console.log(foo); // ""
console.log(foo2); // "default string"

const baz = 0 ?? 42;
const baz2 = 0 || 42;
console.log(baz); // 0
console.log(baz2); // 42
```

注意，将 ?? 直接与 AND（&&）和 OR（||）操作符组合使用是不可取的。

```js
null || undefined ?? "foo"; // 抛出 SyntaxError
true || undefined ?? "foo"; // 抛出 SyntaxError
```



#### 2、可选链 Optional chaining

**可选链**操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为 null 或者 undefined的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。

```js
const street2 = user?.address?.street
const num2 = user?.address?.getNum?.()
console.log(street2, num2)
```

可选链中的 ? 表示如果问号左边表达式有值, 就会继续查询问号后面的字段。根据上面可以看出，用可选链可以大量简化类似繁琐的前置校验操作，而且更安全。**对象、数组、函数中都可以使用：** 

```js
// 对象中使用
  let obj = {
    name: "jimmy",
    age: "18",
  };
  let property = "age";
  let name = obj?.name;
  let age = obj?.age;
  let ages = obj?.[property];
  let sex = obj?.sex;
  console.log(name); // jimmy
  console.log(age); // 18
  console.log(ages); // 18
  console.log(sex); // undefined

  // 数组中使用
  let arr = [1,2,2];
  let arrayItem = arr?.[42]; // undefined

  // 函数中使用
  let obj = {
   func: function () {
     console.log("I am func");
   },
  };
  obj?.func(); // I am func
```

**可与空值合并操作符一起使用**

```js
let customer = {
  name: "jimmy",
  details: { age: 18 }
};
let customerCity = customer?.city ?? "成都";
console.log(customerCity); // "成都"
```



#### 3、String.prototype.matchAll()

`matchAll()` 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

```js
const regexp = /t(e)(st(\d?))/g;
const str = 'test1test2';

const array = [...str.matchAll(regexp)];
console.log(array[0]);  // ["test1", "e", "st1", "1"]
console.log(array[1]); // ["test2", "e", "st2", "2"]
```

#### 4、Promise.allSettled()

我们都知道 Promise.all() 具有并发执行异步任务的能力。但它的最大问题就是如果其中某个任务出现异常(reject)，所有任务都会挂掉，Promise直接进入reject 状态。

场景：现在页面上有三个请求，分别请求不同的数据，如果一个接口服务异常，整个都是失败的，都无法渲染出数据

我们需要一种机制，如果并发任务中，无论一个任务正常或者异常，都会返回对应的的状态，这就是Promise.allSettled的作用

```js
const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise1");
      //   reject("error promise1 ");
    }, 3000);
  });
};
const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
      //   reject("error promise2 ");
    }, 1000);
  });
};
const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   resolve("promise3");
      reject("error promise3 ");
    }, 2000);
  });
};

//  Promise.all 会走到catch里面
Promise.all([promise1(), promise2(), promise3()])
  .then((res) => {
    console.log(res); 
  })
  .catch((error) => {
    console.log("error", error); // error promise3 
  });

// Promise.allSettled 不管有没有错误，三个的状态都会返回
Promise.allSettled([promise1(), promise2(), promise3()])
  .then((res) => {
    console.log(res);  
    // 打印结果 
    // [
    //    {status: 'fulfilled', value: 'promise1'}, 
    //    {status: 'fulfilled',value: 'promise2'},
    //    {status: 'rejected', reason: 'error promise3 '}
    // ]
  })
  .catch((error) => {
    console.log("error", error); 
  });
```

#### 5、Dynamic Import（按需 import）

import()可以在需要的时候，再加载某个模块。

```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```



### ES2021(ES12)

#### 1、逻辑运算符和赋值表达式（&&=，||=，??=）

- **&&=**

逻辑与赋值x &&= y **等效于**： x && (x = y);

当x为真时，x=y。具体请看下面的示例:

```js
let a = 1;
let b = 0;

a &&= 2;
console.log(a); // 2

b &&= 2;
console.log(b);  // 0
```

- **||=**

逻辑或赋值（x ||= y）运算仅在 x 为false时赋值。x ||= y **等同于**：x || (x = y);

```js
const a = { duration: 50, title: '' };

a.duration ||= 10;
console.log(a.duration); // 50

a.title ||= 'title is empty.';
console.log(a.title); // "title is empty"
```

- **??=**

逻辑空赋值运算符 (x ??= y) 仅在 x 是 nullish[3] (null 或 undefined) 时对其赋值。

x ??= y **等价于**：x ?? (x = y);

```js
const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration); // 50

a.speed ??= 25;
console.log(a.speed); // 25

示例2
function config(options) {
  options.duration ??= 100;
  options.speed ??= 25;
  return options;
}

config({ duration: 125 }); // { duration: 125, speed: 25 }
config({}); // { duration: 100, speed: 25 }
```

#### 2、String.prototype.replaceAll()

replaceAll() 方法返回一个新字符串，新字符串中所有满足 pattern 的部分都会被replacement 替换。pattern可以是一个字符串或一个RegExp，replacement可以是一个字符串或一个在每次匹配被调用的函数。原始字符串保持不变。

```js
'aabbcc'.replaceAll('b', '.'); // 'aa..cc'
'aabbcc'.replaceAll(/b/g, '.'); // 'aa..cc'
'aabbcc'.replaceAll(/b/, '.'); // TypeError: replaceAll must be called with a global RegExp
```

使用正则表达式搜索值时，它必须是全局的。

#### 3、数字分隔符

较长的数值允许每三位添加一个分隔符（通常是一个逗号），增加数值的可读性。比如，1000可以写作1,000。

ES2021中允许 JavaScript 的数值使用下划线（_）作为分隔符。

```js
let budget = 1_000_000_000_000;
budget === 10 ** 12 // true

123_00 === 12_300 // true
12345_00 === 123_4500 // true
12345_00 === 1_234_500 // true
```

**数值分隔符**有几个使用注意点。

- 不能放在数值的最前面（leading）或最后面（trailing）。
- 不能两个或两个以上的分隔符连在一起。
- 小数点的前后不能有分隔符。
- 科学计数法里面，表示指数的e或E前后不能有分隔符。

```js
// 全部报错
3_.141
3._141
1_e12
1e_12
123__456
_1464301
1464301_
```

#### 4、Promise.any

方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

`Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是`Promise.any()`不会因为某个 Promise 变成rejected状态而结束，必须等到所有参数 Promise 变成rejected状态才会结束。

```js
const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise1");
      //  reject("error promise1 ");
    }, 3000);
  });
};
const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
      // reject("error promise2 ");
    }, 1000);
  });
};
const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise3");
      // reject("error promise3 ");
    }, 2000);
  });
};
Promise.any([promise1(), promise2(), promise3()])
  .then((first) => {
    // 只要有一个请求成功 就会返回第一个请求成功的
    console.log(first); // 会返回promise2
  })
  .catch((error) => {
    // 所有三个全部请求失败 才会来到这里
    console.log("error", error);
  });
```

