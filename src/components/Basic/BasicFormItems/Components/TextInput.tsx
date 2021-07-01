import React from 'react';
import { nanoid } from 'nanoid';
import Iconfont from '../Iconfont';
import { Form, Input } from 'antd';
import CommonAttributes from '../CommonAttributes';

interface PropTypes {
  name: string;
  value?: string;
  label?: string;
  rules?: string[];
  placeholder?: string;
  disabled?: boolean;
  mode?: string;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

const Stage: React.FC<PropTypes> = ({ disabled, placeholder, value, onChange }) => {
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value ? e.target.value.trim() : undefined;
    triggerChange(value);
  };

  const triggerChange = (newVal: any) => {
    onChange && onChange(newVal);
  };

  return <Input value={value} disabled={disabled} placeholder={placeholder} onChange={handleChange} allowClear />;
};

const Preview: React.FC<PropTypes> = props => {
  const { value, placeholder } = props;
  // return <div>{props.value}</div>;
  return <Input value={value} bordered={false} readOnly placeholder={placeholder} />;
};

const Attr: React.FC<PropTypes> = props => {
  const { value } = props;
  function valuesChangeInterceptor(changedValues: any, allValues: any) {
    if (changedValues.value) {
      changedValues.value = changedValues.value.trim();
    }
    if (allValues.value) {
      allValues.value = allValues.value.trim();
    }
    return { changedValues, allValues };
  }

  return (
    <CommonAttributes
      {...{
        ...props,
        valuesChangeInterceptor,
        initialValues: { value },
      }}
    >
      <Form.Item label="value" name="value">
        <Input placeholder="请输入" allowClear />
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

export const TextInput = {
  group: '基础组件',
  label: '输入框',
  name: 'TextInput',
  instance: Builder,
  icon: <Iconfont type="icon-input" />,
  loader: () => import('./TextInput'),
  props: {
    name: nanoid(),
    value: undefined,
    label: '标题',
    placeholder: '请输入',
    mode: 'stage',
  },
};
