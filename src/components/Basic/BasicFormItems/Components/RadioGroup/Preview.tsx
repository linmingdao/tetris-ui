import React from 'react';
import { Radio } from 'antd';
import { RadioGroupPropTypes } from './types';

const Preview: React.FC<RadioGroupPropTypes> = props => {
  // const { optionList, value } = props;
  // const target = (optionList as any[]).find(item => item.value === value);
  // return <div>{target ? target.label : value} </div>;
  const { optionList, value } = props;
  return <Radio.Group value={value} options={optionList} />;
};

export default Preview;
