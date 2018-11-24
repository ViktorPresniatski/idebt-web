import React from 'react';
import { Row, Col } from 'antd';

export default function Issue(props) {
  const { item } = props;

  return (
    <div>
      <h2>Issue</h2>
      <Row justify="center" className="wisdom-container">
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={4} span={12} className="wisdom-info-modal-column-label">
            Amount
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.amount}
          </Col>
        </Row>
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={4} span={12} className="wisdom-info-modal-column-label">
            Maximum overpay
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.max_overpay}
          </Col>
        </Row>
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={4} span={12} className="wisdom-info-modal-column-label">
            Minimum credit period
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.min_credit_period} days
          </Col>
        </Row>
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={4} span={12} className="wisdom-info-modal-column-label">
            Borrower rating
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.borrower_stats.rating}
          </Col>
        </Row>
      </Row>
    </div>
  );
}
