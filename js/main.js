function isQQ(qq) {
    var filter = /^\s*[.0-9]{5,11}\s*$/;
    return filter.test(qq);
}

function isGithub(username) {
    var filter = /^@[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    return filter.test(username);
}

function isColor(text) {
    var filter = /^#[a-fA-F0-9]{6}$/;
    return filter.test(text);
}

function isEmpty(s) {
	return !(typeof s == 'string' && s.length > 0)
}



window.onload = function () {

    if (isEmpty(urls.alipay)) {
        $("#alipay-btn").remove();
    }
    if (isEmpty(urls.wechat)) {
        $("#wechat-btn").remove();
    }
    if (isEmpty(urls.qq)) {
        $("#qq-btn").remove();
    }

    if (isQQ(settings.avatar)) {
        document.getElementById("avatar").src = "http://q1.qlogo.cn/g?b=qq&nk=" + settings.avatar + "&s=640";
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
        $("span").css({display: "none"});
        if ($(this).val() == "alipay") {
            $("#alipay-name").css({display: "inline-block"});
            qrcode.makeCode(urls.alipay);
        } else if ($(this).val() == "wechat") {
            $("#wechat-name").css({display: "inline-block"});
            qrcode.makeCode(urls.wechat);
        } else if ($(this).val() == "qq") {
            $("#qq-name").css({display: "inline-block"});
            qrcode.makeCode(urls.qq);
        }
        $('#QRModal').modal("show");
    });

    $("body").css("background", isColor(settings.background)? settings.background : "url(" + settings.background + ")")
}

