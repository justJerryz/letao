$(function(){
  // 左侧柱状图
  var myChartLeft = echarts.init(document.querySelector('.echarts-left'));

  option = {
    title: {text: '2018销售情况'},
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    tooltip: {
      trigger: 'item'
    },
    yAxis: {
        type: 'value',
    },
    legend: {
        data: ['人数','销量']
    },
    series: [{
        name: '人数',
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
        },
        {
          name: '销量',
          data: [220, 150, 300, 150, 30, 200, 100],
          type: 'bar'
        }
    ]
  };
  myChartLeft.setOption(option);

  // 右侧饼状图
  var myChartRight = echarts.init(document.querySelector('.echarts-right'));
  option = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年10月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','贵人鸟','dxd','波司登']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'贵人鸟'},
                {value:135, name:'dxd'},
                {value:1548, name:'波司登'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
  };
  myChartRight.setOption(option);

})