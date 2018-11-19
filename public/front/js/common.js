mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //是否显示滚动条
});
var gallery = mui('.mui-slider');
gallery.slider({
  interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
});

function getSearch(k){
  var str = location.search;
  str = decodeURI(str);

  str = str.slice(1);
  console.log(str);

  var arr = str.split('&');
  console.log(arr);

  var obj = {};
  arr.forEach(function(v,i){
    var key = v.split('=')[0];
    var keyname = v.split('=')[1];
    obj[key] = keyname;
  })
  console.log(obj);
  
  return obj[k];
}