import React from 'react';
import IconRectangle from 'components/Svgs/IconRectangle';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './styles.scss';

export default class CompanyLogoCrop extends React.Component {
  render() {
    return (
      <div className="file add_logo">
        <div className="file__container">
          <div className="file__icon">
            <IconRectangle />
            <div className="file__plus">+</div>
          </div>
          <div className="file__text">
            <FormattedMessage {...messages.text} />
          </div>
        </div>
      </div>
    );
  }
}
