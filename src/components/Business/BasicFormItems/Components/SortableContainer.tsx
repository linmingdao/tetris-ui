import React from 'react';
import { nanoid } from 'nanoid';
import { Form, Input } from 'antd';
import { attrLabelCol, attrWrapperCol, attrLabelAlign } from '../config';

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

const Stage: React.FC<PropTypes> = ({ children }) => {
  return <div>{children}</div>;
};

const Preview: React.FC<PropTypes> = props => {
  return <div>{props.value}</div>;
};

const Attr: React.FC<PropTypes> = ({ name, label, onAttrPropsChange }) => {
  const handleValuesChange = (changedValues: any, allValues: any) => {
    onAttrPropsChange && onAttrPropsChange(changedValues, allValues);
  };

  return (
    <Form
      labelCol={attrLabelCol}
      wrapperCol={attrWrapperCol}
      labelAlign={attrLabelAlign}
      initialValues={{ name, label }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="name" name="name">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
    </Form>
  );
};

const SortableContainer: React.FC<PropTypes> = props => {
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

SortableContainer.defaultProps = {
  name: nanoid(),
  value: '',
  label: '容器',
  placeholder: '请输入',
  mode: 'stage',
};

export default SortableContainer;
