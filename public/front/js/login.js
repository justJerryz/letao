$(function(){
  $('#loginBtn').click(function(){
    var userName = $('#username').val().trim();
    var password = $('#password').val().trim();

    if ( username === "" ) {
      mui.toast("请输入用户名");
      return;
    }

    if ( password === "" ) {
      mui.toast("请输入密码");
      return;
    }

    $.ajax({
      url: '/user/login',
      type: 'post',
      data:{
        username: userName,
        password: password
      },
      dataType: 'json',
      success: function(info){
        if(info.success){
          if(location.search.indexOf('retUrl=') != -1){
            var info = location.search.replace('?retUrl=','');
            location.href = info;
          }else{
            location.href = 'user.html';
          }
        }else{
          mui.toast('用户名或密码错误');
        }
      }
    })
  })
})