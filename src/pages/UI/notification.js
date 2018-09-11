import React from 'react'
import {Card, Button, notification} from 'antd'

export default class Notification extends React.Component {
  openNotification = (type, direction) => {
    if (direction)
      notification.config({
        placement: direction,
        bottom: 50,
        duration: 3,
      });
    notification[type]({
      message: '发工资了',
      description: '上个月考勤22天，迟到2天，实发250',
    })
  }

  render() {
    return (
      <div>
        <Card title="通知提醒框" className="card-wrap">
          <Button type="primary" onClick={() => this.openNotification('success')}>Success</Button>
          <Button type="primary" onClick={() => this.openNotification('info')}>Info</Button>
          <Button type="primary" onClick={() => this.openNotification('warning')}>Warning</Button>
          <Button type="primary" onClick={() => this.openNotification('error')}>Error</Button>
        </Card>
        <Card title="通知提醒框-位置" className="card-wrap">
          <Button type="primary" onClick={() => this.openNotification('success', 'topLeft')}>topLeft</Button>
          <Button type="primary" onClick={() => this.openNotification('info', 'bottomLeft')}>bottomLeft</Button>
          <Button type="primary" onClick={() => this.openNotification('warning', 'topRight')}>topRight</Button>
          <Button type="primary" onClick={() => this.openNotification('error', 'bottomRight')}>bottomRight</Button>
        </Card>
      </div>
    )
  }
}