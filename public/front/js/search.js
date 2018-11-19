$(function(){
  
  // 渲染模板
  render();

  function getHistory(){
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var jsonArr = JSON.parse(jsonStr);
    return jsonArr;
  }
  console.log(getHistory());
  
  function render(){
    var arr = getHistory();
    $('.lt-history').html(template('searchTmp',{list:arr}));    
  }

  //全部删除
                      // 一清空就会报错,  空数组
  $('.lt-history').on('click','.searchEmpty',function(){
    console.log(1);    
    mui.confirm('你确定要删除对话框吗?','温馨提示',['取消','确认'],function (e) {
      console.log(e);
      if (e.index === 1) {
        localStorage.removeItem('search_list');
        render();
      }
    })
  });

  // 单个删除
  $('.lt-history').on('click','.btn-delete',function(){
    var index = $(this).data('index');
    console.log(index);
    var arr =  getHistory();
    arr.splice(index,1);
    localStorage.setItem('search_list',JSON.stringify(arr));
    console.log(arr);
    render();
    
  });

  // 添加记录
  $('.btn-search').click(function(){
    var key = $('.search-input').val().trim();
    // console.log(key);
    if ( key === "" ) {
      mui.toast("请输入搜索关键字");
      return;
    }

    var arr = getHistory();

    var index = arr.indexOf(key);
    console.log(index);
    
    if( index === 1){
      arr.splice(index,1);
    }

    arr.unshift(key);

    console.log(arr);
    if (arr.length > 6) {
      arr.pop();
    }

    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
    
    $('.search-input').val('');
  
    location.href = 'searchList.html?key=' + key;
  })
  
})