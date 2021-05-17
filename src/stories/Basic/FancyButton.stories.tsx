import React from 'react';
import { Story, Meta } from '@storybook/react';
import FancyButton, { FancyButtonProps } from '../../components/Basic/FancyButton';

export default {
  title: '基础组件/FancyButton',
  component: FancyButton,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          height: '100px',
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

const Template: Story<FancyButtonProps> = args => <FancyButton {...args} />;

export const CustomMessage = Template.bind({});
CustomMessage.storyName = '自定义错误消息';
CustomMessage.args = {
  tooltipTitle: 'test',
  confirmTitle: 'confirm',
  onClick: () => console.log('fffff'),
};
