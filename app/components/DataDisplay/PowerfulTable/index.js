import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { injectIntl, intlShape } from 'react-intl';

import Table from 'components/DataDisplay/Table';

import { convertPagination } from './utils';

const PAGE_SIZE = 20;

class PowerfulTable extends React.Component {
  constructor(props) {
    super(props);

    this.refetchData = this.refetchData.bind(this);

    this.state = {
      pagination: (props.defaultPagination && convertPagination(props.defaultPagination)) || { pageSize: PAGE_SIZE },
      selectedRowKeys: props.selectedRowKeys || [],
      filters: props.defaultFilters || {},
      ordering: props.defaultOrdering,
      loading: false,
      data: [],
    };
  }

  componentWillMount() {
    this.fetch(this.state.filters, true);
  }

  componentWillReceiveProps(nextProps) {
    const { pagination } = this.state;
    let newState = {};

    if (this.props.data !== nextProps.data || this.props.data.results !== nextProps.data.results) {
      const { data } = nextProps;
      let newData = !_.isArray(data) ? data.results : data;
      newData = this.props.convertData instanceof Function ? this.props.convertData(newData) : newData;
      pagination.total = _.isArray(data) ? data.length : data.count;

      newState = {
        loading: false,
        data: newData,
        pagination: convertPagination(pagination),
      };
    }

    if (this.state.selectedRowKeys !== nextProps.selectedRowKeys) {
      newState.selectedRowKeys = nextProps.selectedRowKeys;
    }

    if (this.props.loading !== nextProps.loading) {
      newState.loading = nextProps.loading;
    }

    if (!_.isEmpty(newState)) {
      this.setState(newState);
    }
  }

  fetch = (data, initial = false) => {
    if (initial || this.props.dynamicData) {
      this.setState({ loading: true });
    }
    data = { ...data, ordering: data.ordering || this.props.defaultOrdering };
    this.props.dataRequest(data, initial);
  };

  getNewPagination = (newPage = 1) => {
    const pagination = { ...this.state.pagination };
    pagination.current = newPage;
    return pagination;
  };

  handleTableChange = (pagination, filters, sorter) => {
    const newPagination = this.getNewPagination(pagination.current);
    const ordering = this.getSortField(sorter.field, sorter.order);
    this.setState({ pagination: newPagination, ordering });

    this.fetch({
      page: pagination.current,
      ordering,
      ...this.state.filters,
    });
  };

  getSortField = (field, order) => {
    const sign = order === 'descend' ? '-' : '';
    return field && `${sign}${field}`;
  };

  handleFiltersChange = data => {
    const { filters } = this.state;
    const newFilters = { ...filters, ...data };
    const pagination = this.getNewPagination();
    this.setState({ filters: newFilters, pagination });
    this.fetch(newFilters);
  };

  refetchData = () => {
    const { filters, pagination, ordering } = this.state;
    this.setState({ loading: true });
    this.fetch({ ...filters, page: pagination.current, ordering });
  };

  handleSelectRowChange = selectedRowKeys => {
    if (this.props.onSelectedRowsChange instanceof Function) {
      this.props.onSelectedRowsChange(selectedRowKeys);
    } else {
      this.setState({ selectedRowKeys });
    }
  };

  render() {
    const { data, pagination, loading, selectedRowKeys } = this.state;
    const { tableClassName, filtersComponent, selectable, intl, ...rest } = this.props;
    const rowSelection = selectable && {
      selectedRowKeys,
      onChange: this.handleSelectRowChange,
    };

    const filters = filtersComponent && React.cloneElement(filtersComponent, { onChange: this.handleFiltersChange });

    return (
      <div className={className('powerful-table', tableClassName)}>
        {filters}
        <Table
          onChange={this.handleTableChange}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          pagination={pagination}
          dataSource={data}
          loading={loading}
          {...rest}
        />
      </div>
    );
  }
}

PowerfulTable.propTypes = {
  loading: PropTypes.bool,
  columns: PropTypes.array,
  intl: intlShape.isRequired,
  selectable: PropTypes.bool,
  dynamicData: PropTypes.bool,
  convertData: PropTypes.func,
  dataRequest: PropTypes.func,
  selectedRowKeys: PropTypes.array,
  defaultFilters: PropTypes.object,
  tableClassName: PropTypes.string,
  defaultOrdering: PropTypes.string,
  defaultPagination: PropTypes.object,
  filtersComponent: PropTypes.element,
  onSelectedRowsChange: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default injectIntl(PowerfulTable, {
  withRef: true,
});
