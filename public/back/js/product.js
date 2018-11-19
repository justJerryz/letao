

$(function(){
  var currentPage = 1;
  var pageSize = 3;
  var picArr = [];

  render();

  function render(){
    $.ajax({
      url:"/product/queryProductDetailList",
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('tbody').html(template('productTmp',info));
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(  info.total / info.size ),
          onPageClicked: function( a, b, c, page ) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 显示模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');

    $.ajax({
      url:'/category/querySecondCategoryPaging',
      data:{
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('.dropdown-menu').html(template('slidedownTmp',info));

      }
    })
  });

  // 下拉菜单
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    var id = $(this).data('id');

    $('#dropdownText').text(txt);
    $('[name="categoryId"]').val(id);

     $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });

  // 图片
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function(e,data){
      console.log(data);
      // 图片对象
      var picObj = data.result;
      //图片地址
      var picUrl = picObj.picAddr;

      picArr.unshift(picObj);
           
      $('#imgbox').prepend('<img src="'+ picUrl +'" style="height: 100px" alt="">');

      if (picArr.length>3) {
        $('#imgbox img:last-of-type').remove();
        picArr.pop();
        console.log(picArr);
      }

      if(picArr.length === 3){
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
            message: '请输入非零开头的数字'
          }        
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message:'请输入xx-xx的格式, xx为数字'
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
      },
    }
  
  });

  // 提交表单
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    var prams = $('#form').serialize();
    console.log(picArr);
    // params += "&picName1=xx&picAddr1=xx"
    prams += "&picName1="+picArr[0].picName +"&picAddr1="+picArr[0].picAddr;
    prams += "&picName1="+picArr[1].picName +"&picAddr1="+picArr[1].picAddr;
    prams += "&picName1="+picArr[2].picName +"&picAddr1="+picArr[2].picAddr;

    $.ajax({
      url: '/product/addProduct',
      type: 'post',
      data: prams,
      dataType: 'json',
      success: function(info){
        if (info.success) {
          currentPage = 1;
          render();
          $('#addModal').modal('hide');

          $('#dropdownText').text('请选择二级分类');
          $('#imgbox img').remove();

          picArr = [];
        }
      }
    })
  })
})