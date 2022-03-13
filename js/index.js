$(function() {


    getUserInfo();
    $('.btnExist').on('click', function() {

        onClickExist()
    })
})


function onClickExist() {
    var layer = layui.layer
    layer.confirm('您确定退出登入?', { icon: 3, title: '提示' }, function(index) {
        //do something
        localStorage.removeItem("token")
        location.href = '/login.html'
    });
    //eg2




}

function getUserInfo() {

    $.ajax({
        url: "/my/userinfo",
        method: "GET",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            console.log(res);
            if (res.status == 0) {

                renderHead(res);

                return
            }
            layui.layer.msg(res.message)
        }



    })

}

function renderHead(res) {

    var data = res.data;
    var name = data.nickname || data.username
    var headPic = data.user_pic
    var firstNa = name[0].toUpperCase()


    if (headPic == null) {

        $(".layui-nav-img").hide()
        $(".labelHead").html(firstNa).show()
        $('.headWel span').html("欢迎&nbsp;&nbsp;" + name);
    } else {
        $(".layui-nav-img")
            .attr('src', headPic)
            .show()
        $(".labelHead").hide()

    }

}