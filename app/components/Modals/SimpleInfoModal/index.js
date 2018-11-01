import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { GreenButton } from 'components/Controls';
import messages from './messages';
import '../styles.scss';

export default function SimpleInfoModal(props) {
  return (
    <Modal visible={props.visible} onCancel={props.closeModal} footer={null} className="simple-modal">
      <div className="simple-modal-body">{props.body}</div>
      <div className="simple-modal-footer">
        <GreenButton key="submit" type="primary" onClick={props.closeModal}>
          <FormattedMessage className="button-text" {...messages.okButtonText} />
        </GreenButton>
      </div>
    </Modal>
  );
}

SimpleInfoModal.propTypes = {
  body: PropTypes.any,
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
};
