const url = new URL('.', location.href).href;
$('#bg-color').editableSelect({ effects: 'slide', filter: false });
$('#fg-color').editableSelect({ effects: 'slide', filter: false });
$('#logo').editableSelect({ effects: 'slide', filter: false });

is_offline = (!window.navigator.onLine || /^(file:\/*|(https?:)?(\/\/)?(localhost|127.))/.test(location.href));
if (is_offline) {
    document.body.innerHTML = '<strong>网页离线\t请先部署到服务器</strong>';
}

function copy(a, b) { navigator.clipboard.writeText(b).then(() => { a.innerText = '已复制～'; a.disabled = true; setTimeout(() => { a.innerText = '复制'; a.disabled = false }, 1000) }, () => { alert('复制失败，请手动复制') }) }

function updateBadge() {
    text = $('#text').val()

    badge_url = encodeURI('https://img.shields.io/badge/' + text + '-' + $('#bg-color').val() + '?' + $.param({
        logo: $('#logo').val(),
        logoColor: $('#fg-color').val(),
        style: $('#style').val()
    }))

    //badge_url = encodeURI('text-color?logo=Alipay&logoColor=white&style=style_text'.replace('text', text).replace('color', color).replace('Alipay', icon).replace('style_text', style).replace('white', logo_color));

    $('#markdown').val('[![text](badge_url)](url)'.replace('text', text).replace('badge_url', badge_url).replace('url', url));
    $('#html').val('<a href="url"><img src="badge_url" alt="text"></a>'.replace('text', text).replace('badge_url', badge_url).replace('url', url));
    document.getElementById('preview').innerHTML = $('#html').val();
}

window.onload = updateBadge;