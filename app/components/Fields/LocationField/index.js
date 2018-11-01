import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import * as styles from './styles';
import './index.scss';

const searchOptions = {
  types: ['(cities)'],
};

class LocationField extends Component {
  handleChange = address => {
    const { updatePositionCallback } = this.props;
    const { input } = this.props;
    input.onChange(address);

    if (typeof updatePositionCallback === 'function') {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => updatePositionCallback(latLng))
        .catch(() => {});
    }
  };

  render() {
    const { invalid, error, touched } = this.props.meta;
    const { value, name, onBlur } = this.props.input;
    const { inlineLabel, placeholder, disabled } = this.props;
    const { StyledLabel } = styles;
    const hasError = touched && error && invalid;
    const hasSuccess = touched && !error && !invalid;
    const fieldClassNames = classNames('ant-form-item-control', 'has-feedback', {
      'has-error': hasError,
      'has-success': hasSuccess,
    });

    const containerClassNames = classNames('ant-row ant-form-item ant-form-item-with-help location-field-container', {
      inline__label: inlineLabel,
    });
    const labelClassNames = classNames('ant-form-item-label', { 'ant-col-8': inlineLabel });
    const wrapperClassNames = classNames('ant-form-item-control-wrapper', { 'ant-col-16': inlineLabel });

    return (
      <div className={containerClassNames}>
        {this.props.label && (
          <div className={labelClassNames}>
            <StyledLabel htmlFor={name}>{this.props.label}</StyledLabel>
          </div>
        )}
        <PlacesAutocomplete value={value || ''} onChange={this.handleChange} searchOptions={searchOptions}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className={wrapperClassNames}>
              <div className={fieldClassNames}>
                <span className="ant-form-item-children">
                  <input
                    {...getInputProps({
                      className: classNames('ant-input', { 'ant-input-disabled': disabled }),
                      placeholder,
                      onBlur,
                      disabled,
                    })}
                    value={value}
                    name={name}
                  />
                </span>
                {hasError ? (
                  <div className="ant-form-explain">
                    <FormattedMessage {...{ id: error.props.id }} />
                  </div>
                ) : null}
                <div className="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft ant-select-dropdown-location location_dropdown">
                  <ul className="ant-select-dropdown-menu ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical">
                    {loading && <li className="ant-select-dropdown-menu-item">Loading...</li>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'ant-select-dropdown-menu-item ant-select-dropdown-menu-item-active'
                        : 'ant-select-dropdown-menu-item';

                      return (
                        <li
                          className="ant-select-dropdown-menu-item"
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}

LocationField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  inlineLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  placeholder: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  updatePositionCallback: PropTypes.func,
};

export default LocationField;
