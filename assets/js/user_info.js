let form = layui.form

function initUserInfo() {

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res.data);
            form.val('formUserInfo', res.data)
        }

    })
}
$(function() {
    initUserInfo()
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '长度必须在1-6个字符之间'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        console.log({ username: $('.layui-input-block [name=username]').val(), nickname: $('.layui-input-block [name=nickname]').val(), email: $('.layui-input-block [name=email]').val() });
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            //我的天 折磨死我了 没有id无法辨别吧 真的无语！可能where条件没有id没找到
            data: { id: 41524, nickname: $('.layui-input-block [name=nickname]').val(), email: $('.layui-input-block [name=email]').val() },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('提交失败')
                }
                layui.layer.msg('更新成功');
                window.parent.getUserInfo();
            }
        })
    })
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo()
    })

})