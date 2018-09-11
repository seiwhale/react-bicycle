import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {switchMenu} from '../../redux/action'
import MenuConfig from '../../config/menuConfig'
import {Menu} from 'antd';
import './index.less'

const SubMenu = Menu.SubMenu;

class MenuLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: ''
    }
  }

  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
    this.setState({
      menuTreeNode,
      currentKey
    })
  }

  // 菜单渲染
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  }

  handleClick = ({item, key}) => {
    const {dispatch} = this.props;
    dispatch(switchMenu(item.props.title));
    this.setState({
      currentKey: key
    })
  }

  render() {
    return (
      <div className="nav-left">
        {/* Logo部分 */}
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Cola MS</h1>
        </div>
        {/* Menu列表 */}
        <Menu
          theme="dark"
          onClick={this.handleClick}
          selectedKeys={[this.state.currentKey]}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}

export default connect()(MenuLeft)