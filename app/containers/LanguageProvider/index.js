/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import moment from 'moment';
import { makeSelectLocale } from './selectors';

export class LanguageProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { locale: props.locale.toLowerCase() };
  }

  componentDidUpdate() {
    // TODO: fix infite loop without page reload
    // TODO: fix ie locale update without setTimeout: persitStorage do not have enough time to update the store
    if (this.state.locale.toLowerCase() !== this.props.locale.toLowerCase()) {
      setTimeout(() => window.location.reload(), 500);
    }
  }

  render() {
    const { locale } = this.state;
    const currentMesssages = this.props.messages[this.state.locale];

    moment.updateLocale(locale, { week: { dow: 0 } });

    return (
      <IntlProvider locale={locale} key={locale} messages={currentMesssages}>
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export default connect(mapStateToProps)(LanguageProvider);
