import React from 'react';
import { Button, Space } from 'antd';
import { Story, Meta } from '@storybook/react';
import { SaveOutlined, BuildOutlined } from '@ant-design/icons';
import { stageItems } from './formEditorMockData';
import { FormEditor } from '../../index';
import { Required, Email, MobilePhone } from '../../index';
import {
  SortableContainer,
  TextInput,
  TextArea,
  CheckboxGroup,
  Notes,
  NumInput,
  RadioGroup,
  DateTimeSelect,
  DateRangeSelect,
  Selector,
} from '../../index';
import { FormEditorProps, StageItem, DeserializationProps } from '../../components/Functional/FormEditor/types';

export default {
  title: '功能组件/FormEditor',
  component: FormEditor,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          minHeight: '490px',
          width: '100%',
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as Meta;

const groupIcons = { 基础组件: <BuildOutlined /> };

const templates = { SortableContainer, TextInput, TextArea, CheckboxGroup, Notes, NumInput, RadioGroup, DateTimeSelect, DateRangeSelect, Selector };

const formEditorTemplate: Story<FormEditorProps> = args => <FormEditor {...args} />;

const deserializationTemplate: Story<DeserializationProps> = args => <FormEditor.Deserialization {...args} />;

export const Basic = formEditorTemplate.bind({});
Basic.storyName = '基本用法';
Basic.args = {
  templates,
  groupIcons,
  rules: { Required, Email, MobilePhone },
  onExport: function (stageItemList: StageItem[]) {
    console.log(JSON.stringify(stageItemList));
  },
  style: { height: '675px' },
};

export const DataBackfill = formEditorTemplate.bind({});
DataBackfill.storyName = '数据回填';
DataBackfill.args = {
  templates,
  stageItems,
  onExport: function (stageItemList: StageItem[]) {
    console.log(JSON.stringify(stageItemList));
  },
  style: { height: '675px' },
};

export const CustomToolbar = formEditorTemplate.bind({});
CustomToolbar.storyName = '自定义工具栏';
CustomToolbar.args = {
  templates,
  defaultToolbar: ['undo', 'redo', 'reset', 'clear'],
  customToolbar: ({ stageItemList }) => {
    function handleSave() {
      console.log(stageItemList);
    }

    return (
      <Space>
        <Button type="text" icon={<SaveOutlined />} onClick={() => handleSave()} style={{ color: 'green' }}>
          自定义保存按钮
        </Button>
      </Space>
    );
  },
  style: { height: '675px' },
};

export const Deserialization = deserializationTemplate.bind({});
Deserialization.storyName = '反序列化能力';
Deserialization.args = {
  mode: 'preview',
  templates,
  stageItems,
  defaultToolbar: ['ok', 'cancel', 'reset'],
  rules: { Required, Email, MobilePhone },
  onValuesChange(params) {
    console.log(params);
  },
};

export const DeserializationCustomToolbar = deserializationTemplate.bind({});
DeserializationCustomToolbar.storyName = '自定义反序列化工具栏';
DeserializationCustomToolbar.args = {
  mode: 'stage',
  templates,
  stageItems,
  rules: { Required, Email, MobilePhone },
  defaultToolbar: [],
  customToolbar: ({ getValues, resetForm, form }) => {
    async function showValues() {
      const res = await getValues();
      console.log('customToolbar', res);
    }

    return (
      <>
        <Button onClick={() => showValues()}>自定义获取值</Button>
        <Button onClick={() => resetForm()}>自定义重置</Button>
        <Button onClick={() => console.log('其余业务按钮')}>其余业务按钮</Button>
      </>
    );
  },
  onOK: values => console.log('custom ok', values),
  onCancel: () => console.log('custom cancel'),
  onReset: () => console.log('custom reset'),
};
