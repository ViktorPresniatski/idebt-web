import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';

import * as Dom from 'video-react/lib/utils/dom';
import SeekBar from './SeekBar';

const propTypes = {
  disable: PropTypes.bool,
  player: PropTypes.object,
  className: PropTypes.string,
};

export default class ProgressControl extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      mouseTime: {
        time: null,
        position: 0,
      },
    };

    this.seekBar = React.createRef();
    this.handleMouseMoveThrottle = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event) {
    if (!event.pageX) {
      return;
    }
    const {
      player: { duration },
    } = this.props;
    const node = findDOMNode(this.seekBar.current);
    const newTime = Dom.getPointerPosition(node, event).x * duration;
    const position = event.pageX - Dom.findElPosition(node).left;

    this.setState({
      mouseTime: {
        time: newTime,
        position,
      },
    });
  }

  render() {
    const { className, disable } = this.props;

    return (
      <div
        onMouseMove={this.handleMouseMoveThrottle}
        className={classNames(
          'video-react-progress-control video-react-control',
          { 'control-disabled': disable },
          className,
        )}
      >
        <SeekBar mouseTime={this.state.mouseTime} ref={this.seekBar} {...this.props} disable={disable} />
      </div>
    );
  }
}

ProgressControl.propTypes = propTypes;
ProgressControl.displayName = 'ProgressControl';
