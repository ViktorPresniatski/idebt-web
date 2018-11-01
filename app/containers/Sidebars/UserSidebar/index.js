import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUserInitials, getUserIdentity } from 'utils/helpers/userHelpers';

import '../styles.scss';

class UserSidebar extends React.PureComponent {
  renderAvatar = () => {
    const { currentUser } = this.props;

    if (currentUser.avatar) {
      return (
        <div className="avatar__container">
          <img src={currentUser.avatar} alt="avatar" className="avatar__image" />
        </div>
      );
    }

    const userIdentity = getUserIdentity(currentUser);
    const userInitials = getUserInitials(userIdentity);

    return <div className="avatar__container">{userInitials}</div>;
  };

  render() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return null;
    }

    return (
      <div className="user_sidebar">
        <Link to="/profile" className="avatar__link">
          {this.renderAvatar()}
        </Link>
        <div className="full_name__container">{getUserIdentity(currentUser)}</div>
      </div>
    );
  }
}

UserSidebar.propTypes = {
  currentUser: PropTypes.object,
};

export default UserSidebar;
