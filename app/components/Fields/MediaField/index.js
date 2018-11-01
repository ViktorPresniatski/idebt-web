import 'canvas-toBlob';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import { injectIntl, intlShape } from 'react-intl';

import SimpleInfoModal from 'components/Modals/SimpleInfoModal';

import { isImageTypeValid, isVideoTypeValid, isVideoSizeValid, getMediaType } from './helpers';
import MediaDisplayElement from './DisplayElements';
import { VIDEO_LIMIT_SIZE_MB } from './constants';
import { MediaCrop } from './CropElements';
import ImageEditor from './ImageEditor';
import * as styles from './styles';
import messages from './messages';
import './styles.scss';

export class MediaField extends React.Component {
  state = {
    isEditorModalOpen: false,
    isErrorModalOpen: false,
    errorMessage: 'contentTypeError',
  };

  handleDrop = files => {
    const file = files[0];
    const { formatMessage } = this.props.intl;

    if (isImageTypeValid(file)) {
      this.setState({ image: file, isEditorModalOpen: true });
    } else if (isVideoTypeValid(file)) {
      if (isVideoSizeValid(file)) {
        this.updateInput(file);
      } else {
        this.showErrorAlert(formatMessage(messages.videoSizeError, { size: VIDEO_LIMIT_SIZE_MB }));
      }
    } else {
      this.showErrorAlert(formatMessage(messages.contentTypeError));
    }
  };

  updateInput = file => {
    if (typeof this.props.input.onChange === 'function') {
      this.props.input.onChange(file);
    }
  };

  showErrorAlert = message => this.setState({ isErrorModalOpen: true, errorMessage: message });

  handleCancel = () => this.setState({ isEditorModalOpen: false });

  handleSubmit = croppedImage => {
    this.updateInput(croppedImage);
    this.setState({ isEditorModalOpen: false, image: null });
  };

  renderCrop = () => (
    <Dropzone style={styles.dropzone} onDrop={this.handleDrop} disableClick={this.props.disabled}>
      <MediaCrop />
    </Dropzone>
  );

  renderMedia = () => {
    const { input, initialType, disabled } = this.props;

    const type = getMediaType(input.value, initialType);

    if (type) {
      const url = typeof input.value === 'string' ? input.value : URL.createObjectURL(input.value);
      return <MediaDisplayElement type={type} src={url} onRemove={() => this.updateInput(null)} disabled={disabled} />;
    }

    return this.renderCrop();
  };

  render() {
    const { isErrorModalOpen, isEditorModalOpen, image } = this.state;
    const { input, disabled } = this.props;

    const hasMedia = !!(input && input.value);

    return (
      <div className={classNames('media-field', { disabled })}>
        {!hasMedia && this.renderCrop()}
        {hasMedia && this.renderMedia()}
        <ImageEditor
          image={image}
          handleCancel={this.handleCancel}
          handleSubmit={this.handleSubmit}
          isEditorModalOpen={isEditorModalOpen}
        />
        <SimpleInfoModal
          visible={isErrorModalOpen}
          closeModal={() => this.setState({ isErrorModalOpen: false })}
          body={this.state.errorMessage}
        />
      </div>
    );
  }
}

MediaField.propTypes = {
  input: PropTypes.object,
  disabled: PropTypes.bool,
  intl: intlShape.isRequired,
  initialType: PropTypes.string,
};

export default injectIntl(MediaField);
