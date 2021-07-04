import React, { FC } from 'react';
import { nanoid } from 'nanoid';
import Iconfont from '../../Iconfont';
import { SelectorProps } from './types';
import Attr from './Attr';
import Stage from './Stage';
import Preview from './Preview';

const Builder: FC<SelectorProps> = props => {
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

export const Selector = {
  group: '基础组件',
  label: '下拉框',
  name: 'Selector',
  instance: Builder,
  icon: <Iconfont type="icon-selector" />,
  loader: () => import('./Index'),
  props: {
    name: nanoid(),
    value: undefined,
    selectMode: undefined,
    rules: [],
    label: '标题',
    placeholder: '请选择',
    optionList: [
      { label: '篮球', value: 'basketball' },
      { label: '足球', value: 'football' },
    ],
    mode: 'stage',
  },
};
