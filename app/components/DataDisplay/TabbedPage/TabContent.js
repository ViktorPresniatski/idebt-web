import React from 'react';
import PropTypes from 'prop-types';

export default function TabContent(props) {
  const { title, tabKey, children: Child, ...rest } = props;

  return <div {...rest}>{typeof props.children === 'function' ? <Child /> : props.children}</div>;
}

TabContent.propTypes = {
  className: PropTypes.string,
  tabKey: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.array]),
};
