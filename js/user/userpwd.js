$(function() {

    var form = layui.form
    form.verify({
        password: function(value, item) {

            // if (/^\d+\d+\d&/.test(value)) {

            //     return '密码不能全是数字'
            // }
            if (/^[%S]{6,12}&/.test(value)) {

                return '密码不能出现空格，必须是6-12位之间'
            }


        },

        samepwd: function(val, item) {

            if (val == $('[name=oldPwd]').val()) {

                return '新旧密码不能相同';
            }

        },
        repwd: function(val) {

            if (val != $('[name=newPwd]').val()) {
                return '两次输入的密码不相同';
            }
        }
    })
    $('.layui-form').on('submit', function(e) {

        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status == 0) {
                    //重置表单
                    $('.layui-form')[0].reset()

                }

                layui.layer.msg(res.message)

            }

        })


    })


})