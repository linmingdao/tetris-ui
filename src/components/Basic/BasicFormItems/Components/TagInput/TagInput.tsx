import React from 'react';
import { nanoid } from 'nanoid';
import Iconfont from '../../Iconfont';
import { Form, Select } from 'antd';
import CommonAttributes from '../../CommonAttributes';

interface PropTypes {
  name: string;
  value?: string;
  label?: string;
  rules?: string[];
  placeholder?: string;
  disabled?: boolean;
  mode?: string;
  onChange?: (values: any) => void;
}

const Stage: React.FC<PropTypes> = ({ disabled, placeholder, value, onChange }) => {
  const handleChange = (value: any) => {
    triggerChange(value);
  };

  const triggerChange = (newVal: any) => {
    onChange && onChange(newVal);
  };

  return (
    <Select mode="tags" style={{ width: '100%' }} value={value} disabled={disabled} placeholder={placeholder} onChange={handleChange} allowClear />
  );
};

const Preview: React.FC<PropTypes> = props => {
  const { value, placeholder } = props;
  return <Select mode="tags" value={value} disabled placeholder={placeholder} />;
};

const Attr: React.FC<PropTypes> = props => {
  const { value } = props;

  return (
    <CommonAttributes {...{ ...props, initialValues: { value } }}>
      <Form.Item label="value" name="value">
        <Select mode="tags" placeholder="请输入tags" allowClear />
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

export const TagInput = {
  group: '基础组件',
  label: 'Tag输入框',
  name: 'TagInput',
  instance: Builder,
  icon: <Iconfont type="icon-tag" />,
  loader: () => import('./TagInput'),
  props: {
    name: nanoid(),
    value: undefined,
    label: '标题',
    placeholder: '请输入tags',
    mode: 'stage',
  },
};
