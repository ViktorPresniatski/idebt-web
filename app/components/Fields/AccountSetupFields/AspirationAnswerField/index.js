import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { Row, Collapse } from 'antd';

import { InfoTooltip } from 'components/DataDisplay';
import SwitchField from 'components/Fields/SwitchField';
import { IconArrowDown } from 'components/Svgs';
import AspirationValue from './AspirationValue';
import messages from './messages';
import './styles.scss';

export default class AspirationAnswerField extends React.Component {
  renderAspirationValues = ({ fields, tags }) =>
    fields.map((member, index) => <AspirationValue key={tags[index].id} tag={tags[index]} name={member} />);

  render() {
    const { item, name } = this.props;
    const { Panel } = Collapse;
    const panelHeader = (
      <div>
        <span>{item.body}</span>
        <span className="arrow-container">
          <IconArrowDown className="arrow" />
        </span>
      </div>
    );

    return (
      <div>
        <Collapse className="aspiration_answer__main_collapse">
          <Panel showArrow={false} header={panelHeader} key="1">
            <FieldArray
              name={`${name}.aspiration_tag_answers`}
              component={this.renderAspirationValues}
              tags={item.tags}
            />
            <Row type="flex" justify="start" align="middle" className="aspiration-answer-footer">
              <Field
                name={`${name}.is_public`}
                component={SwitchField}
                type="boolean"
                inlineLabels
                labels={[
                  <FormattedMessage {...messages.privateFieldLabel} />,
                  <FormattedMessage {...messages.publicFieldLabel} />,
                ]}
              />
              <InfoTooltip placement="top" title={<FormattedMessage {...messages.tooltipNotificationText} />} />
            </Row>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

AspirationAnswerField.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string,
};
