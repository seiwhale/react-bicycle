import React from 'react'
import {Card, Table, Modal, Button, message, Badge} from 'antd'
import Axios from '../../axios'
import Utils from '../../utils/utils'

export default class HighTable extends React.Component {

  state = {
    dataSource: []
  }

  componentDidMount() {
    const dataSource = [
      {
        id: 0,
        userName: 'Cola',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '上海市普陀区金沙江路',
        time: '06:00'
      },
      {
        id: 1,
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '上海市普陀区金沙江路',
        time: '06:00'
      },
      {
        id: 2,
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '上海市普陀区金沙江路',
        time: '06:00'
      }
    ];
    dataSource.map((item, index) => {
      item.key = index
    });
    this.request();
    this.request_high();
    this.setState({
      dataSource
    })
  }

  request = () => {
    Axios.ajax({
      url: '/table/list',
      data: {
        params: {
          // page: this.params.page
        },
      }
    }).then(res => {
      res.result.list.map((item, index) => {
        item.key = index
      });
      this.setState({
        dataSource: res.result.list,
      });
    })
  }

  request_high = () => {
    Axios.ajax({
      url: '/table/high/list',
      data: {
        params: {
          // page: this.params.page
        },
      }
    }).then(res => {
      res.result.list.map((item, index) => {
        item.key = index
      });
      this.setState({
        dataSource3: res.result.list,
      });
    })
  }

  handleChange = (pagination, filters, sorter) => {
    console.log(sorter);
    console.log(filters);
    this.setState({
      sortOrder: sorter.order
    })
  }

  /**
   * 表格删除操作
   * @param item
   */
  handleDelete = (item) => {
    let _ = this;
    Modal.confirm({
      title: '确认',
      content: '您确认删除此条数据吗',
      onOk() {
        message.success('删除成功!');
        _.request_high()
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 80
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: 80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女';
        },
        width: 80
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
        render(state) {
          let _config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '百度FE',
            '4': '创业',
            '5': '大牛',
          };
          return _config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        width: 80,
        render(interest) {
          let _config = {
            '1': '游泳',
            '2': '篮球',
            '3': '足球',
            '4': '爬山',
            '5': '看书',
            '6': '跑步',
            '7': '唱歌',
            '8': '玩游戏',
          };
          return _config[interest];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 120
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: 80
      },
    ];
    const columns2 = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 80,
        fixed: 'left'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: 80,
        fixed: 'left'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女';
        },
        width: 80
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
        render(state) {
          let _config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '百度FE',
            '4': '创业',
            '5': '大牛',
          };
          return _config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        width: 80,
        render(interest) {
          let _config = {
            '1': '游泳',
            '2': '篮球',
            '3': '足球',
            '4': '爬山',
            '5': '看书',
            '6': '跑步',
            '7': '唱歌',
            '8': '玩游戏',
          };
          return _config[interest];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday1',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday2',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday3',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday4',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday5',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday6',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday7',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday8',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 120,
        fixed: 'right'
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
        fixed: 'right'
      },
    ];
    const columns3 = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女';
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter: (a, b) => {
          return a.age - b.age
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let _config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '百度FE',
            '4': '创业',
            '5': '大牛',
          };
          return _config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
          let _config = {
            '1': '游泳',
            '2': '篮球',
            '3': '足球',
            '4': '爬山',
            '5': '看书',
            '6': '跑步',
            '7': '唱歌',
            '8': '玩游戏',
          };
          return _config[interest];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        dataIndex: 'time',
      },
    ];
    const columns4 = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女';
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter: (a, b) => {
          return a.age - b.age
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let _config = {
            '1': <Badge status="success" text='成功'/>,
            '2': <Badge status="error" text='报错'/>,
            '3': <Badge status="default" text='正常'/>,
            '4': <Badge status="processing" text='进行中'/>,
            '5': <Badge status="warning" text='警告'/>,
          };
          return _config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
          let _config = {
            '1': '游泳',
            '2': '篮球',
            '3': '足球',
            '4': '爬山',
            '5': '看书',
            '6': '跑步',
            '7': '唱歌',
            '8': '玩游戏',
          };
          return _config[interest];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        dataIndex: 'time',
      },
      {
        title: '操作',
        render: (text, item) => {
          return <a onClick={() => this.handleDelete(item)}>删除</a>
        }
      },
    ];


    return (
      <div>
        <Card title="Mock-固定表头">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{y: 240}}
          ></Table>
        </Card>
        <Card title="Mock-两侧固定" style={{marginTop: 10}}>
          <Table
            bordered
            columns={columns2}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{x: 1680}}
          ></Table>
        </Card>
        <Card title="Mock-排序表格" style={{marginTop: 10}}>
          <Table
            bordered
            columns={columns3}
            dataSource={this.state.dataSource3}
            pagination={false}
            onChange={this.handleChange}
          ></Table>
        </Card>
        <Card title="Mock-操作按钮" style={{marginTop: 10}}>
          <Table
            bordered
            columns={columns4}
            dataSource={this.state.dataSource3}
            pagination={false}
            onChange={this.handleChange}
          ></Table>
        </Card>
      </div>
    )
  }
}