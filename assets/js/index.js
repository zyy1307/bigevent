function getUserInfo() {
    // let tokenStr =localStorage.getItem('token')
    // console.log(tokenStr);
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },已在baseAPI中统一添加
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败，请重新登录')
                }
                renderAvatar(res.data);
            }
            // complete函数无论成功失败都会执行
            // complete: function(res) {
            //     if (res.responseJSON.status === 1) {
            //         // 强制清空token、强制跳转
            //         localStorage.removeItem('token');
            //         location.href = '/login.html'
            //     }
            // }
    })
}
// 调用渲染用户头像
function renderAvatar(user) {
    //可能出现没有昵称
    let name = user.nickname || user.username;
    $('#welcome').text(name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.text-avatar').text(name.substr(0, 1)).show();
        $('.layui-nav-img').hide();
    }
}
let layer = layui.layer;
$(function() {
    getUserInfo();

    $('#btn-logout').on('click', function() {
        layer.confirm('确认退出吗', { icon: 3, title: '提示' }, function(index) {
            //此时要清空本地储存中的token
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });

    })

})