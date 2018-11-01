import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const DEFAULT_STATUS = 'valid';

export default class FileContent extends React.Component {
  renderIcon = status => {
    if (['valid', 'invalid'].includes(status)) {
      return <Icon type="file" theme="outlined" />;
    }

    return <Icon type="loading" theme="outlined" />;
  };

  render() {
    const { file, onRemove } = this.props;
    const name = file && file.name;

    const status = file.fileStatus || DEFAULT_STATUS;

    return (
      <div className={classNames('file-content-container', status)}>
        <div className="file-content">
          <div className="file-status">{this.renderIcon(status)}</div>
          <div className="file-name">{name}</div>
          <div className="file-remove">
            <Icon type="close" theme="outlined" onClick={onRemove} />
          </div>
        </div>
        {file.errors && <span className="file-error">{file.errors}</span>}
      </div>
    );
  }
}

FileContent.propTypes = {
  file: PropTypes.object,
  onRemove: PropTypes.func,
};
