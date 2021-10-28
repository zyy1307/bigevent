$(function() {
    // 点击去注册的连接
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // 点击去登录的连接
    $('#link_login').on('click', function() {
            $('.reg-box').hide();
            $('.login-box').show();
        })
        // 从layui身上获取form对象
    let form = layui.form
        //提示层
    let layer = layui.layer
        // 通过form.verrify（）函数自定义校验规则
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
            repwd: function(value) {
                const pwd = $('.reg-box [name=password]').val();
                if (value !== pwd) {
                    return '请保持密码一致'
                }
            }
        })
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/api/reguser',
                data: { username: $('.reg-box [name=user]').val(), password: $('.reg-box [name=password]').val() },
                success: function(res) {
                    if (res.status !== 0) {
                        // return console.log(res);
                        return layer.msg(res.message)
                    }
                    layer.msg('注册成功,请登录')
                        // console.log('注册成功');
                    $('#link_login').click();
                    $('.login-box [name=user]').val($('.reg-box [name=user]').val());
                }
            })

        })
        //监听登录表单提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data:
            // $(this).serialize(),使用此方法没有成功，表单获取为空。上次成功过 以后遇到再研究研究吧
            { username: $('.login-box [name=user]').val(), password: $('.login-box [name=password]').val() },
            success: function(res) {
                if (res.status !== 0) {

                    console.log(res);
                    return layer.msg('登录失败')
                }
                //存token 这里存到了local中
                localStorage.setItem('token', res.token)
                layer.msg('登录成功');
                //跳转页面(后台主页) 借助location对象中的location.href方法可以获取或设置整个URL
                location.href = '/index.html'
            }
        })

    })


})