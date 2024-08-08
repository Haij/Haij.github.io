## css3 grid
```html
<div class="!bg-white outline-box">
  <div class="party-a">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
  </div>
</div>
```
```css
.outline-box {
  height: calc(100vh - 200px) !important;
  overflow-y: auto;
}

.party-a {
  display: grid;
  grid-template-columns: 320px repeat(3, 1fr) 320px;
  grid-template-rows: 100px 360px 410px;
  gap: 16px;

  &>div {
    background: #FAFAFB;
    border-radius: 12px;

    &:nth-child(7) {
      grid-column-start: 2;
      grid-column-end: 5;
    }

    &:nth-child(10) {
      grid-column-start: 2;
      grid-column-end: 6;
    }
  }
}
```
展示如下
![image](https://github.com/user-attachments/assets/33201cd8-bf3f-430c-aa6c-2f645639bda3)
