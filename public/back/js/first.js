

$(function(){
  var currentPage = 1;
  var pageSize = 5;

  render();

  function render(){
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data:{
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
          totalPages: Math.ceil( info.total / info.size ),
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

  // 显示模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
  });

  // 表单校验
  $('#form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      },
    } 
  });

  // 提交表单
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    
    $.ajax({
      url: '/category/addTopCategory',
      type: 'post',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info){
        console.log(info);
        if(info.success){
          $('#addModal').modal('hide');
          render();
          currentPage: 1;
          
          //重置所有样式,包括input中的文本
          $("#form").data('bootstrapValidator').resetForm(true); 

        }
      }
    })

  });
})