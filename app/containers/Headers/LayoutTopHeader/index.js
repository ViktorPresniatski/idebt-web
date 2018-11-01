import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { FormattedMessage } from 'react-intl';
import iconLogo from './idebt.png';

import { isActive, isCompanyOrSegmentAdmin, isSparkxAdmin, getOrganizationByRole } from 'utils/helpers/userHelpers';
import { TransparentButton } from 'components/Controls';
import messages from '../messages';
import '../styles.scss';

class LayoutTopHeader extends React.PureComponent {
  textLogo = () => (
    <div className="header__text__logo">
      &nbsp;I
      <span className="header__text__logo__special_symbol">D</span>ebt
    </div>
  );

  render() {
    const { currentUser } = this.props;

    return (
      <div className="header" key={currentUser}>
        {currentUser && (
          <div className="header__left">
            Balance: {currentUser.balance} $
          </div>
        )}
        {currentUser ? (
          <div className="header__center">
            <div>
              <a href="/" className="header__icon">
                <img className="icon-logo" src={iconLogo} alt="" />
              </a>
            </div>
          </div>
        ) : (
          <div className="header__center_single" style={{ display: currentUser ? 'none' : 'block' }}>
            <div className="header__text">
              <FormattedMessage {...messages.welcomeToMessage} />
              {this.textLogo()}
            </div>
          </div>
        )}

      </div>
    );
  }
}

LayoutTopHeader.propTypes = {
  location: PropTypes.object,
  currentUser: PropTypes.object,
};

export default withRouter(LayoutTopHeader);
