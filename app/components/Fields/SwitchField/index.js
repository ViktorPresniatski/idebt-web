import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SwitchField as SwitchFormField } from 'redux-form-antd';

import './styles.scss';

class SwitchField extends React.Component {
  render() {
    const { labels, inlineLabels, ...props } = this.props;
    const isMultipleLabels = Array.isArray(labels) && labels[0] && labels[1];
    const formClassNames = classNames('form-switch', { inline__label: inlineLabels });

    return (
      <div className={formClassNames}>
        {isMultipleLabels && <div className="label">{labels[0]}</div>}
        <SwitchFormField {...props} />
        {isMultipleLabels && <div className="label">{labels[1]}</div>}
      </div>
    );
  }
}

SwitchField.propTypes = {
  labels: PropTypes.array,
  inlineLabels: PropTypes.bool,
};

export default SwitchField;
