# Pay

[![Netlify Status](https://api.netlify.com/api/v1/badges/7badc2ac-2e40-4ed2-8df5-704a25fc921d/deploy-status)](https://app.netlify.com/sites/al-pay/deploys)

一个简单的收款码展示页。

### 效果展示

![image](https://s0.wordpress.com/mshots/v1/https%3A%2F%2Fpay.alex3236.top%2F?w=1000)

### 使用方法

#### Github Pages / Vercel / Spotify ...

1. Fork
2. 修改配置
3. 部署

#### 其他

1. 下载源码
2. 解压，修改配置
3. 部署

### 配置选项

`index.html`中，第 13 行起为配置选项。

```html
<!-- Settings: Change these to your links -->
<title>(～￣▽￣)～</title>
<script>
    const settings = {
        avatar: "2706992599", // 头像 URL，也可为 QQ 号 (e.g. 2706992599) 或 Github 用户名 (e.g. @alex3236)
        name: "Alex3236", // 头像下的昵称
        sign: "请我喝杯咖啡如何？( •̀ ω •́ )✧", // 个性签名 (提示文字)
        background: "#e5f2ff" // 背景颜色代码，也可为图片 URL (e.g. https://www.dmoe.cc/random.php)
    }
    const urls = {
        // 你可以使用草料二维码等二维码识别工具识别你的支付二维码，获取链接
        // 把某个参数放空或删除，则不显示对应按钮
        alipay: "https://qr.alipay.com/foo", // 支付宝二维码链接
        wechat: "wxp://bar", // 微信二维码链接
        qq: "https://i.qianbao.qq.com/wallet/sqrcode.htm?foo=bar" // QQ 二维码链接
    }
</script>
```

### 许可
自 [65f6e3f](https://github.com/alex3236/pay/commit/65f6e3f74e26e766b611b2d36f42d6841ad5d806) 起，此仓库使用 [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.html) 许可协议。
