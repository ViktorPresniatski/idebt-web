import React from 'react';
import { Spin } from 'antd';
import { List } from 'immutable';
import PropTypes from 'prop-types';

import { Select } from 'components/Controls';
import './index.scss';

const DEFAULT_QUERY_PARAM = 'query';

class WrappedSelectWithSearch extends React.Component {
  constructor(props) {
    super(props);

    const defaultValue = props.input.value instanceof List ? props.input.value.toArray() : props.input.value || [];

    this.state = {
      previusValue: defaultValue,
      value: defaultValue,
      data: props.options,
      fetching: false,
      defaultValue,
    };
  }

  componentWillMount() {
    this.fetch();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.setState({ data: nextProps.options, fetching: false });
    }
  }

  fetch = value => {
    const queryParam = this.props.queryParam || DEFAULT_QUERY_PARAM;
    this.props.fetch({ [queryParam]: value });
    this.setState({ fetching: true });
  };

  handleChange = value => {
    if (this.props.parseSelectedValue instanceof Function) {
      value = this.props.parseSelectedValue(value, this.state.previusValue, this);
    }
    this.setState({ value, previusValue: value });
    this.props.input.onChange(value);
  };

  render() {
    const { fetching, data, value, defaultValue } = this.state;
    const { queryParam, options, ...rest } = this.props;

    return (
      <div className="select-with-search-container">
        <Select
          notFoundContent={fetching ? <Spin size="small" /> : null}
          onChange={this.handleChange}
          defaultValue={defaultValue}
          onSearch={this.fetch}
          filterOption={false}
          options={data}
          value={value}
          {...rest}
          mode="multiple"
        />
      </div>
    );
  }
}

WrappedSelectWithSearch.propTypes = {
  parseSelectedValue: PropTypes.func,
  queryParam: PropTypes.string,
  options: PropTypes.array,
  input: PropTypes.object,
  mode: PropTypes.string,
  fetch: PropTypes.func,
};

export default WrappedSelectWithSearch;
