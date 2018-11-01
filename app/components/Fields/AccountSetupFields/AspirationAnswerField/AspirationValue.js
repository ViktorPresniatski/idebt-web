import React from 'react';
import { Collapse } from 'antd';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';

import { maxLength } from 'utils/validations';
import CheckboxField from 'components/Fields/CheckboxField';
import TextAreaField from 'components/Fields/TextAreaField';
import IconArrowDown from 'components/Svgs/IconArrowDown';
import messages from './messages';
import './styles.scss';

const TEXT_AREA_FIELD_VALIDATION = maxLength(350);
const PANEL_KEY = 'aspirationAnswerBodyPanel';

class AspirationValue extends React.Component {
  state = {
    isSelected: false,
    activeKeys: [],
  };

  checkboxFormatValue = value => !!value;

  checkboxParseValue = value => (value ? this.props.tag.id : null);

  onCollapseStateChange = value => {
    this.setState({ activeKeys: value });
  };

  onCheckboxValueChange = (event, value) => {
    if (value !== this.state.isSelected) {
      this.setState({ isSelected: !!value, activeKeys: value ? [PANEL_KEY] : [] });
    }
  };

  render() {
    const { tag, name } = this.props;
    const { formatMessage } = this.props.intl;
    const { Panel } = Collapse;

    const panelHeader = (
      <div>
        <span>{tag.name}</span>
        <span className="arrow-container">
          <IconArrowDown className="arrow" />
        </span>
      </div>
    );

    return (
      <div className="aspiration-value">
        <Field
          name={`${name}.tag`}
          component={CheckboxField}
          parse={this.checkboxParseValue}
          format={this.checkboxFormatValue}
          defaultValue={this.state.isSelected}
          onChange={this.onCheckboxValueChange}
          className="aspiration-value-tag-field"
        />
        <Collapse onChange={this.onCollapseStateChange} activeKey={this.state.activeKeys}>
          <Panel showArrow={false} header={panelHeader} key={PANEL_KEY} disabled={!this.state.isSelected}>
            <Field
              name={`${name}.body`}
              placeholder={formatMessage(messages.bodyPlaceholder)}
              component={TextAreaField}
              labelCol={{ span: 24, offset: 0 }}
              wrapperCol={{ span: 24, offset: 0 }}
              autosize={{ minRows: 1, maxRows: 4 }}
              disabled={!this.state.isSelected}
              validate={TEXT_AREA_FIELD_VALIDATION}
              countdown={350}
            />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

AspirationValue.propTypes = {
  tag: PropTypes.object,
  name: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(AspirationValue);
