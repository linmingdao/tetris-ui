import React from 'react';
import { Form, Input, Select } from 'antd';
import { CommonAttributesPropTypes, ICustomConfig } from './types';

const CommonAttributes: React.FC<CommonAttributesPropTypes> = props => {
  const {
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
    CustomAttr,
    ...restProps
  } = props;

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (valuesChangeInterceptor) {
      const { changedValues: cv, allValues: av } = valuesChangeInterceptor(changedValues, allValues);
      onAttrPropsChange && onAttrPropsChange(cv, av);
    } else {
      onAttrPropsChange && onAttrPropsChange(changedValues, allValues);
    }
  };

  function getInitialValues() {
    const initValues = { name, label, rules, placeholder, ...initialValues };
    if (CustomAttr && CustomAttr.length) {
      CustomAttr.forEach((item: ICustomConfig) => {
        initValues[item.name] = (restProps as any)[item.name];
      });
    }
    return initValues;
  }

  return (
    <Form labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onValuesChange={handleValuesChange} initialValues={getInitialValues()}>
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
      {CustomAttr &&
        CustomAttr.length &&
        CustomAttr.map((formItemCofing: any) => {
          return (
            <Form.Item key={formItemCofing.name} label={formItemCofing.label} name={formItemCofing.name}>
              {formItemCofing.widget}
            </Form.Item>
          );
        })}
    </Form>
  );
};

CommonAttributes.displayName = 'CommonAttributes';

export default CommonAttributes;
