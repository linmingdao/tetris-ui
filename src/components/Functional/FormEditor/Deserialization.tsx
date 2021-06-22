import React, { FC } from 'react';
import Iconfont from './Iconfont';
import { Form, Button, Space, Popconfirm } from 'antd';
import { DeserializationProps, IRules, StageItem, Templates } from './types';

function flat(stageItem: StageItem, flatInitialValuesRef: any, cascadeValuesRef: any) {
  if (stageItem.children && stageItem.children.length) {
    cascadeValuesRef[stageItem.props.name] = {};
    stageItem.children.forEach((childStageItem: StageItem) => flat(childStageItem, flatInitialValuesRef, cascadeValuesRef[stageItem.props.name]));
  } else {
    cascadeValuesRef[stageItem.props.name] = stageItem.props.value;
    flatInitialValuesRef[stageItem.props.name] = stageItem.props.value;
  }
}

function flatStageItemList(stageItemList: StageItem[]): any {
  const cascadeValues: any = {};
  const flatInitialValues: any = {};
  stageItemList.forEach(stageItem => flat(stageItem, flatInitialValues, cascadeValues));
  return { cascadeValues, flatInitialValues };
}

function loop(
  stageItem: StageItem,
  templates: Templates,
  mode: 'stage' | 'preview',
  cascadeLevel: number,
  indent: number,
  rules: IRules
): React.ReactElement {
  if (stageItem.children && stageItem.children.length) {
    return (
      <Form.Item
        style={{ marginLeft: cascadeLevel * indent }}
        key={stageItem.props.name}
        label={
          <span
            style={{
              color: '#fff',
              cursor: 'text',
              padding: '3px 6px',
              borderTopRightRadius: 7,
              borderBottomRightRadius: 7,
              backgroundColor: '#1890ff',
              borderLeft: '5px solid #9ed7ff',
            }}
          >
            <Iconfont type="icon-formgroup" /> <span style={{ padding: '0 6px' }}>{stageItem.props.label}</span>
          </span>
        }
      >
        {stageItem.children.map((childStageItem: StageItem) => {
          return loop(childStageItem, templates, mode, cascadeLevel + 1, indent, rules);
        })}
      </Form.Item>
    );
  } else {
    const propsRules = stageItem.props.rules || [];
    const formItemRules = propsRules.map((ruleName: string) => rules[ruleName]);
    const AnonymousComponent = templates[stageItem.name].instance;

    return (
      <Form.Item
        style={{ marginLeft: cascadeLevel * indent }}
        key={stageItem.props.name}
        label={stageItem.props.label}
        name={stageItem.props.name}
        rules={formItemRules}
      >
        <AnonymousComponent {...stageItem.props} mode={mode} />
      </Form.Item>
    );
  }
}

function merge(cascadeValues: any, name: string, value: any) {
  const keys = Object.keys(cascadeValues);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key === name) {
      cascadeValues[key] = value;
      return;
    }
    if (typeof cascadeValues[key] === 'object') {
      merge(cascadeValues[key], name, value);
    }
  }
}

function mergeFlatValues(cascadeValues: any, flatValues: any) {
  Object.keys(flatValues).forEach((name: string) => merge(cascadeValues, name, flatValues[name]));
  return cascadeValues;
}

export const Deserialization: FC<DeserializationProps> = ({
  mode,
  rules = {},
  templates,
  stageItems,
  indent = 40,
  okText = '提 交',
  resetText = '重 置',
  cancelText = '取 消',
  onOK,
  onCancel,
  onReset,
  customToolbar,
  onValuesChange,
  defaultToolbar = ['ok', 'reset', 'cancel'],
}) => {
  const [form] = Form.useForm();
  const { cascadeValues, flatInitialValues } = flatStageItemList(stageItems);

  function getValues() {
    return new Promise((resovle, reject) => {
      form
        .validateFields()
        .then(flatValues => resovle(mergeFlatValues(cascadeValues, flatValues)))
        .catch(err => reject(err));
    });
  }

  function resetForm() {
    form.resetFields();
  }

  async function handleOk() {
    const values = await getValues();
    onOK && onOK(values);
  }

  function handleReset() {
    form.resetFields();
    onReset && onReset();
  }

  function handleCancel() {
    onCancel && onCancel();
  }

  return (
    <Form form={form} initialValues={flatInitialValues} layout="vertical" onValuesChange={onValuesChange}>
      {stageItems.map((stageItem: StageItem) => loop(stageItem, templates, mode, 0, indent, rules))}
      <Form.Item style={{ borderTop: '1px solid #eee' }}>
        <Space style={{ width: '100%', justifyContent: 'flex-end', padding: '10px 0' }}>
          {defaultToolbar.includes('ok') && (
            <Button shape="round" icon={<Iconfont type="icon-commit" />} type="primary" onClick={() => handleOk()}>
              {okText}
            </Button>
          )}
          {defaultToolbar.includes('reset') && (
            <Popconfirm title="确认要重置么?" onConfirm={handleReset} okText="确定" cancelText="取消">
              <Button shape="round" danger icon={<Iconfont type="icon-reset" />} type="default">
                {resetText}
              </Button>
            </Popconfirm>
          )}
          {defaultToolbar.includes('cancel') && (
            <Button shape="round" onClick={() => handleCancel()} icon={<Iconfont type="icon-cancel" />} type="default">
              {cancelText}
            </Button>
          )}
          {customToolbar ? customToolbar({ form, getValues, resetForm }) : <></>}
        </Space>
      </Form.Item>
    </Form>
  );
};

Deserialization.displayName = 'Deserialization';
