// 正则匹配器
isQQ = (s) => /^\s*[.0-9]{5,11}\s*$/.test(s);
isGithub = (s) => /^@[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(s);
isColor = (s) => /^#[a-fA-F0-9]{6}$/.test(s);
isEmpty = (s) => !(typeof s == 'string' && s.length > 0);

function generateModal(val) {
    $(".app-name").css("display", "none");

    if (val == "alipay") {
        $("#alipay-name").css({ display: "inline-block" });
        makeCode(urls.alipay);
    } else if (val == "wechat") {
        $("#wechat-name").css({ display: "inline-block" });
        makeCode(urls.wechat);
    } else if (val == "qq") {
        $("#qq-name").css({ display: "inline-block" });
        makeCode(urls.qq);
    }
    $("#qrcode canvas").remove();
}

function makeCode(url) {
    $('#qrcode-canvas').children().remove()
    $("#qrcode img").remove();
    $("#qrcode-canvas").qrcode({ width: 300, height: 300, text: url })
    var img = new Image();
    img.src = $("#qrcode-canvas canvas")[0].toDataURL("image/png");
    img.className = "qrcode"
    $("#qrcode").append(img);
}

function printDiv(div) {
    html2canvas((div)).then(canvas => {
        var myImage = canvas.toDataURL();
        downloadURI(myImage, "QR.png");
    });
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function loadIndex() {
    $("button.pay").click(() => {
            generateModal($(this).val());
            $('#ItemModal').modal("show");
        }
    );

    $('#user').click(() => {
        if (!isEmpty(urls.user_page)) {
            window.open(urls.user_page, '_blank')
        }
    })

    if (!tools.badge_generator) {
        $('#badge-btn').hide();
    }

    // 支付图标
    if (isEmpty(urls.alipay)) {
        $(".alipay").remove();
    }
    if (isEmpty(urls.wechat)) {
        $(".wechat").remove();
    }
    if (isEmpty(urls.qq)) {
        $(".qq").remove();
    }

    // 头像
    if (isQQ(settings.avatar)) {
        avatar_url = "http://q1.qlogo.cn/g?b=qq&nk=" + settings.avatar + "&s=640";
    } else if (isGithub(settings.avatar)) {
        avatar_url = "https://avatars.githubusercontent.com/" + settings.avatar.substr(1) + "?v=3";
    } else {
        avatar_url = settings.avatar;
    }

    $('#avatar').css('background-image', "url(" + avatar_url + "), url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEa8AABGvAff9S4QAAAAMSURBVBhXY1iyeTcABBECEzIl58wAAAAASUVORK5CYII=')");

    //背景
    $("body").css("background", isColor(settings.background) ? settings.background : "url(" + settings.background + ")")

    // 支付 APP 识别
    var have_matched = true;
    if (navigator.userAgent.match(/Alipay/i)) {
        generateModal("alipay"); // 支付宝
    } else if (navigator.userAgent.match(/MicroMessenger\//i)) {
        generateModal("wechat"); // 微信
    } else if (navigator.userAgent.match(/QQ\//i)) {
        generateModal("qq"); // QQ
    } else {
        have_matched = false; // 其它
    }
    if (have_matched) {
        $("#scan-tip").text("可直接长按识别");
        $('#ItemModal').modal({ backdrop: 'static', keyboard: false });
        $('#ItemModal').modal('show');
    } else {
        $("#scan-tip").text("手机用户可截图后打开相应应用扫描");
    }

    // 大二维码
    if (!tools.full_qr) {
        $("#qr-btn").hide()
    }

    $('#qr-btn').click(() => {
        ((!window.navigator.onLine || location.href.startsWith("file://")) ? $('#OfflineModal') : $('#FullQRModal')).modal('show')

    })

    $('#dl-qr').click(() => {
        printDiv($('#code-box')[0])
    })

    var url = new URL(".", window.location.href).href;
    $("#fullqrcode").qrcode({
        width: 200,
        height: 200,
        text: url
    })

    // 徽章生成器
    $('#badge-btn').click(() => 
        ((!window.navigator.onLine || location.href.startsWith("file://")) ? $('#OfflineModal') : $('#BadgeModal')).modal('show')
    )
}

window.onload = () => {
    loadIndex();
    $('#loading').fadeOut(500, () => {
        $('#loading').remove()
    });
    $('footer').show();
}