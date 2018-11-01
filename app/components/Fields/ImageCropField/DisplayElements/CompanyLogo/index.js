import React from 'react';

import './styles.scss';

export default class CompanyLogo extends React.Component {
  render() {
    const { props } = this;
    return (
      <div className="file file_company_logo">
        <img src={props.src} alt="" />
      </div>
    );
  }
}
