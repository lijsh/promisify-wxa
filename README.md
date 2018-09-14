## Promisify-wxa
> 将微信小程序的 API promise 化

微信小程序的 API 大部分是回调风格的：
``` js
wx.navigateTo({
  url: 'someUrl',
  success() {
    // 成功回调
  }
})
```
大多数小程序的框架都会将对应的 API 改为 Promise 风格：
``` js
Taro.navigateTo({})
  .then(res => {
    // 成功回调
  })
```

如果你不想使用任何框架，可以直接用这个库。这个库只做一件事，就是将微信小程序的 API（使用回调的 API） promise 化，然后赋值到一个对象上。

### 实现
copy 了 taro 的[实现](https://github.com/NervJS/taro/blob/master/packages/taro-weapp/src/native-api.js#L66)，感谢 MIT 协议。
