## 自定义脚本替换文件夹
使用系统中的7z解压文件，旧文件夹重命名为xx，刚解压的文件重命名为部署文件名，删除文件夹xx，替换完成

```bash
echo off
cd /d %~dp0


"C:\Program Files\7-Zip\7z" x dist.7z 

rename html html-1

rename dist html

rmdir /s /q html-1 
```
