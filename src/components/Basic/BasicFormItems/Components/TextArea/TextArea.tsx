import React from 'react';
import { nanoid } from 'nanoid';
import Iconfont from '../../Iconfont';
import { Form, Input, InputNumber } from 'antd';
import CommonAttributes from '../../CommonAttributes';

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
}

const Stage: React.FC<PropTypes> = ({ disabled, placeholder, value, rows, onChange }) => {
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value ? e.target.value.trim() : undefined;
    triggerChange(value);
  };

  const triggerChange = (newVal: any) => {
    onChange && onChange(newVal);
  };

  return <Input.TextArea rows={rows} value={value} disabled={disabled} placeholder={placeholder} onChange={handleChange} allowClear />;
};

const Preview: React.FC<PropTypes> = props => {
  const { value, placeholder } = props;
  return <Input.TextArea value={value} bordered={false} readOnly placeholder={placeholder} autoSize />;
};

const Attr: React.FC<PropTypes> = props => {
  const { value, rows } = props;
  return (
    <CommonAttributes
      {...{
        ...props,
        initialValues: { value, rows },
      }}
    >
      <Form.Item label="rows" name="rows">
        <InputNumber min={1} precision={0} placeholder="请输入" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="value" name="value">
        <Input.TextArea rows={rows} placeholder="请输入" allowClear />
      </Form.Item>
    </CommonAttributes>
  );
};

const Builder: React.FC<PropTypes> = props => {
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

export default Builder;

export const TextArea = {
  group: '基础组件',
  label: '文本域',
  name: 'TextArea',
  instance: Builder,
  icon: <Iconfont type="icon-textarea" />,
  loader: () => import('./TextArea'),
  props: {
    name: nanoid(),
    value: undefined,
    rows: 4,
    rules: [],
    label: '备注',
    placeholder: '请输入',
    mode: 'stage',
  },
};
