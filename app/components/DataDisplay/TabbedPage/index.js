import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

import './styles.scss';

class TabbedPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: null,
      tabs: [],
    };

    this.renderMethod = props.innerContent ? this.renderWithInnerContent : this.renderWithOuterContent;
  }

  componentWillMount() {
    const tabs = this.getTabObjects();
    const defaultTab = this.props.defaultTab || (tabs[0] && tabs[0].tabKey);
    this.setState({ currentTab: defaultTab, tabs });
  }

  getTabObjects = () =>
    React.Children.map(
      this.props.children,
      child => child.props && { tabKey: child.props.tabKey, title: child.props.title },
    );

  handleClick = e => {
    this.setState({
      currentTab: e.key,
    });
  };

  renderMenu = () => (
    <Menu mode="horizontal" className="tabs__nav" onClick={this.handleClick} selectedKeys={[this.state.currentTab]}>
      {this.state.tabs.map(tab => <Menu.Item key={tab.tabKey}>{tab.title}</Menu.Item>)}
    </Menu>
  );

  renderWithOuterContent = (className, headerBody, tabContent) => (
    <div className={className}>
      <div className="content__wrapper header_with_tab">
        {headerBody}
        {this.renderMenu()}
      </div>
      {tabContent}
    </div>
  );

  renderWithInnerContent = (className, headerBody, tabContent) => (
    <div className={className}>
      <div className="content__wrapper header_with_tab">
        {headerBody}
        {this.renderMenu()}
        {tabContent}
      </div>
    </div>
  );

  render() {
    const { headerBody, children, className } = this.props;

    const tabContent = React.Children.toArray(children).find(
      child => child.props && child.props.tabKey === this.state.currentTab,
    );

    return this.renderMethod(className, headerBody, tabContent);
  }
}

TabbedPage.propTypes = {
  className: PropTypes.string,
  defaultTab: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  headerBody: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  innerContent: PropTypes.bool,
};

export default TabbedPage;
