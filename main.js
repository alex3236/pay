function copy(a, b) { navigator.clipboard.writeText(b).then(() => { a.innerText = '已复制～'; a.disabled = true; setTimeout(() => { a.innerText = '复制'; a.disabled = false }, 1000) }, () => { alert('复制失败，请手动复制') }) }

function setImage(image) {
    $('#avatar').css('background-image', 'url(' + image + "), url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEa8AABGvAff9S4QAAAAMSURBVBhXY1iyeTcABBECEzIl58wAAAAASUVORK5CYII=')")
}
const link = {
    qq_weserv: (val='10000') => 'https://images.weserv.nl/?url=http%3A%2F%2Fq1.qlogo.cn%2Fg%3Fb%3Dqq%26nk%3D' + val + '%26s%3D160',
    gravatar: (val='') => "https://secure.gravatar.com/avatar/" + md5(val.toLowerCase().trim()) + "?size=150",
    gravatar_zenruns: (val='') => "https://gravatar.zeruns.tech/avatar/" + md5(val.toLowerCase().trim()) + "?size=150",
    alapi: (val='') => 'https://v1.alapi.cn/api/avatar?email=' + val + '&size=100',
    gh: (val='ghost') => 'https://avatars.githubusercontent.com/' + val,
    gh_weserv: (val='ghost') => 'https://images.weserv.nl/?url=https://avatars.githubusercontent.com/' + val + '%3Fv%3D3'
}

function generate() {
    platform = $('#platform').val();
    val = $('#val').val();
    val = val == '' ? undefined : val;
    avatar = link[platform](val);
    setImage(avatar)
    $('#link').val(avatar)
}

window.onload = () => {
    generate();
}