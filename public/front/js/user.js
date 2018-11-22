

$(function(){
  $.ajax({
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function(info){
      // console.log(info);
      if(info.error === 400){
        location.href = 'login.html';
        return;
      }
      $('#userInfo').html(template('userTmp',info));
    }
  });

  // 退出
  $('#logout').click(function(){
    $.ajax({
      url: '/user/logout',
      dataType: 'json',
      success: function(info){
        if (info.success) {
          location.href = 'login.html';
        }
      }
    })
  })
})