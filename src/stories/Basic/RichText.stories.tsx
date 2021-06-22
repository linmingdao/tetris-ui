import React from 'react';
import { Story, Meta } from '@storybook/react';
import RichText, { RichTextProps, richTextRequired } from '../../components/Basic/RichText';
import { message, Form, Button, Input } from 'antd';

export default {
  title: '基础组件/RichText',
  component: RichText,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          minHeight: '350px',
          width: '100%',
          padding: 10,
          boxShadow: ' 0 6px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as Meta;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const Template: Story<RichTextProps> = args => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onFinish(values: any) {
    // eslint-disable-next-line no-console
    console.log(values);
    message.success(`待提交的表单内容：${JSON.stringify(values)}`);
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        单独使用：
        <div style={{ marginTop: 10 }}>
          <RichText {...args} />
        </div>
      </div>
      在 Antd4 的 From 表单中使用：
      <Form {...layout} onFinish={onFinish} initialValues={{ doc: '我也爱我的祖国' }} style={{ marginTop: 10 }}>
        <Form.Item label="姓名" name="name">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="自我介绍" name="doc" rules={[{ required: true }, { validator: richTextRequired() }]}>
          <RichText {...args} />
        </Form.Item>
        <Form.Item label="详细地址" name="addr">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提 交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export const basic = Template.bind({});
basic.storyName = '基本用法';
basic.args = {
  readOnly: false,
  value: '我爱我的祖国',
};
