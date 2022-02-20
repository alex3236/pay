function isQQ(qq) {
    var filter = /^\s*[.0-9]{5,11}\s*$/;
    return filter.test(qq);
}

function isGithub(username) {
    var filter = /^@[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    return filter.test(username);
}


window.onload = function () {
    if (isQQ(settings.avatar)) {
        document.getElementById("avatar").src = "http://q1.qlogo.cn/g?b=qq&nk=" + settings.avatar + "&s=100";
    } else if (isGithub(settings.avatar)) {
        document.getElementById("avatar").src = "https://avatars.githubusercontent.com/" + settings.avatar.substr(1) + "?v=3";
    } else {
        document.getElementById("avatar").src = settings.avatar;
    }

    var qrcode = new QRCode(document.getElementById("qrcode"));

    $("#qrcode > img").css({
        "margin": "auto",
        "height": "128px",
        "width": "128px"
    });

    $("button").click(function () {
        $("#app-name").text($(this).text());
        if ($(this).val() == "alipay") {
            qrcode.makeCode(urls.alipay);
        } else if ($(this).val() == "wechat") {
            qrcode.makeCode(urls.wechat);
        } else if ($(this).val() == "qq") {
            qrcode.makeCode(urls.qq);
        }
        $('#exampleModal').modal("show");
    });
}

