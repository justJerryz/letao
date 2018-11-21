

$(function(){
  // 渲染搜索历史
  render();

  function getArr(){
    var str = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(str);
    return arr;    
  }
  
  function render(){
    var arr = getArr();
    $('.lt-history').html(template('searchTmp',{list:arr}));
  }

  // 全部删除
  $('.lt-history').on('click','.cleanAll',function(){
    var arr = getArr();
    mui.confirm( '你确定要全部删除吗?','温馨提示', ['取消','确认'], function(e){
      if (e.index == 1) {      
        localStorage.removeItem('search_list');
        render();
      }      
    })
  });

  // 单个删除
  $('.lt-history').on('click','.btn_delete',function(){
    var arr = getArr();
    var index = $(this).data('id');
    arr.splice(index,1);
    // console.log(arr);
    localStorage.setItem('search_list',JSON.stringify(arr));
    render();    
  });

  // 添加历史记录
  $('.btn-search').click(function(){
    var key = $('.search-input').val();
    var arr = getArr();

    if(key === ''){
      mui.toast("内容不能为空哦")
      return;
    }

    var index = arr.indexOf(key);
    if (index != -1) {
      arr.splice(index,1);
    }
    arr.unshift(key);

    if(arr.length >=6){
      arr.pop();
    }

    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
    $('.search-input').val('');
  })

})