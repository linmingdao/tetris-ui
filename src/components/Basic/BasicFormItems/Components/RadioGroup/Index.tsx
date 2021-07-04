import React from 'react';
import { nanoid } from 'nanoid';
import Iconfont from '../../Iconfont';
import { RadioGroupPropTypes } from './types';
import Attr from './Attr';
import Stage from './Stage';
import Preview from './Preview';
import { ITemplateItem } from '../../../../Functional/FormEditor';

const Builder: React.FC<RadioGroupPropTypes> = props => {
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

export const RadioGroup: ITemplateItem = {
  group: '基础组件',
  label: '单选按钮',
  name: 'RadioGroup',
  instance: Builder,
  icon: <Iconfont type="icon-radiogroup" />,
  loader: () => import('./Index'),
  props: {
    name: nanoid(),
    value: undefined,
    label: '标题',
    optionList: [
      { label: '篮球', value: 'basketball' },
      { label: '足球', value: 'football' },
    ],
    mode: 'stage',
  },
};
