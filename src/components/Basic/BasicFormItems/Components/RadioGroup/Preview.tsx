import React from 'react';
import { Radio } from 'antd';
import { RadioGroupPropTypes } from './types';

const Preview: React.FC<RadioGroupPropTypes> = props => {
  const { optionList, value } = props;
  return <Radio.Group value={value} disabled options={optionList} />;
};

export default Preview;
