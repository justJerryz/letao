$(function(){
  var currentPage = 1;
  var pageSize = 5;

  render();

  function render(){
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        
        $('tbody').html(template('firstTmp',info));
        $('#pagintor').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 当前页
          currentPage: info.page,
          // 给按钮添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }

  // 添加分类-显示模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
  });

  // 添加分类-表单校验
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      }
    } 
  });

  // 添加分类-提交表单
  // 阻止浏览器的默认跳转行为
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    $.ajax({
      url: '/category/addTopCategory',
      type: 'post',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info){
        // console.log(info);
        if (info.success) {
          currentPage = 1;
          render();
          $('#addModal').modal('hide');
          $("#form").data('bootstrapValidator').resetForm(true); 
        }
      }
    })
  })
})