import React, { FC } from 'react';
import { Checkbox } from 'antd';
import { CheckboxGroupProps } from './types';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const Stage: FC<CheckboxGroupProps> = props => {
  const { disabled, optionList, value } = props;

  const handleChange = (value: CheckboxValueType[]) => {
    triggerChange(value);
  };

  const triggerChange = (newVal: any) => {
    const { onChange } = props;
    onChange && onChange(newVal);
  };

  return <Checkbox.Group value={value} disabled={disabled} options={optionList} onChange={handleChange} />;
};

export default Stage;
