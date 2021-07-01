import React from 'react';
import { nanoid } from 'nanoid';
import Iconfont from '../Iconfont';
import { Form, InputNumber } from 'antd';
import CommonAttributes from '../CommonAttributes';

interface PropTypes {
  name: string;
  value?: number;
  label?: string;
  rules?: string[];
  placeholder?: string;
  disabled?: boolean;
  mode?: string;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

const Stage: React.FC<PropTypes> = ({ disabled, placeholder, value, onChange }) => {
  const handleChange = (value: number) => {
    triggerChange(value);
  };

  const triggerChange = (newVal: any) => {
    onChange && onChange(newVal);
  };

  return <InputNumber style={{ width: '100%' }} value={value} disabled={disabled} placeholder={placeholder} onChange={handleChange} />;
};

const Preview: React.FC<PropTypes> = props => {
  const { value, placeholder } = props;
  // return <div>{props.value}</div>;
  return <InputNumber value={value} readOnly bordered={false} placeholder={placeholder} />;
};

const Attr: React.FC<PropTypes> = props => {
  const { value } = props;
  return (
    <CommonAttributes
      {...{
        ...props,
        initialValues: { value },
      }}
    >
      <Form.Item label="value" name="value">
        <InputNumber style={{ width: '100%' }} placeholder="请输入数字" />
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

export const NumInput = {
  group: '基础组件',
  label: '数字输入框',
  name: 'NumInput',
  instance: Builder,
  icon: <Iconfont type="icon-numinput" />,
  loader: () => import('./NumInput'),
  props: {
    name: nanoid(),
    value: undefined,
    label: '标题',
    placeholder: '请输入',
    mode: 'stage',
  },
};
