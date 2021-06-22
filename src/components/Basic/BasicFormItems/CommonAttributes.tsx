import React from 'react';
import { Form, Input, Select } from 'antd';
import { CommonAttributesPropTypes, ExtractCommonAttributes } from './types';

const CommonAttributes: React.FC<CommonAttributesPropTypes> = ({
  name,
  label,
  rules,
  placeholder,
  initialValues,
  onAttrPropsChange,
  valuesChangeInterceptor,
  children,
  noRules = false,
  noPlaceholder = false,
}) => {
  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (valuesChangeInterceptor) {
      const { changedValues: cv, allValues: av } = valuesChangeInterceptor(changedValues, allValues);
      onAttrPropsChange && onAttrPropsChange(cv, av);
    } else {
      onAttrPropsChange && onAttrPropsChange(changedValues, allValues);
    }
  };

  return (
    <Form
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onValuesChange={handleValuesChange}
      initialValues={{ name, label, rules, placeholder, ...initialValues }}
    >
      <Form.Item label="name" name="name">
        <Input placeholder="请输入" disabled allowClear />
      </Form.Item>
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      {!noPlaceholder && (
        <Form.Item label="placeholder" name="placeholder">
          <Input placeholder="请输入" allowClear />
        </Form.Item>
      )}
      {!noRules && (
        <Form.Item label="rules" name="rules">
          <Select placeholder="请选择" mode="multiple" allowClear>
            {['Required', 'Email', 'MobilePhone'].map(rule => (
              <Select.Option key={rule} value={rule}>
                {rule}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {children}
    </Form>
  );
};

CommonAttributes.displayName = 'CommonAttributes';

export default CommonAttributes;

export const extractCommonAttributes: ExtractCommonAttributes = function ({
  name,
  label,
  rules,
  placeholder,
  initialValues,
  onAttrPropsChange,
  valuesChangeInterceptor,
}) {
  return {
    name,
    label,
    rules,
    placeholder,
    initialValues,
    onAttrPropsChange,
    valuesChangeInterceptor,
  };
};
