import React from 'react';
import Iconfont from '../Iconfont';
import { Form, Input, Checkbox } from 'antd';
import { nanoid } from 'nanoid';
import { parseOptions } from '../helper';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import CommonAttributes from '../CommonAttributes';
import { ITemplateItem } from '../../../Functional/FormEditor';
import { CustomAttrType } from '../types';

const { TextArea } = Input;

interface PropTypes {
  name: string;
  value?: any[];
  label?: string;
  rules?: string[];
  options?: string;
  disabled?: boolean;
  optionsList?: any[];
  mode?: string;
  CustomAttr?: CustomAttrType;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
  [key: string]: any;
}

const Stage: React.FC<PropTypes> = props => {
  const { disabled, optionsList, value } = props;

  const handleChange = (value: CheckboxValueType[]) => {
    triggerChange(value);
  };

  const triggerChange = (newVal: any) => {
    const { onChange } = props;
    onChange && onChange(newVal);
  };

  return <Checkbox.Group value={value} disabled={disabled} options={optionsList} onChange={handleChange} />;
};

const Preview: React.FC<PropTypes> = props => {
  // const { optionsList, value } = props;
  // return (
  //   <div>
  //     {value &&
  //       value.length &&
  //       value
  //         .map(val => {
  //           const target = (optionsList as any[]).find(item => item.value === val);
  //           return target ? target.label : val;
  //         })
  //         .join(', ')}
  //   </div>
  // );
  const { optionsList, value } = props;
  return <Checkbox.Group value={value} options={optionsList} />;
};

const Attr: React.FC<PropTypes> = props => {
  const { value, options, optionsList } = props;
  return (
    <CommonAttributes
      {...{
        ...props,
        initialValues: { value, options },
      }}
      noPlaceholder
    >
      <Form.Item label="value" name="value">
        <Checkbox.Group options={optionsList} />
      </Form.Item>
      <Form.Item label="options" name="options">
        <TextArea rows={6} placeholder="请输入选项信息,例如: 中国,China;日本,Japan;美国,America" allowClear />
      </Form.Item>
      <div
        style={{
          textAlign: 'left',
          color: '#f55757',
          fontSize: 12,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        * 请以 label,value 的形式输入您的选项，label 和 value 间请以中文或英文逗号隔开，选项间请以中文或英文分号隔开，例如：key1,value1;key2,value2
      </div>
      <div
        style={{
          textAlign: 'left',
          color: '#f55757',
          fontSize: 12,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        * 如果 label,value 都是相同值，那么可以简单只提供一个值：value1;value2;key,value3
      </div>
    </CommonAttributes>
  );
};

const Builder: React.FC<PropTypes> = props => {
  const { mode, options } = props;
  const optionsList = parseOptions(options);
  switch (mode) {
    case 'stage':
      return <Stage {...props} optionsList={optionsList} />;
    case 'attr':
      return <Attr {...props} optionsList={optionsList} />;
    case 'preview':
      return <Preview {...props} optionsList={optionsList} />;
    default:
      return <Stage {...props} optionsList={optionsList} />;
  }
};

export default Builder;

export const CheckboxGroup: ITemplateItem = {
  group: '基础组件',
  label: '复选框',
  name: 'CheckboxGroup',
  instance: Builder,
  icon: <Iconfont type="icon-checkbox" />,
  loader: () => import('./CheckboxGroup'),
  props: {
    name: nanoid(),
    value: [],
    label: '标题',
    options: '选项1,option1;选项2,option2;选项3,option3',
    mode: 'stage',
  },
};
