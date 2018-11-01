import React from 'react';
import PropTypes from 'prop-types';
import { createComponent } from 'components/Fields/helpers';
import { customMap } from 'redux-form-antd';
import Slider from 'antd/lib/slider';
import classNames from 'classnames';
import './index.scss';

const sliderMap = customMap((mapProps, { input: { onChange, value = 0 }, min = 0, max = 100 }) => ({
  ...mapProps,
  onAfterChange: onChange,
  value,
  min,
  max,
}));

const SliderField = createComponent(Slider, sliderMap);

const SLIDER_OPTIONS = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class WrappedSliderField extends React.PureComponent {
  decreaseValue = e => {
    const {
      input: { value, onChange },
      min,
      step,
    } = this.props;

    e.preventDefault();

    const newValue = value && value - step > min ? value - step : min;
    onChange(newValue);
  };

  increaseValue = e => {
    const {
      input: { value, onChange },
      max,
      step,
    } = this.props;

    e.preventDefault();

    const newValue = value && value + step < max ? value + step : max;
    onChange(newValue);
  };

  getAdditionalOptions = () => {
    const {
      alwaysShowTooltip,
      input: { value },
      tipFormatter,
      showButtons,
      min,
      max,
      showMinMax,
      inlineLabel,
    } = this.props;

    const additionalOptions = inlineLabel ? { ...SLIDER_OPTIONS } : {};

    if (alwaysShowTooltip) {
      const marks = {};
      const displayedValue = tipFormatter ? tipFormatter(value) : value;

      marks[value] = displayedValue;
      additionalOptions.tipFormatter = null;
      additionalOptions.marks = marks;
    }

    if (showButtons) {
      additionalOptions.preInputElement = (
        <div className="slider-button minus-button" onClick={this.decreaseValue}>
          <span>-</span>
        </div>
      );
      additionalOptions.afterInputElement = (
        <div className="slider-button plus-button" onClick={this.increaseValue}>
          <span>+</span>
        </div>
      );
    }

    if (showMinMax) {
      additionalOptions.preInputElement = (
        <div className="min-max min" onClick={this.decreaseValue}>
          {min}
        </div>
      );
      additionalOptions.afterInputElement = (
        <div className="min-max max" onClick={this.increaseValue}>
          {max}
        </div>
      );
    }

    return additionalOptions;
  };

  getClassName = () => {
    const { showButtons, showMinMax, color, icon, inlineLabel } = this.props;
    return classNames('slider-field', {
      'has-aside-elements': showButtons || showMinMax,
      inline__label: inlineLabel,
      [`${color}-style`]: color,
      'default-style': !color,
      'with-icon': icon,
    });
  };

  render() {
    const additionalOptions = this.getAdditionalOptions();
    const className = this.getClassName();
    const { icon: Icon } = this.props;

    return (
      <div className={className}>
        {Icon && (
          <div className="icon">
            <Icon />
          </div>
        )}
        <SliderField {...this.props} {...additionalOptions} />
      </div>
    );
  }
}

WrappedSliderField.propTypes = {
  alwaysShowTooltip: PropTypes.bool,
  input: PropTypes.object,
  tipFormatter: PropTypes.func,
  showButtons: PropTypes.bool,
  inlineLabel: PropTypes.bool,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  showMinMax: PropTypes.bool,
  color: PropTypes.string,
  icon: PropTypes.func,
};

export default WrappedSliderField;
