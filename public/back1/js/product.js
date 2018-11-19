

$(function(){
  var currentPage = 1;
  var pageSize = 3;
  var imgArr = [];

  render();

  function render(){
    $.ajax({
      url: '/product/queryProductDetailList',
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('tbody').html(template('productTmp',info));
      }
    })
  }

  // 显示模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info){
        console.log(info);       
        $('.dropdown-menu').html(template('addTmp',info));
      }
    })
  });

  // 下拉列表
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    var id = $(this).data('id');

    $('.dropdowntext').text(txt);
    $('[name="categoryId"]').val(id);

    $("#form").data('bootstrapValidator').updateStatus('brandId','VALID');
  });

  // 上传图片
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function(e,data){
      console.log(data);
      var picObj = data.result;
      var picUrl = picObj.picAddr;
      console.log(picObj);

      imgArr.unshift(picObj);

      $('.img').prepend('<img src="'+ picUrl +'" height="100">');

      if (imgArr.length > 3) {
        $('.img img:last-of-type').remove();
        imgArr.pop();
        console.log(imgArr);       
      }

      if (imgArr.length === 3) {
        $("#form").data('bootstrapValidator').updateStatus('picStatus','VALID');
      }
    }
  });

  // 表单校验初始化 
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
          message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
          message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
          message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
          message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "首字母不为0的数字"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
          message: '请选择二级分类'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入xx-xx格式,xx为数字"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
          message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
          message: '请输入商品现价'
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传三张图片'
          }        
        }
      }
    }
  });

  // 提交表单
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    var prams = $('#form').serialize();
    console.log(imgArr);
    // console.log(prams);
    prams += "&picName1="+ imgArr[0].picName +"&picAddr1="+imgArr[0].picAddr;
    prams += "&picName1="+ imgArr[1].picName +"&picAddr1="+imgArr[1].picAddr;
    prams += "&picName1="+ imgArr[2].picName +"&picAddr1="+imgArr[2].picAddr;
    
    $.ajax({
      url: '/product/addProduct',
      data: prams,
      type: 'post',
      dataType: 'json',
      success: function(info){
        if (info.success) {
          currentPage = 1;
          render();
          $('#addModal').modal('hide');

          $("#form").data('bootstrapValidator').resetForm(true);
          $('.dropdowntext').text('请选择二级分类');
          $('.img img').remove();
          imgArr = [];
        }
      }
    })
  })

})