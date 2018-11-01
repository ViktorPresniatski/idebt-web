import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  renderTrackHorizontalDefault, // defaultRenderElements are used as a workaround of this issue:
  renderTrackVerticalDefault, //  https://github.com/malte-wessel/react-custom-scrollbars/issues/227
  renderThumbHorizontalDefault,
  renderThumbVerticalDefault,
} from 'react-custom-scrollbars/lib/Scrollbars/defaultRenderElements';
import './index.scss';

const Scrollbar = scrollProps => (
  <Scrollbars
    renderTrackHorizontal={props => renderTrackHorizontalDefault({ ...props, className: 'track-horizontal' })}
    renderTrackVertical={props => renderTrackVerticalDefault({ ...props, className: 'track-vertical' })}
    renderThumbHorizontal={props => renderThumbHorizontalDefault({ ...props, className: 'thumb-horizontal' })}
    renderThumbVertical={props => renderThumbVerticalDefault({ ...props, className: 'thumb-vertical' })}
    renderView={props => <div {...props} className="view" />}
    {...scrollProps}
  />
);

Scrollbar.propTypes = {
  scrollProps: PropTypes.string,
};

export default Scrollbar;
