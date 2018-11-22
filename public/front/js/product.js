$(function(){
  
  var productId = getSearch('productId');

  $.ajax({
    url: '/product/queryProductDetail',
    data:{
      id: productId
    },
    dataType: 'json',
    success: function(info){
      console.log(info);
      $('.lt_main .mui-scroll').html(template('productTmp',info));
      
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 4000
      });

      // 手动初始化 mui 数字框
      mui('.mui-numbox').numbox()
    }
  });

  // 尺码高亮
  $('.lt_main').on('click','.lt_size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  });
  
  // 购物车
  $('#addCart').click(function(){
    var size = $('.lt_size span.current').text();
    var num = $('.mui-numbox-input').val();

    if(size === null){
      mui.toast("请选择尺码");
    }

    $.ajax({
      url: '/cart/addCart',
      type: 'post',
      data: {
        productId : productId,
        num : num,
        size : size
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        if (info.error === 400) {
          location.href = 'login.html?retUrl=' + location.href;
          return;
        }
        
        if ( info.success ) {
          // 当前用户已登录, 正常加入成功, 给用户提示
          mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function( e ) {

            // e.index 标记用户点击的索引(下标)
            if ( e.index === 0 ) {
              location.href = "cart.html";
            }
            else {
              console.log("继续浏览");
            }

          })
        }
      }
    })
  })
})