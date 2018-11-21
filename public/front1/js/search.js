

$(function(){

  // 渲染搜索历史
  render();

  function getHistory(){
    var get = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(get);  //将其转化为数组
    return arr;
  }

  function render(){
    var arr = getHistory();
    $('.lt-history').html(template('searchTmp',{list:arr}));
  }

  // 全部删除
  $('.lt-history').on('click','.clearSearch',function(){
    var arr = getHistory();
    mui.confirm( '你确定要清除历史记录吗?', '温馨提示', ["取消", "确认"], function(e){
      console.log(e);
      if (e.index == 1) {
        localStorage.removeItem('search_list');
        render();
      }
    })
  });

  // 删除单个事件
  $('.lt-history').on('click','.btn-delete',function(){
    var index = $(this).data('id');
    var arr = getHistory();
    arr.splice(index,1);
    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
  });

  // 添加数据
  $('.search-btn').click(function(){
    var info = $('.search-input').val().trim();

    if ( info === "" ) {
      mui.toast("请输入搜索关键字");
      return;
    }

    var arr = getHistory();
    var index = arr.indexOf(info)
    // console.log(index);    
    if( index != -1){
      arr.splice(index,1);
    }

    arr.unshift(info);
    if(arr.length >= 6){
      arr.pop();
    }

    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
    
    $('.search-input').val('');
    location.href = "searchList.html?key=" + info;

  });

})