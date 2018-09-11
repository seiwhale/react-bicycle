import React from 'react'
import {Card, Row, Col, Modal} from 'antd'
import './ui.less'


export default class Gallery extends React.Component {
  state = {
    visible: false
  }
  openGallery = (imgSrc) => {
    this.setState({
      currentImg: '/gallery/' + imgSrc,
      visible: true
    })
  }

  render() {
    const row = 5, col = 5, imgs = [];
    for (let i = 0; i < row; i++) {
      imgs.push([]);
      for (let j = 0; j < col; j++) {
        imgs[i].push(i * row + j + 1 + '.png')
      }
    }
    const imgList = imgs.map(list => list.map(item =>
      <Card
        style={{marginBottom: 10}}
        cover={<img src={'/gallery/' + item} alt=""/>}
        onClick={() => this.openGallery(item)}
      >
        <Card.Meta title="React Admin" description="React AntD Gallery"></Card.Meta>
      </Card>))

    return (
      <div className="card-wrap">
        <Row gutter={24}>
          {
            imgList.map((list, index) =>
              <Col md={index ? 5 : 4}>
                {list.map(item => item)}
              </Col>
            )
          }
        </Row>
        <Modal
          width={300}
          height={500}
          title="图片画廊"
          footer={null}
          visible={this.state.visible}
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
        >
          {<img src={this.state.currentImg} alt="" style={{width: '100%'}}/>}
        </Modal>
      </div>
    )
  }
}