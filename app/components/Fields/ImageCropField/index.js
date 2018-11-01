import 'canvas-toBlob';
import React from 'react';
import { Modal } from 'antd';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import AvatarEditor from 'react-avatar-editor';

import { GreenButton, GrayBorderButton } from 'components/Controls';
import SimpleInfoModal from 'components/Modals/SimpleInfoModal';

import { DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP, AVATAR_IMAGE_PROPS, IMAGE_QUALITY } from './constants';
import { Avatar, RemoveImageContainer } from './DisplayElements';
import { isImageTypeValid } from './helpers';
import { AvatarCrop } from './CropElements';
import SliderField from '../SliderField';
import * as styles from './styles';
import messages from './messages';
import './styles.scss';

export class ImageCropField extends React.Component {
  state = {
    isEditorModalOpen: false,
    isErrorModalOpen: false,
    currentZoom: DEFAULT_ZOOM,
  };

  isImageValid = image => isImageTypeValid(image);

  showErrorAlert = () => this.setState({ isErrorModalOpen: true });

  handleDrop = images => {
    const image = images[0];

    if (this.isImageValid(image)) {
      this.setState({ image: images[0], isEditorModalOpen: true });
    } else {
      this.showErrorAlert();
    }
  };

  updateInput = file => {
    if (typeof this.props.input.onChange === 'function') {
      this.props.input.onChange(file);
    }
  };

  handleCancel = () => this.setState({ isEditorModalOpen: false });

  handleZoomChange = currentZoom => this.setState({ currentZoom });

  handleSubmit = () => {
    const { input } = this.props;
    const { editor } = this;

    const canvasImage = editor.getImageScaledToCanvas();
    canvasImage.toBlob(
      croppedImage => {
        croppedImage.name = `${uuidv4()}.jpeg`;
        if (typeof input.onChange === 'function') {
          input.onChange(croppedImage);
        }
      },
      'image/jpeg',
      IMAGE_QUALITY,
    );

    this.setState({ isEditorModalOpen: false, image: null });
  };

  renderImage = () => {
    const { input, displayElement: DisplayElement, disabled } = this.props;

    const url = typeof input.value === 'string' ? input.value : URL.createObjectURL(input.value);
    const children = (DisplayElement && <DisplayElement src={url} />) || <Avatar src={url} />;

    return (
      <RemoveImageContainer onRemove={() => this.updateInput(null)} src={url} disabled={disabled}>
        {children}
      </RemoveImageContainer>
    );
  };

  renderCrop = () => {
    const { disabled, cropElement: CropElement } = this.props;

    const children = (CropElement && <CropElement />) || <AvatarCrop />;

    return (
      <Dropzone style={styles.dropzone} onDrop={this.handleDrop} disableClick={disabled}>
        {children}
      </Dropzone>
    );
  };

  renderImageEditor = () => {
    const { image, isEditorModalOpen, currentZoom } = this.state;
    let { cropOptions } = this.props;

    if (!image) {
      return null;
    }

    cropOptions = cropOptions || AVATAR_IMAGE_PROPS;

    const sliderProps = {
      input: {
        value: currentZoom,
        onChange: this.handleZoomChange,
      },
      min: MIN_ZOOM,
      max: MAX_ZOOM,
      step: ZOOM_STEP,
    };

    const imageProps = {
      scale: currentZoom,
      ...cropOptions,
      image,
      ref: editor => {
        this.editor = editor;
      },
    };

    return (
      <Modal
        title="Edit image"
        className="image_crop_modal"
        visible={isEditorModalOpen}
        onCancel={this.handleCancel}
        footer={[
          <GrayBorderButton key="cancel" onClick={this.handleCancel}>
            <FormattedMessage {...messages.cancelButtonText} />
          </GrayBorderButton>,
          <GreenButton key="ok" onClick={this.handleSubmit}>
            <FormattedMessage {...messages.okButtonText} />
          </GreenButton>,
        ]}
      >
        <div style={styles.modalContent}>
          <AvatarEditor {...imageProps} className="crop_canvas" />
          <div className="crop_slider">
            <SliderField {...sliderProps} />
          </div>
        </div>
      </Modal>
    );
  };

  render() {
    const { isErrorModalOpen } = this.state;
    const { input, disabled } = this.props;

    const hasMedia = !!(input && input.value);

    return (
      <div className={classNames('image_crop_field', { disabled })}>
        {!hasMedia && this.renderCrop()}
        {hasMedia && this.renderImage()}
        <SimpleInfoModal
          title={<FormattedMessage {...messages.validationErrorTitle} />}
          visible={isErrorModalOpen}
          closeModal={() => this.setState({ isErrorModalOpen: false })}
          body={<FormattedMessage {...messages.contentTypeError} />}
        />
        {this.renderImageEditor()}
      </div>
    );
  }
}

ImageCropField.propTypes = {
  input: PropTypes.object,
  disabled: PropTypes.bool,
  cropOptions: PropTypes.object,
  cropElement: PropTypes.element,
  displayElement: PropTypes.func,
};

export default ImageCropField;
