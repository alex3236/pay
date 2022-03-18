# Pay

[![Vercel](https://vercelbadge.vercel.app/api/alex3236/pay)](https://vercel.com/alex3236/pay) [![Netlify Status](https://api.netlify.com/api/v1/badges/7badc2ac-2e40-4ed2-8df5-704a25fc921d/deploy-status)](https://app.netlify.com/sites/al-pay/deploys)

一个简单的收款码展示页。

### 效果展示

![Image](https://user-images.githubusercontent.com/45303195/158370230-a8befb69-c84a-4157-bc3a-d20eaa4a8744.png)

### 特点

- 纯前端实现，一键免服务器部署，无需安装，无需数据库；
- 免维护，无多余的配置，一次修改配置即可永久使用。
- 智能识别客户端匹配二维码，无需手动选择

### 使用方法

#### 快速部署到 Vercel / Netlify（中国大陆可直连）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falex3236%2Fpay&demo-title=Pay&demo-description=A%20demo%20site%20by%20Alex3236.&demo-url=https://al-pay.vercel.app/&demo-image=https://user-images.githubusercontent.com/45303195/158306208-a682e9c1-1f9c-4614-950e-6078b5f4eca0.png) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/alex3236/pay)

点击按钮 -> 部署 -> 自定义域名（可选）-> 进入仓库，修改配置 -> 完成

#### 部署到 Github Pages（墙）

Fork -> 仓库中 `Settings/Github Pages` 打开 -> 完成

#### 其他

下载源码并解压 -> 修改配置 -> 上传至您的服务器并部署（纯静态，无需 PHP）

### 配置选项

`index.html`中配置项如下。

```html
<!-- 设置 -->
<title>(～￣▽￣)～</title>
<script>
    const settings = {
        avatar: "2706992599", // 头像 URL，也可为 QQ 号 (e.g. 2706992599) 或 Github 用户名 (e.g. @alex3236)
        name: "Alex3236", // 头像下的昵称
        sign: "请我喝杯咖啡如何？( •̀ ω •́ )✧", // 个性签名 (提示文字)
        background: "#F2FDFF", // 背景颜色代码，也可为图片 URL (e.g. https://www.dmoe.cc/random.php)
        hide_badge_generator: false // 是否隐藏徽章生成器
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

`fullqr.html` 中配置项如下。

```html
<!-- 设置 -->
<script>
    const settings = {
        hide: [], // 隐藏的支付方式列表。可以有 alipay, wechat, qq
        desc: "支付宝 / 微信 / QQ 扫码支付" // 描述
    };
</script>
```

### 生成徽章

你可以在网页底部找到一个非常简（垃）洁（圾）的徽章生成器。

![Image](https://user-images.githubusercontent.com/45303195/158335111-533f73fb-264d-4eee-ac9a-5d37a3a8c3ff.png)

### 大二维码

点击二维码图标即可打开大二维码，你可以将其直接发送给他人扫描。

![Image](https://user-images.githubusercontent.com/45303195/158370586-0d65b0b5-d955-41dd-b3ca-6042e257def2.png)

### :warning: 注意
- 请用专门的代码编辑器（如 `Notepad2` / `VS Code`）编辑代码，切忌用记事本编辑，否则可能出现中文乱码！
- 自 [65f6e3f](https://github.com/alex3236/pay/commit/65f6e3f74e26e766b611b2d36f42d6841ad5d806) 起，此仓库使用 [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.html) 许可协议。请勿以任何形式出售此源码。

### 支持我

制作不易，如果喜欢不妨赞助杯咖啡 awa

[![Sponsor me!](https://img.shields.io/badge/Sponsor%20me!-blue?logo=alipay&logoColor=white&style=flat-square)](https://pay-alex3236.vercel.app/)
