import React from 'react';
import { nanoid } from 'nanoid';
import Iconfont from '../Iconfont';
import CommonAttributes, { extractCommonAttributes } from '../CommonAttributes';

interface PropTypes {
  name: string;
  value?: string;
  label?: string;
  rules?: string[];
  placeholder?: string;
  disabled?: boolean;
  mode?: string;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

const Stage: React.FC<PropTypes> = ({ children }) => {
  return <div>{children}</div>;
};

const Preview: React.FC<PropTypes> = props => {
  return <div>{props.value}</div>;
};

const Attr: React.FC<PropTypes> = props => {
  return <CommonAttributes {...extractCommonAttributes({ ...props })} noPlaceholder noRules />;
};

const Builder: React.FC<PropTypes> = props => {
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

export const SortableContainer = {
  group: '基础组件',
  label: '容器组件',
  name: 'SortableContainer',
  instance: Builder,
  icon: <Iconfont type="icon-container" />,
  loader: () => import('./SortableContainer'),
  props: {
    name: nanoid(),
    label: '容器',
    mode: 'stage',
  },
};
