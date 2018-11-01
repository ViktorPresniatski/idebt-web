// IMPORTANT!!
// Type of input value should be array if

import 'canvas-toBlob';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import SimpleInfoModal from 'components/Modals/SimpleInfoModal';

import { validateFile, isFileLimitReached } from './helpers';
import { FileContent, DropdownView } from './Elements';
import './styles.scss';
import fieldMessages from './messages';
import FieldErrors from './FieldErrors';

export class FileField extends React.Component {
  state = {
    isErrorModalOpen: false,
    errorMessage: 'contentTypeError',
  };

  updateInput = value => {
    if (typeof this.props.input.onChange === 'function') {
      this.props.input.onChange(value);
    }
  };

  addElement = file => {
    const { input } = this.props;
    this.updateInput([...input.value, file]);
  };

  removeElement = index => {
    const newArray = [...this.props.input.value];
    newArray.splice(index, 1);

    if (_.isEmpty(newArray)) {
      this.updateInput(null);
    } else {
      this.updateInput(newArray);
    }
  };

  handleDrop = files => {
    const { customFileValidation, input, filesCountLimit } = this.props;

    if (input.value && !_.isEmpty(input.value) && input.value.length >= filesCountLimit) {
      this.showErrorAlert(fieldMessages.filesCountLimit);
      return;
    }

    const file = files[0];
    const errors = validateFile(file);

    if (!_.isEmpty(errors)) {
      this.showErrorAlert(errors[0].message);
      return;
    }

    if (customFileValidation) {
      const customErrors = customFileValidation(file, input.value);
      if (!_.isEmpty(customErrors)) {
        file.errors = customErrors;
        file.fileStatus = 'invalid';
        this.addElement(file);
      }
    }
    file.status = 'valid';
    this.addElement(file);
  };

  showErrorAlert = message => this.setState({ isErrorModalOpen: true, errorMessage: message });

  render() {
    const {
      input,
      disabled,
      label,
      filesCountLimit,
      children,
      maxInlineErrors,
      meta: { touched, invalid, error },
    } = this.props;
    const { isErrorModalOpen, errorMessage } = this.state;

    const hasError = touched && error && invalid;

    const dropzoneDisabled = !!(disabled || isFileLimitReached(input.value, filesCountLimit));
    const hasContent = !!(input && !_.isEmpty(input.value)); // input.value.size => for List() object

    return (
      <div className={classNames('file-field', { disabled })}>
        <Dropzone
          className="file-field-dropzone"
          disabled={dropzoneDisabled}
          onDrop={this.handleDrop}
          disableClick={dropzoneDisabled}
        >
          <DropdownView label={<div>{label}</div>} />
        </Dropzone>
        {children}
        {hasContent && (
          <div className="file-field-file-list">
            {input.value.map((value, index) => (
              <FileContent key={index} file={value} onRemove={() => this.removeElement(index)} />
            ))}
          </div>
        )}

        <FieldErrors visible={hasError} errors={error} maxInlineErrors={maxInlineErrors} />

        <SimpleInfoModal
          closeModal={() => this.setState({ isErrorModalOpen: false })}
          visible={isErrorModalOpen}
          body={errorMessage}
        />
      </div>
    );
  }
}

FileField.propTypes = {
  input: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.any,
  children: PropTypes.element,
  filesCountLimit: PropTypes.number,
  customFileValidation: PropTypes.func,
  meta: PropTypes.object,
  maxInlineErrors: PropTypes.number,
};

export default FileField;
