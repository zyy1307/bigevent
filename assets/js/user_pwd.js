$(function() {
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        samePwd: function(value) {
            const oldPwd = $('[name=oldPwd]').val();
            if (value === oldPwd) {
                return '密码重复'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '请保持密码一致'
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: { id: 41524, password: $('[name=newPwd]').val() },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('提交失败')
                }

                $('.layui-form')[0].reset();
            }
        })
    })
})