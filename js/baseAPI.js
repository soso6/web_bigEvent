$.ajaxPrefilter(function(options) {
    options.url = "http://www.liulongbin.top:3007" + options.url

    if (options.url.indexOf('/my/') != -1) {
        options.headers = { Authorization: localStorage.getItem("token") || "" }
    }
    // headers: {
    //     Authorization: localStorage.getItem("token") || ""
    // },
    //获取的失败直接返回主界面
    options.complete = function(res) {
        //在res.responseJSON中可以拿到数据
        if (res.responseJSON.status === 1) {

            localStorage.removeItem('token')

            location.href = '/login.html'
        }
    }
})