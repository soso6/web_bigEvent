$(function() {
    $('#goReg').on('click', function() {

        $('.login-box').hide()
        $('.regist-box').show()

    })
    $('#goLogin').on('click', function() {

        $('.login-box').show()
        $('.regist-box').hide()
    })


    var form = layui.form
    var layer = layui.layer
    form.verify({
        uname: function(value, item) {
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全是数字'
            }

        },
        repwd: function(value, item) {


            var psw = $('.regist-box [name=password]').val();
            if (value != psw) {
                return "两次输入的密码不一致"
            }
        },
        pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ]
    })

    $('#reg-form').on("submit", function(e) {

        e.preventDefault();
        var data = {

            username: $('#reg-form [name=username]').val(),

            password: $('#reg-form [name=password]').val()
        }
        $.post("/api/reguser", data, function(res) {
            layer.msg(res.message)
            if (res.status == 0) {
                console.log('获取成功')
                $(".login-box [name=username]").val(data["username"])
                $(".login-box [name=password]").val(data["password"])
                $('#goLogin').click()
            } else {
                console.log("获取失败")
            }
        })


    })
    $('#log-box').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: 'POST',
            // 快速获取表单中的数据
            data: {
                username: $(".login-box [name=username]").val(),
                password: $(".login-box [name=password]").val()
            }, //$(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg("登入失败")
                }
                layer.msg("登入成功")
                localStorage.setItem("token", res.token);
                location.href = '/index.html'
            }
        })
    })
})