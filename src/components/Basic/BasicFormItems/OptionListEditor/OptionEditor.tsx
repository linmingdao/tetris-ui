import React, { FC, useState } from 'react';
import Iconfont from '../Iconfont';
import { Button, Input, Space } from 'antd';
import { OptionEditorProps, OptionItemType } from './types';

export const optionValidator = (_: any, optionItemValue: OptionItemType) => {
  if (optionItemValue.label && optionItemValue.value) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('选项的 label 和 value 必填'));
  }
};

const OptionEditor: FC<OptionEditorProps> = ({ onRemove, value: optionItemValue, onChange }) => {
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<string | undefined>(undefined);

  const triggerChange = (changedValue: OptionItemType) => {
    onChange?.({ label, value, ...optionItemValue, ...changedValue });
  };

  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    setLabel(label);
    triggerChange({ label });
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    triggerChange({ value });
  };

  return (
    <Space>
      <Input addonBefore="label" placeholder="请输入label" value={optionItemValue?.label || label} onChange={onLabelChange} allowClear />
      <Input addonBefore="value" placeholder="请输入value" value={optionItemValue?.value || value} onChange={onValueChange} allowClear />
      <Button shape="circle" size="small" danger type="primary" icon={<Iconfont type="icon-delete" />} onClick={() => onRemove()} />
    </Space>
  );
};

export default OptionEditor;
