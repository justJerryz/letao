
$(function(){

  // 左侧渲染
  $.ajax({
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function(info){
      console.log(info);
      $('.lt-left ul').html(template('leftTmp',info));
      render(info.rows[0].id);
    }
  });


  // 右侧渲染
  $('.lt-left').on('click','a',function(){
    var num = $(this).data('id');
    console.log(num);
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    render(num);
  });

  function render(num){
    $.ajax({
      url: '/category/querySecondCategory',
      data: {
        id : num
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('.lt-right ul').html(template('rightTmp',info));
      }
    })
  }
})