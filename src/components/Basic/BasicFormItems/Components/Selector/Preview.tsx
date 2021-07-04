import React, { FC } from 'react';
import { Select } from 'antd';
import { SelectorProps } from './types';

const Preview: FC<SelectorProps> = props => {
  const { selectMode, optionList, value, placeholder } = props;
  return (
    <Select value={value} disabled placeholder={placeholder} bordered={false} mode={selectMode === 'multiple' ? 'multiple' : undefined}>
      {optionList &&
        optionList.map(item => {
          return (
            <Select.Option key={item.optionValue} value={item.optionValue}>
              {item.optionText}
            </Select.Option>
          );
        })}
    </Select>
  );
};

export default Preview;
