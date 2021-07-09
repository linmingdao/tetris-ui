import React, { FC } from 'react';
import { Checkbox } from 'antd';
import { CheckboxGroupProps } from './types';

const Preview: FC<CheckboxGroupProps> = props => {
  const { optionList, value } = props;
  return <Checkbox.Group value={value} disabled options={optionList} />;
};

export default Preview;
