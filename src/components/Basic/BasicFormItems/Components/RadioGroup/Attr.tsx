import React, { FC } from 'react';
import { Form, Radio } from 'antd';
import { RadioGroupPropTypes } from './types';
import CommonAttributes from '../../CommonAttributes';
import { rednerOptionListEditor } from '../../OptionListEditor/OptionListEditor';

const Attr: FC<RadioGroupPropTypes> = props => {
  const { value, optionList, onSave, onCancel } = props;

  return (
    <CommonAttributes
      {...{
        ...props,
        onSave,
        onCancel,
        initialValues: { value, optionList },
      }}
      noPlaceholder
    >
      <Form.Item label="value" name="value">
        <Radio.Group options={optionList} />
      </Form.Item>
      {rednerOptionListEditor()}
    </CommonAttributes>
  );
};

export default Attr;
