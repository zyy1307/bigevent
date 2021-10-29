//每次调用get/post/ajax时 会先调用这个函数（虽然你不知道）prefilter，其中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //再发起真正的ajax之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        // 统一添加headers
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //统一挂载complete
    options.complete = function(res) {
        if (res.responseJSON.status === 1) {
            // 强制清空token、强制跳转
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})