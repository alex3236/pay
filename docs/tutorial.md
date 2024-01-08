# 使用说明

## ⚠️ 需要注意的地方

- 无论什么原因导致网站无法正常访问，二维码都会失效。
- 聚合收款码只应作为**个人收款**使用。

## 🤖 部署

### 一键部署

| 平台 | 大陆访问 | 一键部署 |
| - | - | - |
| **Vercel** | **可直连** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falex3236%2Fpay&demo-title=Pay&demo-description=A%20demo%20site%20by%20Alex3236.&demo-url=https://pay.alex3236.top/&demo-image=https://s2.loli.net/2022/08/20/rmPM7kwxUzQpJhb.png) |
| Netlify | 玄学矮墙 | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/alex3236/pay)

1. 点击部署按钮，按提示配置
2. 打开仓库修改并提交配置文件

### 使用 Github Pages

1. [Fork 此仓库](https://github.com/alex3236/pay/fork)
2. 修改配置
3. 在仓库的 `Settings -> Github Pages` 中配置 Github Pages

### 其他静态部署

1. 下载源码并解压
2. 修改配置
3. 上传至您的服务器并部署（纯静态，无需 PHP）

## ⚙️ 配置选项

配置项位于 `config.js` 中。

> [!IMPORTANT]
> 请使用代码编辑器（如 `Notepad3` / `VS Code`）编辑，切忌用记事本编辑，否则可能出现中文乱码！

收款码 URL 可用 草料二维码 等二维码识别工具识别收款码提取。

### 使用微信赞赏码

微信不再支持网页中长按识别付款码，因此您可以上传完整赞赏码以启用赞赏码功能。赞赏码默认存放位置是根目录下的 `wechat.png`。

```json5
const urls = [ // 付款方式列表
// ...
    {
        name: '微信',
        ua: 'MicroMessenger\/',
        img: 'wechat.png' // 使用 img 而非 addr 参数指定路径以使用赞赏码
    }
]
```
> [!WARNING]
> 注意，您必须上传类似下面这样的完整的赞赏码。
> ![Example QR Code](../wechat.png)

## 常见问题

### 如何修改付款方式？
  
- 对于普通用户，使用默认的支付宝、微信即可。如不需要其中某个支付方式，删除对应的部分即可。
- 若想添加其他收款方式，按格式填写 UA 和 URL 即可。

### 微信扫码提示非官方网页怎么办？
  
- 使用已实名 QQ 进行申诉（实名信息最好与域名 Whois 信息一致），理由填写“静态网页，无违规内容”。

### 支付宝扫码提示危险网页怎么办？

- 申诉，不通过就换域名
