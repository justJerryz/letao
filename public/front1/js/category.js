

$(function(){
  // 左侧渲染
  $.ajax({
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function(info){
      console.log(info);
      $('.category-left ul').html(template('leftTmp',info));
    }
  });
  // 右侧点击显示
  $('.category-left').on('click','a',function(){
    var id = $(this).data('id');
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');

    $.ajax({
      url: '/category/querySecondCategory',
      data:{
        id : id
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('.category-right ul').html(template('rightTmp',info));
      }
    })
  })

})