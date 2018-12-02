import React from 'react';
import { Row, Col } from 'antd';

export default function Debt(props) {
  const { debt, button } = props;
  return (
    <Row justify="center" className="wisdom-container">
      <Row gutter={16} className="wisdom-info-modal-row">
        <Col offset={4} span={12} className="wisdom-info-modal-column-label">
          Loan
        </Col>
        <Col span={8} className="wisdom-info-modal-column-content">
          {debt.loan_size}
        </Col>
      </Row>
      <Row gutter={16} className="wisdom-info-modal-row">
        <Col offset={4} span={12} className="wisdom-info-modal-column-label">
          Credit percentage
        </Col>
        <Col span={8} className="wisdom-info-modal-column-content">
          {Math.round(debt.credit_percentage * 100)} %
        </Col>
      </Row>
      {button}
    </Row>
  );
}
