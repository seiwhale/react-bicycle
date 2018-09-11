import React from 'react'
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Icon,
  Checkbox,
  Select,
  DatePicker,
  TimePicker,
  Switch,
  Radio,
  Upload, InputNumber
} from 'antd'
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class FormRegister extends React.Component {
  state = {
    loading: false,
    imageUrl: ''
  };
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  };

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    console.log(userInfo);
    message.success(`${userInfo.userName}恭喜您通过表单学习，当前密码为${userInfo.password}`)
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4,
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    };

    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    };

    const rowObject = {
      minRows: 3,
      maxRows: 6
    };

    return (
      <div>
        <Card title="注册表单">
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    }
                  ]
                })(
                  <Input placeholder="请输入用户名"/>
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空'
                    }
                  ]
                })(
                  <Input placeholder="请输入密码" type="password"/>
                )
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1',
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: '18',
                })(
                  <InputNumber/>
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '2',
                })(
                  <Select>
                    <Option value="1">咸鱼一条</Option>
                    <Option value="2">风华浪子</Option>
                    <Option value="3">百度FE</Option>
                    <Option value="4">创业</Option>
                    <Option value="5">大牛</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('interest', {
                  initialValue: ['2', '6'],
                })(
                  <Select mode="multiple">
                    <Option value="1">游泳</Option>
                    <Option value="2">篮球</Option>
                    <Option value="3">足球</Option>
                    <Option value="4">爬山</Option>
                    <Option value="5">看书</Option>
                    <Option value="6">跑步</Option>
                    <Option value="7">唱歌</Option>
                    <Option value="8">玩游戏</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: false
                })(
                  <Switch/>
                )
              }
            </FormItem>
            {/*<FormItem label="生日" {...formItemLayout}>*/}
            {/*{*/}
            {/*getFieldDecorator('birthday', {*/}
            {/*initialValue: moment('2018-08-08 12:00:59')*/}
            {/*})(*/}
            {/*<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>*/}
            {/*)*/}
            {/*}*/}
            {/*</FormItem>*/}
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday')(
                  <DatePicker/>
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '上海市普陀区金沙江路普罗娜商务广场'
                })(
                  <TextArea
                    autosize={rowObject}
                  />
                )
              }
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time')(
                  <TimePicker/>
                )
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    onChange={this.handleChange}
                  >
                    {this.state.imageUrl ? <img src={this.state.imageUrl} alt=""/> : <Icon type="plus"/>}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout} >
              {
                getFieldDecorator('isAgree')(
                  <Checkbox>我已经阅读过<a href="">React开发文档</a></Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout} >
              <Button type="primary" onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormRegister)