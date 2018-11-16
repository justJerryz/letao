// 进度条
$(document).ajaxStart(function(){
 NProgress.start();
});

$(document).ajaxStop(function(){
 setTimeout(function() {
   // 关闭进度条
   NProgress.done();
 }, 500);
});


$(function(){

  // 二级菜单切换
  $('.category').click(function(){
    $(this).next().stop().slideToggle();
    // 无法选中时查看层级问题
  });

  // 点击隐藏左侧菜单
  $('.menu-left').click(function(){
    $('.lt-aside').toggleClass('current');
    $('.lt-main').toggleClass('current');
    $('.lt-topbar').toggleClass('current');
  });

  // 模态框
  $('.ltb-mode').click(function() {
    // 让模态框显示
    $('#myModal').modal("show");
  });

  // 退出登录
  $('#logoutBtn').click(function(){
    $.ajax({
      url:'/employee/employeeLogout',
      type: 'get',
      dataType: 'json',
      success:function(info){
        // console.log(info);
        if (info.success) {
          location.href='login.html';
        }
      }
    })
  });
  
});