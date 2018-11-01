import _ from 'lodash';
import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { GrayBorderButton, GreenButton } from 'components/Controls';
import messages from './messages';
import '../styles.scss';

const DEFAULT_BUTTON_LABELS = {
  cancel: <FormattedMessage {...messages.cancelButtonText} />,
  accept: <FormattedMessage {...messages.saveButtonText} />,
};

export default function FormConfirmationModal(props) {
  const { buttonLabels } = props;

  const labels = _.isEmpty(buttonLabels) ? DEFAULT_BUTTON_LABELS : buttonLabels;

  return (
    <Modal visible={props.visible} onCancel={props.cancelModal} footer={null} className="simple-modal">
      <div className="simple-modal-body">{props.body}</div>
      <div className="simple-modal-footer">
        <GrayBorderButton type="button" onClick={props.cancelModal}>
          {labels.cancel}
        </GrayBorderButton>
        <GreenButton key="submit" type="primary" onClick={props.acceptModal}>
          {labels.accept}
        </GreenButton>
      </div>
    </Modal>
  );
}

FormConfirmationModal.propTypes = {
  body: PropTypes.any,
  visible: PropTypes.bool,
  cancelModal: PropTypes.func,
  acceptModal: PropTypes.func,
  buttonLabels: PropTypes.object,
};
