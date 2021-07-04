import React, { FC } from 'react';
import { nanoid } from 'nanoid';
import Iconfont from '../../Iconfont';
import { CheckboxGroupProps } from './types';
import Attr from './Attr';
import Stage from './Stage';
import Preview from './Preview';
import { ITemplateItem } from '../../../../Functional/FormEditor';

const Builder: FC<CheckboxGroupProps> = props => {
  switch (props.mode) {
    case 'stage':
      return <Stage {...props} />;
    case 'attr':
      return <Attr {...props} />;
    case 'preview':
      return <Preview {...props} />;
    default:
      return <Stage {...props} />;
  }
};

export default Builder;

export const CheckboxGroup: ITemplateItem = {
  group: '基础组件',
  label: '复选框',
  name: 'CheckboxGroup',
  instance: Builder,
  icon: <Iconfont type="icon-checkbox" />,
  loader: () => import('./Index'),
  props: {
    name: nanoid(),
    value: [],
    label: '标题',
    optionList: [
      { label: '篮球', value: 'basketball' },
      { label: '足球', value: 'football' },
    ],
    mode: 'stage',
  },
};
