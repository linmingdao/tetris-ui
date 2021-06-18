import React from 'react';
import { nanoid } from 'nanoid';
import { allRules } from '../validator';
import { Form, Input, InputNumber, Select } from 'antd';
import { attrLabelCol, attrWrapperCol, attrLabelAlign } from '../config';

interface PropTypes {
  name: string;
  value?: string;
  label?: string;
  rules?: string[];
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  required?: string;
  mode?: string;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

const Stage: React.FC<PropTypes> = ({ disabled, placeholder, value, rows, onChange }) => {
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value ? e.target.value.trim() : undefined;
    triggerChange(value);
  };

  const triggerChange = (newVal: any) => {
    onChange && onChange(newVal);
  };

  return <Input.TextArea rows={rows} value={value} disabled={disabled} placeholder={placeholder} onChange={handleChange} />;
};

const Preview: React.FC<PropTypes> = props => {
  return <div>{props.value}</div>;
};

const Attr: React.FC<PropTypes> = ({ name, value, label, placeholder, rules, rows, onAttrPropsChange }) => {
  const handleValuesChange = (changedValues: any, allValues: any) => {
    onAttrPropsChange && onAttrPropsChange(changedValues, allValues);
  };

  return (
    <Form
      labelCol={attrLabelCol}
      wrapperCol={attrWrapperCol}
      labelAlign={attrLabelAlign}
      initialValues={{ name, label, value, rules, placeholder, rows }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="name" name="name">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="value" name="value">
        <Input.TextArea rows={rows} placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="rules" name="rules">
        <Select placeholder="请选择" mode="multiple" allowClear>
          {allRules.map(rule => (
            <Select.Option key={rule} value={rule}>
              {rule}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="rows" name="rows">
        <InputNumber min={1} precision={0} placeholder="请输入" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
    </Form>
  );
};

const TextArea: React.FC<PropTypes> = props => {
  switch (props.mode) {
    case 'stage':
      return <Stage {...props} />;
    case 'attr':
      return <Attr {...props} />;
    case 'preview':
      return <Preview {...props} />;
    default:
      return <Stage {...props} />;
  }
};

TextArea.defaultProps = {
  name: nanoid(),
  value: undefined,
  rows: 4,
  rules: [],
  label: '备注',
  placeholder: '请输入',
  mode: 'stage',
};

export default TextArea;
