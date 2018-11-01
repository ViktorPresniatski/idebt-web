import React from 'react';

import './styles.scss';

export default class Image extends React.Component {
  render() {
    const { props } = this;
    return (
      <div className="file media-image">
        <img src={props.src} alt="" />
      </div>
    );
  }
}
