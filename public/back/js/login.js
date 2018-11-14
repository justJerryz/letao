

$(function(){
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators:{
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength:{
            min:3,
            max:15,
            message: "用户名长度在3到15之间"
          }
        }
      },
      password:{
        validators:{
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength:{
            min:6,
            max:20,
            message: "密码长度在6到20之间"
          }
        }
      }
    }
  });

  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      url:"/employee/employeeLogin",
      type: "post",
      data: $('#form').serialize(),
      datatype: 'json',
      success : function(info){
        if(info.success){
          location.href = 'index.html';
        }
        console.log(info.success);
        console.log(info.error);

        
        if(info.error === 1000){
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }

        if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    })
  });

  $('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
  })

});