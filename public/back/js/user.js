
$(function(){
  $.ajax({
    url: '/user/queryUser',
    type: 'get',
    data: {
      page: 1,
      pageSize: 5
    },
    dataType: "json",
    success: function(info){
      console.log(info);
      $('tbody').html(template("tmp",info));
    }
  })
});