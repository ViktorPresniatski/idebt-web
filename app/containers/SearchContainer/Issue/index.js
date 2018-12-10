import React from 'react';
import { Row, Col } from 'antd';
import StarRatings from 'react-star-ratings';

export default function Issue(props) {
  const { item } = props;

  return (
    <div>
      <h2 className="tinder-title">Issue</h2>
      <Row justify="center" className="wisdom-container">
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={3} span={12} className="wisdom-info-modal-column-label">
            Amount
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.amount}
          </Col>
        </Row>
        <hr />
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={3} span={12} className="wisdom-info-modal-column-label">
            Maximum overpay
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.max_overpay}
          </Col>
        </Row>
        <hr />
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={3} span={12} className="wisdom-info-modal-column-label">
            Minimum credit period
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.min_credit_period} days
          </Col>
        </Row>
        <hr />
        <Row gutter={16} className="wisdom-info-modal-row">
          <Col offset={3} span={12} className="wisdom-info-modal-column-label">
            Borrower rating
          </Col>
          <Col span={8} className="wisdom-info-modal-column-content">
            {item.borrower_stats.rating}
          </Col>
        </Row>
        <hr />
        {item.borrower_stats.rating !== 0 ? (
          <Row gutter={16} className="wisdom-info-modal-row">
            <Col offset={3} span={12} className="wisdom-info-modal-column-label">
              Credit rating
            </Col>
            <Col span={9} className="wisdom-info-modal-column-content">
              <StarRatings
                rating={item.borrower_stats.rating / 10}
                starRatedColor="#ffae00"
                numberOfStars={5}
                name="rating"
                starDimension="25px"
                starSpacing="0px"
              />
            </Col>
          </Row>
        ) : null}
      </Row>
    </div>
  );
}
