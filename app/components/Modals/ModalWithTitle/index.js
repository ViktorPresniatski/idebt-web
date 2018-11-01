import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../styles.scss';

export default function ModalWithTitle(props) {
  return (
    <Modal
      footer={null}
      visible={props.visible}
      onCancel={props.closeModal}
      className={classNames('simple-modal', props.className)}
    >
      <div className="simple-modal-title">{props.title}</div>
      <div className="simple-modal-body">{props.children}</div>
    </Modal>
  );
}

ModalWithTitle.propTypes = {
  children: PropTypes.any,
  visible: PropTypes.bool,
  title: PropTypes.element,
  closeModal: PropTypes.func,
  className: PropTypes.string,
};
