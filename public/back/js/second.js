

$(function () {
  var currentPage = 1;
  var pageSize = 5;

  render();

  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('tbody').html(template('secondTmp', info));

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, // 版本号
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked: function (a, b, c, page) {
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
  $('#addBtn').click(function () {
    $('#addModal').modal('show');
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        
        $('.dropdown-menu').html(template('listTmp', info));
      }
    })
  });

  // 下拉菜单点击事件
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('#dropdownText').text(txt);

    var id = $(this).data('id');
    $('[name="categoryId]"').val(id);

    // $('[name="categoryId"]').trigger('input');
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");

  });

  // 文件上传初始化
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      var result = data.result;
      var picUrl = result.picAddr;
      // console.log(picUrl);
      
      $('#imgbox img').attr('src', picUrl);
      $('[name="brandLogo"]').val(picUrl);
      // $('[name="brandLogo"]').trigger('input');
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  // 表单校验
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
  });

  // 提交表单
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    $.ajax({
      url: '/category/addSecondCategory',
      type: 'post',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info){
        console.log(info);
        if (info.success) {
          currentPage = 1;
          render();
          $('#addModal').modal('hide');

          $("#form").data('bootstrapValidator').resetForm(true);
          $('#dropdowntext').text('请选择一级分类');
          $('.img img').attr('src','./images/none.png');
        }
      }
    })
  })

})