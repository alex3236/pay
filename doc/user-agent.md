# 配置 UA 识别功能

按照以下格式填写 `app_platforms` 环境变量

```json5
{
    "baidu": {
        "match": "Baidu/[0-9\.]+", // 匹配 User-Agent（正则）
        "redirect": "https://baidu.com/" // 直接跳转
    },
    "unipay": {
        "match": "Unipay",
        "url": "https://example.org/", // 显示二维码，可长按识别
        "tip": "长按识别二维码支付" // 下方提示
    }
}
```