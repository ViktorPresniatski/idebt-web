import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class FilledFormField extends Component {
  render() {
    const { label, body, bodyIcon: BodyIcon } = this.props;

    return (
      <div>
        <div className="info__param">{label}</div>
        {BodyIcon ? (
          <div className="info__data">
            <div className="info__icon info__icon_map">
              <BodyIcon />
            </div>
            <div className="info__text">{body}</div>
          </div>
        ) : (
          <div className="info__data">{body}</div>
        )}
      </div>
    );
  }
}

FilledFormField.propTypes = {
  body: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  bodyIcon: PropTypes.any,
};

export default FilledFormField;
