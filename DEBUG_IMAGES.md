# 图片显示问题调试指南

## 快速检查步骤

### 1. 检查图片文件是否存在
```bash
ls -la public/images/community/
```
应该看到：
- fireworks-lake.jpg
- nordic-winter.jpg
- ginkgo-temple.jpg
- ginkgo-architecture.jpg
- window-snow.jpg

### 2. 检查浏览器 Network 面板

打开 DevTools → Network → 过滤 "Img"

**应该看到的状态码：**
- ✅ 200 OK - 图片加载成功
- ❌ 404 Not Found - 文件路径错误
- ❌ 403 Forbidden - 权限问题
- ❌ CORS error - 跨域问题

**检查请求URL：**
- 应该是：`http://localhost:3000/images/community/fireworks-lake.jpg`
- 不应该有：`/src/` 或相对路径

### 3. 检查 Console 错误

打开 DevTools → Console

**查找：**
- `[ImageWithFallback] Failed to load image:` - 图片加载失败
- 其他红色错误信息

### 4. 检查 Elements 面板

1. 找到图片元素：`<img src="/images/community/...">`
2. 检查：
   - `src` 属性是否正确
   - 是否有 `opacity-0` 类（加载中）
   - 容器是否有 `aspect-[4/3]` 类（确保有高度）

### 5. 手动测试图片URL

在浏览器地址栏输入：
```
http://localhost:3000/images/community/fireworks-lake.jpg
```

**应该：** 直接显示图片
**不应该：** 404 错误页面

## 常见问题修复

### 问题1：404 Not Found
**原因：** 文件路径错误或文件不存在
**解决：** 
- 确认文件在 `public/images/community/` 目录
- 确认文件名完全匹配（包括大小写）
- 重启开发服务器：`npm run dev`

### 问题2：图片200但不可见
**原因：** CSS样式问题
**检查：**
```javascript
// 在Console运行：
const img = document.querySelector('img[src*="community"]');
console.log('Image:', img);
console.log('Computed style:', window.getComputedStyle(img));
console.log('Parent:', img.parentElement);
console.log('Parent style:', window.getComputedStyle(img.parentElement));
```

### 问题3：一直显示Loading
**原因：** onLoad事件未触发
**检查：**
- 图片是否真的加载完成
- 是否有JavaScript错误阻止了事件

## 验证步骤

1. ✅ 刷新页面（Cmd+R 或 Ctrl+R）
2. ✅ 打开 Network 面板，查看图片请求
3. ✅ 确认所有图片都是 200 OK
4. ✅ 检查"社区"页面"本周热门推荐"区域
5. ✅ 应该看到5张图片横向滚动显示
