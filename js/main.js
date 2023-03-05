// 正则匹配器
isColor = (s) => /^#[a-fA-F0-9]{6}$/.test(s);
isEmpty = (s) => !(typeof s == 'string' && s.length > 0);
isHTTP = (s) => /^https?:\/\//.test(s);
var is_offline = (!window.navigator.onLine || /^(file:\/*|(https?:)?(\/\/)?(localhost|127.))/.test(location.href));
var payment_url;
var payment_app;
var payment_desc = (function () { var n = []; for (p in urls) { n.push(urls[p].name) } return n; }.call(this));
printConsoleInfomation(payment_desc);

function make_code(type, url, desc) {
    var img = new Image();
    if (type == 'qr') {
        $('#qrcode-canvas').qrcode({
            width: 250,
            height: 250,
            background: theme.qrcode_bg,
            foreground: theme.qrcode_fg,
            text: url
        });
        img.src = $('#qrcode-canvas canvas')[0].toDataURL('image/png');
    } else if (type == 'img') [
        tailor(url, theme.qrcode_fg,(base64) => {
            img.src = base64;
        })
    ]
    img.alt = "QR Code";
    $('#qrcode').append(img);
    $('#desc').children().html(desc);
}

function make_code_if_online(url, desc) {
    $('#qrcode-canvas').children().remove();
    $('#qrcode img').remove();
    if (is_offline) {
        $('#qrcode').html('<strong>网页离线<br>请先部署到服务器</strong>');
        $('#desc').hide();
        $('#badge-btn').hide();
        $('#dl-btn').hide();
    } else {
        make_code('qr', url, desc);
    }
}

function make_full_code(desc) {
    make_code_if_online(new URL('.', window.location.href).href, desc);
}

function print_div(div) {
    html2canvas(div, {
        logging: true,
        letterRendering: 1,
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        var myImage = canvas.toDataURL();
        downloadURI(myImage, 'QR.png');
    });
}

function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function printConsoleInfomation(payment_desc) {
    console.log(
        atob('CiAgICBfX18KICAgIC8gXyBcX19fIF9fXyBfXwogICAvIF9fXy8gXyBgLyAvLyAvCiAgL18vICAgXF8sXy9cXywgLwogICAgICAgICAgICAvX19fLwoK'),
        '一个简单的聚合收款码 | ⚠️️仅供个人收款使用\n', 'https://github.com/alex3236/pay\n\n',
        '已启用支付方式：' + payment_desc.join(', '), '\n\n'
    );
}

function init() {
    // 标题和 favicon
    if (!isEmpty(basic.title)) {document.title = basic.title}
    if (!isEmpty(basic.favicon)) {$('link[rel~="icon"]')[0].href = basic.favicon}

    // 支付 APP 识别
    for (p in urls) {
        p = urls[p];
        if (navigator.userAgent.match(new RegExp(p.ua, 'i'))) {
            payment_app = p.name;
            desc = '长按识别以使用 ' + payment_app + ' 付款';
            if (typeof p.addr !== 'undefined') {
                payment_url = p.addr;
                if (isHTTP(payment_url) && basic.uri_redirect) {
                    window.location = payment_url;
                    return;
                } else {
                    make_code_if_online(p.addr, desc);
                }
            }
            if (typeof p.img !== 'undefined') {
                make_code('img', p.img, desc);
            }
        }
    }

    if (!payment_app) {
        $('#switch-btn').hide();
        make_full_code(payment_desc.join(' / ') + ' 扫码付款');
    }

    // 主题设置
    $('body').css('background', isColor(theme.page_bg) ? theme.page_bg : 'url(' + theme.page_bg + ')');
    $('.main').css('background-color', theme.card_bg);
    $('#qrcode').css('background-color', theme.qrcode_bg);
    $('#qrcode').css('color', theme.qrcode_fg);

    // 头像
    if (isEmpty(basic.avatar)) {
        $('#avatar').remove();
    } else {
        $('#avatar').css('background-image', 'url(' + basic.avatar + "), url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEa8AABGvAff9S4QAAAAMSURBVBhXY1iyeTcABBECEzIl58wAAAAASUVORK5CYII=')");
    }

    // 小工具
    if (!tools.badge_generator || payment_app) {
        $('#badge-btn').hide();
    }
    if (!tools.dl_btn || payment_app) {
        $('#dl-btn').hide();
    }
    
    // 付款方式切换按钮
    $('#switch-btn').click(function () {
        if ($(this).prop('name') == 'payment') {
            $(this).prop('name', 'full');
            $(this).html('<i class="icon icon-loop"></i>使用' + payment_app + '付款');
            make_full_code('截图后用 ' + payment_desc.join(' / ') + ' 扫码付款');
        } else {
            $(this).prop('name', 'payment');
            $(this).html('<i class="icon icon-loop"></i>使用其他付款方式');
            make_code_if_online(payment_url);
        }
    })

    // 头像点击跳转
    $('#user').click(() => {
        if (!isEmpty(basic.user_page) && !payment_app) {
            window.open(basic.user_page, '_blank');
        }
    })

    // 下载按钮
    $('#dl-btn').click(() => {
        print_div($('#main')[0]);
    })

    // 徽章生成器
    $('#badge-btn').click(() => {
            var ins = $('#badge-iframe');
            if (ins.children().length == 0) {
                ins.prepend('<iframe class="w-100" src="badge.html"></iframe>');
            }
            $('#BadgeModal').modal('show');
    })
}

window.onload = () => {
    init();
    $('#loading').fadeOut(500, () => {
        $('#loading').remove();
    });
    $('footer').show();
}
