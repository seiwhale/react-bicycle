import React from 'react'
import {Button, Card, Modal, Form, Input, Radio, DatePicker, Select} from 'antd'
import BaseForm from '../../components/BaseForm'
import axios from '../../axios'
import Utils from '../../utils/utils'
import ETable from '../../components/ETable'
import moment from 'moment'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class User extends React.Component {

  state = {
    isVisible: false
  }

  params = {
    page: 1
  };


  componentWillMount() {
    this.requestList()
  }


  handleFilter = (params) => {
    this.params = params;
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/user/list', this.params)
  }

  // 员工操作函数
  handleOperate = (type) => {
    let item = this.state.selectedItem;
    if (type === 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工'
      })
    } else if (type === 'delete') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return;
      }
      Modal.confirm({
        title: '确认删除',
        content: '是否要删除当前选择员工',
        onOk: () => {
          let _ = this;
          axios.ajax({
            url: '/user/delete',
            data: {
              params: {
                id: item.id
              }
            }
          }).then(res => {
            if (res.code == 0) {
              _.setState({
                isVisible: false
              });
              _.requestList();
              _.state.selectedRowKeys = []
            }
          })
        }
      })
    } else {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return;
      }
      this.setState({
        type,
        isVisible: true,
        title: type == 'edit' ? '编辑员工' : '员工详情'
      })
    }
  }

  /**
   * 创建员工提交
   */
  handleSubmit = () => {
    let type = this.state.type;
    let data = this.userForm.props.form.getFieldsValue();
    if (type != 'detail') {
      axios.ajax({
        url: type == 'create' ? '/user/add' : '/user/edit',
        data: {
          params: data
        }
      }).then(res => {
        if (res.code == 0) {
          this.setState({
            isVisible: false
          });
          this.requestList();
        }
      })
    } else
      this.setState({
        isVisible: false
      });
  }

  render() {
    const formList = [
      {
        type: 'INPUT',
        label: '用户名',
        field: 'user_name',
        placeholder: '请输入用户名',
      },
      {
        type: 'INPUT',
        label: '手机号',
        field: 'user_mobile',
        placeholder: '请输入手机号',
      },
      {
        type: 'DATE',
        label: '入职日期',
        field: 'user_date',
        placeholder: '请选择入职日期',
      }
    ];

    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
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
        title: '联系地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    let footer = {};
    if (this.state.type == 'detail')
      footer = {
        footer: null
      }

    return (
      <div>
        <Card>
          <BaseForm formList={formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginTop: 10}} className="operate-wrap">
          <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
          <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
          <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
          <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
            dataSource={this.state.list}
            columns={columns}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          width={600}
          onOk={this.handleSubmit}
          {...footer}
          onCancel={() => {
            console.log(this.userForm.props.form);
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false
            })
          }}
        >
          <UserForm type={this.state.type} userInfo={this.state.selectedItem} wrappedComponentRef={inst => {
            this.userForm = inst
          }}></UserForm>
        </Modal>
      </div>
    )
  }
}

class UserForm extends React.Component {

  getState = (state) => {
    return {
      '1': '咸鱼一条',
      '2': '风华浪子',
      '3': '百度FE',
      '4': '创业',
      '5': '大牛',
    }[state]
  }

  render() {
    let type = this.props.type, userInfo = type == 'create' ? {} : this.props.userInfo;
    const {getFieldDecorator} = this.props.form;
    const formLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    }

    return (
      <Form layout="horizontal">
        <FormItem label="用户名" {...formLayout}>
          {
            type == 'detail' ? userInfo.username :
              getFieldDecorator('user_name', {
                initialValue: userInfo.username
              })(
                <Input placeholder="请输入用户名"/>
              )
          }
        </FormItem>
        <FormItem label="性别" {...formLayout}>
          {
            type == 'detail' ? userInfo.sex == 1 ? '男' : '女' :
              getFieldDecorator('sex', {
                initialValue: userInfo.sex || 1
              })(
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>
              )
          }
        </FormItem>
        <FormItem label="状态" {...formLayout}>
          {
            type == 'detail' ? this.getState(userInfo.state) :
              getFieldDecorator('state', {
                initialValue: userInfo.state
              })(
                <Select>
                  <Option value={1}>咸鱼一条</Option>
                  <Option value={2}>风华浪子</Option>
                  <Option value={3}>北大才子</Option>
                  <Option value={4}>百度FE</Option>
                  <Option value={5}>创业者</Option>
                </Select>
              )
          }
        </FormItem>
        <FormItem label="生日" {...formLayout}>
          {
            type == 'detail' ? userInfo.birthday :
              getFieldDecorator('birthday', {
                initialValue: moment(userInfo.birthday)
              })(
                <DatePicker></DatePicker>
              )
          }
        </FormItem>
        <FormItem label="联系地址" {...formLayout}>
          {
            type == 'detail' ? userInfo.address :
              getFieldDecorator('address', {
                initialValue: userInfo.address
              })(
                <TextArea rows={3} placeholder="请输入联系地址"/>
              )
          }
        </FormItem>
      </Form>
    )
  }
}

UserForm = Form.create({})(UserForm)