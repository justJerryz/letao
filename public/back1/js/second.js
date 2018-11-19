$(function(){
  var currentPage = 1;
  var pageSize = 5;

  render();

  // 表格渲染
  function render(){
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('tbody').html(template('secondTmp',info));
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

  // 模态框显示
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
    
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('.dropdown-menu').html(template('dropdownTmp',info));
      }
    })
  });

  // 下拉菜单点击
  $('.dropdown').on('click','a',function(){
    $('.dropdowntext').text($(this).text());
    $('[name="categoryId]"').val($(this).data('id'));
    // 更新当前字段的状态
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });

  // 文件上传初始化
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var picUrl = data.result.picAddr;
      console.log(picUrl);
      $('.img img').attr('src',picUrl);
      $('[name="brandLogo"]').val(picUrl);
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
});


 $('#form').bootstrapValidator({

    // 对隐藏域进行校验
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },


    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },

      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },

      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  })

});

$('#form').on('form.success.bv',function(e){
  e.preventDefault();

  $.ajax({
    url: '/category/addTopCategory',
    data: $('#form').serialize(),
    type: 'post',
    dataType: 'json',
    success: function(info){
      if(info.success){
        currentPage = 1;
        render();
        $('#addModal').modal('hide');
        $("#form").data('bootstrapValidator').resetForm(true);
        $('.dropdowntext').text('请选择一级分类');
        $('.img img').attr('src','./images/none.png');
      }
    }
  })
})