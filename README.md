# Pay

[![Vercel](https://vercelbadge.vercel.app/api/alex3236/pay)](https://vercel.com/alex3236/pay) [![Netlify Status](https://api.netlify.com/api/v1/badges/7badc2ac-2e40-4ed2-8df5-704a25fc921d/deploy-status)](https://app.netlify.com/sites/al-pay/deploys)

一个简单的收款码展示页。

## 效果展示

![Image](https://i.niupic.com/images/2022/08/04/a1wB.png)

## 特点

- 纯前端实现，一键部署，无需安装，无需数据库
- 免维护，无多余配置，一次修改永久使用
- 支付软件扫码智能识别，无需手选
- 写的很拉跨！不过不影响用！

## 使用方法

### 一键部署

| 平台 | 大陆访问 | 一键部署 |
| - | - | - |
| **Vercel** | **可直连** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falex3236%2Fpay&demo-title=Pay&demo-description=A%20demo%20site%20by%20Alex3236.&demo-url=https://pay-alex3236.vercel.app/&demo-image=https://user-images.githubusercontent.com/45303195/158306208-a682e9c1-1f9c-4614-950e-6078b5f4eca0.png) |
| Netlify | 玄学矮墙 | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/alex3236/pay)

1. 点击部署按钮，按提示配置
2. 打开仓库修改配置文件
3. Enjoy~

### 使用 Github Pages

1. Fork 此仓库
2. 修改配置
3. 在仓库的 `Settings/Github Pages` 中配置 Github Pages
4. Enjoy~

### 其他

1. 下载源码并解压
2. 修改配置
3. 上传至您的服务器并部署（纯静态，无需 PHP）
4. Enjoy~

## 配置选项

配置项位于 `index.html` 中，列举如下。

> :warning: 请用专门的代码编辑器（如 `Notepad2` / `VS Code`）编辑代码，切忌用记事本编辑，否则可能出现中文乱码！

```html
<!-- 设置 -->
    <title>(～￣▽￣)～</title> <!-- 页面标题 -->
    <script>
        const settings = {
            avatar: "2706992599", // 头像 URL，也可为 QQ 号 (e.g. 2706992599) 或 Github 用户名 (e.g. @alex3236)
            name: "Alex3236", // 头像下的昵称
            sign: "<strike>我很可爱，请给我钱</strike> ( •̀ ω •́ )✧", // 个性签名 (提示文字)
            background: "#C3D7DF", // 背景颜色代码，也可为图片 URL
        }
        const urls = {
            user_page: "https://github.com/alex3236", // 点击头像或名字时跳转的链接，留空或删除则不跳转
            // 以下是收款码连接，可使用草料二维码等识别工具识别收款码获取链接
            // 把某个参数放空或删除，则不显示对应按钮和图标
            alipay: "https://qr.alipay.com/0?t=0", // 支付宝
            wechat: "wxp://0", // 微信
            qq: "https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&f=wallet&a=1&ac=0&u=0&n=0" // QQ
        }
        const tools = { // 右上角小工具按钮是否显示
            full_qr: true, // 大二维码
            badge_generator: true // 徽章生成器
        }
    </script>
```

## 小工具

为方便使用提供了一些小工具，按钮位于网页右上角。

### 生成徽章

一个非常简（垃）洁（圾）的徽章生成器。

![Image](https://i.niupic.com/images/2022/08/04/a1wU.png)

### 大二维码

大二维码，可以直接给他人扫描。网站挂了也会跟着失效。

![Image](https://i.niupic.com/images/2022/08/04/a1wE.png)

## 许可
自 [`65f6e3f`](https://github.com/alex3236/pay/commit/65f6e3f74e26e766b611b2d36f42d6841ad5d806) 起，此仓库使用 [`GNU GPLv3`](https://www.gnu.org/licenses/gpl-3.0.html) 许可。请勿以任何形式出售此源码。

## 支持我

制作不易，如果喜欢不妨打赏下？ awa

[![给点呗 qwq](https://img.shields.io/badge/%E7%BB%99%E7%82%B9%E5%91%97%20qwq-blue?logo=alipay&logoColor=white&style=flat-square)](https://pay-alex3236.vercel.app/)
