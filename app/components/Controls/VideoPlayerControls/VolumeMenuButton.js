import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import PopupButton from 'video-react/lib/components/popup/PopupButton';

import VolumeBar from './VolumeBar';

const propTypes = {
  player: PropTypes.object,
  actions: PropTypes.object,
  vertical: PropTypes.bool,
  className: PropTypes.string,
  alwaysShowVolume: PropTypes.bool,
  disable: PropTypes.bool,
};

const defaultProps = {
  vertical: false,
};

class VolumeMenuButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick() {
    const { player, actions, disable } = this.props;
    if (disable) {
      return;
    }
    actions.mute(!player.muted);
  }

  handleFocus() {
    if (this.props.disable) {
      return;
    }
    this.setState({
      active: true,
    });
  }

  handleBlur() {
    if (this.props.disable) {
      return;
    }
    this.setState({
      active: false,
    });
  }

  get volumeLevel() {
    const {
      player: { volume, muted },
    } = this.props;
    let level = 3;
    if (volume === 0 || muted) {
      level = 0;
    } else if (volume < 0.33) {
      level = 1;
    } else if (volume < 0.67) {
      level = 2;
    }
    return level;
  }

  render() {
    const { vertical, player, className, disable } = this.props;
    const inline = !vertical;
    const level = this.volumeLevel;
    return (
      <PopupButton
        className={classNames(
          className,
          {
            'video-react-volume-menu-button-vertical': vertical,
            'video-react-volume-menu-button-horizontal': !vertical,
            'video-react-vol-muted': player.muted,
            'video-react-vol-0': level === 0 && !player.muted,
            'video-react-vol-1': level === 1,
            'video-react-vol-2': level === 2,
            'video-react-vol-3': level === 3,
            'video-react-slider-active': this.props.alwaysShowVolume || this.state.active,
            'video-react-lock-showing': this.props.alwaysShowVolume || this.state.active,
            'control-disabled': disable,
          },
          'video-react-volume-menu-button',
        )}
        onClick={this.handleClick}
        inline={inline}
      >
        <VolumeBar onFocus={this.handleFocus} onBlur={this.handleBlur} disable={disable} {...this.props} />
      </PopupButton>
    );
  }
}

VolumeMenuButton.propTypes = propTypes;
VolumeMenuButton.defaultProps = defaultProps;
VolumeMenuButton.displayName = 'VolumeMenuButton';
export default VolumeMenuButton;
