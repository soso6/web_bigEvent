$(function() {
    var form = layui.form;
    var laypage = layui.laypage;
    var layer = layui.layer
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    initTable()
    initFormCate()
    template.defaults.imports.timeFormat = function(val) {
        var dt = new Date(val)
        var y = addZerofunc(dt.getFullYear())
        var m = addZerofunc(dt.getMonth() + 1)
        var d = addZerofunc(dt.getDate())
        var h = addZerofunc(dt.getHours())
        var m = addZerofunc(dt.getMinutes())
        var s = addZerofunc(dt.getSeconds())

        return y + "-" + m + "-" + d + " " + h + ":" + m + ":" + s


    }

    function addZerofunc(num) {

        if (num < 9) {
            return '0' + num;

        } else {
            return num
        }

    }

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status == 0) {
                    var htmlStr = template('table-template', res)
                    $('tbody').html(htmlStr)
                    var total = res.total
                    renderPage(total)
                }
            }
        })
    }

    function initFormCate() {
        $.ajax({

            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                console.log('获得的成功' + res)
                if (res.status == 0) {

                    var htmlStr = template('form-cate', res)
                    $('[name=cate_id]').html(htmlStr)

                    //layui在加载进来后会自动去渲染整个界面，但是这个是空的，当我们进行赋值的时候没有重新渲染

                    form.render()
                }

            },

        })

    }
    $('.form_cate').on('submit', function(e) {

        e.preventDefault()

        var cate_id = $('[name=cate_id]').val()

        var state = $('[name=state]').val()

        q.cate_id = cate_id
        q.state = state

        initTable()

    })

    function renderPage(num) {

        laypage.render({
            elem: 'pagebox',
            count: num,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'refresh', 'prev', 'page', 'next', 'skip'],
            // 
            limits: [2, 3, 4, 5, 6],
            /*触发jump的方式
             * 1、点击了页码就会触发
             * 2、只要调用了laypage.render()方法就会触发jump回调
             */
            jump: function(obj, first) {
                    q.pagenum = obj.curr
                        //每页的条目数改变也会调用jump事件
                    q.pagesize = obj.limit
                        //、first（是否首次，一般用于初始加载的判断）
                    if (!first) {
                        initTable()
                    }

                }
                //数据总数，从服务端得到
        });
    }
    /**
     * 删除文章
     */
    $('tbody').on('click', '.btn_delet', function(e) {
            var len = $('.btn_delet').length
            var id = $(this).attr('data_id')
            layer.confirm('您确定删除该文章?', { icon: 3, title: '提示' }, function(index) {
                //do something
                $.ajax({
                    method: "GET",
                    url: '/my/article/delete/' + id,
                    success: function(res) {
                        if (res.status == 0) {
                            //需要判断当前页还有没有数据，没有值就需要将页码值减1
                            if (len <= 1 && q.pagenum > 1) {
                                q.pagenum--;
                            }
                            initTable()
                        }
                        layer.msg(res.message)
                    }
                })
                layer.close(index);
            });
        })
        /**
         * 文章修改
         *
         */
    $('tbody').on('click', '.btn_edit', function(e) {
        var id = $(this).attr('data_id')
            //do something
        $.ajax({
            method: "GET",
            url: '/my/article/' + id,
            success: function(res) {
                if (res.status == 0) {
                    localStorage.setItem('editArticleId', JSON.stringify(res.data))
                    location.href = "../article/articleedit.html"
                }

            }
        })
    })

})