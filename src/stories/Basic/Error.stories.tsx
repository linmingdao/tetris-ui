import React from 'react';
import { Story, Meta } from '@storybook/react';
import Error, { ErrorProps } from '../../components/Basic/Error';

export default {
  title: '基础组件/Error',
  component: Error,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          height: '300px',
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

const Template: Story<ErrorProps> = args => <Error {...args} />;

export const CustomMessage = Template.bind({});
CustomMessage.storyName = '自定义错误消息';
CustomMessage.args = { message: '呀，出错了!' };

export const DefaultMessage = Template.bind({});
DefaultMessage.storyName = '默认的错误消息';
DefaultMessage.args = {};
