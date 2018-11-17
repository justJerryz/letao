// 进度条
$(document).ajaxStart(function () {
  NProgress.start();
});

$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500)
})

$(function(){
  // 二级菜单切换
  $('.category').click(function(){
    $(this).next().slideToggle();
  });

  // 隐藏右侧菜单
  $('.menu-left').click(function(){
    $('.lt-aside').toggleClass('current');
    $('.lt-main').toggleClass('current');
    $('.lt-topbar').toggleClass('current');
  });

  // 显示模态框
  $('.ltb-mode').click(function(){
    $('#myModal').modal('show');
  });

  // 退出登录
  $('#logoutBtn').click(function(){
    $.ajax({
      url:"/employee/employeeLogout",
      dataType: "json",
      success:function(info){
        if (info.success) {
          location.href = 'login.html';
        }
      }
    })
  })
})