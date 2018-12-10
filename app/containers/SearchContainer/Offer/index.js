import React from 'react';
import { Row, Col } from 'antd';

export default function Offer(props) {
  const { item } = props;
  // debugger
  return (
    <div>
      <h2 className="tinder-title">Offer</h2>
      <Row justify="center" className="wisdom-container">
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={4} span={12} className="wisdom-info-modal-column-label">
            Credit percentage
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.credit_percentage} %
          </Col>
        </Row>
        <hr />
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={4} span={12} className="wisdom-info-modal-column-label">
            With capitalization
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.is_with_capitalization ? 'Yes' : 'No'}
          </Col>
        </Row>
        <hr />
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={4} span={12} className="wisdom-info-modal-column-label">
            Grace period
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.grace_period} days
          </Col>
        </Row>
        <hr />
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={4} span={12} className="wisdom-info-modal-column-label">
            Return period
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.return_period} days
          </Col>
        </Row>
      </Row>
    </div>
  );
}
