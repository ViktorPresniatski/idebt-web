import React from 'react';

import './styles.scss';

export default class Avatar extends React.Component {
  render() {
    const { props } = this;
    return (
      <div className="file file_avatar">
        <img src={props.src} alt="" />
      </div>
    );
  }
}
