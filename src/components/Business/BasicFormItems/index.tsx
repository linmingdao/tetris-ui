import React from 'react';
import Iconfont from './Iconfont';
import Notes from './Components/Notes';
import Selector from './Components/Selector';
import TextArea from './Components/TextArea';
import NumInput from './Components/NumInput';
import TextInput from './Components/TextInput';
import RadioGroup from './Components/RadioGroup';
import CheckboxGroup from './Components/CheckboxGroup';
import DateTimeSelect from './Components/DateTimeSelect';
import SortableContainer from './Components/SortableContainer';
import { GroupIcons, Templates } from '../../Functional/FormEditor/types';

export { rules, allRules } from './validator';

export const groupIcons: GroupIcons = { 基础组件: <Iconfont type="icon-basic" /> };

export const templates: Templates = {
  SortableContainer: {
    group: '基础组件',
    label: '容器组件',
    name: 'SortableContainer',
    instance: SortableContainer,
    icon: <Iconfont type="icon-container" />,
    loader: () => import('./Components/SortableContainer'),
  },
  TextInput: {
    group: '基础组件',
    label: '输入框',
    name: 'TextInput',
    instance: TextInput,
    icon: <Iconfont type="icon-input" />,
    loader: () => import('./Components/TextInput'),
  },
  TextArea: {
    group: '基础组件',
    label: '文本域',
    name: 'TextArea',
    instance: TextArea,
    icon: <Iconfont type="icon-textarea" />,
    loader: () => import('./Components/TextArea'),
  },
  CheckboxGroup: {
    group: '基础组件',
    label: '复选框',
    name: 'CheckboxGroup',
    instance: CheckboxGroup,
    icon: <Iconfont type="icon-checkbox" />,
    loader: () => import('./Components/CheckboxGroup'),
  },
  Notes: {
    group: '基础组件',
    label: '注释组件',
    name: 'Notes',
    instance: Notes,
    icon: <Iconfont type="icon-notes" />,
    loader: () => import('./Components/Notes'),
  },
  NumInput: {
    group: '基础组件',
    label: '数字输入框',
    name: 'NumInput',
    instance: NumInput,
    icon: <Iconfont type="icon-numinput" />,
    loader: () => import('./Components/NumInput'),
  },
  RadioGroup: {
    group: '基础组件',
    label: '单选按钮',
    name: 'RadioGroup',
    instance: RadioGroup,
    icon: <Iconfont type="icon-radiogroup" />,
    loader: () => import('./Components/RadioGroup'),
  },
  DateTimeSelect: {
    group: '基础组件',
    label: '日期选择器',
    name: 'DateTimeSelect',
    instance: DateTimeSelect,
    icon: <Iconfont type="icon-datetimeselect" />,
    loader: () => import('./Components/DateTimeSelect'),
  },
  Selector: {
    group: '基础组件',
    label: '下拉框',
    name: 'Selector',
    instance: Selector,
    icon: <Iconfont type="icon-selector" />,
    loader: () => import('./Components/Selector'),
  },
};
