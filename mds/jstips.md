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

