

$(function(){

  render();

  function render(){
    $.ajax({
      url: '/cart/queryCart',
      dataType: 'json',
      success: function(info){
        console.log(info);
        if ( info.error === 400 ) {
          location.href = "login.html?retUrl=" + location.href;
          return;
        }
        $('.lt_main .mui-scroll').html(template('cartTmp',{list:info}));
      }
    });
  }

  $('.lt_main').on('click','.btn_delete',function(){
    var id = $(this).data("id");

    $.ajax({
      url: '/cart/deleteCart',
      data: {
        id: id
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        if (info.success) {
          render();
        }
      }
    })
  });
})