```javascript
function randomColor() {
	const color = Math.random().toString(16).slice(2, 8).padEnd(6, '0')
	return '#'+color
}

function randomUuid(len = 6) {
	if(len <= 11) {
		return Math.random().toString(36).slice(2, 2 + len).padEnd(len, '0')
	}else{
		return randomUuid(11) + randomUuid(len - 11)
	}
}
```

```javascript
oninput="value=value.replace(/^\d/g, '')"
```

![image](https://github.com/user-attachments/assets/c93b2eac-396b-422d-bab7-5d0fa71c0073)

```javascript
copy(data) {
	let _input = document.createElement("input"); // 直接构建input
	data = data.replace(/<\/?.+?\/?>/g, "");
	_input.value = data; // 设置内容
	document.body.appendChild(_input); //添加临时实例
	_input.select(); // 选择实例内容
	document.execCommand("copy"); // 执行复制
	this.$message.success("复制成功");
	document.body.removeChild(_input); // 删除临时实例
}
```
