import React from 'react';
import { Input } from 'antd';
import { Story, Meta } from '@storybook/react';
import { ScheduleOutlined } from '@ant-design/icons';
import LabelWrapper, { LabelWrapperProps } from '../../components/Layout/LabelWrapper';

export default {
  title: '布局组件/LabelWrapper',
  component: LabelWrapper,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
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

const Template: Story<LabelWrapperProps> = args => (
  <>
    <div>
      <LabelWrapper {...args}>
        <Input placeholder="请输入" />
      </LabelWrapper>
      <LabelWrapper {...args}>
        <Input placeholder="请输入" />
      </LabelWrapper>
      <LabelWrapper {...args}>
        <Input placeholder="请输入" />
      </LabelWrapper>
      <LabelWrapper {...args}>
        <Input placeholder="请输入" />
      </LabelWrapper>
      <LabelWrapper {...args}>
        <Input placeholder="请输入" />
      </LabelWrapper>
      <LabelWrapper {...args}>
        <Input placeholder="请输入" />
      </LabelWrapper>
      <LabelWrapper {...args}>
        <Input placeholder="请输入" />
      </LabelWrapper>
      <LabelWrapper {...args}>
        <Input placeholder="请输入" />
      </LabelWrapper>
      <LabelWrapper {...args}>
        <Input placeholder="请输入" />
      </LabelWrapper>
      <LabelWrapper {...args}>
        <Input placeholder="请输入" />
      </LabelWrapper>
    </div>
  </>
);

export const Usage = Template.bind({});
Usage.storyName = '标签包裹器';
Usage.args = {
  label: 'test',
  labelPlacement: 'right',
  noColon: false,
};

export const VerticalLayout = Template.bind({});
VerticalLayout.storyName = '竖向布局';
VerticalLayout.args = {
  layout: 'vertical',
  labelWidth: 150,
  label: (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ScheduleOutlined style={{ color: 'red' }} />
      <span>我是Label</span>
    </div>
  ),
};
