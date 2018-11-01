import React from 'react';
import PropTypes from 'prop-types';

import { getUserInitials, getUserIdentity } from 'utils/helpers/userHelpers';
import './index.scss';

class UserAvatar extends React.PureComponent {
  renderAvatar = user => {
    if (user.avatar) {
      return (
        <div className="avatar__container">
          <img src={user.avatar} alt="avatar" className="avatar__image" />
        </div>
      );
    }

    const userIdentity = getUserIdentity(user);
    const userInitials = getUserInitials(userIdentity);

    return <div className="avatar__container">{userInitials}</div>;
  };
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return this.renderAvatar(user);
  }
}

UserAvatar.propTypes = {
  user: PropTypes.object,
};

export default UserAvatar;
