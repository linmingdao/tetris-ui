import React from 'react';
import Iconfont from '../Iconfont';
import { Button, Form } from 'antd';
import OptionEditor, { optionValidator } from './OptionEditor';
import { OptionItemType } from './types';

export const rednerOptionListEditor = () => {
  function optionListValidator(_: any, optionItemList: OptionItemType[]) {
    if (optionItemList && optionItemList.length) {
      const labelMap: any = {};
      const values: string[] = [];
      for (let i = 0; i < optionItemList.length; ++i) {
        const optionItem = optionItemList[i] as any;
        values.push(optionItem.value);
        if (labelMap[optionItem.label]) {
          return Promise.reject(new Error('选项的 label 不可重复'));
        } else {
          labelMap[optionItem.label] = optionItem.value;
        }
      }
      if (optionItemList.length !== Array.from(new Set(values)).length) {
        return Promise.reject(new Error('选项的 value 不可重复'));
      }
    }
    return Promise.resolve();
  }

  return (
    <Form.List name="optionList" rules={[{ validator: optionListValidator }]}>
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              key={field.key}
              required={false}
              label={
                index === 0 ? (
                  <span>
                    选项信息(<span style={{ color: '#ff4d4e', fontSize: '12px' }}>更改选项信息后请先保存才能生效</span>)
                  </span>
                ) : (
                  ''
                )
              }
            >
              <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} rules={[{ validator: optionValidator }]} noStyle>
                <OptionEditor onRemove={() => remove(field.name)} />
              </Form.Item>
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="dashed" shape="round" icon={<Iconfont type="icon-add" />} onClick={() => add()}>
              添加选项
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
