import React from 'react';
import { Button, Space } from 'antd';
import { Story, Meta } from '@storybook/react';
import { SaveOutlined } from '@ant-design/icons';
import FormEditor, { Deserialization } from '../../components/Functional/FormEditor';
import { templates, groupIcons, rules } from '../../components/Business/SeriesFormItems/index';
import { FormEditorProps, StageItem } from '../../components/Functional/FormEditor/types';
import { stageItems } from './formEditorMockData';

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
          padding: 10,
          boxShadow: ' 0 6px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as Meta;

const Template: Story<FormEditorProps> = args => (
  <>
    <p>表单编辑器:</p>
    <FormEditor {...args} />
    <p style={{ marginTop: 20 }}>反序列化能力:</p>
    <div style={{ padding: '10px 200px', border: '1px solid #eee', boxShadow: 'rgb(0 0 0 / 15%) 0px 6px 12px' }}>
      <Deserialization
        rules={rules}
        mode="stage"
        templates={templates}
        stageItems={stageItems}
        customToolbar={({ getValues, resetForm, form }) => {
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
        }}
        onOK={values => console.log('custom ok', values)}
        onCancel={() => console.log('custom cancel')}
        onReset={() => console.log('custom reset')}
      />
    </div>
  </>
);

export const Demo = Template.bind({});
Demo.args = {
  stageItems,
  templates,
  groupIcons,
  tmplPanelWidth: 360,
  attrPanelWidth: 400,
  // defaultToolbar: ['undo', 'redo', 'reset', 'clear', 'export'],
  onExport: function (stageItemList: StageItem[]) {
    console.log(JSON.stringify(stageItemList));
  },
  customToolbar: ({ stageItemList }) => {
    function handleSave() {
      console.log(stageItemList);
    }

    return (
      <Space>
        <Button type="text" icon={<SaveOutlined />} onClick={() => handleSave()}>
          自定义保存按钮
        </Button>
      </Space>
    );
  },
  style: {
    width: '100%',
    height: '750px',
    boxShadow: 'rgb(206 206 206) 0px 0px 25px 0px',
  },
};
