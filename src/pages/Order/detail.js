import React from 'react'
import {Card} from 'antd';
import axios from '../../axios';
import './detail.less'

export default class OrderDetail extends React.Component {

  state = {}

  componentWillMount() {
    let orderId = this.props.match.params.orderId;
    if (orderId) {
      this.getDetailInfo(orderId)
    }
  }

  getDetailInfo = (orderId) => {
    axios.ajax({
      url: 'order/detail',
      data: {
        params: {
          orderId: orderId
        }
      }
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          orderInfo: res.result
        });
        this.renderMap(res.result);
      }
    })
  }

  renderMap = (result) => {
    this.map = new window.BMap.Map('orderDetailMap');
    // 添加地图控件
    this.addMapControl();
    // 调用路线图绘制方法
    this.drawBikeRoute(result.position_list);
    // 调用服务区绘制方法
    this.drawServiceArea(result.area);
  }

  // 添加地图空间
  addMapControl = () => {
    this.map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
    this.map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
  }

  // 路线图绘制方法
  drawBikeRoute = (positionList) => {
    let map = this.map, startPoint = '', endPoint = '';
    if (positionList.length) {
      let first = positionList[0];
      let last = positionList[positionList.length - 1];
      startPoint = new window.BMap.Point(first.lon, first.lat);
      let startIcon = new window.BMap.Icon('./assets/start_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      });

      let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon});
      map.addOverlay(startMarker);

      endPoint = new window.BMap.Point(last.lon, last.lat);
      let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      })
      let endMarker = new window.BMap.Marker(endPoint, {icon: endIcon});
      map.addOverlay(endMarker);

      // 连接路线图
      let trackPoint = [];
      for (let i = 0; i < positionList.length; i++) {
        let point = positionList[i];
        trackPoint.push(new window.BMap.Point(point.lon, point.lat));
      }
      let polyline = new window.BMap.Polyline(trackPoint, {
        strokeColor: '#1869AD',
        strokeWeight: 3,
        strokeOpacity: 1
      })
      this.map.addOverlay(polyline);

      this.map.centerAndZoom(endPoint, 11);
    }
  }

  drawServiceArea = (positionList) => {
    // 连接路线图
    let trackPoint = [];
    for (let i = 0; i < positionList.length; i++) {
      let point = positionList[i];
      trackPoint.push(new window.BMap.Point(point.lon, point.lat));
    }
    // 绘制服务区
    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: '#CE0000',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: 0.4
    })
    this.map.addOverlay(polygon);
  }


  render() {
    const orderInfo = this.state.orderInfo || {};
    return (
      <div>
        <Card style={{margin: 25}}>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{orderInfo.mode == 1 ? '服务区' : '停车点'}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{orderInfo.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{orderInfo.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{orderInfo.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{orderInfo.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{orderInfo.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{orderInfo.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">{orderInfo.distance}</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}