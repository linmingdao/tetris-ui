import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { ScheduleOutlined } from '@ant-design/icons';
import { Story, Meta } from '@storybook/react';
import FilterBox from '../../components/Layout/FilterBox/FilterBox';
import TitleLayout, { TitleLayoutProps } from '../../components/Layout/TitleLayout';

export default {
  title: '布局组件/TitleLayout',
  component: TitleLayout,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          height: '350px',
          width: '100%',
          padding: 10,
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as Meta;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Template: Story<TitleLayoutProps> = args => (
  <TitleLayout title="我是标题" {...args}>
    我是主体内容
    <Form {...layout} initialValues={{ remember: true }} style={{ padding: '0 100px' }}>
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </TitleLayout>
);

export const OnlyTitle = Template.bind({});
OnlyTitle.storyName = '只有标题';
OnlyTitle.args = {
  title: (
    <>
      <ScheduleOutlined style={{ color: 'pink' }} /> <span>我是标题哟</span>
    </>
  ),
};

export const CanNotEdit = Template.bind({});
CanNotEdit.storyName = '内容不可编辑';
CanNotEdit.args = {
  title: (
    <>
      <ScheduleOutlined style={{ color: 'pink' }} /> <span>我的内容不可编辑</span>
    </>
  ),
  editable: false,
};

export const HasBack = Template.bind({});
HasBack.storyName = '带返回按钮';
HasBack.args = { hasBack: true, title: '我是标题信息' };

export const HasTool = Template.bind({});
HasTool.storyName = '带工具栏';
HasTool.args = {
  hasBack: true,
  title: '我是标题信息',
  renderTool: () => {
    return (
      <FilterBox>
        <Input placeholder="请输入" style={{ width: 200, marginRight: 5 }} />
        <Button type="primary">查询</Button>
      </FilterBox>
    );
  },
};
