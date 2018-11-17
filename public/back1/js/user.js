

$(function(){
  var currentPage = 1;
  var pageSize = 5;

  var currentId;
  var isDelete;
  
  render();
  
  function render(){    
    $.ajax({
      url:"/user/queryUser",
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('tbody').html(template('userTmp',info));
        // 分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size:"small",
          onPageClicked:function(a, b, c,page){
           currentPage = page;
            render();
          }
        });
      }
    });
  }

  // 操作按钮
  $('tbody').on('click','.btn',function(){
    $('#btnModal').modal('show');
    currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
  });

  // 确认按钮
  $('#confirmBtn').click(function(){
    $.ajax({
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      type: 'post',
      dataType: 'json',
      success: function(info){
        if (info.success) {
          render();
          $('#btnModal').modal('hide');
        }
      }
    })
  })
})