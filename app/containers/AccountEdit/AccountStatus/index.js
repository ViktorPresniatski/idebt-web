import React from 'react';
import StarRatings from 'react-star-ratings';
import { Row, Col } from 'antd';
import './styles.scss';

class AccountStatus extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div className="account-status-info">
        <div className="form-wrapper">
          <Row justify="center" className="wisdom-container">
            <Row gutter={16} className="wisdom-info-modal-row">
              <Col offset={3} span={12} className="wisdom-info-modal-column-label">
                Balance
              </Col>
              <Col span={9} className="wisdom-info-modal-column-content">
                {user && user.balance} $
              </Col>
            </Row>
            <Row gutter={16} className="wisdom-info-modal-row">
              <Col offset={3} span={12} className="wisdom-info-modal-column-label">
                Debt outstanding amount
              </Col>
              <Col span={9} className="wisdom-info-modal-column-content">
                {user && user.debt_outstanding_amount} $
              </Col>
            </Row>
            <Row gutter={16} className="wisdom-info-modal-row">
              <Col offset={3} span={12} className="wisdom-info-modal-column-label">
                The amount of interest on the loan
              </Col>
              <Col span={9} className="wisdom-info-modal-column-content">
                {user && user.interest_amount} $
              </Col>
            </Row>
            <Row gutter={16} className="wisdom-info-modal-row">
              <Col offset={3} span={12} className="wisdom-info-modal-column-label">
                Credit rating
              </Col>
              <Col span={9} className="wisdom-info-modal-column-content">
                <StarRatings
                  rating={user ? user.rating / 10 : 0}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  name='rating'
                  starDimension="25px"
                  starSpacing="0px"
                />
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    );
  }
}

export default AccountStatus;
