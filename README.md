# Pay

[![Netlify Status](https://api.netlify.com/api/v1/badges/7badc2ac-2e40-4ed2-8df5-704a25fc921d/deploy-status)](https://app.netlify.com/sites/al-pay/deploys)

一个简单的收款码展示页。

### 效果展示

以下为实时截图，有一定延迟

![](https://s0.wp.com/mshots/v1/https://al-pay.netlify.app/?w=600&h=400)

### 使用方法

1. 从 Releases 下载 `index.html`（单文件，无需其他）
2. 修改配置
3. 部署

**要在生产环境运行，请务必从 Releases 下载！不要直接下载源码 ZIP！**

### 配置选项

`index.html`中，第 13 行起为配置选项。

```html
<!-- Settings: Change these to your links -->
<title>(～￣▽￣)～</title>
<script>
    const settings = {
        avatar: "2706992599", // 头像 URL，也可为 QQ 号 (e.g. 2706992599) 或 Github 用户名 (e.g. alex3236)
        name: "Alex3236", // 头像下的昵称
        sign: "请选择支付方式" // 个性签名 (提示文字)
    }
    const urls = {
        // 你可以使用草料二维码等二维码识别工具识别二维码，获取其中的链接
        alipay: "https://qr.alipay.com/foobar?t=0", // 支付宝二维码链接
        wechat: "wxp://foo_bar", // 微信二维码链接
        qq: "https://i.qianbao.qq.com/wallet/sqrcode.htm?foo=bar" // QQ 二维码链接
    }
</script>
```