# vue 指令

## v-debounce
```js
/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 */
export default {
    mounted(el, binding) {
        if (typeof binding.value !== 'function') {
            console.error('callback must be a function');
            return;
        }
        let timer = null;
        el.__handleClick__ = function (e) {
            if (timer) {
                clearInterval(timer);
            }
            timer = setTimeout(() => {
                binding.value();
            }, 200);
        };
        el.addEventListener('click', el.__handleClick__);
    },
    beforeUnmount(el) {
        el.removeEventListener('click', el.__handleClick__);
    }
}
```

## v-longpress
```js
/**
 * v-longpress
 * 长按指令，长按时触发事件
 */
export default {
    mounted(el, binding) {
        if (typeof binding.value !== 'function') {
            throw 'callback must be a function';
        }
        // 定义变量
        let pressTimer = null;
        // 创建计时器（ 2秒后执行函数 ）
        let start = (e) => {
            if (e.button) {
                if (e.type === 'click' && e.button !== 0) {
                    return;
                }
            }
            if (pressTimer === null) {
                pressTimer = setTimeout(() => {
                    handler(e);
                }, 1000);
            }
        };
        // 取消计时器
        let cancel = (e) => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        };
        // 运行函数
        const handler = (e) => {
            binding.value(e);
        };
        // 添加事件监听器
        el.addEventListener('mousedown', start);
        el.addEventListener('touchstart', start);
        // 取消计时器
        el.addEventListener('click', cancel);
        el.addEventListener('mouseout', cancel);
        el.addEventListener('touchend', cancel);
        el.addEventListener('touchcancel', cancel);
    },
}
```

## v-permission
```js
import { useUserStore } from '@/store/user'
function checkPermission(el, binding) {
  const { value } = binding

  const userStore = useUserStore()
  const roles = userStore.roles

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(Number(role) )
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

//vue2和vue3中指令对比https://jishuin.proginn.com/p/763bfbd29cb7
export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  componentUpdated(el, binding) {
    checkPermission(el, binding)
  }
}
```

## v-copy
```js
/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import { ElMessage } from 'element-plus';
function handleClick(ev) {
    let input = document.createElement('input');
    input.value = this.copyData.toLocaleString();
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
    ElMessage({
        type: 'success',
        message: '复制成功'
    });
}
export default {
    mounted(el, binding) {
        el.copyData = binding.value;
        el.addEventListener('click', handleClick);
    },
    updated(el, binding) {
        el.copyData = binding.value;
    },
    beforeUnmount(el) {
        el.removeEventListener('click', el.__handleClick__);
    }
}
```

## v-clickoutside
```js
export default {
    mounted(el, binding) {
        if (typeof binding.value !== 'function') {
            throw 'callback must be a function';
        }
        el.__handleClick__ = function (e) {
            if (el.contains(e.target)) {
                binding.value(false);
            }
            else {
                binding.value(true);
            }
        };
        document.addEventListener('click', el.__handleClick__);
    },
    beforeUnmount(el) {
        document.removeEventListener('click', el.__handleClick__);
    }
}
```

## 统一加到指令上
```js
import clickoutside from './clickoutside'
import copy from './copy'
import debounce from './debounce'
import longpress from './longpress'
import permission from './permission'
export default function (app) {
  app.directive('permission', permission)
  app.directive('copy', copy)
  app.directive('longpress', longpress)
  app.directive('debounce', debounce)
  app.directive('clickoutside', clickoutside)
}
```

