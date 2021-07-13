import React from 'react';
import { Story, Meta } from '@storybook/react';
import EditableTags, { EditableTagsProps } from '../../components/Basic/EditableTags';
import { Form, Button, Input } from 'antd';

export default {
  title: '基础组件/EditableTags',
  component: EditableTags,
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

const Template: Story<EditableTagsProps> = args => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onFinish(values: any) {
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <div style={{ width: '50%' }}>
      <div style={{ marginBottom: 20 }}>
        单独使用：
        <div style={{ marginTop: 10 }}>
          <EditableTags {...args} />
        </div>
      </div>
      在 Antd4 的 From 表单中使用：
      <Form {...layout} onFinish={onFinish} initialValues={{ tag: ['ff', 'fer'] }} style={{ marginTop: 10 }}>
        <Form.Item label="姓名" name="name">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="Tag信息" name="tag" rules={[{ required: true, message: 'Tag信息必填哟' }]}>
          <EditableTags {...args} />
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

export const MyAreaCascader = Template.bind({});
MyAreaCascader.storyName = 'tag编辑器';
MyAreaCascader.args = {
  placeholder: '请输入tag信息...',
  disabled: true,
  // onChange: function (value: AreaCascaderValueType) {
  //   value && message.info(value.join(','));
  // },
};
