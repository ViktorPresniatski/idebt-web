/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import SliderField from 'components/Fields/SliderField';
import IconCompas from 'components/Svgs/IconCompas';
import IconStar from 'components/Svgs/IconStar';
import IconHeart from 'components/Svgs/IconHeart';
import IconDiamond from 'components/Svgs/IconDiamond';
import IconRocket from 'components/Svgs/IconRocket';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import messages from './messages';

const PILLAR_SETTINGS = {
  life_purpose: { icon: IconCompas, color: 'purple' },
  career: { icon: IconRocket, color: 'red' },
  relationships: { icon: IconHeart, color: 'light-blue' },
  health: { icon: IconDiamond, color: 'green' },
  life_quality: { icon: IconStar, color: 'blue' },
  default: { icon: IconCompas, color: 'default' },
};

const EMOJI_OPTIONS = [
  { className: 'scale_dark-red', message: messages.emoji1 },
  { className: 'scale_red', message: messages.emoji2 },
  { className: 'scale_red-orange', message: messages.emoji3 },
  { className: 'scale_orange', message: messages.emoji4 },
  { className: 'scale_yellow', message: messages.emoji5 },
  { className: 'scale_light-green', message: messages.emoji6 },
  { className: 'scale_green', message: messages.emoji7 },
  { className: 'scale_dark-green', message: messages.emoji8 },
];

const SLIDER_PARAMS = {
  range: false,
  min: 0,
  max: 10,
  step: 1,
};

const DEFAULT_MAX_VALUE = 10;

export default class PillarSliderField extends React.Component {
  state = {
    domState: {
      hovered: false,
      clicked: false,
    },
    isTooltipVisible: false,
  };

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = () => this.processTooltip({ clicked: true });
  handleMouseUp = () => this.processTooltip({ clicked: false });

  processTooltip = data => {
    const { domState } = this.state;
    const newDomState = Object.assign(domState, data);
    this.setState({ isTooltipVisible: domState.clicked || domState.hovered, domState: newDomState });
  };

  tipFormatter = value => {
    const { isTooltipVisible } = this.state;
    const { max } = this.props;
    const maxValue = max || DEFAULT_MAX_VALUE;
    const scaleIndex = Math.round((value * (EMOJI_OPTIONS.length - 1)) / maxValue);

    return (
      <div>
        <div className={classNames('scale', EMOJI_OPTIONS[scaleIndex].className, { visible: isTooltipVisible })}>
          <div className="scale__text scale__text">
            <FormattedMessage {...EMOJI_OPTIONS[scaleIndex].message} />
          </div>
        </div>
        {value}
      </div>
    );
  };

  render() {
    const { pillar, withIcon } = this.props;
    const pillarSettings = PILLAR_SETTINGS[pillar] || PILLAR_SETTINGS.default;
    const { icon, color } = pillarSettings;

    return (
      <div
        className="pillar-slider-field"
        onMouseEnter={() => this.processTooltip({ hovered: true })}
        onMouseLeave={() => this.processTooltip({ hovered: false })}
      >
        <SliderField
          {...SLIDER_PARAMS}
          ref={this.handleRef}
          inlineLabel
          showMinMax
          {...this.props}
          color={color}
          icon={withIcon && icon}
          alwaysShowTooltip
          tipFormatter={this.tipFormatter}
          isTooltipVisible={this.state.isTooltipVisible}
        />
      </div>
    );
  }
}

PillarSliderField.propTypes = {
  pillar: PropTypes.string,
  withIcon: PropTypes.bool,
  max: PropTypes.number,
};
