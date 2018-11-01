import _ from 'lodash';

export const convertPagination = pagination => {
  if (pagination.current === 'last') {
    pagination.current =
      (_.isNumber(pagination.total) && Math.trunc(pagination.total / pagination.pageSize) + 1) || 'last';
  }
  return pagination;
};
