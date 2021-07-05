import React, { FC } from 'react';
import { Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { SelectorProps } from './types';

const Stage: FC<SelectorProps> = props => {
  const { disabled, placeholder, value, selectMode, optionList } = props;

  const handleChange = (value: SelectValue) => {
    triggerChange(value);
  };

  const triggerChange = (newVal: any) => {
    const { onChange } = props;
    onChange && onChange(newVal);
  };

  return (
    <Select
      allowClear
      value={value}
      disabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      style={{ width: '100%' }}
      mode={selectMode === 'multiple' ? 'multiple' : undefined}
    >
      {optionList &&
        optionList.map(item => {
          return (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          );
        })}
    </Select>
  );
};

export default Stage;
