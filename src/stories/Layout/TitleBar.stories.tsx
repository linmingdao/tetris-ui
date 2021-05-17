import React from 'react';
import { Input, Button } from 'antd';
import { ScheduleOutlined } from '@ant-design/icons';
import { Story, Meta } from '@storybook/react';
import FilterBox from '../../components/Layout/FilterBox/FilterBox';
import TitleBar, { TitleBarProps } from '../../components/Layout/TitleBar/TitleBar';

export default {
  title: '布局组件/TitleBar',
  component: TitleBar,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          height: '100px',
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

const Template: Story<TitleBarProps> = args => (
  <TitleBar {...args}>
    <ScheduleOutlined style={{ color: 'pink' }} /> 我是标题哟
  </TitleBar>
);

export const OnlyTitle = Template.bind({});
OnlyTitle.storyName = '只有标题';
OnlyTitle.args = {};

export const HasBack = Template.bind({});
HasBack.storyName = '带返回按钮';
HasBack.args = { hasBack: true };

export const HasTool = Template.bind({});
HasTool.storyName = '带工具栏';
HasTool.args = {
  hasBack: true,
  renderTool: () => {
    return (
      <FilterBox>
        <Input placeholder="请输入" style={{ width: 200, marginRight: 5 }} />
        <Button type="primary">查询</Button>
      </FilterBox>
    );
  },
};
