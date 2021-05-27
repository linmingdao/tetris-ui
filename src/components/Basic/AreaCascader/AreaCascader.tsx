import React from 'react';
import { Cascader } from 'antd';
import options from './options.json';
import { AreaCascaderProps, AreaCascaderValueType } from './types';

const AreaCascader: React.FC<AreaCascaderProps> = ({ placeholder = '请选择', valueFormat = 'label', style, className, value, onChange }) => {
  function handleChange(changedValue: AreaCascaderValueType) {
    onChange?.(changedValue);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function filter(inputValue: string, path: any[]) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  return (
    <Cascader
      style={style}
      options={options}
      defaultValue={value}
      className={className}
      showSearch={{ filter }}
      onChange={handleChange}
      placeholder={placeholder}
      fieldNames={{ value: valueFormat === 'code' ? 'value' : 'label' }}
    />
  );
};

AreaCascader.displayName = 'AreaCascader';

export default AreaCascader;
