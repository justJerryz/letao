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
  });

  // 模态框
  $('.ltb-mode').click(function() {
    // 让模态框显示
    $('#myModal').modal("show");
  })

});