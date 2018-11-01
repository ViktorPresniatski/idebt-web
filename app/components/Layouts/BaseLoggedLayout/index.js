import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { isActive } from 'utils/helpers/userHelpers';
import { SidebarMenu } from 'components/DataDisplay';
import { CONTACT_EMAIL } from 'globalConstants';
import './styles.scss';

import messages from './messages';

const { Footer, Content } = Layout;

class BaseLoggedLayout extends React.PureComponent {
  render() {
    const { header, sidebarLogo, routes, children, currentUser } = this.props;
    const layoutClassNames = classNames('wrap-all', { 'wrap-all_default': !currentUser });
    const sidebarClassNames = classNames('sidebar', { with_avatar: currentUser });

    return (
      <Layout className={layoutClassNames}>
        <div className="wrap-header">{header}</div>
        <Layout className="wrap-content">
          <SidebarMenu sidebarLogo={sidebarLogo} routes={routes} className={sidebarClassNames} />
          <Layout className="main-content">
            <Content className="content">{children}</Content>
            <Footer style={{ textAlign: 'center' }}>
              <div className="footer-item">
                <FormattedMessage {...messages.termsOfService} />
              </div>
              <div className="footer-item">
                <FormattedMessage {...messages.privacyPolicy} />
              </div>
              <div className="footer-item">
                <a href={`mailto:${CONTACT_EMAIL}`} target="_blank">
                  <FormattedMessage {...messages.contactUs} values={{ email: CONTACT_EMAIL }} />
                </a>
              </div>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

BaseLoggedLayout.propTypes = {
  header: PropTypes.object,
  sidebarLogo: PropTypes.object,
  routes: PropTypes.array,
  children: PropTypes.object,
  currentUser: PropTypes.object,
};

export default BaseLoggedLayout;
