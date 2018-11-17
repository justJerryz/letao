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
        data: [200, 6000, 1500, 800, 700, 1100, 1300],
        type: 'bar'
        },
        {
          name: '销量',
          data: [2020, 1500, 3000, 1500, 300, 2000, 1000],
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
        data: ['耐克','阿迪','李宁','361','波司登']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:400, name:'阿迪'},
                {value:700, name:'李宁'},
                {value:335, name:'361'},
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