import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { ScrollBar } from 'components/Controls';
import { logoutRequest } from 'containers/App/actions';
import IconArrowDown from 'components/Svgs/IconArrowDown';
import IconLogOut from 'components/Svgs/IconLogOut';

import messages from './messages';
import './styles.scss';

const { Sider } = Layout;
const HEADER_HEIGHT = 60;

class SidebarMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      defaultSelectedKeys: [props.location.pathname],
      scrollHeight: window.innerHeight - HEADER_HEIGHT,
      coveringSidebar: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.setState({ scrollHeight: window.innerHeight - HEADER_HEIGHT });
  };

  onCollapse = (collapsed, type) => {
    if (type === 'responsive') {
      this.setState({ coveringSidebar: collapsed });
    }
  };

  onSelectedKeyChange = e => {
    this.setState({ defaultSelectedKeys: [e.target.pathname] });
  };

  renderRoutes() {
    const { routes } = this.props;

    return routes.map(item => {
      const { icon: LinkIcon, name, link } = item;
      return (
        <Menu.Item className="sidebar__menu__item" key={link}>
          <Link className="menu__link" to={item.link} onClick={this.onSelectedKeyChange}>
            <span className="menu__icon">
              <LinkIcon />
            </span>
            <span className="menu__text">{name}</span>
            <span className="menu__arrow">
              <IconArrowDown />
            </span>
          </Link>
        </Menu.Item>
      );
    });
  }

  render() {
    const { sidebarLogo, className } = this.props;
    const sidebarClassName = classNames(className, { 'covering-sidebar': this.state.coveringSidebar });

    return (
      <Sider width={260} className={sidebarClassName} breakpoint="lg" collapsedWidth="0" onCollapse={this.onCollapse}>
        <ScrollBar style={{ height: this.state.scrollHeight }}>
          {sidebarLogo}
          <Menu className="sidebar__menu" mode="inline" defaultSelectedKeys={this.state.defaultSelectedKeys}>
            {this.renderRoutes()}
            <Menu.Item className="sidebar__menu__item" key="logout">
              <Link to=" " onClick={this.props.logoutRequest}>
                <IconLogOut className="menu__icon" />
                <FormattedMessage {...messages.logoutLink} />
              </Link>
            </Menu.Item>
          </Menu>
        </ScrollBar>
      </Sider>
    );
  }
}

SidebarMenu.propTypes = {
  routes: PropTypes.array,
  sidebarLogo: PropTypes.object,
  location: PropTypes.object,
  logoutRequest: PropTypes.func,
  className: PropTypes.any,
};

const mapDispatchToProps = {
  logoutRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(withRouter(SidebarMenu));
