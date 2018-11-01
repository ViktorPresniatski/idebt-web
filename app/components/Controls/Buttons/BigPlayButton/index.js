import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './index.scss';

const propTypes = {
  disable: PropTypes.bool,
  player: PropTypes.object,
  actions: PropTypes.object,
  position: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  position: 'left',
};

export default class BigPlayButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { actions } = this.props;
    actions.play();
  }

  render() {
    const { player, position, disable } = this.props;
    return (
      <button
        className={classNames(
          'big-play-button',
          'video-react-big-play-button',
          `video-react-big-play-button-${position}`,
          this.props.className,
          {
            'big-play-button-hide': player.hasStarted || !player.currentSrc,
            'control-disabled': disable,
          },
        )}
        type="button"
        tabIndex="0"
        disabled={disable}
        aria-live="polite"
        onClick={this.handleClick}
      >
        <span className="big-play-button-text">
          <FormattedMessage {...messages.playVideoButtonText} />
        </span>
      </button>
    );
  }
}

BigPlayButton.propTypes = propTypes;
BigPlayButton.defaultProps = defaultProps;
BigPlayButton.displayName = 'BigPlayButton';
