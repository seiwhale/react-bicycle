import React from 'react'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Admin from './Admin'
import Home from './pages/Home'
import Buttons from './pages/UI/buttons'
import Modals from './pages/UI/modals'
import Loadings from './pages/UI/loadings'
import Notification from './pages/UI/notification'
import Message from './pages/UI/message'
import CTabs from './pages/UI/tabs'
import Gallery from './pages/UI/gallery'
import CCarousel from './pages/UI/carousel'
import FormLogin from './pages/Form/login'
import FormRegister from './pages/Form/register'
import BasicTable from './pages/Table/basicTable'
import HighTable from './pages/Table/highTable'
import Rich from './pages/Rich'
import City from './pages/City'
import Order from './pages/Order'
import Permission from './pages/Permission'
import User from './pages/User'
import BikeMap from './pages/Map/bikeMap'
import Bar from './pages/Echarts/bar'
import Pie from './pages/Echarts/pie'
import Line from './pages/Echarts/line'
import Common from './common'
import OrderDetail from './pages/Order/detail'
import Login from './pages/Login'
import NoMatch from './pages/NoMatch'

export default class CRouter extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/common" render={() =>
              <Common>
                <Route path="/common/order/detail/:orderId" exact component={OrderDetail}></Route>
              </Common>
            }/>
            <Route path="/" render={() =>
              <Admin>
                <Switch>
                  <Route path="/home" component={Home}></Route>
                  <Route path="/ui/buttons" component={Buttons}></Route>
                  <Route path="/ui/modals" component={Modals}></Route>
                  <Route path="/ui/loadings" component={Loadings}></Route>
                  <Route path="/ui/notification" component={Notification}></Route>
                  <Route path="/ui/messages" component={Message}></Route>
                  <Route path="/ui/tabs" component={CTabs}></Route>
                  <Route path="/ui/gallery" component={Gallery}></Route>
                  <Route path="/ui/carousel" component={CCarousel}></Route>
                  <Route path="/form/login" component={FormLogin}></Route>
                  <Route path="/form/register" component={FormRegister}></Route>
                  <Route path="/table/basic" component={BasicTable}></Route>
                  <Route path="/table/high" component={HighTable}></Route>
                  <Route path="/rich" component={Rich}></Route>
                  <Route path="/city" component={City}></Route>
                  <Route path="/order" component={Order}></Route>
                  <Route path="/user" component={User}></Route>
                  <Route path="/permission" component={Permission}></Route>
                  <Route path="/bikeMap" component={BikeMap}></Route>
                  <Route path="/charts/bar" component={Bar}></Route>
                  <Route path="/charts/pie" component={Pie}></Route>
                  <Route path="/charts/line" component={Line}></Route>
                  <Redirect to="/home"/>
                  <Route component={NoMatch}></Route>
                </Switch>
              </Admin>
            }></Route>
          </Switch>
        </App>
      </Router>
    )
  }
}