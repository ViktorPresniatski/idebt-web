import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

export class LanguageTabComponent extends React.PureComponent {
  render() {
    const { isActive, label } = this.props;

    return (
      <div
        onClick={this.props.onTabClick}
        className={classNames('language-tab', {
          'active-tab': isActive,
        })}
      >
        <div>{label}</div>
      </div>
    );
  }
}

LanguageTabComponent.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.element,
  onTabClick: PropTypes.func,
};

export default LanguageTabComponent;
