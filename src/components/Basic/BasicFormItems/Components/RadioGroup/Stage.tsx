import React from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';

import { RadioGroupPropTypes } from './types';

const Stage: React.FC<RadioGroupPropTypes> = props => {
  const { disabled, optionList, value } = props;

  const handleChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    triggerChange(value);
  };

  const triggerChange = (newVal: any) => {
    const { onChange } = props;
    onChange && onChange(newVal);
  };

  return <Radio.Group value={value} disabled={disabled} options={optionList} onChange={handleChange} />;
};

export default Stage;
