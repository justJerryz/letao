

$(function(){
  $.ajax({
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function(info){
      console.log(info);
      $('.lt_category_left ul').html(template('leftSearch',info));
      renderId(info.rows[0].id)
    }
  });

  // 点击事件
  $('.lt_category_left').on('click','a',function(){
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    var id = $(this).data('id');
    renderId(id);
  });

  function renderId(id){
    $.ajax({
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      success: function(info){
        console.log(info);       
        $('.lt_category_right ul').html(template('rightSearch',info));
      }
    })
  }
})