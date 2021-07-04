import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { CommonAttributesPropTypes, ICustomConfig } from './types';
import { CheckOutlined, CloseOutlined, UndoOutlined } from '@ant-design/icons';

const CommonAttributes: React.FC<CommonAttributesPropTypes> = props => {
  const {
    name,
    label,
    rules,
    placeholder,
    initialValues,
    onSave,
    onCancel,
    children,
    noRules = false,
    noPlaceholder = false,
    CustomAttr,
    ...restProps
  } = props;

  function onFinish(allValues: any) {
    onSave && onSave(allValues);
  }

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
    <Form layout="vertical" labelAlign="left" initialValues={getInitialValues()} onFinish={onFinish}>
      <Form.Item label="name" name="name" rules={[{ required: true, message: '控件名称必填' }]}>
        <Input placeholder="请输入" disabled allowClear />
      </Form.Item>
      <Form.Item label="label" name="label" rules={[{ required: true, message: '控件label必填' }]}>
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
      <Form.Item>
        <Space style={{ width: '100%', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: 10, marginTop: 10 }}>
          <Button icon={<CheckOutlined />} type="primary" shape="round" htmlType="submit">
            保 存
          </Button>
          <Button icon={<UndoOutlined />} danger shape="round" htmlType="reset">
            重 置
          </Button>
          <Button icon={<CloseOutlined />} shape="round" onClick={() => onCancel && onCancel()}>
            取 消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

CommonAttributes.displayName = 'CommonAttributes';

export default CommonAttributes;
