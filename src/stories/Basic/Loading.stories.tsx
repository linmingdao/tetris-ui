import 'antd/dist/antd.css';
import '../../styles/index.scss';
import React from 'react';
import { Story, Meta } from '@storybook/react';
import Loading, { LoadingProps } from '../../components/Basic/Loading/Loading';

export default {
  title: '基础组件/Loading',
  component: Loading,
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

const Template: Story<LoadingProps> = args => <Loading {...args} />;

export const CustomTip = Template.bind({});
CustomTip.storyName = '自定义加载的提示信息';
CustomTip.args = { tip: '别急，在路上了...' };

export const DefaultTip = Template.bind({});
DefaultTip.storyName = '默认的加载提示信息';
DefaultTip.args = {};
