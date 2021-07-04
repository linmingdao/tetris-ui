import React, { FC } from 'react';
import { Checkbox } from 'antd';
import { CheckboxGroupProps } from './types';

const Preview: FC<CheckboxGroupProps> = props => {
  // const { optionsList, value } = props;
  // return (
  //   <div>
  //     {value &&
  //       value.length &&
  //       value
  //         .map(val => {
  //           const target = (optionsList as any[]).find(item => item.value === val);
  //           return target ? target.label : val;
  //         })
  //         .join(', ')}
  //   </div>
  // );
  const { optionList, value } = props;
  return <Checkbox.Group value={value} options={optionList} />;
};

export default Preview;
