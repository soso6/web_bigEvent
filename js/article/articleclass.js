$(function() {

    var layer = layui.layer
    var layeradd;
    var form = layui.form
    getArticleClass()

    function getArticleClass() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {


                if (res.status == 0) {
                    var htmlStr = template('tem-table', res)
                    console.log(htmlStr)
                    $('tbody').html(htmlStr)
                }

            }
        })

    }

    $('#btnAddClass').on('click', function() {

            layeradd = layer.open({
                type: 1,
                area: ['500px', '300px'],
                title: '添加文章分类',
                content: $('#template-add').html()
            });


        })
        //当前程序执行的时候添加类别的弹窗还没哟存在，所以不能直接绑定事件需要通过代理的方式

    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: "/my/article/addcates",
            data: $('#form-add').serialize(),
            success: function(res) {

                layer.msg(res.message)
                if (res.status == 0) {
                    getArticleClass()
                    layer.close(layeradd)
                }
            }


        })

    })
    var indexEdit = null
    $("tbody").on('click', '.btn-edit', function(e) {

        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#template-edit').html()
        });

        var id = $(this).attr('id-index')
        $.ajax({
            method: 'GET',
            url: "/my/article/cates/" + id,
            success: function(res) {
                if (res.status == 0) {
                    form.val('form-edit', res.data)
                }

            }
        })
    })

    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                layer.msg(res.message)
                if (res.status == 0) {
                    getArticleClass()
                    layer.close(indexEdit)
                }

            }
        })
    })
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('id-index')

        layer.confirm('您确定要删除对应的数据?', { icon: 3, title: '提示' }, function(index) {
            //do something
            console.log("dasdasd>>>>>>>>:" + id)
            $.ajax({
                method: "GET",
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    layer.msg(res.message)
                    if (res.status == 0) {
                        getArticleClass()
                    }
                }
            })


            layer.close(index);
        });

    })


})