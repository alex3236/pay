# Pay

[![Vercel](https://vercelbadge.vercel.app/api/alex3236/pay)](https://vercel.com/alex3236/pay) [![Netlify Status](https://api.netlify.com/api/v1/badges/7badc2ac-2e40-4ed2-8df5-704a25fc921d/deploy-status)](https://app.netlify.com/sites/al-pay/deploys)

一个简单的收款码展示页。

## 效果展示

![Image](https://s2.loli.net/2022/08/20/rmPM7kwxUzQpJhb.png)

## :rocket: 特点

- 纯前端实现，一键部署，无需安装，无需数据库
- 免维护，无多余配置，一次修改永久使用
- 支付软件扫码智能识别，无需手选，且允许切换支付方式
- 用户可对网站样式进行高度自定义

## :warning: 需要注意的地方

- 无论什么原因导致网站无法正常访问，二维码将会失效。
- 聚合收款码只应作为个人收款使用。

## :robot: 部署方法

### 一键部署

| 平台 | 大陆访问 | 一键部署 |
| - | - | - |
| **Vercel** | **可直连** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falex3236%2Fpay&demo-title=Pay&demo-description=A%20demo%20site%20by%20Alex3236.&demo-url=https://pay.alex3236.top/&demo-image=https://s2.loli.net/2022/08/20/rmPM7kwxUzQpJhb.png) |
| Netlify | 玄学矮墙 | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/alex3236/pay)

1. 点击部署按钮，按提示配置
2. 打开仓库修改配置文件
3. Enjoy~

### 使用 Github Pages

1. [Fork 此仓库](https://github.com/alex3236/pay/fork)
2. 修改配置
3. 在仓库的 `Settings/Github Pages` 中配置 Github Pages
4. Enjoy~

### 其他

1. 下载源码并解压
2. 修改配置
3. 上传至您的服务器并部署（纯静态，无需 PHP）
4. Enjoy~

## :gear: 配置选项

配置项位于 `config.js` 中，列举如下。

> :warning: 请用专门的代码编辑器（如 `Notepad3` / `VS Code`）编辑代码，切忌用记事本编辑，否则可能出现中文乱码！

```javascript
const basic = { // 基础设置
    favicon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👻</text></svg>', // 页面图标
    title: '(～￣▽￣)～', // 页面标题
    avatar: 'https://gravatar.zeruns.tech/avatar/', // 头像 URL
    name: '这是一个昵称！', // 头像下的昵称
    sign: '个性签名或者提示文字 ( •̀ ω •́ )✧', // 个性签名或提示文字，可使用 HTML 格式
    user_page: 'https://github.com/ghost', // 点击头像或名字时跳转的链接，留空或删除则不跳转
    footer: '这是一个页脚！', // 页脚文字，可使用 HTML 格式
    uri_redirect: false // 若收款码 URL 是网址，是否直接跳转而不显示二维码
}

const theme = { // 主题设置
    page_bg: '#c3d7df', // 网页背景（十六进制，或图片 URL）
    card_bg: '#ffffffcc', // 卡片背景色（十六进制，可带透明度，不能是 URL）
    qrcode_bg: '#eaeffde6', // 二维码背景色（十六进制，可带透明度，不能是 URL）
    qrcode_fg: '#335eea' // 二维码颜色（十六进制，可带透明度，不能是 URL）
}

const tools = { // 右上角小工具设置
    dl_btn: true, // 二维码下载
    badge_generator: true // 徽章生成器
}

const urls = [ // 付款方式列表
    {
        name: '支付宝', // 名称
        ua: 'Alipay', // User-Agent 正则表达式
        addr: 'https://qr.alipay.com/awa' // 收款码 URL
    },
    {
        name: '微信',
        ua: 'MicroMessenger\/',
        addr: 'wxp://awa'
    },
    {
        name: 'QQ', 
        ua: 'QQ\/',
        addr: 'https://i.qianbao.qq.com/wallet/sqrcode.htm?awa=awa'
    }
]

```

## :wrench: 小工具

为方便使用提供了一些小工具，按钮位于网页右上角。

### 头像链接获取

由于内置 API 导致了一些问题，头像现仅支持 URL 格式。

因此，现在 [`pay-git-avatar-generator-alex3236.vercel.app`](https://pay-git-avatar-generator-alex3236.vercel.app/) 提供了头像链接获取工具

### 生成徽章

一个非常简（垃）洁（圾）的徽章生成器。

![Image](https://i.niupic.com/images/2022/08/04/a1wU.png)

### 下载卡片

将卡片以 PNG 格式下载到本地，供他人扫描。

## :question: 常见问题 (WIP)

<details>
  <summary>如何修改付款方式？</summary>
  
 - 对于普通用户，只需更改默认的支付宝、微信、QQ 的收款码 URL。如不需要其中某个支付方式，删除对应的 dict 即可。
 - 若想添加其他收款方式，按格式填写即可（UA 可用 [MyBrowser](https://github.com/alex3236/MyBrowser) 提取）。

</details>

<details>
  <summary>腾讯系应用扫码提示非官方网页怎么办？</summary>
  
 - 使用已实名 QQ 进行申诉（实名信息最好与域名 Whois 信息一致），理由填写“静态网页，无违规内容”。

</details>

## 许可
自 [`65f6e3f`](https://github.com/alex3236/pay/commit/65f6e3f74e26e766b611b2d36f42d6841ad5d806) 起，此仓库使用 [`GNU GPLv3`](https://www.gnu.org/licenses/gpl-3.0.html) 许可。请勿以任何形式出售此源码。

## 支持我

制作不易，如果喜欢不妨打赏下？ awa

[![给点呗 qwq](https://img.shields.io/badge/%E7%BB%99%E7%82%B9%E5%91%97%20qwq-blue?logo=alipay&logoColor=white&style=flat-square)](https://pay.alex3236.top/)
