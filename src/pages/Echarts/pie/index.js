import React from 'react'
import {Card} from 'antd'
// import echartTheme from
// 按需加载
import echarts from 'echarts/lib/echarts'
// 导入柱形图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends React.Component {


  componentWillMount() {
    // echarts.registerTheme()
  }

  getOption = () => {
    return {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 20,
        top: 10,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 2000,
              name: '周二'
            },
            {
              value: 2300,
              name: '周三'
            },
            {
              value: 3000,
              name: '周四'
            },
            {
              value: 2600,
              name: '周五'
            },
            {
              value: 1400,
              name: '周六'
            },
            {
              value: 170,
              name: '周日'
            }
          ]
        }
      ]
    }
  }
  getOption2 = () => {
    return {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 20,
        top: 10,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '80%'],
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 2000,
              name: '周二'
            },
            {
              value: 2300,
              name: '周三'
            },
            {
              value: 3000,
              name: '周四'
            },
            {
              value: 2600,
              name: '周五'
            },
            {
              value: 1400,
              name: '周六'
            },
            {
              value: 170,
              name: '周日'
            }
          ]
        }
      ]
    }
  }
  getOption3 = () => {
    return {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 20,
        top: 10,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: [30, 100],
          center: ['50%', '60%'],
          roseType: 'area',
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 2000,
              name: '周二'
            },
            {
              value: 2300,
              name: '周三'
            },
            {
              value: 3000,
              name: '周四'
            },
            {
              value: 2600,
              name: '周五'
            },
            {
              value: 1400,
              name: '周六'
            },
            {
              value: 170,
              name: '周日'
            }
          ]
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Card title="饼图-1">
          <ReactEcharts option={this.getOption()} style={{height: 400}}/>
        </Card>
        <Card title="饼图-2" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} style={{height: 400}}/>
        </Card>
        <Card title="饼图-3" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption3()} style={{height: 400}}/>
        </Card>
      </div>
    )
  }
}