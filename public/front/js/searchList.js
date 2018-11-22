

$(function(){
  var key = getSearch('key');
  $('.search-input').val(key);

  render();

  $('.btn-search').click(function(){
    render();
  });

  $('.lt_sort a[data-type]').click(function(){
    if ($(this).hasClass('current')) {     
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else{
      $(this).addClass('current').siblings().removeClass();
    }
    render();
  })
  
  function render(){
    $('.lt_product').html('<div class="loading"></div>');
    var prams = {};
    prams.proName = $('.search-input').val();
    prams.page = 1;
    prams.size = 100;

    var $current = $('.lt_sort a.current');
    if($current.length === 1){
      var sortName = $current.data('type');
      var sort = $current.find('i').hasClass('fa-angle-down') ? '2' : '1';
      prams[sortName] = sort;
    }

    setTimeout(function(){
      $.ajax({
        url: '/product/queryProduct',
        data: prams,
        dataType: 'json',
        success: function(info){
          console.log(info); 
          $('.lt_product').html(template('productTmp',info));       
        }
      });
    },1000)
  }
})