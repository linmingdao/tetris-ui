import React from 'react';
import { Input, Button, Switch, Tag } from 'antd';
import { ScheduleOutlined } from '@ant-design/icons';
import { Story, Meta } from '@storybook/react';
import FilterBox, { FilterBoxProps } from '../../components/Layout/FilterBox/FilterBox';

export default {
  title: '布局组件/FilterBox',
  component: FilterBox,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          height: '200px',
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

const Template: Story<FilterBoxProps> = args => (
  <FilterBox {...args}>
    <ScheduleOutlined style={{ color: 'pink' }} />
    <Tag color="magenta">magenta</Tag>
    <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
    <Input style={{ width: 100 }} placeholder="请输入" />
    <Button>查 询</Button>
  </FilterBox>
);

export const AlignRight = Template.bind({});
AlignRight.storyName = '元素靠右排列(默认)';
AlignRight.args = { align: 'right' };

export const AlignLeft = Template.bind({});
AlignLeft.storyName = '元素靠左排列';
AlignLeft.args = { align: 'left', disableSpace: false };
