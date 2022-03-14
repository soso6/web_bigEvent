$(function() {
    var layer = layui.layer;
    var form = layui.form


    initCLassInfo()
    initEditor()

    function initContent() {

        var info = JSON.parse(localStorage.getItem('editArticleId'))
        form.val('mainForm', info)
        var newImgURL = URL.createObjectURL(info.cover_img)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    }

    function initCLassInfo() {

        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function(res) {

                if (res.status == 0) {
                    var htmlStr = template('temp-class', res)
                    $("[name=cate_id]").html(htmlStr)
                    form.render()
                    return
                }

                layer.msg(res.message)


            }
        })

    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('.btn_select').on('click', function() {
        $('#file_select').click()
    })
    $('#file_select').on('change', function(e) {

        var fileList = e.target.files
        if (fileList.length < 1) {
            return
        }
        var newImgURL = URL.createObjectURL(fileList[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    var stateStr = "草稿"
    $('#btn_publish').on('click', function() {

        stateStr = "已发布"

    })
    $('.form_publish').on('submit', function(e) {
        e.preventDefault()

        var fd = new FormData($(this)[0])
        fd.append('state', stateStr)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                publishArticle(fd);
                fd.forEach(function(v, k) {


                    console.log("key:" + k + 'val:' + v)
                });
            })

        // publishArticle(fd)
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/edit',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                layer.msg(res.message)
                if (res.status == 0) {
                    //发表成功后跳转到文章列表界面
                    location.href = '../article/articlelist.html'
                }
            }

        })


    }
    initContent()

})