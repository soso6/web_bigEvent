$(function() {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $("#btnupload").on('click', function() {

        $('#fileup').click()

    })
    $('#fileup').on('change', function(e) {

        var fileList = e.target.files
        console.log(fileList)

        if (fileList.length < 1) {

            layer.msg("请选择图片")
            return

        } else {
            var file = fileList[0]

            var newImgURL = URL.createObjectURL(file)
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options)
        }


    })
    $('#btnsure').on('click', function() {
        //获取裁剪后的数据
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL,
            },
            success: function(res) {

                if (res.status == 0) {

                    layer.msg("头像上传成功")
                    window.parent.getUserInfo()
                } else {
                    layer.msg('头像上传失败')
                }

            }
        })

    })
})