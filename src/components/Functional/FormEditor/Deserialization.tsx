import React, { FC, useEffect, useState } from 'react';
import Iconfont from './Iconfont';
import Loading from '../../Basic/Loading';
import { Form, Button, Space, Popconfirm } from 'antd';
import { DeserializationProps, IRules, StageItem, Templates } from './types';
import { flatStageItemList, mergeFlatValues } from './utils/deserialization';

function loop(
  stageItem: StageItem,
  templates: Templates,
  mode: 'stage' | 'preview',
  cascadeLevel: number,
  indent: number,
  rules: IRules
): React.ReactElement {
  if (stageItem.children && stageItem.children.length) {
    // 渲染容器
    return (
      <Form.Item
        style={{ marginLeft: cascadeLevel * indent }}
        key={stageItem.props.name}
        label={
          <span className="form-item-group">
            <Iconfont type="icon-formgroup" />
            <span style={{ padding: '0 6px' }}>{stageItem.props.label}</span>
          </span>
        }
      >
        {/* 渲染容器下的子控件 */}
        {stageItem.children.map((childStageItem: StageItem) => loop(childStageItem, templates, mode, cascadeLevel + 1, indent, rules))}
      </Form.Item>
    );
  } else {
    const propsRules = stageItem.props.rules || [];
    const formItemRules = propsRules.map((ruleName: string) => rules[ruleName]);
    const AnonymousComponent = templates[stageItem.name].instance;

    // 渲染子控件
    return (
      <Form.Item
        rules={formItemRules}
        key={stageItem.props.name}
        name={stageItem.props.name}
        label={stageItem.props.label}
        style={{ marginLeft: cascadeLevel * indent }}
      >
        <AnonymousComponent {...stageItem.props} mode={stageItem.props.mode || mode} />
      </Form.Item>
    );
  }
}

export const Deserialization: FC<DeserializationProps> = ({
  mode,
  rules = {},
  templates,
  stageItems,
  indent = 30,
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
  const [flatResult, setFlatResult] = useState<any>(undefined);
  const [localMode, setLocalMode] = useState<'stage' | 'preview'>('stage');

  useEffect(() => {
    setLocalMode(mode);
  }, [mode]);

  useEffect(() => {
    const { indexMap, cascadeValues, flatInitialValues } = flatStageItemList(stageItems);
    setFlatResult({ indexMap, cascadeValues, flatInitialValues });
  }, [stageItems]);

  function getValues() {
    return new Promise((resovle, reject) => {
      form
        .validateFields()
        .then(flatValues => resovle(mergeFlatValues(flatResult.cascadeValues, flatValues)))
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

  function handleValuesChange(changedValues: any, flatValues: any) {
    onValuesChange &&
      onValuesChange({
        indexMap: flatResult.indexMap,
        index: flatResult.indexMap[Object.keys(changedValues)[0]],
        flatValues,
        changedValues,
        allValues: mergeFlatValues(flatResult.cascadeValues, flatValues),
      });
  }

  return flatResult ? (
    <Form
      form={form}
      layout="vertical"
      initialValues={flatResult.flatInitialValues}
      onValuesChange={handleValuesChange}
      className="tetris-bricks_deserialization"
    >
      {stageItems.map((stageItem: StageItem) => loop(stageItem, templates, localMode, 0, indent, rules))}
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
            <Button shape="round" onClick={() => onCancel && onCancel()} icon={<Iconfont type="icon-cancel" />} type="default">
              {cancelText}
            </Button>
          )}
          {customToolbar ? customToolbar({ form, getValues, resetForm }) : <></>}
        </Space>
      </Form.Item>
    </Form>
  ) : (
    <Loading tip="加载中..." />
  );
};

Deserialization.displayName = 'Deserialization';
