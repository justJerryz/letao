$(function(){
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 3,
            max: 30,
            message: '用户名长度必须在3到30之间'
          }
        }
      },
      password:{
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 30,
            message: '密码长度必须在6到30之间'
          }
        }
      }
    }
  });

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url: '/employee/employeeLogin',
      data: $("#form").serialize(),
      type: 'post',
      datatype: 'json',
      success: function(info){

        if(info.success){
          location.href = 'index.html';
        }

        if(info.error === 1000){          
          $("#form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        }

        if(info.error === 1001){          
          $("#form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
      }
    })
  });

  $('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
  })
});