import React from 'react'
import {Card} from 'antd'
// import echartTheme from
// 按需加载
import echarts from 'echarts/lib/echarts'
// 导入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
import echartsTheme from '../echartTheme'

export default class Bar extends React.Component {


  componentWillMount() {
    echarts.registerTheme('ETheme',echartsTheme)
  }

  getOption = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
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
          type: 'bar',
          data: [1000, 2000, 3000, 1500, 1200, 800, 1200]
        }
      ]
    }
  }

  getOption2 = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      legend: {
        data: ['ofo', '摩拜', '小蓝']
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'ofo',
          type: 'bar',
          data: [1000, 2000, 3000, 1500, 1200, 800, 1200]
        },
        {
          name: '摩拜',
          type: 'bar',
          data: [800, 1700, 2500, 1200, 1000, 600, 1100]
        },
        {
          name: '小蓝',
          type: 'bar',
          data: [1100, 1700, 2300, 1700, 1500, 1000, 1400]
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Card title="柱形图表-1">
          <ReactEcharts option={this.getOption()} theme="ETheme"/>
        </Card>
        <Card title="柱形图表-2" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()}/>
        </Card>
      </div>
    )
  }
}