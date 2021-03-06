import React, { FC } from 'react';
import { SelectorProps } from './types';
import { Form, Select } from 'antd';
import CommonAttributes from '../../CommonAttributes';
import { rednerOptionListEditor } from '../../OptionListEditor/OptionListEditor';

const Attr: FC<SelectorProps> = props => {
  const { value, optionList, selectMode, onSave, onCancel } = props;

  return (
    <CommonAttributes
      {...{
        ...props,
        onSave,
        onCancel,
        initialValues: { value, optionList, selectMode },
      }}
    >
      <Form.Item label="value" name="value">
        <Select placeholder="请选择" allowClear={true} style={{ width: '100%' }} mode={selectMode ? selectMode : undefined}>
          {optionList &&
            optionList.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={
          <span>
            单选 or 多选(<span style={{ color: '#ff4d4e', fontSize: '12px' }}>更改模式后请先保存才能生效</span>)
          </span>
        }
        name="selectMode"
      >
        <Select placeholder="请选择" style={{ width: '100%' }}>
          <Select.Option value="undefined">单选</Select.Option>
          <Select.Option value="multiple">多选</Select.Option>
        </Select>
      </Form.Item>
      {rednerOptionListEditor()}
    </CommonAttributes>
  );
};

export default Attr;
