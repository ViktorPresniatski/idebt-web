import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu, Dropdown } from 'antd';
import { Input } from 'components/Controls';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './index.scss';

const DEFAULT_QUERY_PARAM = 'query';

class SelectWithSearchField extends React.Component {
  constructor(props) {
    super(props);
    const option = this.getOption(props.input.value);
    this.state = {
      visible: false,
      value: (option && option.label) || null,
    };
  }

  componentWillMount() {
    this.fetch();
  }

  getOption = value => this.props.options.find(item => `${item.value}` === value);

  fetch = value => {
    const queryParam = this.props.queryParam || DEFAULT_QUERY_PARAM;
    this.props.fetch({ [queryParam]: value });
  };

  onChange = event => {
    const { value } = event.target;
    if (value === '') {
      this.props.input.onChange(value);
    }
    this.fetch(value);
    this.setState({ value: event.target.value });
  };

  onInputClick = event => {
    this.setState({ visible: true });
    this.props.input.onFocus(event);
  };

  onBlur = () => {
    this.setState({ visible: false });
  };

  onMenuMouseDown = event => {
    event.preventDefault();
  };

  onMenuClick = data => {
    const option = this.getOption(data.key);
    this.props.input.onChange(data.key);
    this.setState({ value: option.label, visible: false });
  };

  renderMenuOptions = () => {
    if (_.isEmpty(this.props.options)) {
      return (
        <Menu.Item disabled key="empty">
          <FormattedMessage {...messages.emptyData} />
        </Menu.Item>
      );
    }
    return this.props.options.map(item => <Menu.Item key={item.value}>{item.label}</Menu.Item>);
  };

  renderMenu = () => (
    <Menu className="select-with-search-field-dropdown" onClick={this.onMenuClick} onMouseDown={this.onMenuMouseDown}>
      {this.renderMenuOptions()}
    </Menu>
  );

  render() {
    const { inlineLabel, options, queryParam, fetch, input, meta, ...props } = this.props;
    const { visible, value } = this.state;

    if (inlineLabel) {
      props.labelCol = { span: 8, offset: 0 };
      props.wrapperCol = { span: 16, offset: 0 };
    }
    const containerClassName = classNames('select-with-search-field-container', { inline__label: inlineLabel });

    return (
      <div className={containerClassName} onBlur={this.onBlur}>
        <Dropdown overlay={this.renderMenu()} visible={visible}>
          <Input {...props} value={value} onChange={this.onChange} onClick={this.onInputClick} />
        </Dropdown>
      </div>
    );
  }
}

SelectWithSearchField.propTypes = {
  queryParam: PropTypes.string,
  inlineLabel: PropTypes.bool,
  options: PropTypes.array,
  input: PropTypes.object,
  meta: PropTypes.object,
  fetch: PropTypes.func,
};

export default SelectWithSearchField;
