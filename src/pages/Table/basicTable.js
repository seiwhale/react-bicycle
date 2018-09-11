import React from 'react'
import {Card, Table, Modal, Button, message} from 'antd'
import Axios from '../../axios'
import Utils from '../../utils/utils'

export default class BasicTable extends React.Component {
  state = {
    dataSource2: []
  };

  params = {
    page: 1
  };

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
    this.setState({
      dataSource
    })
  }

  request = () => {
    let _ = this;
    Axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page
        },
        // isShowLoading: false
      }
    }).then(res => {
      res.result.list.map((item, index) => {
        item.key = index
      });
      this.setState({
        dataSource2: res.result.list,
        selectedRowKeys: [],
        selectedRows: null,
        pagination: Utils.pagination(res, (current) => {
          _.params.page = current;
          _.request();
        })
      });
    })
  }

  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName},爱好：${record.interest}`
    })
  }

  handleDelete = () => {
    let {selectedRows, selectedIds} = this.state;
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗？${selectedIds.join(',')}`,
      onOk: () => {
        message.success('删除成功');
        this.request();
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女';
        }
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
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      },
    ];
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    };
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        let selectedIds = []
        selectedRows.map(item => {
          selectedIds.push(item.id)
        });
        this.setState({
          selectedRowKeys,
          selectedRows,
          selectedIds,
        })
      }
    }

    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          ></Table>
        </Card>
        <Card title="Mock-动态数据渲染表格" style={{marginTop: 10}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          ></Table>
        </Card>
        <Card title="Mock-单选" style={{marginTop: 10}}>
          <Table
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {  // 点击行
                  this.onRowClick(record, index)
                }
              };
            }}
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          ></Table>
        </Card>
        <Card title="Mock-复选" style={{marginTop: 10}}>
          <div>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            rowSelection={rowCheckSelection}
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          ></Table>
        </Card>
        <Card title="Mock-表格分页" style={{marginTop: 10}}>
          <div>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          ></Table>
        </Card>
      </div>
    )
  }
}