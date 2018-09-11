import React from 'react'
import {Card} from 'antd'
// import echartTheme from
// 按需加载
import echarts from 'echarts/lib/echarts'
// 导入柱形图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Line extends React.Component {


  componentWillMount() {
    // echarts.registerTheme()
  }

  getOption = () => {
    return {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [1000, 2000, 2300, 3000, 1800, 1400, 1700]
        }
      ]
    }
  }
  getOption2 = () => {
    return {
      title: {
        text: '用户骑行订单',
      },
      legend: {
        data: ['ofo订单量', '摩拜订单量']
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'ofo订单量',
          type: 'line',
          data: [1000, 2000, 2300, 3000, 1800, 1400, 1700]
        },
        {
          name: '摩拜订单量',
          type: 'line',
          data: [1200, 1800, 2500, 2200, 2800, 1800, 1300]
        }
      ]
    }
  }
  getOption3 = () => {
    return {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,   // 是否两边留白
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'ofo订单量',
          type: 'line',
          areaStyle: {},
          data: [1000, 2000, 2300, 3000, 1800, 1400, 1700]
        },
      ]
    }
  }

  render() {
    return (
      <div>
        <Card title="折线图-1">
          <ReactEcharts option={this.getOption()} style={{height: 400}}/>
        </Card>
        <Card title="折线图-2" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} style={{height: 400}}/>
        </Card>
        <Card title="折线图-3" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption3()} style={{height: 400}}/>
        </Card>
      </div>
    )
  }
}