$(function() {

    var form = layui.form
    $('#btnResert').on('click', clickResert)
    $('.layui-form').on('submit', function(e) {


        e.preventDefault();

        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            success: function(res) {
                console.log(res)
                if (res.status == 0) {
                    // 更新主界面的名字和头像
                    window.parent.getUserInfo()

                }
                layui.layer.msg(res.message)
            }



        })
    })
    form.verify({

        unick: function(value, item) {

            if (/^\d+\d+\d&/.test(value)) {

                return '用户名不能是全数字';

            }
            if (value.length > 16) {
                return '用户名长度不能超过16位';
            }

        }

    })
    requestBaseInfo()

    function requestBaseInfo() {

        $.ajax({
            url: "/my/userinfo",
            method: "GET",

            success: function(res) {
                if (res.status == 0) {
                    initInfo(res.data)
                    return
                }
            }
        })
    }

    function initInfo(res) {

        layui.form.val('main-form', res)

    }

    function clickResert(e) {
        e.preventDefault()

        requestBaseInfo()

    }
})