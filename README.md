
# 校园H5活动页 — — 触摸滑动插件
===

使用原生JS编写的一个移动端触摸滑动插件，采用原型链的承继模式，最终在全局暴露H5.js对象。

## 原理

要实现手指跟随的滑动效果， 关键在于通过touch事件来设置transform：translate3d（x，y，z）的参数，并在滑动结束（touchend）设置一个最小滑动距离minRange，translate3d的参数等于touchmove的滑动距离，当大于minRange时，则触发下一页（或上一页）的整体滑动，translate3d的X或Y的参数也就是视窗的宽（横向滑动时）或者高（纵向滑动时）。

### 动画按需加载

每个页面中可能有动画，我们必须保证在该页面出现时才开始播放。这里的动画按需加载采用css类控制，即在当前页面中添加一个.play的类作为标记，在每个页面的CSS动画设置中，同样加上.play类名，这样就实现了当页面出现才开始播放本页动画的功能。

```js
setTimeout(function() {
    curr && curr.classList.remove('play')
    target && target.classList.add('play')
}, 3e2)
```

### 优化滑动过渡效果

动态设定translate3d参数，预设置上一个或下一个页面的位置，获得流畅的交互效果。

```js
// touchmove
this.setY(current, Y)
next && (this.setY(next, Y + this.height))
prev && (this.setY(prev, Y - this.height))

// setY
H5.prototype.setY = function(el, y, unit) {
    el && (el.style.webkitTransform = 'translate3d(0,' + y + (unit || 'px') + ',0)')
}
```