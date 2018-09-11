import React from 'react'
import {Card, Carousel} from 'antd'
import './ui.less'

export default class CCarousel extends React.Component {
  render() {
    return (
      <div>
        <Card title="文字背景轮播" className="card-wrap">
          <Carousel
            autoplay
          >
            <div><h3>React</h3></div>
            <div><h3>Vue</h3></div>
            <div><h3>Angular</h3></div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className="card-wrap slider-wrap">
          <Carousel
            autoplay
            effect="fade"
          >
            <div><img src="/carousel-img/carousel-1.jpg" alt=""/></div>
            <div><img src="/carousel-img/carousel-2.jpg" alt=""/></div>
            <div><img src="/carousel-img/carousel-3.jpg" alt=""/></div>
          </Carousel>
        </Card>
      </div>
    )
  }
}