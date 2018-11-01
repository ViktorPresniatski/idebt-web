import 'canvas-toBlob';
import React from 'react';
import { Modal } from 'antd';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AvatarEditor from 'react-avatar-editor';

import { GreenButton, GrayBorderButton } from 'components/Controls';

import { DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_QUALITY } from './constants';
import SliderField from '../SliderField';
import * as styles from './styles';
import messages from './messages';
import './styles.scss';

export class ImageEditor extends React.Component {
  state = {
    currentZoom: DEFAULT_ZOOM,
  };

  handleZoomChange = currentZoom => this.setState({ currentZoom });

  handleSubmit = () => {
    const { editor } = this;

    const canvasImage = editor.getImageScaledToCanvas();
    canvasImage.toBlob(
      croppedImage => {
        croppedImage.name = `${uuidv4()}.jpeg`;
        this.props.handleSubmit(croppedImage);
      },
      'image/jpeg',
      IMAGE_QUALITY,
    );
  };

  renderImageEditor = () => {
    const { currentZoom } = this.state;
    const { image, isEditorModalOpen, handleCancel } = this.props;

    if (!image) {
      return null;
    }

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
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      image,
      scale: currentZoom,
      ref: editor => {
        this.editor = editor;
      },
    };

    return (
      <Modal
        title="Edit image"
        className="image_crop_modal"
        visible={isEditorModalOpen}
        onCancel={handleCancel}
        footer={[
          <GrayBorderButton key="cancel" onClick={handleCancel}>
            <FormattedMessage {...messages.cancelButtonText} />
          </GrayBorderButton>,
          <GreenButton key="ok" onClick={this.handleSubmit}>
            <FormattedMessage {...messages.okButtonText} />
          </GreenButton>,
        ]}
      >
        <div style={styles.modalContent}>
          <AvatarEditor {...imageProps} />
          <div className="crop_slider">
            <SliderField {...sliderProps} />
          </div>
        </div>
      </Modal>
    );
  };

  render() {
    const { isEditorModalOpen } = this.props;

    return isEditorModalOpen ? this.renderImageEditor() : null;
  }
}

ImageEditor.propTypes = {
  image: PropTypes.object,
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  isEditorModalOpen: PropTypes.bool,
};

export default ImageEditor;
