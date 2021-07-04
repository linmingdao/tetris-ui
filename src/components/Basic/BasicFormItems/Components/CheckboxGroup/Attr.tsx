import React, { FC } from 'react';
import { Checkbox, Form } from 'antd';
import CommonAttributes from '../../CommonAttributes';
import { CheckboxGroupProps } from './types';
import { rednerOptionListEditor } from '../../OptionListEditor/OptionListEditor';

const Attr: FC<CheckboxGroupProps> = props => {
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
        <Checkbox.Group options={optionList} />
      </Form.Item>
      {rednerOptionListEditor()}
    </CommonAttributes>
  );
};

export default Attr;
