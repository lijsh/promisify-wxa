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
Taro.navigateTo({ url: 'someUrl' })
  .then(res => {
    // 成功回调
  })
```

如果你不想使用任何框架，可以直接用这个库。这个库只做一件事，就是将微信小程序的 API 代理到一个对象上，并且将相应回调风格的 API 转换成 Promise 风格（见使用方法）。

### 安装
```
npm install -S promisify-wxa
```
### 使用方法
``` js
import promisify from 'promisify-wxa'

App({
  onLaunch() {
    promisify(this) // app 实例上代理了 wx 全部方法，其中回调风格的 API 全部转换成 Promise 风格
  }
})

// 在小程序中可以这样使用
const app = getApp()

app.navigateTo({ url: 'someUrl' })
  .then(res => console.log('it works'))
```

### 实现
copy 了 taro 的[实现](https://github.com/NervJS/taro/blob/master/packages/taro-weapp/src/native-api.js#L66)，感谢 MIT 协议。
