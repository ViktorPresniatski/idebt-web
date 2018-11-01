import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import messages from './messages';

class FieldErrors extends React.Component {
  state = {
    isModalOpened: false,
  };

  showModal = event => {
    event.preventDefault();
    this.setState({ isModalOpened: true });
  };

  hideModal = event => {
    event.preventDefault();
    this.setState({ isModalOpened: false });
  };

  renderError = error => <div className="ant-form-explain">{error}</div>;

  getErrorsList = originalErrorsObject => {
    let errors = [];
    const errorsObject = _.cloneDeep(originalErrorsObject);

    if (_.isEmpty(errorsObject)) {
      return [];
    }

    if (!_.isEmpty(errorsObject.general)) {
      errors = errors.concat(errorsObject.general);
      delete errorsObject.general;
    }

    return errors.concat(
      _.chain(errorsObject)
        .values()
        .flatten()
        .value(),
    );
  };

  renderErrorsList = errorsObject => {
    const { maxInlineErrors } = this.props;
    const { isModalOpened } = this.state;
    const errors = this.getErrorsList(errorsObject);
    const isTextTruncateNeeded = maxInlineErrors && maxInlineErrors < errors.length;
    const errorsList = isTextTruncateNeeded ? errors.slice(0, maxInlineErrors) : errors;

    return (
      <div>
        {errorsList.map(item => <div key={item}>{this.renderError(item)}</div>)}
        {isTextTruncateNeeded && (
          <button onClick={this.showModal} className="show-more-button">
            <FormattedMessage {...messages.showMoreButtonText} />
          </button>
        )}
        {isTextTruncateNeeded && (
          <Modal
            visible={isModalOpened}
            title={<FormattedMessage {...messages.errorsTitle} />}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText={<FormattedMessage {...messages.okButtonText} />}
            cancelText={<FormattedMessage {...messages.cancelButtonText} />}
          >
            <div className="has-error file-field-errors-container">
              {errors.map(item => <div key={item}>{this.renderError(item)}</div>)}
            </div>
          </Modal>
        )}
      </div>
    );
  };

  render() {
    const { errors, visible } = this.props;

    if (!errors || _.isEmpty(errors) || !visible) {
      return null;
    }

    const errorsContent = typeof errors.toJS === 'function' ? errors.toJS() : errors;

    const content =
      errorsContent instanceof Object ? this.renderErrorsList(errorsContent) : this.renderError(errorsContent);

    return <div className="has-error file-field-errors-container">{content}</div>;
  }
}

FieldErrors.propTypes = {
  errors: PropTypes.any,
  visible: PropTypes.any,
  maxInlineErrors: PropTypes.number,
};

export default FieldErrors;
