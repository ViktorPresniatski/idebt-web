import React from 'react';
import { Row, Col } from 'antd';

export default function Debt(props) {
  const { debt, button } = props;
  const { API_URL } = process.env;

  return (
    <Row justify="center" className="wisdom-container">
      <Row gutter={16} className="wisdom-info-modal-row">
        <Col offset={4} span={12} className="wisdom-info-modal-column-label">
          You borrowed
        </Col>
        <Col span={8} className="wisdom-info-modal-column-content">
          {debt.loan_size}
        </Col>
      </Row>
      <Row gutter={16} className="wisdom-info-modal-row">
        <Col offset={4} span={12} className="wisdom-info-modal-column-label">
          Your debt now
        </Col>
        <Col span={8} className="wisdom-info-modal-column-content">
          {debt.current_size}
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
      <Row gutter={16} className="wisdom-info-modal-row">
        <Col offset={4} span={12} className="wisdom-info-modal-column-content">
          <a href={`${API_URL}debts/${debt.id}/contract/`}>Download contract</a>
        </Col>
      </Row>
      {button}
    </Row>
  );
}
