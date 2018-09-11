import React from 'react'
import {Card, Tabs, message, Icon} from 'antd'
import './ui.less'

const TabPane = Tabs.TabPane;

export default class CTabs extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 1;
  }


  componentWillMount() {
    const panes = [
      {
        title: 'Tab 1',
        content: 'Content of Tab Pane 1',
        key: '1'
      },
      {
        title: 'Tab 2',
        content: 'Content of Tab Pane 2',
        key: '2'
      },
      {
        title: 'Tab 3',
        content: 'Content of Tab Pane 3',
        key: '3'
      }
    ]
    this.setState({
      panes,
      activeKey: '1'
    })
  }

  onChange = (activeKey) => {
    this.setState({activeKey});
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({title: activeKey, content: 'New Tab Pane', key: activeKey});
    this.setState({panes, activeKey});
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({panes, activeKey});
  }

  callback = (key) => {
    message.success(key)
  }

  render() {
    return (
      <div>
        <Card title="Tab页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab="Tab 2" disabled key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab={<span><Icon type="edit"/>Tab 2</span>} key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab={<span><Icon type="delete"/>Tab 3</span>} key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs
            defaultActiveKey="1"
            activeKey={this.state.activeKey}
            type="editable-card"
            onChange={this.onChange}
            onEdit={this.onEdit}
          >
            {
              this.state.panes.map(item => {
                return <TabPane tab={item.title} key={item.key}>{item.content}</TabPane>
              })
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}