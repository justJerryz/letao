
$(function(){
  // 动态添加数据,渲染页面
  var currentPage = 1;
  var pageSize = 5;

  var currentId; // 当前正在修改的用户 id
  var isDelete;  // 需要修改的状态
  
  render();

  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info){
        console.log(info);
        $('tbody').html(template("tmp",info));
        // 分页插件
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:  3,//默认是2，如果是bootstrap3版本，这个参数必填
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

  $('tbody').on('click','.btn',function(){
    // 显示模态框
    $('#btnModal').modal('show');   
    currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1; 
  });

  $('#confirmBtn').click(function(){
    $.ajax({
      url:'/user/updateUser',
      data: {
        id:currentId,
        isDelete:isDelete
      },
      dataType:'json',
      type: 'post',
      success : function(info){
        console.log(info);
        if(info.success){
          $('#btnModal').modal('hide');
          render();
        }
      }
    })
  })
});